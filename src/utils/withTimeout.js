/**
 * Races a promise against a timeout.
 * If the tab was idle and the network stalled, Supabase requests can hang
 * indefinitely. This wrapper ensures they always resolve or reject within `ms`.
 *
 * @param {Promise}  promise        - The promise to race.
 * @param {number}   ms             - Timeout in milliseconds.
 * @param {string}   timeoutMessage - Human-readable message on timeout.
 */
export const withTimeout = (promise, ms, timeoutMessage = "Request timed out") => {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(
      () => reject(new Error(timeoutMessage)),
      ms
    );
  });

  return Promise.race([
    Promise.resolve(promise).finally(() => clearTimeout(timeoutId)),
    timeout,
  ]);
};

