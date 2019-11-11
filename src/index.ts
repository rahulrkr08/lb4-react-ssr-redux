import { MyApplication } from './application';
import { ApplicationConfig } from '@loopback/core';

export { MyApplication };

export async function main(options: ApplicationConfig = {}) {

  options.rest = {
    port: 7000,
    host: 'localhost',
  };

  const app = new MyApplication(options);

  return app;
}
