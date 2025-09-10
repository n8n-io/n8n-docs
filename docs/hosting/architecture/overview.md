---
description: Understand n8n's architecture
contentType: overview
---

# Architecture Overview

This document provides a comprehensive overview of n8n's architecture, designed to help developers, system administrators, and technical users understand how n8n works under the hood.

## Why Understanding Architecture Matters

Understanding n8n's architecture is essential for:
- Planning self-hosted deployments
- Optimizing performance and scaling
- Troubleshooting complex issues
- Building custom integrations
- Contributing to n8n development

## Core Components

### System Architecture

n8n consists of three main layers:

1. **User Interface Layer**: Web-based editor and API endpoints
2. **Core Server Layer**: Workflow engine and execution management
3. **Data Layer**: Persistent storage and optional queue system

```
┌─────────────────────────────────────────────────────────────┐
│                         User Interface                       │
│                    (Editor UI / Web Interface)               │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                       n8n Core Server                        │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   REST API  │  │ WebSocket    │  │  Webhook Server  │  │
│  └─────────────┘  └──────────────┘  └──────────────────┘  │
│  ┌─────────────────────────────────────────────────────┐  │
│  │              Workflow Engine                         │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                      Data Layer                              │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐   │
│  │   Database   │  │ File Storage │  │  Redis/Queue   │   │
│  └──────────────┘  └──────────────┘  └────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

### n8n Core Server

The central component orchestrating all n8n operations:

- **REST API**: Handles CRUD operations for workflows, credentials, and executions
- **WebSocket Server**: Enables real-time communication with the UI for live execution updates
- **Webhook Server**: Processes incoming webhook triggers for workflows

### Workflow Engine

The heart of n8n's execution system:

- **Executor**: Manages workflow execution lifecycle
- **Router**: Determines execution paths based on node connections
- **Node Processor**: Executes individual nodes and handles data transformation

### Data Layer

Persistent storage and caching components:

- **Database**: Stores workflows, credentials, execution history, and settings (PostgreSQL/SQLite)
- **File Storage**: Manages binary data and temporary files
- **Queue System**: Optional component for scaling and background job processing (Redis)

## Execution Models

### Main Process Mode (Default)

In the default configuration, n8n runs everything in a single process.

**Benefits:**
- Simple setup and deployment
- Lower resource requirements
- Suitable for small to medium workloads

**Limitations:**
- Limited scalability
- Single point of failure
- Memory constraints for large workflows

## Data Flow

### Workflow Execution Flow

1. **Trigger Event**: Webhook, schedule, or manual trigger initiates execution
2. **Workflow Activation Check**: System verifies workflow is active
3. **Input Data Validation**: Validates incoming data structure
4. **Node Execution Chain**: Sequential or parallel node processing
5. **Execution Logging**: Records execution details
6. **Result Storage**: Saves execution results based on configuration

### Data Structure

n8n uses a specific JSON structure for passing data between nodes:

```json
{
  "json": {
    // Main data object
    "field1": "value1",
    "field2": "value2"
  },
  "binary": {
    // Binary data references
    "data": {
      "mimeType": "image/png",
      "fileName": "example.png",
      "fileSize": 1024
    }
  },
  "pairedItem": {
    // Item correlation information
    "item": 0,
    "input": 0
  }
}
```

## Scaling Guidelines

### Vertical Scaling

Resource recommendations based on workload:

| Workload | CPU | RAM | Storage |
|----------|-----|-----|---------|
| Small (< 100 workflows) | 2 cores | 2GB | 10GB |
| Medium (100-1000 workflows) | 4 cores | 8GB | 50GB |
| Large (> 1000 workflows) | 8+ cores | 16GB+ | 100GB+ |

### Horizontal Scaling

For horizontal scaling, use Queue Mode with multiple workers:

```
                    Load Balancer
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   Main Node 1      Main Node 2     Main Node N
        │                │                │
        └────────────────┼────────────────┘
                         │
                    Redis Queue
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   Worker 1         Worker 2         Worker N
```

## Monitoring & Observability

### Key Metrics

**System Metrics:**
- CPU utilization
- Memory consumption
- Database connection pool
- Queue depth (if using queue mode)

**Application Metrics:**
- Workflows executed per minute
- Average execution time
- Error rate
- Webhook response time

### Health Checks

n8n provides a health check endpoint at `/healthz`:

```json
{
  "status": "ok",
  "version": "1.x.x",
  "database": "connected",
  "queue": "healthy",
  "uptime": 3600
}
```

## Troubleshooting Common Issues

### Memory Leaks
- **Symptom**: Gradual memory increase over time
- **Solution**: Enable execution pruning, limit workflow complexity, restart periodically

### Database Bottlenecks
- **Symptom**: Slow UI response, timeout errors
- **Solution**: Add database indexes, implement connection pooling, upgrade database resources

### Queue Congestion
- **Symptom**: Delayed workflow executions
- **Solution**: Add more workers, optimize workflow design, increase Redis resources

## Best Practices

### Deployment
- Use environment variables for all configuration
- Implement regular backup strategies
- Set up comprehensive monitoring and alerting
- Use container orchestration (Kubernetes) for production deployments

### Development
- Follow [node development guidelines](https://docs.n8n.io/integrations/creating-nodes/)
- Implement proper error handling in custom nodes
- Use TypeScript for custom node development
- Write unit tests for custom functionality