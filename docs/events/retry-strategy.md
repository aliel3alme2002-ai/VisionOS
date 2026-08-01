# VisionOS Event Retry & Backoff Strategy

This document defines the retry mechanisms and backoff algorithms for event consumers in **VisionOS**.

---

## 1. Retry Parameters

```
Initial Delay: 100ms
Backoff Factor: 2.0 (Exponential)
Jitter: ±20% randomized noise
Maximum Delay: 30,000ms (30 seconds)
Maximum Retries: 5 attempts
```

---

## 2. Exponential Backoff Formula

$$\text{Delay} = \min\left(\text{MaxDelay}, \text{InitialDelay} \times (\text{BackoffFactor})^{\text{attempt}}\right) \pm \text{Jitter}$$

### Retry Interval Timeline
- **Attempt 1**: ~100ms
- **Attempt 2**: ~200ms
- **Attempt 3**: ~400ms
- **Attempt 4**: ~800ms
- **Attempt 5**: ~1,600ms
- **Post-Attempt 5 Failure**: Route payload to Dead-Letter Queue (DLQ).

---

## 3. Classification of Failures

| Failure Class | Example | Handling Strategy |
| :--- | :--- | :--- |
| **Transient Error** | Network timeout, database connection pool busy. | Execute exponential backoff retries up to 5 attempts. |
| **Permanent Error** | Schema JSON validation failure, invalid syntax. | **Do NOT retry.** Route directly to DLQ. |
| **Fatal Security Error**| Invalid HWID signature or license mismatch. | **Do NOT retry.** Emit security audit alert & drop message. |
