import { cloudinaryProvider } from "./providers/cloudinary";
import { uploadthingProvider } from "./providers/uploadthing";
import type {
  StorageProvider,
  StorageProviderName,
} from "./types";

export const STORAGE_PROVIDERS: Record<
  StorageProviderName,
  StorageProvider
> = {
  cloudinary: cloudinaryProvider,
  uploadthing: uploadthingProvider,
};

const DEFAULT_PROVIDER: StorageProviderName = "cloudinary";

export function resolveStorageProvider(): StorageProvider {
  const configured = (
    process.env.STORAGE_PROVIDER ?? DEFAULT_PROVIDER
  ).toLowerCase() as StorageProviderName;

  const provider = STORAGE_PROVIDERS[configured];

  if (!provider) {
    throw new Error(
      `[storage] Unknown STORAGE_PROVIDER "${configured}". ` +
        `Valid values: ${Object.keys(STORAGE_PROVIDERS).join(", ")}`
    );
  }

  return provider;
}

export const storage = resolveStorageProvider();
