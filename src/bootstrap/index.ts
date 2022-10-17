import initConfig from './config';
import initServer from './server';

export default function initBootstrap() {
  try {
    initConfig();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
  initServer();
}
