"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Profile {
  id: string;
  username: string | null;
  name: string;
  avatarUrl: string | null;
  deactivated: boolean;
  createdAt: string;
  profileViews: number;
  publishedShowcases: number;
  draftShowcases: number;
  _count: { showcases: number };
}

interface ProfilesResponse {
  profiles: Profile[];
  total: number;
  page: number;
  totalPages: number;
}

export default function ProfilesPage() {
  const [data, setData] = useState<ProfilesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "20",
        search,
      });
      const res = await fetch(`/api/admin/profiles?${params}`);
      if (res.ok) setData(await res.json());
    } catch {
      toast.error("Failed to load profiles");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-xl px-3 py-2.5 w-full sm:w-[320px]">
        <Search className="size-4 text-muted-foreground shrink-0" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search profiles..."
          className="w-full bg-transparent text-sm text-foreground/80 placeholder:text-muted-foreground/70 outline-none"
        />
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-xl" />
          ))}
        </div>
      ) : !data || data.profiles.length === 0 ? (
        <Card className="p-12 text-center bg-card border-border rounded-2xl">
          <p className="text-muted-foreground text-sm">No profiles found</p>
        </Card>
      ) : (
        <>
          <Card className="bg-card border-border rounded-2xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead>Profile</TableHead>
                  <TableHead className="hidden sm:table-cell">Showcases</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Created</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.profiles.map((profile) => (
                  <TableRow key={profile.id} className="border-border">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={profile.avatarUrl || "/profile.jpg"}
                          alt=""
                          className="size-8 rounded-full object-cover border border-border"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {profile.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            @{profile.username || "—"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-green-400">{profile.publishedShowcases}</span>
                        <span>/</span>
                        <span className="text-yellow-400">{profile.draftShowcases}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {profile.deactivated ? (
                        <Badge variant="destructive">Deactivated</Badge>
                      ) : profile._count.showcases > 0 ? (
                        <Badge variant="secondary">Active</Badge>
                      ) : (
                        <Badge variant="outline">Empty</Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-sm text-muted-foreground">
                        {formatDate(profile.createdAt)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm font-medium text-foreground">
                        {profile.profileViews.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {profile.username && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() =>
                            window.open(`/${profile.username}`, "_blank")
                          }
                        >
                          <ExternalLink className="size-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {data.totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Page {data.page} of {data.totalPages} · {data.total} profiles
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  disabled={page >= data.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
