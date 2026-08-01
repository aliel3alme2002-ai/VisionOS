# @visionos/sdk

## Purpose
The `@visionos/sdk` package provides the internal plumbing required to integrate with the VisionOS platform. It bridges the Backend, Edge Services, CLI, and internal workers by abstracting HTTP calls, MQTT topic generation, resiliency strategies, and generic health checks.

## Architecture
The SDK consists of lightweight, isolated modules adhering to functional patterns and strict contracts:
- **API**: A resilient, typed HTTP client wrapper around Axios.
- **MQTT**: Interfaces and builders for message-broker integrations.
- **Health**: Universal, context-free status probing functions.
- **Utils**: Abstract loggers and timing utilities.

## Examples

### HTTP
```typescript
import { ApiClient } from '@visionos/sdk';

const api = new ApiClient({ baseUrl: 'https://api.visionos.internal' });
const user = await api.get('/users/123');
```

### MQTT
```typescript
import { TopicBuilder } from '@visionos/sdk';

const topic = new TopicBuilder('visionos')
  .add('tenant-1')
  .add('edge-box-2')
  .build();
// 'visionos/tenant-1/edge-box-2'
```

### Health
```typescript
import { ping, isHealthy } from '@visionos/sdk';

const status = ping();
if (isHealthy(status)) {
  console.log('System is up!');
}
```

### Retry
```typescript
import { withRetry } from '@visionos/sdk';

await withRetry(async () => {
  // flacky operation
}, { maxRetries: 3, baseDelayMs: 200 });
```
