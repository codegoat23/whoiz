import { createUploadthing } from "uploadthing/next";

import { prisma } from "@/lib/prisma";
import { getApiSessionUser } from "@/lib/session";

const f = createUploadthing();

export const ourFileRouter = {
  profileImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const user = await getApiSessionUser();

      if (!user) {
        throw new Error("Unauthorized");
      }

      return {
        userId: user.id,
      };
    })

    .onUploadComplete(async ({ file, metadata }) => {
      await prisma.user.update({
        where: {
          id: metadata.userId,
        },
        data: {
          avatarUrl: file.url,
        },
      });

      return {
        url: file.url,
      };
    }),

  customTheme: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const user = await getApiSessionUser();

      if (!user) {
        throw new Error("Unauthorized");
      }

      return {
        userId: user.id,
      };
    })

    .onUploadComplete(async ({ file, metadata }) => {
      await prisma.user.update({
        where: {
          id: metadata.userId,
        },
        data: {
          cardTheme: "custom",
          customBgImageUrl: file.url,
        },
      });

      return {
        url: file.url,
      };
    }),
} satisfies import("uploadthing/next").FileRouter;

export type OurFileRouter = typeof ourFileRouter;
