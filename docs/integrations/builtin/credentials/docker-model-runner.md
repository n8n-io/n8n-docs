# Docker Model Runner credentials

Documentation for Docker Model Runner credentials. Use these credentials to authenticate Docker Model Runner in n8n, a workflow automation platform.

## Prerequisites

- Docker Desktop 4.40+ installed and running
- Docker Model Runner enabled  
- At least one AI model downloaded

Create and run a Docker Model Runner instance with Docker Desktop 4.40+. Refer to the [Docker Model Runner documentation](https://docs.docker.com/ai/model-runner/){:target=_blank .external-link} for more information.

## Supported authentication methods

- Instance URL (local endpoint)

## Related resources

Refer to [Docker's Model Runner documentation](https://docs.docker.com/desktop/model-runner/){:target=_blank .external-link} for more information about the service.

View n8n's [Advanced AI documentation](https://docs.n8n.io/langchain/).

## Using instance URL

You can use these credentials to authenticate the following nodes:

- OpenAI Chat Model (with local endpoint configuration)
- AI Agent
- LangChain Chat Model

To configure this credential, you'll need:

- Docker Desktop 4.40+ installed and running
- Docker Model Runner enabled
- At least one AI model downloaded

### Setup Docker Model Runner

**1. Enable Docker Model Runner:**

```bash
# Enable Model Runner
docker desktop enable model-runner

# Verify it's running
docker model status
```

**2. Download AI models:**

```bash
# Download a lightweight model
docker model pull ai/llama3.2:1B-Q8_0

# List available models
docker model ls
```

**3. Configure the Base URL:**

The default Base URL depends on your setup:
- **From containers**: `http://model-runner.docker.internal/engines/llama.cpp/v1`
- **From host (TCP enabled)**: `http://localhost:12434/engines/llama.cpp/v1`

### Enabling TCP Support (Optional)

For some configurations, you may need to enable TCP host support:

```bash
# Enable with TCP support
docker desktop enable model-runner --tcp 12434
```

When TCP is enabled, use `http://localhost:12434/engines/llama.cpp/v1` as your Base URL.

### Docker Model Runner and self-hosted n8n

If you're self-hosting n8n in a Docker container, ensure proper network configuration:

**Option 1: Simple configuration (Development)**

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

**Option 2: Production-ready configuration**

```yaml
services:
  # PostgreSQL database for n8n
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

  # n8n workflow automation with Model Runner integration
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
      
      # Model Runner integration
      - N8N_AI_OPENAI_API_BASE=http://model-runner.docker.internal/engines/llama.cpp/v1
      - N8N_AI_OPENAI_API_KEY=local
      - N8N_AI_DEFAULT_MODEL=ai/llama3.2:1B-Q8_0
      
      # Additional AI configuration
      - N8N_AI_ENABLED=true
      - N8N_AI_PROVIDER=openai
      
      # Security
      - N8N_ENCRYPTION_KEY=your-encryption-key-change-this
      
      # Enable code execution for advanced workflows
      - NODE_FUNCTION_ALLOW_BUILTIN=*
      - NODE_FUNCTION_ALLOW_EXTERNAL=*
    volumes:
      - n8n_data:/home/node/.n8n
      - ./shared:/data/shared
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - n8n_network

  # Redis for queue mode (optional but recommended for production)
  redis:
    image: redis:7-alpine
    restart: unless-stopped
    volumes:
      - redis_data:/data
    networks:
      - n8n_network

  # n8n worker for queue mode (optional)
  n8n-worker:
    image: docker.n8n.io/n8nio/n8n:latest
    restart: unless-stopped
    command: worker
    environment:
      # Database configuration (same as main n8n)
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
      
      # Model Runner integration (same as main n8n)
      - N8N_AI_OPENAI_API_BASE=http://model-runner.docker.internal/engines/llama.cpp/v1
      - N8N_AI_OPENAI_API_KEY=local
      - N8N_AI_DEFAULT_MODEL=ai/llama3.2:1B-Q8_0
      
      # Security (same encryption key)
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
    driver: local
  n8n_data:
    driver: local
  redis_data:
    driver: local

networks:
  n8n_network:
    driver: bridge
```

### Using with OpenAI Chat Model node

1. **Create OpenAI credentials** with these settings:
   - **API Key**: `dummy-key` (not validated by Docker Model Runner)
   - **Base URL**: `http://model-runner.docker.internal/engines/llama.cpp/v1`

2. **Configure the OpenAI Chat Model node**:
   - **Model**: `ai/llama3.2:1B-Q8_0` (or your downloaded model)
   - **Credentials**: Select your Docker Model Runner credentials

### Available Models

Popular models available on Docker Hub:

- `ai/llama3.2:1B-Q8_0` - Lightweight Llama model (1.2GB)
- `ai/gemma3` - Google's Gemma model
- `ai/mistral-nemo` - Mistral model
- `ai/phi4` - Microsoft's Phi model

Download models using: `docker model pull <model-name>`

### System Requirements

- **macOS**: Apple Silicon (M1/M2/M3/M4) required for GPU acceleration
- **Windows**: NVIDIA GPU
- **Memory**: 8GB+ recommended (varies by model size)
- **Storage**: 2-8GB per model

### Troubleshooting

**Model Runner not accessible from n8n:**

- Verify Docker Model Runner is running: `docker model status`
- Check Docker socket is mounted: `-v /var/run/docker.sock:/var/run/docker.sock`
- Test connectivity: `curl http://model-runner.docker.internal/engines/llama.cpp/v1/models`

**Model not found errors:**

- List available models: `docker model ls`
- Download required model: `docker model pull ai/llama3.2:1B-Q8_0`

**Performance issues:**

- Monitor GPU usage in Activity Monitor (macOS)
- Check model size vs available memory
- Consider using smaller quantized models (Q4_0, Q8_0)

Refer to [Docker Model Runner troubleshooting](https://docs.docker.com/ai/model-runner/#troubleshooting){:target=_blank .external-link} for more information.

