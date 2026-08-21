import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full rounded-[30]">
        <div className="w-full text-foreground">
          <div className="w-full bg-transparent p-10">
            {/* Title */}
            <div className="px-0 pb-8 space-y-2">
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-4 w-56" />
            </div>

            <div className="space-y-8">
              {/* Avatar section */}
              <section className="space-y-4">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-64" />
                </div>
                <div className="flex items-center gap-5 rounded-xl border border-border bg-muted/50 p-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-52" />
                  </div>
                </div>
              </section>

              {/* Separator */}
              <div className="h-px w-full bg-border" />

              {/* Basic information */}
              <section className="space-y-5">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-44" />
                </div>

                <div className="space-y-5">
                  {/* Name input */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-11 w-full rounded-xl" />
                  </div>

                  {/* Bio input */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-8" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <Skeleton className="h-11 w-full rounded-xl" />
                  </div>

                  {/* Story textarea */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <Skeleton className="h-[180px] w-full rounded-xl" />
                  </div>
                </div>
              </section>

              {/* Separator */}
              <div className="h-px w-full bg-border" />

              {/* Save button */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-52" />
                <Skeleton className="h-10 w-28 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
