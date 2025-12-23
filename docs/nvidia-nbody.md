---
title: Ejecutar ejemplo CUDA "nbody"
---

Esta página muestra cómo compilar y ejecutar el sample `nbody` de los NVIDIA CUDA Samples usando un contenedor Docker listo para GPU.

Archivos añadidos:

- **Dockerfile**: [examples/nvidia-nbody/Dockerfile](examples/nvidia-nbody/Dockerfile)
- **Script de compilación/ejecución**: [examples/nvidia-nbody/build_and_run.sh](examples/nvidia-nbody/build_and_run.sh)

Instrucciones rápidas (requiere Docker con soporte NVIDIA / GPU):

1. Construir la imagen:

```bash
docker build -t nvidia-nbody:latest -f examples/nvidia-nbody/Dockerfile .
```

2. Ejecutar el contenedor (usa la runtime de NVIDIA):

```bash
docker run --gpus all --rm nvidia-nbody:latest
```

Notas:

- El contenedor clona `https://github.com/NVIDIA/cuda-samples.git` y compila el sample `Samples/5_Domain_Specific/nbody`.
- Si prefieres compilar localmente sin Docker, clona el repo de samples y sigue las instrucciones del directorio del sample.
- Dependiendo de la versión de CUDA y del host, puede que necesites ajustar la etiqueta de la imagen base en el `Dockerfile`.
 - Si prefieres compilar localmente sin Docker, clona el repo de samples y sigue las instrucciones del directorio del sample.
 - Dependiendo de la versión de CUDA y del host, puede que necesites ajustar la etiqueta de la imagen base en el `Dockerfile`.

## Instalación de CUDA (RPM / gestores de paquetes)

Pasos generales para distribuciones que usan paquetes RPM (RHEL, CentOS, Fedora, openSUSE, etc.). Ajusta `<distro>`, `<version>` y `<architecture>` según tu sistema.

1. Descargar o copiar el paquete del repositorio de CUDA proporcionado por NVIDIA.

2. Instalar el paquete RPM del repositorio:

```bash
sudo rpm --install cuda-repo-<distro>-<version>.<architecture>.rpm
```

3. Limpiar/actualizar la caché del gestor de paquetes y luego instalar CUDA:

```bash
# RHEL/CentOS con yum
sudo yum clean all
sudo yum install cuda

# Fedora con dnf
sudo dnf clean all
sudo dnf install cuda

# openSUSE con zypper
sudo zypper refresh
sudo zypper install cuda
```

4. Añadir CUDA al `PATH` (si corresponde) y reiniciar la sesión:

```bash
echo 'export PATH=/usr/local/cuda/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

Notas:
- Sigue la guía oficial de NVIDIA para elegir el paquete RPM adecuado para tu distribución y versión del kernel.
- En algunos casos es necesario instalar drivers NVIDIA adicionales o usar los drivers del kernel del sistema.
- Si tienes dudas sobre la compatibilidad de versiones entre la imagen base del `Dockerfile` y tu host, ajusta la etiqueta de la imagen base a la versión de CUDA que uses localmente.

## Variables de entorno recomendadas

Exporta estas variables para que el sistema encuentre los binarios y las librerías de CUDA (ejemplo para CUDA 12.8):

```bash
export PATH=/usr/local/cuda-12.8/bin${PATH:+:${PATH}}
export LD_LIBRARY_PATH=/usr/local/cuda-12.8/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}
```

Nota: agrega esas líneas a tu `~/.bashrc` o `~/.zshrc` para que sean permanentes y luego reinicia la sesión o ejecuta `source ~/.bashrc`.
