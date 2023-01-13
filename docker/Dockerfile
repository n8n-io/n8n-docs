# Builder image to build docs
FROM python:3.8-slim AS builder

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN apt-get update --fix-missing \
	&& apt-get install -y  build-essential poppler-utils \
	&& apt-get clean


COPY . /app/n8n-docs
WORKDIR /app/n8n-docs

RUN pip install --no-cache-dir -r requirements.txt

RUN mkdir -p /app/n8n-docs/docs/integrations/builtin/all-nodes/
RUN mkdir -p /app/n8n-docs/docs/_images/integrations/builtin/all-nodes/
RUN cp -r /app/n8n-docs/docs/integrations/builtin/app-nodes/* /app/n8n-docs/docs/integrations/builtin/all-nodes/
RUN cp -r /app/n8n-docs/docs/integrations/builtin/core-nodes/* /app/n8n-docs/docs/integrations/builtin/all-nodes/
RUN cp -r /app/n8n-docs/docs/integrations/builtin/trigger-nodes/* /app/n8n-docs/docs/integrations/builtin/all-nodes/
RUN cp -r /app/n8n-docs/docs/_images/integrations/builtin/app-nodes/* /app/n8n-docs/docs/_images/integrations/builtin/all-nodes/
RUN cp -r /app/n8n-docs/docs/integrations/builtin/core-nodes/* /app/n8n-docs/docs/_images/integrations/builtin/all-nodes/
RUN cp -r /app/n8n-docs/docs/integrations/builtin/trigger-nodes/* /app/n8n-docs/docs/_images/integrations/builtin/all-nodes/

RUN mkdocs build

COPY docker/docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT /usr/local/bin/docker-entrypoint.sh

# Final image to serve genereated docs
FROM nginx:1.23.3 as final

COPY --from=builder /app/n8n-docs/site /app/site
COPY docker/nginx/default.conf /etc/nginx/conf.d/
EXPOSE 8080
