import { Injectable } from '@nestjs/common';
import { OnvifClient } from './onvif-client';

@Injectable()
export class OnvifClientProvider {
  createClient(ipAddress: string): OnvifClient {
    return {
      id: 'client_' + ipAddress,
      ipAddress,
      callSoap: async () => ({ status: 'OK' })
    };
  }
}
