"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Users,
  UserPlus,
  LayoutGrid,
  Eye,
  Shield,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

interface Stats {
  totalUsers: number;
  newUsersThisWeek: number;
  totalShowcases: number;
  publishedShowcases: number;
  draftShowcases: number;
  totalViews: number;
  viewsThisWeek: number;
  activeUsers: number;
  deactivatedUsers: number;
  pendingReports: number;
}

interface GrowthPoint {
  date: string;
  count: number;
}

export default function MonitoringOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [growth, setGrowth] = useState<GrowthPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth;
    if (cardWidth === 0) return;
    setActiveCard(Math.round(el.scrollLeft / cardWidth));
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const [statsRes, analyticsRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/admin/analytics?days=30"),
        ]);
        if (statsRes.ok) setStats(await statsRes.json());
        if (analyticsRes.ok) {
          const data = await analyticsRes.json();
          setGrowth(data.userGrowth || []);
        }
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground text-sm">
        Failed to load stats
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-400",
    },
    {
      label: "New This Week",
      value: stats.newUsersThisWeek,
      icon: UserPlus,
      color: "text-green-400",
    },
    {
      label: "Showcases",
      value: stats.totalShowcases,
      sub: `${stats.publishedShowcases} published · ${stats.draftShowcases} draft`,
      icon: LayoutGrid,
      color: "text-orange-400",
    },
    {
      label: "Profile Views",
      value: stats.totalViews,
      sub: `${stats.viewsThisWeek} this week`,
      icon: Eye,
      color: "text-purple-400",
    },
    {
      label: "Active Users",
      value: stats.activeUsers,
      sub: `${stats.deactivatedUsers} suspended`,
      icon: Activity,
      color: "text-cyan-400",
    },
    {
      label: "Pending Reports",
      value: stats.pendingReports,
      icon: Shield,
      color:
        stats.pendingReports > 0 ? "text-red-400" : "text-muted-foreground",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards - Carousel on mobile, grid on desktop */}
      <div className="-mx-4 sm:mx-0 sm:px-0">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory px-4 sm:px-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:gap-4 lg:grid-cols-3 lg:gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="min-w-full snap-center shrink-0 px-2 sm:min-w-0 sm:px-0 sm:shrink"
              >
                <Card className="p-5 bg-card border-border rounded-2xl h-40">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {card.label}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {card.value.toLocaleString()}
                      </p>
                      {card.sub && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {card.sub}
                        </p>
                      )}
                    </div>
                    <div
                      className={`flex items-center justify-center size-9 rounded-xl bg-accent border border-border ${card.color}`}
                    >
                      <Icon className="size-4" />
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Carousel indicators - mobile only */}
        <div className="flex justify-center gap-1.5 mt-4 sm:hidden">
          {statCards.map((_, i) => (
            <div
              key={i}
              className={cn(
                "rounded-full transition-all duration-300",
                i === activeCard
                  ? "w-6 h-1.5 bg-orange-500"
                  : "w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-600"
              )}
            />
          ))}
        </div>
      </div>

     {growth.length > 0 && (
  <Card className="overflow-hidden rounded-2xl border-border/60 bg-card shadow-sm">
    <div className="flex items-center justify-between px-5 pt-5">
      <div>
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          User Growth
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          New users over the last 30 days
        </p>
      </div>

      <div className="rounded-lg border border-border/60 bg-muted/40 px-3 py-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          30 days
        </span>
      </div>
    </div>

    <div className="h-[300px] w-full px-2 pb-4 pt-6 sm:px-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={growth}
          margin={{
            top: 5,
            right: 12,
            left: -15,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="hsl(var(--chart-1))"
                stopOpacity={0.18}
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--chart-1))"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke="hsl(var(--border))"
            strokeOpacity={0.45}
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            tickFormatter={(v: string) => {
              const d = new Date(v);
              return `${d.getMonth() + 1}/${d.getDate()}`;
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={8}
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            allowDecimals={false}
          />

          <Tooltip
            cursor={{
              stroke: "hsl(var(--border))",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "12px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              padding: "10px 12px",
              fontSize: "12px",
            }}
            labelStyle={{
              color: "hsl(var(--muted-foreground))",
              marginBottom: "4px",
              fontSize: "11px",
            }}
            itemStyle={{
              color: "hsl(var(--foreground))",
              fontWeight: 600,
            }}
            labelFormatter={(v) => {
              const d = new Date(String(v));
              return d.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              });
            }}
            formatter={(value) => [`${value} users`, "New users"]}
          />

          <Area
            type="monotone"
            dataKey="count"
            stroke="none"
            fill="url(#growthGradient)"
          />

          <Line
            type="monotone"
            dataKey="count"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2.5}
            dot={false}
            activeDot={{
              r: 5,
              strokeWidth: 3,
              stroke: "hsl(var(--background))",
              fill: "hsl(var(--chart-1))",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </Card>
)}
    </div>
  );
}
