export type StorageProviderName = "cloudinary" | "uploadthing";

export interface StorageTransformation {
  width?: number;
  height?: number;
  crop?: "fill" | "crop" | "scale";
  gravity?: "face" | "auto" | "center";
}

export interface StorageUploadOptions {
  folder?: string;
  transformation?: StorageTransformation;
}

export interface StorageUploadResult {
  url: string;
  fileId: string;
}

export interface StorageProvider {
  readonly name: StorageProviderName;
  upload(
    file: File,
    options?: StorageUploadOptions
  ): Promise<StorageUploadResult>;
  delete(fileIdOrUrl: string): Promise<void>;
  getUrl(fileId: string): Promise<string>;
}
