#!/usr/bin/env bash
set -euo pipefail

PROG="$(basename "$0")"
USAGE="Usage: $PROG [--with-python] [--tag <tag>] [--no-cache] [--extra-build-arg 'KEY=VALUE']"

WITH_PY=false
TAG=nvidia-nbody:latest
NO_CACHE=false
EXTRA_BUILD_ARG=""

while [[ ${#} -gt 0 ]]; do
    case "$1" in
        --with-python)
            WITH_PY=true; shift;;
        --tag)
            TAG="$2"; shift 2;;
        --no-cache)
            NO_CACHE=true; shift;;
        --extra-build-arg)
            EXTRA_BUILD_ARG="$2"; shift 2;;
        -h|--help)
            echo "$USAGE"; exit 0;;
        *)
            echo "Unknown arg: $1" >&2; echo "$USAGE"; exit 2;;
    esac
done

echo "--- Limpiando contenedores previos ---"
docker rm -f nbody-run 2>/dev/null || true

echo "--- Construyendo imagen (tag: $TAG) ---"
BUILD_CMD=(docker build -t "$TAG" -f examples/nvidia-nbody/Dockerfile .)
if [ "$WITH_PY" = true ]; then
    BUILD_CMD+=(--build-arg INSTALL_PYTHON=true)
fi
if [ -n "$EXTRA_BUILD_ARG" ]; then
    BUILD_CMD+=(--build-arg "$EXTRA_BUILD_ARG")
fi
if [ "$NO_CACHE" = true ]; then
    BUILD_CMD+=(--no-cache)
fi

echo "+ ${BUILD_CMD[*]}"

"${BUILD_CMD[@]}"

echo "--- Lanzando simulación con soporte GPU ---"
RUN_CMD=(docker run --rm -it --name nbody-run --gpus all)

# Sólo pasar DISPLAY si está presente en el host
if [ -n "${DISPLAY-}" ]; then
    RUN_CMD+=(--env "DISPLAY=${DISPLAY}")
fi

# Mapear X11 sockets en caso de que se quiera GUI (opcional)
if [ -S /tmp/.X11-unix/X0 ]; then
    RUN_CMD+=( -v /tmp/.X11-unix:/tmp/.X11-unix )
fi

RUN_CMD+=(--net=host "$TAG")

echo "+ ${RUN_CMD[*]}"
"${RUN_CMD[@]}"

echo "--- Hecho ---"

