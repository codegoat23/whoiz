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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

interface Report {
  id: string;
  targetType: string;
  targetId: string;
  reason: string;
  status: string;
  reporterId: string | null;
  createdAt: string;
  resolvedAt: string | null;
}

interface ReportsResponse {
  reports: Report[];
  total: number;
  page: number;
  totalPages: number;
}

export default function ReportsPage() {
  const [data, setData] = useState<ReportsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [detailReport, setDetailReport] = useState<Report | null>(null);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "20",
        status,
      });
      const res = await fetch(`/api/admin/reports?${params}`);
      if (res.ok) setData(await res.json());
    } catch {
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  }, [page, status]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  useEffect(() => {
    setPage(1);
  }, [status]);

  const resolveReport = async (
    reportId: string,
    newStatus: "Reviewed" | "Dismissed"
  ) => {
    setActionLoading(reportId);
    try {
      const res = await fetch(`/api/admin/reports/${reportId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast.success(
          newStatus === "Reviewed" ? "Report reviewed" : "Report dismissed"
        );
        setDetailReport(null);
        fetchReports();
      } else {
        toast.error("Action failed");
      }
    } catch {
      toast.error("Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const statusVariant = (s: string) => {
    switch (s) {
      case "Pending":
        return "default" as const;
      case "Reviewed":
        return "secondary" as const;
      case "Dismissed":
        return "outline" as const;
      default:
        return "outline" as const;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Select value={status} onValueChange={(v) => setStatus(v)}>
          <SelectTrigger className="w-[160px] rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reports</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Reviewed">Reviewed</SelectItem>
            <SelectItem value="Dismissed">Dismissed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-xl" />
          ))}
        </div>
      ) : !data || data.reports.length === 0 ? (
        <Card className="p-12 text-center bg-card border-border rounded-2xl">
          <p className="text-muted-foreground text-sm">No reports found</p>
        </Card>
      ) : (
        <>
          <Card className="bg-card border-border rounded-2xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead>Target</TableHead>
                  <TableHead className="hidden sm:table-cell">Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.reports.map((report) => (
                  <TableRow key={report.id} className="border-border">
                    <TableCell>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {report.targetType === "user" ? "User" : "Showcase"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {report.targetId}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <p className="text-sm text-muted-foreground truncate max-w-[300px]">
                        {report.reason}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(report.status)}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-sm text-muted-foreground">
                        {formatDate(report.createdAt)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => setDetailReport(report)}
                        >
                          <Search className="size-4" />
                        </Button>
                        {report.status === "Pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              disabled={actionLoading === report.id}
                              onClick={() =>
                                resolveReport(report.id, "Reviewed")
                              }
                            >
                              <CheckCircle className="size-4 text-green-400" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              disabled={actionLoading === report.id}
                              onClick={() =>
                                resolveReport(report.id, "Dismissed")
                              }
                            >
                              <XCircle className="size-4 text-muted-foreground" />
                            </Button>
                          </>
                        )}
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
                Page {data.page} of {data.totalPages} · {data.total} reports
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
        open={!!detailReport}
        onOpenChange={(open) => {
          if (!open) setDetailReport(null);
        }}
      >
        <DialogContent className="sm:max-w-md rounded-2xl">
          {detailReport && (
            <>
              <DialogHeader>
                <DialogTitle>Report Details</DialogTitle>
                <DialogDescription>
                  {detailReport.targetType === "user" ? "User" : "Showcase"}{" "}
                  report
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="capitalize">{detailReport.targetType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target ID</span>
                  <span className="font-mono text-xs">{detailReport.targetId}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-muted-foreground shrink-0">Reason</span>
                  <span className="text-right">{detailReport.reason}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reporter ID</span>
                  <span className="font-mono text-xs">
                    {detailReport.reporterId || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={statusVariant(detailReport.status)}>
                    {detailReport.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>{formatDate(detailReport.createdAt)}</span>
                </div>
                {detailReport.resolvedAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Resolved</span>
                    <span>{formatDate(detailReport.resolvedAt)}</span>
                  </div>
                )}
              </div>

              {detailReport.status === "Pending" && (
                <DialogFooter className="flex-row gap-2 sm:gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                    disabled={actionLoading === detailReport.id}
                    onClick={() =>
                      resolveReport(detailReport.id, "Dismissed")
                    }
                  >
                    <XCircle className="size-3.5 mr-1" />
                    Dismiss
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-xl"
                    disabled={actionLoading === detailReport.id}
                    onClick={() =>
                      resolveReport(detailReport.id, "Reviewed")
                    }
                  >
                    <CheckCircle className="size-3.5 mr-1" />
                    Mark Reviewed
                  </Button>
                </DialogFooter>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
