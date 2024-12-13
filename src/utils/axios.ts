"use server";
import { z } from "zod";
import axios from "axios";

const envSchema = z.object({
  MICROSERVICE_PRODUCTION_URL: z.string().url(),
  MICROSERVICE_DEVELOPMENT_URL: z.string().url(),
  MICROSERVICE_TOKEN: z.string(),
});

const env = envSchema.parse(process.env);

const apiClient = axios.create({
  // baseURL: env.MICROSERVICE_PRODUCTION_URL,
  baseURL: env.MICROSERVICE_DEVELOPMENT_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  if (env.MICROSERVICE_TOKEN) {
    config.headers.Authorization = `Bearer ${env.MICROSERVICE_TOKEN}`;
  }
  return config;
});

export default apiClient;
