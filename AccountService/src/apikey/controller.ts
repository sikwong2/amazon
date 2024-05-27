import { APIKeyService } from './service';
import { Controller, Query, Get, Response, SuccessResponse, Route } from 'tsoa';
import { APIKey } from '.';

@Route('apikey')
export class APIKeyController extends Controller {

  @Get('getallkeys')
  @Response('401', 'Unauthorized')
  @SuccessResponse('200', 'API Keys Retrieved')
  public async getAllKeys(): Promise<APIKey[]> {
    return new APIKeyService().getAllKeys().then(async (keys: APIKey[]): Promise<APIKey[]> => {
      return keys;
    });
  }

  @Get('getvendorkeys')
  @Response('401', 'Unauthorized')
  @SuccessResponse('200', 'API Keys Retrieved')
  public async getAPIKeys(@Query() id: string): Promise<APIKey[]> {
    return new APIKeyService().getVendorKeys(id).then(async (keys: APIKey[]): Promise<APIKey[]> => {
      return keys;
    });
  }

  @Get('createkey')
  @Response('401', 'Unauthorized')
  @SuccessResponse('201', 'API Key Created')
  public async createAPIKey(@Query() id: string): Promise<APIKey> {
    return new APIKeyService().createAPIKey(id).then(async (key: APIKey): Promise<APIKey> => {
      return key;
    });
  }

  @Get('activatekey')
  @Response('401', 'Unauthorized')
  @SuccessResponse('200', 'API Key Activated')
  public async activateAPIKey(@Query() key: string): Promise<Boolean> {
    return new APIKeyService().activateAPIKey(key).then(async (active: Boolean): Promise<Boolean> => {
      return active;
    });
  }

  @Get('deactivatekey')
  @Response('401', 'Unauthorized')
  @SuccessResponse('200', 'API Key Deactivated')
  public async deactivateAPIKey(@Query() key: string): Promise<Boolean> {
    return new APIKeyService().deactivateAPIKey(key).then(async (active: Boolean): Promise<Boolean> => {
      return active;
    });
  }
}
