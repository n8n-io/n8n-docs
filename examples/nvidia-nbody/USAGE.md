# NVIDIA N-Body example

Este directorio contiene un ejemplo para compilar y ejecutar la muestra `nbody` de los `cuda-samples` dentro de un contenedor Docker con soporte NVIDIA GPU.

Requisitos en el host:
- Drivers NVIDIA instalados
- Docker con soporte `--gpus` (NVIDIA Container Toolkit)

Instrucciones rápidas

Build y run usando el helper desde el host:

```bash
# build y ejecutar (imagen por defecto: nvidia-nbody:latest)
bash examples/nvidia-nbody/run_and_build_host.sh

# incluir python3-pip dentro de la imagen
bash examples/nvidia-nbody/run_and_build_host.sh --with-python

# tag personalizado y desactivar cache
bash examples/nvidia-nbody/run_and_build_host.sh --tag my-nbody:1.0 --no-cache

# pasar build-arg adicional
bash examples/nvidia-nbody/run_and_build_host.sh --extra-build-arg "FOO=bar"
```

Comandos directos (alternativa):

```bash
# Build básico
docker build -t nvidia-nbody:latest -f examples/nvidia-nbody/Dockerfile .

# Build con python3-pip
docker build --build-arg INSTALL_PYTHON=true -t nvidia-nbody:latest -f examples/nvidia-nbody/Dockerfile .

# Ejecutar (requiere soporte GPU y permisos)
docker run --gpus all --rm -it --name nbody-run --env="DISPLAY" --net=host nvidia-nbody:latest
```

Notas de seguridad y usuario no-root

- La imagen crea el usuario `nbody` (UID 1000) y cambia a él para ejecutar la compilación y la muestra.
- Esto reduce el riesgo de ejecutar procesos como `root` dentro del contenedor.

Problemas comunes

- Si `nbody` no encuentra el binario tras la compilación, revisa los logs del contenedor.
- Asegúrate de que el host permita acceso a la GPU mediante `--gpus all`.

Si quieres, puedo:
- Añadir un Dockerfile alternativo que deje la fase de build en `root` y aporte una fase final `--from` con usuario no-root (multi-stage), o
- Forzar UID dinámico para emparejar el UID del usuario host al construir.
