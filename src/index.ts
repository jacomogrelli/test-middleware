import initBootstrap from './bootstrap';

(function init() {
  try {
    initBootstrap();
  } catch (error) {
    console.log(error);
  }
})();
