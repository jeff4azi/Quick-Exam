export const withTimeout = (promise, ms, timeoutMessage = "Request timed out") => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(timeoutMessage)), ms)
    ),
  ]);
};

