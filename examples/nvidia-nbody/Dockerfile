FROM nvidia/cuda:12.2.0-devel-ubuntu22.04

ENV DEBIAN_FRONTEND=noninteractive

# Build argument: set to "true" to also install python3-pip
ARG INSTALL_PYTHON=false

# Instala dependencias de OpenGL/GLUT, herramientas de compilación y utilidades necesarias (git, pkg-config)
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
	 git \
	 pkg-config \
	 ca-certificates \
	 freeglut3-dev \
	 libgl1-mesa-dev \
	 libglu1-mesa-dev \
	 libx11-dev \
	 libxmu-dev \
	 libxi-dev \
	 build-essential \
	 cmake \
 && if [ "${INSTALL_PYTHON}" = "true" ]; then \
		 apt-get install -y --no-install-recommends python3-pip; \
	 fi \
 && rm -rf /var/lib/apt/lists/*

# Crear un usuario sin privilegios para ejecutar la simulación dentro del contenedor.
# Usamos UID/GID 1000 por compatibilidad con hosts típicos, pero no forzamos montaje.
ARG NBODY_USER=nbody
ARG NBODY_UID=1000
RUN groupadd -g ${NBODY_UID} ${NBODY_USER} || true \
 && useradd -m -u ${NBODY_UID} -g ${NBODY_UID} -s /bin/bash ${NBODY_USER} || true

WORKDIR /workspace

# Copiar el script y asegurarnos que el usuario no-root pueda ejecutarlo y escribir en /workspace
COPY examples/nvidia-nbody/build_and_run.sh /workspace/build_and_run.sh
RUN chmod +x /workspace/build_and_run.sh \
 && chown -R ${NBODY_UID}:${NBODY_UID} /workspace

# Al cambiar a un usuario no-root, las operaciones dentro del contenedor
# (clonar repositorios, compilar) se realizarán como `nbody`.
USER ${NBODY_USER}
ENV HOME=/home/${NBODY_USER}

ENTRYPOINT ["/workspace/build_and_run.sh"]
