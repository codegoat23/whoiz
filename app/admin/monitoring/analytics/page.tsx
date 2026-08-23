"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Users, Eye, LayoutGrid, Activity } from "lucide-react";

interface GrowthPoint {
  date: string;
  count: number;
}

interface AnalyticsData {
  userGrowth: GrowthPoint[];
  viewActivity: GrowthPoint[];
  showcaseGrowth: GrowthPoint[];
  totals: {
    totalUsers: number;
    totalViews: number;
    totalShowcases: number;
    totalSessions: number;
  };
}

export default function AnalyticsPage() {
  const [days, setDays] = useState("30");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/analytics?days=${days}`);
        if (res.ok) setData(await res.json());
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [days]);

  const mergedData = data
    ? data.userGrowth.map((point, i) => ({
        date: point.date,
        users: point.count,
        views: data.viewActivity[i]?.count || 0,
        showcases: data.showcaseGrowth[i]?.count || 0,
      }))
    : [];

  const tooltipStyle = {
    backgroundColor: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "12px",
    fontSize: "12px",
  };

  const formatXDate = (v: React.ReactNode) => {
    const d = new Date(String(v));
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-[160px] rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground text-sm">
        Failed to load analytics
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Select value={days} onValueChange={(v) => setDays(v)}>
          <SelectTrigger className="w-[140px] rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="60">Last 60 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Users", value: data.totals.totalUsers, icon: Users },
          { label: "Total Views", value: data.totals.totalViews, icon: Eye },
          {
            label: "Showcases",
            value: data.totals.totalShowcases,
            icon: LayoutGrid,
          },
          {
            label: "Sessions",
            value: data.totals.totalSessions,
            icon: Activity,
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.label} className="p-4 bg-card border-border rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-lg bg-accent border border-border">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{card.label}</p>
                  <p className="text-lg font-bold text-foreground">
                    {card.value.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5 bg-card border-border rounded-2xl">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            User Signups
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mergedData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickFormatter={formatXDate}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  allowDecimals={false}
                />
                <Tooltip contentStyle={tooltipStyle} labelFormatter={formatXDate as (label: React.ReactNode) => string} />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={false}
                  name="Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 bg-card border-border rounded-2xl">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Profile Views
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mergedData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickFormatter={formatXDate}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  allowDecimals={false}
                />
                <Tooltip contentStyle={tooltipStyle} labelFormatter={formatXDate as (label: React.ReactNode) => string} />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={false}
                  name="Views"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 bg-card border-border rounded-2xl">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Showcase Creation
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mergedData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickFormatter={formatXDate}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  allowDecimals={false}
                />
                <Tooltip contentStyle={tooltipStyle} labelFormatter={formatXDate as (label: React.ReactNode) => string} />
                <Line
                  type="monotone"
                  dataKey="showcases"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={false}
                  name="Showcases"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 bg-card border-border rounded-2xl">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Combined Overview
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mergedData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickFormatter={formatXDate}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  allowDecimals={false}
                />
                <Tooltip contentStyle={tooltipStyle} labelFormatter={formatXDate as (label: React.ReactNode) => string} />
                <Legend
                  wrapperStyle={{ fontSize: "11px" }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={false}
                  name="Users"
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={false}
                  name="Views"
                />
                <Line
                  type="monotone"
                  dataKey="showcases"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={false}
                  name="Showcases"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
