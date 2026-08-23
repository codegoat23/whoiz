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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Ban,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  username: string | null;
  email: string;
  name: string;
  avatarUrl: string | null;
  deactivated: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  profileViews: number;
  lastActive: string | null;
  _count: { showcases: number; sessions: number };
}

interface UserDetail extends User {
  bio: string | null;
  cardTheme: string;
  lastActive: string | null;
  _count: { showcases: number; links: number; socialConnects: number; sessions: number };
}

interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
}

export default function UsersPage() {
  const [data, setData] = useState<UsersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [detailUser, setDetailUser] = useState<UserDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<User | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "20",
        search,
        status,
      });
      const res = await fetch(`/api/admin/users?${params}`);
      if (res.ok) setData(await res.json());
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const openDetail = async (userId: string) => {
    setDetailLoading(true);
    setDetailUser(null);
    try {
      const res = await fetch(`/api/admin/users/${userId}`);
      if (res.ok) setDetailUser(await res.json());
    } catch {
      toast.error("Failed to load user details");
    } finally {
      setDetailLoading(false);
    }
  };

  const toggleSuspend = async (userId: string, currentlyDeactivated: boolean) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deactivated: !currentlyDeactivated }),
      });
      if (res.ok) {
        toast.success(currentlyDeactivated ? "User unsuspended" : "User suspended");
        setDetailUser(null);
        fetchUsers();
      } else {
        toast.error("Action failed");
      }
    } catch {
      toast.error("Action failed");
    } finally {
      setActionLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("User deleted");
        setDeleteConfirm(null);
        setDetailUser(null);
        fetchUsers();
      } else {
        toast.error("Delete failed");
      }
    } catch {
      toast.error("Delete failed");
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const formatRelative = (d: string | null) => {
    if (!d) return "Never";
    const diff = Date.now() - new Date(d).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-xl px-3 py-2.5 w-full sm:w-[320px]">
          <Search className="size-4 text-muted-foreground shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, username..."
            className="w-full bg-transparent text-sm text-foreground/80 placeholder:text-muted-foreground/70 outline-none"
          />
        </div>
        <Select
          value={status}
          onValueChange={(v) => setStatus(v)}
        >
          <SelectTrigger className="w-[160px] rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-xl" />
          ))}
        </div>
      ) : !data || data.users.length === 0 ? (
        <Card className="p-12 text-center bg-card border-border rounded-2xl">
          <p className="text-muted-foreground text-sm">No users found</p>
        </Card>
      ) : (
        <>
          <Card className="bg-card border-border rounded-2xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead>User</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Signed Up</TableHead>
                  <TableHead className="hidden md:table-cell">Last Active</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.users.map((user) => (
                  <TableRow key={user.id} className="border-border">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatarUrl || "/profile.jpg"}
                          alt=""
                          className="size-8 rounded-full object-cover border border-border"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            @{user.username || "—"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className="text-sm text-muted-foreground">
                        {user.email}
                      </span>
                    </TableCell>
                    <TableCell>
                      {user.deactivated ? (
                        <Badge variant="destructive">Suspended</Badge>
                      ) : user.emailVerified ? (
                        <Badge variant="secondary">Active</Badge>
                      ) : (
                        <Badge variant="outline">Unverified</Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-sm text-muted-foreground">
                        {formatDate(user.createdAt)}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-sm text-muted-foreground">
                        {formatRelative(user.lastActive)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm font-medium text-foreground">
                        {user.profileViews.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => openDetail(user.id)}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => setDeleteConfirm(user)}
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {data.totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Page {data.page} of {data.totalPages} · {data.total} users
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

      {/* Detail Dialog */}
      <Dialog
        open={!!detailUser || detailLoading}
        onOpenChange={(open) => {
          if (!open) setDetailUser(null);
        }}
      >
        <DialogContent className="sm:max-w-lg rounded-2xl">
          {detailLoading && !detailUser ? (
            <div className="space-y-4 py-4">
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-40 rounded-xl" />
            </div>
          ) : detailUser ? (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <img
                    src={detailUser.avatarUrl || "/profile.jpg"}
                    alt=""
                    className="size-12 rounded-full object-cover border border-border"
                  />
                  <div>
                    <DialogTitle>{detailUser.name}</DialogTitle>
                    <DialogDescription>
                      @{detailUser.username || "no username"} · {detailUser.email}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-accent p-3">
                  <p className="text-xs text-muted-foreground">Showcases</p>
                  <p className="text-lg font-semibold">{detailUser._count.showcases}</p>
                </div>
                <div className="rounded-xl bg-accent p-3">
                  <p className="text-xs text-muted-foreground">Links</p>
                  <p className="text-lg font-semibold">{detailUser._count.links}</p>
                </div>
                <div className="rounded-xl bg-accent p-3">
                  <p className="text-xs text-muted-foreground">Profile Views</p>
                  <p className="text-lg font-semibold">{detailUser.profileViews.toLocaleString()}</p>
                </div>
                <div className="rounded-xl bg-accent p-3">
                  <p className="text-xs text-muted-foreground">Social Connects</p>
                  <p className="text-lg font-semibold">{detailUser._count.socialConnects}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Joined</span>
                  <span>{formatDate(detailUser.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Active</span>
                  <span>{formatRelative(detailUser.lastActive)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span>
                    {detailUser.deactivated ? (
                      <Badge variant="destructive">Suspended</Badge>
                    ) : (
                      <Badge variant="secondary">Active</Badge>
                    )}
                  </span>
                </div>
                {detailUser.bio && (
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-muted-foreground shrink-0">Bio</span>
                    <span className="text-right">{detailUser.bio}</span>
                  </div>
                )}
              </div>

              <DialogFooter className="flex-row gap-2 sm:gap-2">
                {detailUser.username && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                    onClick={() =>
                      window.open(`/${detailUser.username}`, "_blank")
                    }
                  >
                    <ExternalLink className="size-3.5 mr-1" />
                    View Profile
                  </Button>
                )}
                <Button
                  variant={detailUser.deactivated ? "default" : "outline"}
                  size="sm"
                  className="rounded-xl"
                  disabled={actionLoading}
                  onClick={() =>
                    toggleSuspend(detailUser.id, detailUser.deactivated)
                  }
                >
                  <Ban className="size-3.5 mr-1" />
                  {detailUser.deactivated ? "Unsuspend" : "Suspend"}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="rounded-xl"
                  onClick={() => setDeleteConfirm(detailUser)}
                >
                  <Trash2 className="size-3.5 mr-1" />
                  Delete
                </Button>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={(open) => {
          if (!open) setDeleteConfirm(null);
        }}
      >
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete{" "}
              <strong>{deleteConfirm?.name}</strong> (@
              {deleteConfirm?.username || "unknown"})? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-2 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              onClick={() => setDeleteConfirm(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="rounded-xl"
              disabled={actionLoading}
              onClick={() => deleteConfirm && deleteUser(deleteConfirm.id)}
            >
              {actionLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
