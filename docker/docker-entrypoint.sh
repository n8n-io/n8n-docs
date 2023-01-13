#!/bin/bash
# entry point script for n8n_docs image

set -e
set -u
set -o pipefail
(( ${ENTRYPOINT_DEBUG:-0} > 0 )) && set -x

declare -a COMMAND

case "${N8N_DOCS_SERVICE}" in
    "DEV_SERVER")
        COMMAND+=("mkdocs" "serve" "--dev-addr=0.0.0.0:8005")
    
        ;;
    *)
        echo "Unknown service ${N8N_DOCS_SERVICE}" >&2
        sleep 10
        exit 1
        ;;
esac

cd /app/n8n-docs

umask 0002

exec "${COMMAND[@]}"
