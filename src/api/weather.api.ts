const BASE_URL = "https://api.open-meteo.com/v1";

// ─── Shared ───────────────────────────────────────────────────────────────────

type WindUnit = "kmh" | "mph" | "kn" | "ms";
type TemperatureUnit = "celsius" | "fahrenheit";
type PrecipitationUnit = "mm" | "inch";
type TimeFormat = "iso8601" | "unixtime";

// ─── Forecast ─────────────────────────────────────────────────────────────────

export type ForecastParams = {
  latitude: number;
  longitude: number;
  hourly?: string[];
  daily?: string[];
  current?: string[];
  temperature_unit?: TemperatureUnit;
  wind_speed_unit?: WindUnit;
  precipitation_unit?: PrecipitationUnit;
  timeformat?: TimeFormat;
  timezone?: string;
  forecast_days?: number;
};

export type ForecastResponse = {
  latitude: number;
  longitude: number;
  timezone: string;
  current?: Record<string, number | string>;
  hourly?: Record<string, (number | string | null)[]>;
  hourly_units?: Record<string, string>;
  daily?: Record<string, (number | string | null)[]>;
  daily_units?: Record<string, string>;
};

// ─── Marine ───────────────────────────────────────────────────────────────────

export type MarineParams = {
  latitude: number;
  longitude: number;
  hourly?: string[];
  daily?: string[];
  current?: string[];
  wind_speed_unit?: WindUnit;
  timeformat?: TimeFormat;
  timezone?: string;
  forecast_days?: number;
};

export type MarineResponse = {
  latitude: number;
  longitude: number;
  timezone: string;
  current?: Record<string, number | string>;
  hourly?: Record<string, (number | string | null)[]>;
  hourly_units?: Record<string, string>;
  daily?: Record<string, (number | string | null)[]>;
  daily_units?: Record<string, string>;
};

// ─── Client ───────────────────────────────────────────────────────────────────

function buildUrl(path: string, params: Record<string, unknown>): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      query.set(key, value.join(","));
    } else {
      query.set(key, String(value));
    }
  }
  return `${BASE_URL}${path}?${query.toString()}`;
}

async function get<T>(path: string, params: Record<string, unknown>): Promise<T> {
  const response = await fetch(buildUrl(path, params));
  if (!response.ok) {
    const error = await response.json().catch(() => ({ reason: response.statusText }));
    throw new Error(error.reason ?? "Weather API request failed");
  }
  return response.json() as Promise<T>;
}

export const weatherApi = {
  forecast: (params: ForecastParams) =>
    get<ForecastResponse>("/forecast", params as Record<string, unknown>),

  marine: (params: MarineParams) =>
    get<MarineResponse>("/marine", params as Record<string, unknown>),
};
