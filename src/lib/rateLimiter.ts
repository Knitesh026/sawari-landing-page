type RateLimitStore = {
  [key: string]: {
    attempts: number;
    resetTime: number;
  };
};

const store: RateLimitStore = {};

export const checkRateLimit = (
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 60000 // 1 minute
): boolean => {
  const now = Date.now();
  const record = store[identifier];

  // Clear expired records
  if (record && now > record.resetTime) {
    delete store[identifier];
  }

  // Initialize or update record
  if (!store[identifier]) {
    store[identifier] = {
      attempts: 1,
      resetTime: now + windowMs,
    };
    return true;
  }

  // Increment attempts
  store[identifier].attempts += 1;

  // Check if limit exceeded
  return store[identifier].attempts <= maxAttempts;
};