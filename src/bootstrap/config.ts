import { resolve } from 'node:path';

import { config } from 'dotenv';
import { error } from 'winston';

export default function initConfig() {
  const environment = process.env.APP_ENV;

  if (!environment) {
    const message = 'Missed environment variable';
    error(message);
    throw new Error(message);
  }

  const path = resolve(`./config/.${environment}.env`);

  if (!path) {
    throw new Error('Can not find env file');
  }

  config({ path });
}
