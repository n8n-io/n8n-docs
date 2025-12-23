#!/usr/bin/env python3
"""Cliente simple para llamar al endpoint de NVIDIA (vía `integrate.api.nvidia.com`).

Uso:
  - Exporta la variable de entorno `NVIDIA_API_KEY` con tu llave.
  - Ejecuta: `python agent_nvidia.py "consulta o prompt"`
  - Si se ejecuta desde n8n, pasar el texto como primer argumento.

Este script usa la interfaz `OpenAI` provista por el paquete `openai`.
"""

from __future__ import annotations

import os
import sys
import argparse
from openai import OpenAI
from typing import Optional


def get_client() -> OpenAI:
    api_key = os.getenv("NVIDIA_API_KEY")
    if not api_key:
        raise RuntimeError("NVIDIA_API_KEY no definida en el entorno")
    return OpenAI(base_url="https://integrate.api.nvidia.com/v1", api_key=api_key)


def ejecutar_agente(prompt: str, model: Optional[str] = None) -> str:
    """Envía `prompt` al modelo y devuelve la respuesta como texto.

    Args:
        prompt: Texto a enviar al modelo.
        model: Identificador del modelo. Si no se pasa, usa el por defecto.
    Returns:
        Texto de la respuesta o mensaje de error.
    """
    client = get_client()
    modelo = model or "nvidia/llama-3.1-405b-instruct"
    try:
        completion = client.chat.completions.create(
            model=modelo,
            messages=[
                {"role": "system", "content": "Eres un asistente técnico conciso y preciso."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.2,
            top_p=0.7,
        )

        # Manejo robusto de la estructura de respuesta
        if getattr(completion, "choices", None):
            choice = completion.choices[0]
            # Objeto con atributo message.content (cliente OpenAI-compat)
            msg = getattr(getattr(choice, "message", None), "content", None)
            if msg:
                return msg
            # Fallbacks si viene como dict
            if isinstance(choice, dict):
                return choice.get("message", {}).get("content") or choice.get("text") or str(choice)
            return str(choice)

        return "Respuesta vacía del modelo."
    except Exception as e:
        return f"Error al llamar al modelo: {e}"


def main(argv: Optional[list[str]] = None) -> int:
    argv = argv if argv is not None else sys.argv[1:]
    parser = argparse.ArgumentParser(description="Llamar a modelo NVIDIA via OpenAI-compatible client")
    parser.add_argument("prompt", nargs="?", help="Texto o prompt a enviar al modelo. Si se omite, se lee STDIN.")
    parser.add_argument("--model", help="Modelo a usar (opcional)")
    args = parser.parse_args(argv)

    if not os.getenv("NVIDIA_API_KEY"):
        print("ERROR: configura la variable de entorno NVIDIA_API_KEY con tu llave.", file=sys.stderr)
        return 2

    if args.prompt:
        prompt = args.prompt
    else:
        prompt = sys.stdin.read().strip()
        if not prompt:
            print("ERROR: No se proporcionó prompt por argumento ni por STDIN.", file=sys.stderr)
            return 1

    salida = ejecutar_agente(prompt, model=args.model)
    print(salida)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
