import config from './playwright.config';

// Exercise the production artifacts without starting the development watcher.
export default { ...config, testMatch: 'animation404.spec.js', webServer: undefined };
