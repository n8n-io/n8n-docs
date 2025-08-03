# Configure Docker Model Runner integration

Configure your self-hosted n8n instance to use Docker Model Runner for local AI processing.

Docker Model Runner allows you to run AI models locally on your machine, providing privacy-first AI capabilities without external API dependencies.

## Prerequisites

- Docker Desktop 4.40+ with [Model Runner enabled](https://docs.docker.com/ai/model-runner/#enable-docker-model-runner)
- At least one AI model downloaded
- Self-hosted n8n instance

Enable Docker Model Runner and download a model:

```bash
# Enable Model Runner
docker desktop enable model-runner

# Download a lightweight model
docker model pull ai/llama3.2:1B-Q8_0

# Verify setup
docker model status
docker model ls
```

## Environment variables

Configure these environment variables to connect n8n to Docker Model Runner:

```bash
# Model Runner endpoint
export N8N_AI_OPENAI_API_BASE="http://model-runner.docker.internal/engines/llama.cpp/v1"

# API key (not validated by Model Runner)
export N8N_AI_OPENAI_API_KEY="local"

# Default model to use
export N8N_AI_DEFAULT_MODEL="ai/llama3.2:1B-Q8_0"

# Enable AI functionality
export N8N_AI_ENABLED="true"
export N8N_AI_PROVIDER="openai"
```

For npm installations using TCP mode:

```bash
# Enable TCP support first
docker desktop enable model-runner --tcp 12434

# Use localhost endpoint
export N8N_AI_OPENAI_API_BASE="http://localhost:12434/engines/llama.cpp/v1"
```

## Docker Compose configuration

Complete configuration with PostgreSQL and Redis:

```yaml
services:
  postgres:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: n8n
      POSTGRES_USER: n8n
      POSTGRES_PASSWORD: n8n_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U n8n"]
      interval: 30s
      timeout: 10s
      retries: 5
    networks:
      - n8n_network

  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      # Database configuration
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=n8n_password
      
      # n8n configuration
      - N8N_HOST=localhost
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - NODE_ENV=production
      - WEBHOOK_URL=http://localhost:5678/
      - GENERIC_TIMEZONE=America/New_York
      - N8N_ENCRYPTION_KEY=your-encryption-key-change-this
      
      # Docker Model Runner integration
      - N8N_AI_OPENAI_API_BASE=http://model-runner.docker.internal/engines/llama.cpp/v1
      - N8N_AI_OPENAI_API_KEY=local
      - N8N_AI_DEFAULT_MODEL=ai/llama3.2:1B-Q8_0
      - N8N_AI_ENABLED=true
      - N8N_AI_PROVIDER=openai
    volumes:
      - n8n_data:/home/node/.n8n
      - ./shared:/data/shared
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - n8n_network

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    volumes:
      - redis_data:/data
    networks:
      - n8n_network

  n8n-worker:
    image: docker.n8n.io/n8nio/n8n:latest
    restart: unless-stopped
    command: worker
    environment:
      # Database configuration
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=n8n_password
      
      # Queue configuration
      - EXECUTIONS_MODE=queue
      - QUEUE_BULL_REDIS_HOST=redis
      - QUEUE_BULL_REDIS_PORT=6379
      
      # Model Runner integration
      - N8N_AI_OPENAI_API_BASE=http://model-runner.docker.internal/engines/llama.cpp/v1
      - N8N_AI_OPENAI_API_KEY=local
      - N8N_AI_DEFAULT_MODEL=ai/llama3.2:1B-Q8_0
      - N8N_ENCRYPTION_KEY=your-encryption-key-change-this
    volumes:
      - n8n_data:/home/node/.n8n
      - ./shared:/data/shared
    depends_on:
      - postgres
      - redis
    networks:
      - n8n_network

volumes:
  postgres_data:
  n8n_data:
  redis_data:

networks:
  n8n_network:
```

### Development setup

Simple configuration for testing:

```yaml
services:
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    ports:
      - "5678:5678"
    environment:
      - N8N_AI_OPENAI_API_BASE=http://model-runner.docker.internal/engines/llama.cpp/v1
      - N8N_AI_OPENAI_API_KEY=local
      - N8N_AI_DEFAULT_MODEL=ai/llama3.2:1B-Q8_0
      - N8N_AI_ENABLED=true
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
```

## Using with AI nodes

Once configured, create OpenAI credentials in n8n with:
- **API Key**: `local` (or any string)
- **Base URL**: `http://model-runner.docker.internal/engines/llama.cpp/v1`


## Troubleshooting

**Verify Docker Model Runner is accessible:**

```bash
# Check Model Runner status
docker model status

# Test API endpoint
curl http://model-runner.docker.internal/engines/llama.cpp/v1/models

# Check environment variables in container
docker exec -it <n8n-container> env | grep N8N_AI
```

**Common issues:**

- **Connection refused**: Ensure Docker Desktop and Model Runner are running
- **Model not found**: Verify model name matches exactly with `docker model ls`
- **Container networking**: Use `model-runner.docker.internal` for container-to-container communication

Refer to [Docker Model Runner documentation](https://docs.docker.com/compose/how-tos/model-runner/){:target=_blank .external-link} for more information about the service.

