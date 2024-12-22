import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleAxiosError = (error: any) => {
  const { response } = error;

  return {
    ok: false,
    message:
      response?.data?.message ?? "Something went wrong. Try again later.",
  };
};
