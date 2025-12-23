#!/bin/bash
set -euo pipefail

REPO=https://github.com/NVIDIA/cuda-samples.git
CLONE_DIR=/workspace/cuda-samples
SAMPLE_DIR=Samples/5_Domain_Specific/nbody

if [ ! -d "$CLONE_DIR" ]; then
  git clone --depth 1 "$REPO" "$CLONE_DIR"
fi

cd "$CLONE_DIR/$SAMPLE_DIR"

if [ -f Makefile ]; then
  make -j"$(nproc)"
else
  mkdir -p build && cd build
  cmake ..
  make -j"$(nproc)"
  cd ..
fi

# try to find the produced binary
BIN=$(find . -type f -executable -name 'nbody' | head -n1 || true)
if [ -z "$BIN" ]; then
  echo "No se encontró el binario 'nbody'. Mostrando archivos construidos:" >&2
  find . -maxdepth 3 -type f -print
  exit 1
fi

echo "Ejecutando: $BIN"
"$BIN"
