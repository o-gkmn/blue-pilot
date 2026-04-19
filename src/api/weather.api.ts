import type {
  ForecastParams,
  MarineParams,
  WeatherApiResponse,
} from "@/types/weather";

const WEATHER_API_BASE_URL = "https://api.open-meteo.com/v1";
const MARINE_API_BASE_URL = "https://marine-api.open-meteo.com/v1";

function buildUrl(
  url: string,
  path: string,
  params: Record<string, unknown>,
): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      query.set(key, value.join(","));
    } else {
      query.set(key, String(value));
    }
  }
  return `${url}${path}?${query.toString()}`;
}

async function get<T>(
  url: string,
  path: string,
  params: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(buildUrl(url, path, params));
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    throw new Error(error.message ?? "Weather API request failed");
  }
  return response.json() as Promise<T>;
}

export const weatherApi = {
  forecast: (params: ForecastParams) =>
    get<WeatherApiResponse>(
      WEATHER_API_BASE_URL,
      "/forecast",
      params as Record<string, unknown>,
    ),

  marine: (params: MarineParams) =>
    get<WeatherApiResponse>(
      MARINE_API_BASE_URL,
      "/marine",
      params as Record<string, unknown>,
    ),
};
