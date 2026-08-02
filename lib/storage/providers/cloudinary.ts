import { v2 as cloudinary } from "cloudinary";

import type {
  StorageProvider,
  StorageTransformation,
} from "../types";

function assertEnv(): void {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    throw new Error(
      "[storage] Missing Cloudinary credentials. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET."
    );
  }
}

function toCloudinaryTransformation(
  transformation?: StorageTransformation
): object[] | undefined {
  if (!transformation) return undefined;
  return [transformation];
}

function extractPublicId(fileIdOrUrl: string): string {
  const value = fileIdOrUrl.trim();

  if (!value.includes("res.cloudinary.com")) {
    return value;
  }

  try {
    const url = new URL(value);
    const parts = url.pathname.split("/").filter(Boolean);

    const uploadIdx = parts.indexOf("upload");
    if (uploadIdx === -1) return value;

    const rest = parts.slice(uploadIdx + 1);
    if (/^v\d+$/.test(rest[0] ?? "")) {
      rest.shift();
    }

    const publicId = rest.join("/").replace(
      /\.(jpg|jpeg|png|gif|webp|svg|avif|bmp|ico|tiff|heic|heif|mp4|pdf)$/i,
      ""
    );

    return decodeURIComponent(publicId);
  } catch {
    return value;
  }
}

export const cloudinaryProvider: StorageProvider = {
  name: "cloudinary",

  async upload(file, options = {}) {
    assertEnv();

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: options.folder ?? "uploads",
            resource_type: "image",
            ...(toCloudinaryTransformation(options.transformation)
              ? {
                  transformation: toCloudinaryTransformation(
                    options.transformation
                  ),
                }
              : {}),
          },
          (error, uploadResult) => {
            if (error) reject(error);
            resolve(uploadResult);
          }
        )
        .end(buffer);
    });

    return {
      url: result.secure_url,
      fileId: result.public_id,
    };
  },

  async delete(fileIdOrUrl) {
    assertEnv();
    await cloudinary.uploader.destroy(extractPublicId(fileIdOrUrl));
  },

  async getUrl(fileId) {
    assertEnv();
    return cloudinary.url(fileId, { secure: true });
  },
};
