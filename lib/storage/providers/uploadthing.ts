import { UTApi } from "uploadthing/server";

import type { StorageProvider } from "../types";

function assertEnv(): void {
  if (!process.env.UPLOADTHING_TOKEN) {
    throw new Error(
      "[storage] Missing UPLOADTHING_TOKEN. Set it in your environment to use the uploadthing provider."
    );
  }
}

function extractKey(fileIdOrUrl: string): string {
  const value = fileIdOrUrl.trim();

  if (!value.includes("utfs.io") && !value.includes(".ufs.sh")) {
    return value;
  }

  try {
    const url = new URL(value);
    const marker = "/f/";
    const markerIdx = url.pathname.indexOf(marker);
    if (markerIdx === -1) return value;
    return decodeURIComponent(url.pathname.slice(markerIdx + marker.length));
  } catch {
    return value;
  }
}

export const uploadthingProvider: StorageProvider = {
  name: "uploadthing",

  async upload(file) {
    assertEnv();

    const utapi = new UTApi();

    const result = await utapi.uploadFiles(file);

    if (!result.data) {
      throw new Error(
        `[storage] UploadThing upload failed: ${
          result.error?.message ?? "unknown error"
        }`
      );
    }

    return {
      url: result.data.ufsUrl ?? result.data.url,
      fileId: result.data.key,
    };
  },

  async delete(fileIdOrUrl) {
    assertEnv();

    const utapi = new UTApi();
    await utapi.deleteFiles(extractKey(fileIdOrUrl));
  },

  async getUrl(fileId) {
    assertEnv();

    const utapi = new UTApi();
    const result = await utapi.getFileUrls(fileId);
    return result.data[0]?.url ?? fileId;
  },
};
