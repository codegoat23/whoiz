"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Home,
  Link2,
  GalleryThumbnails,
  Smile,
  Paintbrush,
  Settings,
  Search,
  ExternalLink,
  FileText,
  Loader2,
} from "lucide-react";

interface ApiResult {
  id: string;
  type: "showcase" | "link";
  title: string;
  description: string;
  href: string;
}

const NAVIGATION_ITEMS = [
  { title: "Profile", href: "/admin", icon: Home, description: "Edit your profile" },
  { title: "Links", href: "/admin/links", icon: Link2, description: "Manage your links" },
  { title: "Showcase", href: "/admin/showcase", icon: GalleryThumbnails, description: "Manage showcases" },
  { title: "Connect", href: "/admin/connect", icon: Smile, description: "Social connections" },
  { title: "Design", href: "/admin/themes", icon: Paintbrush, description: "Customize appearance" },
  { title: "Settings", href: "/admin/settings", icon: Settings, description: "Account settings" },
];

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [apiResults, setApiResults] = useState<ApiResult[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const fetchResults = useCallback((searchQuery: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!searchQuery.trim()) {
      setApiResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setApiResults(data.results || []);
        }
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    fetchResults(value);
  };

  const handleSelect = (href: string) => {
    setOpen(false);
    setQuery("");
    setApiResults([]);
    router.push(href);
  };

  const filteredNav = query.trim()
    ? NAVIGATION_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
    : NAVIGATION_ITEMS;

  const hasApiResults = apiResults.length > 0;
  const hasNavResults = filteredNav.length > 0;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-9 items-center gap-2 rounded-lg border border-border bg-accent px-3 text-sm text-muted-foreground transition-colors hover:bg-accent/80 hover:text-foreground"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="pointer-events-none ml-2 hidden select-none items-center gap-0.5 rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search pages, showcases, links..."
          value={query}
          onValueChange={handleQueryChange}
        />
        <CommandList>
          <CommandEmpty>
            {loading ? (
              <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching...
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 py-6">
                <Search className="h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">No results found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-muted-foreground/60">Try a different search term</p>
              </div>
            )}
          </CommandEmpty>

          {hasNavResults && (
            <CommandGroup heading="Navigation">
              {filteredNav.map((item) => {
                const Icon = item.icon;
                return (
                  <CommandItem
                    key={item.href}
                    value={`nav-${item.title}`}
                    onSelect={() => handleSelect(item.href)}
                    className="cursor-pointer"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <div className="flex flex-col">
                      <span>{item.title}</span>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          {(hasNavResults || hasApiResults) && <CommandSeparator />}

          {hasApiResults && (
            <CommandGroup heading="Content">
              {apiResults.map((result) => {
                const Icon = result.type === "showcase" ? FileText : ExternalLink;
                return (
                  <CommandItem
                    key={result.id}
                    value={`${result.type}-${result.id}-${result.title}`}
                    onSelect={() => handleSelect(result.href)}
                    className="cursor-pointer"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate">{result.title}</span>
                        <span className="shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground capitalize">
                          {result.type}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground truncate">{result.description}</span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          {!loading && query.trim() && !hasNavResults && !hasApiResults && (
            <div />
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
