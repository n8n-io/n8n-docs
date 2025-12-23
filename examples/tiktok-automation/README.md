**Automatización de publicaciones TikTok (Reels) con scoring ML y proxy Apigee**

Resumen
- Este directorio contiene un orquestador mínimo `upload_with_scoring.py` que selecciona el siguiente video en `videos/`, lo envía a un servicio de scoring ML y, si es aprobado, lo publica llamando a un proxy Apigee.
- Diseñado para ejecutarse dos veces al día (09:00 y 18:00, zona `America/Mexico_City`).

Archivos
- `upload_with_scoring.py` : script principal.
- `requirements.txt` : dependencias Python.

Variables de entorno necesarias
- `ML_SCORE_URL` : endpoint de scoring ML. Debe aceptar POST con `file` y devolver JSON con mínimo `{ "approved": bool, "score": float, "reason": str }` o `{ "score": float }` (usará `THRESHOLD`).
- `APIGEE_PUBLISH_URL` : endpoint del proxy Apigee que realiza la subida a TikTok.
- `APIGEE_API_KEY` : opcional, si el proxy requiere `x-api-key`.
- `VIDEOS_DIR` : carpeta donde estarán los videos (default `videos`).
- `THRESHOLD` : umbral numérico (p.ej. 0.9) si el ML devuelve solo `score`.
- `TZ` : opcional, zona horaria (default `America/Mexico_City`).

Preparación local y pruebas
1. Instala dependencias:
```bash
python -m pip install -r examples/tiktok-automation/requirements.txt
```
2. Crea la carpeta `videos/` en el repo y coloca un archivo `sample.mp4` para pruebas.
3. Exporta variables (temporal):
```bash
export ML_SCORE_URL="https://mi-ml.example.com/score"
export APIGEE_PUBLISH_URL="https://apigee-proxy.example.com/publish"
export APIGEE_API_KEY="MI_API_KEY"
export VIDEOS_DIR="videos"
export THRESHOLD=0.9
```
4. Ejecuta una vez para probar:
```bash
python examples/tiktok-automation/upload_with_scoring.py
```

Programar ejecuciones (cron)
- Edita crontab con `crontab -e` y añade (usando zona `America/Mexico_City`):
```
CRON_TZ=America/Mexico_City
0 9,18 * * * cd /workspaces/n8n-docs && /usr/bin/env python3 examples/tiktok-automation/upload_with_scoring.py >> /var/log/tiktok_automation.log 2>&1
```
- Alternativa cloud: usa Cloud Scheduler / Cloud Tasks o un job en la infraestructura que prefieras, llamando al script en un runner.

Apigee (resumen)
- Configura un proxy que acepte la llamada de `upload_with_scoring.py` y realice el flujo OAuth/token exchange con TikTok y la subida.
- Guarda `client_id`/`client_secret` en KVM o Secret Manager en Apigee.
- Usa `ServiceCallout` para llamar al endpoint de TikTok y políticas `OAuthV2` si aplicable.

ML Scoring (recomendado)
- Puedes usar un endpoint en OpenAI/HuggingFace o un microservicio propio.
- Ejemplo de criterios: `score` >= 0.9 y `safety`==true.

Siguientes pasos recomendados
1. Proveer `APIGEE_PUBLISH_URL` y `ML_SCORE_URL` (o pedir que el equipo de profesionales despliegue el proxy y el servicio ML).
2. Decidir almacenamiento de videos si no usas carpeta local (Google Drive/S3). Puedo adaptar el script.
3. Yo puedo generar un `n8n` workflow exportable si quieres integrar visualmente.

Aviso sobre permisos y TOS
- Asegúrate que la cuenta TikTok y el uso automatizado cumplen los términos de servicio y políticas de la plataforma.
- Automatizaciones que usen scraping sin autorización pueden violar TOS.

Si quieres, genero ahora:
- Un `n8n` workflow JSON para el mismo flujo, o
- La plantilla XML para proxy Apigee (policies) para que tu equipo la importe.

Confírmame qué artefacto prefieres ahora y si quieres que adapte `VIDEOS_DIR` a Google Drive / S3 para automatizar subida de archivos desde la nube.

n8n — integración local (workflow adaptado)
- He incluido `examples/tiktok-automation/n8n-workflow-apigee.json`, un workflow adaptado que no maneja los binarios directamente: en su lugar dispara el orquestador local (`upload_with_scoring.py`) mediante HTTP.
- Pasos rápidos:
```bash
# en el host que ejecuta el orquestador
pip install -r examples/tiktok-automation/requirements.txt
mkdir -p examples/tiktok-automation/videos
export VIDEOS_DIR="examples/tiktok-automation/videos"
export ML_SCORE_URL="https://tu-ml/score"
export APIGEE_PUBLISH_URL="https://tu-apigee/publish"
export APIGEE_API_KEY="MI_API_KEY"
# arranca el orquestador en modo HTTP
ORCHESTRATOR_HTTP=1 ORCHESTRATOR_HOST=0.0.0.0 ORCHESTRATOR_PORT=5000 python examples/tiktok-automation/upload_with_scoring.py --serve
```

- Importa `examples/tiktok-automation/n8n-workflow-apigee.json` en tu instancia `n8n` (Workflows → Import).
- En `n8n` configura la variable de entorno `ORCHESTRATOR_URL` apuntando al orquestador (ej.: `http://orchestrator-host:5000/process-next`) si no corre en la misma máquina.

Con este enfoque el propio orquestador se encarga de leer la carpeta local `VIDEOS_DIR`, enviar a scoring y publicar vía Apigee; n8n sólo programa y dispara el proceso a las 09:00 y 18:00 (zona `America/Mexico_City`).