import { APIKey } from './schema';

export class APIKeyService {
  async getAllKeys(): Promise<APIKey[] | undefined> {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:${process.env.ACCOUNT_SERVICE_PORT}/api/v0/apikey/getallkeys`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
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

  async activateAPIKey(key: string): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      fetch(
        `http://localhost:${process.env.ACCOUNT_SERVICE_PORT}/api/v0/apikey/activatekey?key=${key}`,
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
        .then((active) => {
          resolve(active);
        })
        .catch((err) => {
          console.log(err);
          reject(new Error('Unauthorized'));
        });
    });
  }

  async deactivateAPIKey(key: string): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      fetch(
        `http://localhost:${process.env.ACCOUNT_SERVICE_PORT}/api/v0/apikey/deactivatekey?key=${key}`,
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
        .then((active) => {
          resolve(active);
        })
        .catch((err) => {
          console.log(err);
          reject(new Error('Unauthorized'));
        });
    });
  }
}
