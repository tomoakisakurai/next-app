const ignoredErrors = [/act\(\.\.\.\) is not supported in production builds of React/];

const consoleError = global.console.error;
global.console.error = (...args) => {
  if (ignoredErrors.some((el) => el.test(args[0]))) {
    return console.log(...args);
  }
  return consoleError(...args);
};
