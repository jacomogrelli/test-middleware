import { resolve } from 'node:path';

import { config } from 'dotenv';

export default function initConfig() {
  const environment = process.env.APP_ENV;

  if (!environment) {
    throw new Error('Missed environment variable');
  }

  const path = resolve(`./config/.${environment}.env`);

  if (!path) {
    throw new Error('Can not find env file');
  }

  config({
    path,
  });
}
