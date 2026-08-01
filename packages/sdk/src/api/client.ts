import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { TimeoutError, NetworkError, AuthenticationError, SdkError } from './errors';
import { withRetry, RetryOptions } from './retry';

export interface ApiClientOptions {
  readonly baseUrl: string;
  readonly timeoutMs?: number;
  readonly defaultRetryOptions?: RetryOptions;
  readonly headers?: Record<string, string>;
}

export class ApiClient {
  private readonly client: AxiosInstance;
  private readonly defaultRetryOptions: RetryOptions;

  constructor(options: ApiClientOptions) {
    this.client = axios.create({
      baseURL: options.baseUrl,
      timeout: options.timeoutMs ?? 10000,
      headers: options.headers ?? {},
    });

    this.defaultRetryOptions = options.defaultRetryOptions ?? { maxRetries: 3, baseDelayMs: 500 };
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.execute(() => this.client.get<T>(url, config));
  }

  public async post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    return this.execute(() => this.client.post<T>(url, data, config));
  }

  public async put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    return this.execute(() => this.client.put<T>(url, data, config));
  }

  public async patch<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    return this.execute(() => this.client.patch<T>(url, data, config));
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.execute(() => this.client.delete<T>(url, config));
  }

  private async execute<T>(request: () => Promise<import('axios').AxiosResponse<T>>): Promise<T> {
    return withRetry(async () => {
      try {
        const response = await request();
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.code === 'ECONNABORTED') {
            throw new TimeoutError();
          }
          if (!error.response) {
            throw new NetworkError(error.message);
          }
          if (error.response.status === 401 || error.response.status === 403) {
            throw new AuthenticationError();
          }
          throw new SdkError(`HTTP Error: ${error.response.status}`, 'HTTP_ERROR');
        }
        throw error;
      }
    }, this.defaultRetryOptions);
  }
}
