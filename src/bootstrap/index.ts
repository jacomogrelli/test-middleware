import initConfig from './config';
import initServer from './server';

export default function initBootstrap() {
  initConfig();
  initServer();
}
