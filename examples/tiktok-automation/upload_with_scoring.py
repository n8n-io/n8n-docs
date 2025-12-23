#!/usr/bin/env python3
"""
Orquestador minimal para subir Reels a TikTok vía un proxy Apigee
Flujo:
 - Busca el siguiente video en `VIDEOS_DIR` (por defecto `videos/`)
 - Llama a `ML_SCORE_URL` para obtener evaluación (espera JSON: {"approved": bool, "score":float, "tags":[], "reason":str})
 - Si aprobado llama a `APIGEE_PUBLISH_URL` para publicar
 - Mueve archivos a `published/` o `rejected/`

Variables de entorno (requeridas):
 - VIDEOS_DIR (opcional; default: videos)
 - ML_SCORE_URL
 - APIGEE_PUBLISH_URL
 - APIGEE_API_KEY (opcional; usado como header `x-api-key`)
 - TZ (opcional; default: America/Mexico_City)

Notas: adapta endpoints y claves según tu infraestructura.
"""

import os
import sys
import requests
import shutil
import time
from pathlib import Path
from datetime import datetime
from typing import Optional

try:
    from flask import Flask, jsonify
except Exception:
    Flask = None
    jsonify = None

VIDEOS_DIR = Path(os.environ.get("VIDEOS_DIR", "videos"))
PUBLISHED_DIR = VIDEOS_DIR / "published"
REJECTED_DIR = VIDEOS_DIR / "rejected"
ML_SCORE_URL = os.environ.get("ML_SCORE_URL")
APIGEE_PUBLISH_URL = os.environ.get("APIGEE_PUBLISH_URL")
APIGEE_API_KEY = os.environ.get("APIGEE_API_KEY")
TZ = os.environ.get("TZ", "America/Mexico_City")

ALLOWED_EXT = {"mp4", "mov", "mkv", "webm"}

def log(msg):
    now = datetime.now().astimezone().isoformat()
    print(f"[{now}] {msg}")


def find_next_video():
    if not VIDEOS_DIR.exists():
        VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
    files = [p for p in VIDEOS_DIR.iterdir() if p.is_file() and p.suffix.lower().lstrip('.') in ALLOWED_EXT]
    if not files:
        return None
    files.sort(key=lambda p: p.stat().st_ctime)
    return files[0]


def score_video(video_path, metadata=None, timeout=60):
    if not ML_SCORE_URL:
        raise RuntimeError("ML_SCORE_URL no está configurado")
    with open(video_path, "rb") as f:
        files = {"file": (video_path.name, f, "video/mp4")}
        data = metadata or {}
        r = requests.post(ML_SCORE_URL, data=data, files=files, timeout=timeout)
    r.raise_for_status()
    return r.json()


def publish_via_apigee(video_path, metadata=None, timeout=120):
    if not APIGEE_PUBLISH_URL:
        raise RuntimeError("APIGEE_PUBLISH_URL no está configurado")
    headers = {}
    if APIGEE_API_KEY:
        headers["x-api-key"] = APIGEE_API_KEY
    with open(video_path, "rb") as f:
        files = {"file": (video_path.name, f, "video/mp4")}
        data = metadata or {}
        r = requests.post(APIGEE_PUBLISH_URL, headers=headers, data=data, files=files, timeout=timeout)
    r.raise_for_status()
    return r.json()


def ensure_dirs():
    PUBLISHED_DIR.mkdir(parents=True, exist_ok=True)
    REJECTED_DIR.mkdir(parents=True, exist_ok=True)


def move_file(src: Path, dest_dir: Path):
    dest = dest_dir / src.name
    shutil.move(str(src), str(dest))
    return dest


def main_once():
    ensure_dirs()
    vid = find_next_video()
    if not vid:
        log("No hay videos en la carpeta. Coloca archivos en 'videos/'")
        return
    log(f"Procesando: {vid}")
    metadata = {
        "title": os.environ.get("DEFAULT_TITLE", vid.stem),
        "description": os.environ.get("DEFAULT_DESCRIPTION", "")
    }
    try:
        score = score_video(vid, metadata=metadata)
        log(f"Resultado ML: {score}")
    except Exception as e:
        log(f"Error llamando ML_SCORE_URL: {e}")
        return

    approved = False
    if isinstance(score, dict):
        approved = score.get("approved") if "approved" in score else (score.get("score", 0) >= float(os.environ.get("THRESHOLD", 0.9)))
    else:
        log("Formato de respuesta ML inesperado; se rechaza por seguridad")
        approved = False

    if approved:
        try:
            resp = publish_via_apigee(vid, metadata=metadata)
            log(f"Publicado, respuesta: {resp}")
            move_file(vid, PUBLISHED_DIR)
        except Exception as e:
            log(f"Error publicando vía Apigee: {e}")
    else:
        reason = score.get("reason") if isinstance(score, dict) else "no aprobado"
        log(f"Video rechazado por ML: {reason}")
        move_file(vid, REJECTED_DIR)


if __name__ == "__main__":
    # ejecución única; schedule con cron o Cloud Scheduler
    # Si se pasa --serve o la variable ORCHESTRATOR_HTTP=1 se levanta un endpoint HTTP
    serve = False
    host = os.environ.get("ORCHESTRATOR_HOST", "0.0.0.0")
    port = int(os.environ.get("ORCHESTRATOR_PORT", 5000))
    if "--serve" in sys.argv or os.environ.get("ORCHESTRATOR_HTTP") == "1":
        serve = True

    if serve:
        if Flask is None:
            log("Flask no está instalado. Instala dependencias: pip install flask")
            sys.exit(1)

        app = Flask(__name__)

        @app.route("/process-next", methods=["POST", "GET"])  # GET útil para pruebas
        def process_next():
            try:
                main_once()
                return jsonify({"status": "ok"}), 200
            except Exception as e:
                return jsonify({"status": "error", "error": str(e)}), 500

        log(f"Orquestador HTTP escuchando en {host}:{port}")
        app.run(host=host, port=port)
    else:
        main_once()
