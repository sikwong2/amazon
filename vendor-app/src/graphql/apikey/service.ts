import { APIKey } from './schema';

export class APIKeyService {
  async createAPIKey(id: string): Promise<APIKey | undefined> {
    return new Promise((resolve, reject) => {
      fetch(
        `http://localhost:${process.env.ACCOUNT_SERVICE_PORT}/api/v0/apikey/createkey?id=${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((key) => {
          resolve(key);
        })
        .catch((err) => {
          console.log(err);
          reject(new Error('Unauthorized'));
        });
    });
  }

  async getVendorKeys(id: string): Promise<APIKey[] | undefined> {
    return new Promise((resolve, reject) => {
      fetch(
        `http://localhost:${process.env.ACCOUNT_SERVICE_PORT}/api/v0/apikey/getvendorkeys?id=${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((keys) => {
          resolve(keys);
        })
        .catch((err) => {
          console.log(err);
          reject(new Error('Unauthorized'));
        });
    });
  }
}
