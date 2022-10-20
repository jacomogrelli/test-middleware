import initConfig from './config';
import initLogger from './logger';
import initServer from './server';

export default function initBootstrap() {
  initConfig();
  initLogger();
  initServer();
}
