// ─── UI ──────────────────────────────────────────────────────────────────────

export interface WeatherData {
  temperature: number;
  windSpeed: number;
  windDirection: number;
  depth: number;
  pressure: number;
  seaTemperature: number;
}

// ─── API shared ──────────────────────────────────────────────────────────────

export type WindUnit = "kmh" | "mph" | "kn" | "ms";
export type TemperatureUnit = "celsius" | "fahrenheit";
export type PrecipitationUnit = "mm" | "inch";
export type TimeFormat = "iso8601" | "unixtime";

// ─── API params ──────────────────────────────────────────────────────────────

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

// ─── API response ────────────────────────────────────────────────────────────

export type WeatherApiResponse = {
  latitude: number;
  longitude: number;
  timezone: string;
  current?: Record<string, number | string>;
  hourly?: Record<string, (number | string | null)[]>;
  hourly_units?: Record<string, string>;
  daily?: Record<string, (number | string | null)[]>;
  daily_units?: Record<string, string>;
};
