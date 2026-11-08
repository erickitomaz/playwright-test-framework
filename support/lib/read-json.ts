import type { APIResponse } from "@playwright/test";

export async function readJson(response: APIResponse, action: string) {
  if (!response.ok()) {
    throw new Error(
      `${action} failed: ${response.status()} ${await response.text()}`,
    );
  }
  return response.json();
}
