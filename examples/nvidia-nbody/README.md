# Ejemplo `nbody` de NVIDIA CUDA Samples

Este directorio contiene utilidades para clonar, compilar y ejecutar el sample `nbody` desde el repositorio oficial de NVIDIA.

Archivos:

- `Dockerfile` - Contenedor basado en `nvidia/cuda` que construye y ejecuta el sample.
- `build_and_run.sh` - Script que clona `https://github.com/NVIDIA/cuda-samples.git`, compila y ejecuta `Samples/5_Domain_Specific/nbody`.

Instalación de CUDA en sistemas RPM (resumen):

1. Instala el paquete RPM del repositorio de NVIDIA:

```bash
sudo rpm --install cuda-repo-<distro>-<version>.<architecture>.rpm
```

2. Limpiar caché y usar el gestor de paquetes para instalar CUDA:

```bash
sudo yum clean all           # o sudo dnf clean all
sudo yum install cuda        # o sudo dnf install cuda

# En openSUSE
sudo zypper refresh
sudo zypper install cuda
```

3. Añade CUDA al `PATH` si es necesario:

```bash
echo 'export PATH=/usr/local/cuda/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

Uso con Docker (requiere `--gpus` y drivers en host):

```bash
docker build -t nvidia-nbody:latest -f examples/nvidia-nbody/Dockerfile .
docker run --gpus all --rm nvidia-nbody:latest
```

Notas:
- Asegúrate de que el host tenga controladores NVIDIA compatibles y `nvidia-container-toolkit` si vas a usar Docker con GPUs.
- Si prefieres no usar Docker, clona el repo de samples y compila localmente siguiendo las instrucciones del sample.

## Variables de entorno recomendadas

Exporta estas variables para que el sistema encuentre los binarios y las librerías de CUDA (ejemplo para CUDA 12.8):

```bash
export PATH=/usr/local/cuda-12.8/bin${PATH:+:${PATH}}
export LD_LIBRARY_PATH=/usr/local/cuda-12.8/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}
```

Nota: agrega esas líneas a tu `~/.bashrc` o `~/.zshrc` para que sean permanentes y luego reinicia la sesión o ejecuta `source ~/.bashrc`.
