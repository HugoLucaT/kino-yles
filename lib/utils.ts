import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeSpecialCharacters(input: string): string {
  return input.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}