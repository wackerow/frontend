type Env = "dev" | "prod" | "stag";

export const getEnv = (): Env => {
  const rawEnv = process.env.NEXT_PUBLIC_ENV;

  switch (rawEnv) {
    case "prod":
      return "prod";
    case "dev":
      return "dev";
    case "staging":
      return "stag";
    case "stag":
      return "stag";
    default:
      console.warn("no ENV in env, defaulting to dev");
      return "dev";
  }
};

export const getApiEnv = (): Env => {
  const apiEnv = process.env.NEXT_PUBLIC_API_ENV;

  // If API_ENV is undefined, we decide based on ENV
  if (apiEnv === undefined) {
    // Use production by default, unless we're running on staging, then use staging.
    return getEnv() === "stag" ? "stag" : "prod";
  }

  switch (apiEnv) {
    case "dev":
      return "dev";
    case "prod":
    case "production":
      return "prod";
    case "stag":
    case "staging":
      return "stag";
    default:
      return "prod";
  }
};

export const getDomain = (): string => {
  const apiEnv = getApiEnv();
  return apiEnv === "dev"
    ? "http://localhost"
    : apiEnv === "stag"
    ? "https://usm-i7x0.ultrasound.money"
    : apiEnv === "prod"
    ? "https://ultrasound.money"
    : (undefined as never);
};
