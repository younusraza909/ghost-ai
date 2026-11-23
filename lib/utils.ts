import { cn, type ClassValue } from "cn";

export { cn, type ClassValue };

/**
 * Converts a string into a URL-friendly slug.
 * Trims whitespace, converts to lowercase, replaces non-alphanumeric chars
 * with hyphens, collapses consecutive hyphens, and removes leading/trailing hyphens.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
