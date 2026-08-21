import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Page header */}
        <div className="space-y-1">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-4 w-72" />
        </div>

        <div className="space-y-6">
          {/* Account info card */}
          <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="space-y-1">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-3 w-52" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex justify-end">
                <Skeleton className="h-10 w-32 rounded-xl" />
              </div>
            </div>
          </div>

          {/* Password card */}
          <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="space-y-1">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-3 w-56" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              <Skeleton className="h-3 w-40" />
              <div className="flex justify-end">
                <Skeleton className="h-10 w-36 rounded-xl" />
              </div>
            </div>
          </div>

          {/* Danger zone card */}
          <div className="border border-red-500/20 bg-red-500/5 backdrop-blur-xl rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div className="space-y-1">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-3 w-64" />
                </div>
              </div>
              <Skeleton className="h-10 w-36 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
