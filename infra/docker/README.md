# VisionOS Infrastructure & Container Environments

This directory manages the containerized services for VisionOS across local development, edge node hardware, and cloud production environments.

---

## 1. Environment Configurations

Select and copy the appropriate environment file before running Docker Compose:

| Environment | Config File | Usage |
|---|---|---|
| **Blueprint Example** | `.env.example` | Global template containing all variable keys. |
| **Local Development** | `.env.local` | Default local developer settings. |
| **Edge Box** | `.env.edge` | On-premise edge hardware settings with device passthrough. |
| **Production Cloud** | `.env.production` | Cloud deployment template. |

```bash
# For local development:
cp .env.local .env
```

---

## 2. Docker Compose Profiles

The Docker Compose configuration is split by deployment profile:

| Profile | File Path | Command | Services Included |
|---|---|---|---|
| **Local Dev** | `infra/docker/docker-compose.local.yml` | `docker compose up -d` (via root `docker-compose.yml`) | PostgreSQL 16, Redis 7, Mosquitto, Frigate NVR |
| **Edge Box** | `infra/docker/docker-compose.edge.yml` | `docker compose -f infra/docker/docker-compose.edge.yml up -d` | Hardware-accelerated Frigate, Mosquitto, Redis, Postgres |
| **Production** | `infra/docker/docker-compose.production.yml` | `docker compose -f infra/docker/docker-compose.production.yml up -d` | Cloud storage & event bus cluster setup |

---

## 3. Network Boundaries

VisionOS enforces dedicated container networks:
- **`backend`**: Inter-microservice communication network.
- **`database`**: Dedicated network for PostgreSQL & Redis instances.
- **`edge`**: Isolated network for Frigate RTSP stream ingestion & Mosquitto MQTT events.
- **`monitoring`**: Dedicated network for Prometheus / Grafana telemetry monitoring.

---

## 4. Named Volumes

Persistent state is stored in the following Docker named volumes:
- **`postgres-data`**: Relational database storage (`/var/lib/postgresql/data`).
- **`redis-data`**: In-memory cache persistence (`/data`).
- **`mosquitto-data`**: MQTT broker persistent state (`/mosquitto/data`).
- **`frigate-media`**: Video clips & snapshot storage (`/media/frigate`).
- **`frigate-config`**: Frigate database & runtime configs (`/config`).

---

## 5. Logging Directory Strategy

Container & application logs are categorized into designated directories:
- `logs/edge/`: Edge Box NVR & motion detection log streams.
- `logs/cloud/`: Cloud control plane API & database log streams.
- `logs/services/`: Individual microservice diagnostic log streams.

---

## 6. Container Health Checks

Every container incorporates health verification commands:

| Container | Health Check Command | Interval / Timeout |
|---|---|---|
| **PostgreSQL** | `pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}` | 10s / 5s |
| **Redis** | `redis-cli ping` | 10s / 5s |
| **Mosquitto** | `nc -z localhost 1883 || exit 1` | 10s / 5s |
| **Frigate** | `curl -f http://localhost:5000/api/version || exit 1` | 15s / 10s |

---

## 7. Quick Start (Local Development Workflow)

```bash
# 1. Prepare environment
cp .env.local .env

# 2. Launch container stack
docker compose up -d

# 3. Check health status of containers
docker compose ps

# 4. View real-time logs
docker compose logs -f

# 5. Access UI & Services
# Frigate Web UI:  http://localhost:5000
# PostgreSQL DB:   localhost:5432 (User: visionos)
# MQTT Broker:     tcp://localhost:1883 & ws://localhost:9001
# Redis Cache:     localhost:6379

# 6. Stop container stack
docker compose down
```
