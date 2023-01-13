FROM python:3.8-slim

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
# Create an unprivileged user to run studio-admin as
RUN useradd --system --uid 1001 --gid 0 --home-dir /app/n8n-docs --shell /bin/bash n8n-docs

RUN apt-get update --fix-missing \
	&& apt-get install -y  build-essential poppler-utils \
	&& apt-get clean


WORKDIR /app/n8n-docs

COPY requirements.txt /app/n8n-docs
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT /usr/local/bin/docker-entrypoint.sh

