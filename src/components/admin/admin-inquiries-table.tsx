"use client";

import { useMemo, useState, useTransition } from "react";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Mail,
  X,
} from "lucide-react";
import { toast } from "sonner";
import type { ContactMessage } from "@/db/schema";
import { cn } from "@/lib/utils";
import { bulkUpdateInquiryStatus } from "@/lib/actions/inquiries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InquiryStatusSelect } from "./inquiry-status-select";
import { AdminInquiryDetailDialog } from "./admin-inquiry-detail-dialog";
import { STATUS_LABELS, STATUS_ORDER, type InquiryStatus } from "./inquiry-status";

type SortColumn = "createdAt" | "eventDate" | "guestCount" | "name" | "eventType";
type SortDirection = "asc" | "desc";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;
const DEFAULT_PAGE_SIZE = 25;
const URGENT_WINDOW_DAYS = 14;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

function isUrgent(inquiry: ContactMessage) {
  if (inquiry.status !== "new" && inquiry.status !== "contacted") return false;
  const daysUntil = (new Date(`${inquiry.eventDate}T00:00:00`).getTime() - Date.now()) / MS_PER_DAY;
  return daysUntil >= 0 && daysUntil <= URGENT_WINDOW_DAYS;
}

function SortButton({
  label,
  column,
  activeColumn,
  direction,
  onSort,
}: {
  label: string;
  column: SortColumn;
  activeColumn: SortColumn;
  direction: SortDirection;
  onSort: (column: SortColumn) => void;
}) {
  const isActive = column === activeColumn;
  const Icon = isActive ? (direction === "asc" ? ArrowUp : ArrowDown) : ArrowUpDown;
  return (
    <button
      type="button"
      onClick={() => onSort(column)}
      className={cn(
        "inline-flex items-center gap-1 font-semibold underline-offset-4 transition-colors",
        isActive ? "text-cream underline" : "text-cream/70 hover:text-cream"
      )}
    >
      {label}
      <Icon className={cn("size-3.5", isActive && "text-cream")} />
    </button>
  );
}

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <Badge variant="outline" className="gap-1 border-border pr-1 text-ink">
      {label}
      <button
        type="button"
        onClick={onClear}
        aria-label={`Clear ${label} filter`}
        className="rounded-full p-0.5 hover:bg-ink/10"
      >
        <X className="size-3" />
      </button>
    </Badge>
  );
}

export function AdminInquiriesTable({ inquiries }: { inquiries: ContactMessage[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | "all">("all");
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [showArchived, setShowArchived] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortColumn, setSortColumn] = useState<SortColumn>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [isBulkPending, startBulkTransition] = useTransition();

  const eventTypes = useMemo(
    () => Array.from(new Set(inquiries.map((i) => i.eventType).filter((v): v is string => !!v))),
    [inquiries]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return inquiries
      .filter((i) => showArchived || i.status !== "archived")
      .filter((i) => statusFilter === "all" || i.status === statusFilter)
      .filter((i) => eventTypeFilter === "all" || i.eventType === eventTypeFilter)
      .filter((i) => !dateFrom || i.eventDate >= dateFrom)
      .filter((i) => !dateTo || i.eventDate <= dateTo)
      .filter((i) => {
        if (!query) return true;
        return (
          `${i.firstName} ${i.lastName}`.toLowerCase().includes(query) ||
          i.email.toLowerCase().includes(query) ||
          (i.eventType ?? "").toLowerCase().includes(query)
        );
      });
  }, [inquiries, showArchived, statusFilter, eventTypeFilter, dateFrom, dateTo, search]);

  const sorted = useMemo(() => {
    const factor = sortDirection === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      if (sortColumn === "guestCount") return (a.guestCount - b.guestCount) * factor;
      if (sortColumn === "eventDate") return a.eventDate.localeCompare(b.eventDate) * factor;
      if (sortColumn === "name") {
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`) * factor;
      }
      if (sortColumn === "eventType") {
        if (!a.eventType && !b.eventType) return 0;
        if (!a.eventType) return 1;
        if (!b.eventType) return -1;
        return a.eventType.localeCompare(b.eventType) * factor;
      }
      return (a.createdAt.getTime() - b.createdAt.getTime()) * factor;
    });
  }, [filtered, sortColumn, sortDirection]);

  const [prevFiltered, setPrevFiltered] = useState(filtered);
  if (filtered !== prevFiltered) {
    setPrevFiltered(filtered);
    setPage(1);
    setSelectedIds(new Set());
  }

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const rangeStart = sorted.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, sorted.length);

  const handleSort = (column: SortColumn) => {
    if (column === sortColumn) {
      setSortDirection((direction) => (direction === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const allOnPageSelected = paged.length > 0 && paged.every((i) => selectedIds.has(i.id));

  const toggleSelectAllOnPage = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allOnPageSelected) {
        paged.forEach((i) => next.delete(i.id));
      } else {
        paged.forEach((i) => next.add(i.id));
      }
      return next;
    });
  };

  const toggleSelectRow = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBulkStatusChange = (status: InquiryStatus) => {
    const ids = Array.from(selectedIds);
    startBulkTransition(async () => {
      const result = await bulkUpdateInquiryStatus(ids, status);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Updated ${ids.length} inquir${ids.length === 1 ? "y" : "ies"}.`);
        setSelectedIds(new Set());
      }
    });
  };

  const activeFilters = useMemo(() => {
    const filters: { key: string; label: string; onClear: () => void }[] = [];
    if (search.trim()) {
      filters.push({ key: "search", label: `Search: "${search.trim()}"`, onClear: () => setSearch("") });
    }
    if (statusFilter !== "all") {
      filters.push({
        key: "status",
        label: `Status: ${STATUS_LABELS[statusFilter]}`,
        onClear: () => setStatusFilter("all"),
      });
    }
    if (eventTypeFilter !== "all") {
      filters.push({
        key: "eventType",
        label: `Type: ${eventTypeFilter}`,
        onClear: () => setEventTypeFilter("all"),
      });
    }
    if (dateFrom || dateTo) {
      filters.push({
        key: "date",
        label: `Date: ${dateFrom || "…"} → ${dateTo || "…"}`,
        onClear: () => {
          setDateFrom("");
          setDateTo("");
        },
      });
    }
    if (showArchived) {
      filters.push({ key: "archived", label: "Archived shown", onClear: () => setShowArchived(false) });
    }
    return filters;
  }, [search, statusFilter, eventTypeFilter, dateFrom, dateTo, showArchived]);

  const clearAllFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setEventTypeFilter("all");
    setDateFrom("");
    setDateTo("");
    setShowArchived(false);
  };

  const selectedInquiry = inquiries.find((i) => i.id === selectedId) ?? null;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-48 flex-1">
          <Input
            placeholder="Search name, email, event type…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-9 rounded-lg border border-input bg-transparent px-3 text-sm dark:bg-input/30"
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as InquiryStatus | "all")}
        >
          <SelectTrigger className="w-36 data-[size=default]:h-9">
            <SelectValue>
              {(value: InquiryStatus | "all") =>
                value === "all" ? "All statuses" : STATUS_LABELS[value]
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUS_ORDER.map((value) => (
              <SelectItem key={value} value={value}>
                {STATUS_LABELS[value]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={eventTypeFilter}
          onValueChange={(value) => setEventTypeFilter(value ?? "all")}
        >
          <SelectTrigger className="w-40 data-[size=default]:h-9">
            <SelectValue>
              {(value: string) => (value === "all" ? "All event types" : value)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All event types</SelectItem>
            {eventTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1.5">
          <Input
            type="date"
            aria-label="Event date from"
            value={dateFrom}
            onChange={(event) => setDateFrom(event.target.value)}
            className="h-9 w-36 rounded-lg border border-input bg-transparent px-3 text-sm dark:bg-input/30"
          />
          <span className="text-sm text-muted-foreground">to</span>
          <Input
            type="date"
            aria-label="Event date to"
            value={dateTo}
            onChange={(event) => setDateTo(event.target.value)}
            className="h-9 w-36 rounded-lg border border-input bg-transparent px-3 text-sm dark:bg-input/30"
          />
        </div>

        <Button
          type="button"
          variant={showArchived ? "secondary" : "outline"}
          onClick={() => setShowArchived((value) => !value)}
          className="h-9 rounded-lg"
        >
          {showArchived ? "Hide archived" : "Show archived"}
        </Button>
      </div>

      {activeFilters.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {activeFilters.map((filter) => (
            <FilterChip key={filter.key} label={filter.label} onClear={filter.onClear} />
          ))}
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs font-medium text-ink/50 underline-offset-2 hover:text-ink hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      {selectedIds.size > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg bg-green/10 px-3 py-2 text-sm">
          <span className="font-medium text-ink">{selectedIds.size} selected</span>
          <Select onValueChange={(value) => handleBulkStatusChange(value as InquiryStatus)}>
            <SelectTrigger size="sm" className="h-8 w-40 text-xs" disabled={isBulkPending}>
              <SelectValue>{() => "Set status…"}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {STATUS_ORDER.map((value) => (
                <SelectItem key={value} value={value}>
                  {STATUS_LABELS[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedIds(new Set())}>
            Clear
          </Button>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-ink/60">
        <span>
          {sorted.length === 0
            ? "No inquiries match these filters."
            : `Showing ${rangeStart}–${rangeEnd} of ${sorted.length} inquiries`}
        </span>
        <div className="flex items-center gap-2">
          <span>Rows per page</span>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => {
              setPageSize(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger size="sm" className="h-8 w-20 text-xs">
              <SelectValue>{(value: string) => value}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto rounded-lg ring-1 ring-border">
        <Table>
          <TableHeader className="bg-green [&_tr]:border-0">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10">
                <Checkbox
                  checked={allOnPageSelected}
                  onCheckedChange={toggleSelectAllOnPage}
                  aria-label="Select all inquiries on this page"
                  className="border-cream bg-green data-[checked]:border-cream data-[checked]:bg-cream data-[checked]:text-green"
                />
              </TableHead>
              <TableHead className="text-cream">
                <SortButton
                  label="Name"
                  column="name"
                  activeColumn={sortColumn}
                  direction={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="text-cream">
                <SortButton
                  label="Event date"
                  column="eventDate"
                  activeColumn={sortColumn}
                  direction={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="text-right text-cream">
                <SortButton
                  label="Guests"
                  column="guestCount"
                  activeColumn={sortColumn}
                  direction={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="text-cream">
                <SortButton
                  label="Event type"
                  column="eventType"
                  activeColumn={sortColumn}
                  direction={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="font-semibold text-cream/70">Status</TableHead>
              <TableHead className="text-cream">
                <SortButton
                  label="Submitted"
                  column="createdAt"
                  activeColumn={sortColumn}
                  direction={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="font-semibold text-cream/70">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-card">
            {paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-6 text-center text-ink/60">
                  No inquiries match these filters.
                </TableCell>
              </TableRow>
            ) : (
              paged.map((inquiry) => (
                <TableRow
                  key={inquiry.id}
                  onClick={() => setSelectedId(inquiry.id)}
                  className={cn(
                    "odd:bg-muted/30 cursor-pointer",
                    inquiry.status === "archived" && "opacity-50"
                  )}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedIds.has(inquiry.id)}
                      onCheckedChange={() => toggleSelectRow(inquiry.id)}
                      aria-label={`Select ${inquiry.firstName} ${inquiry.lastName}`}
                    />
                  </TableCell>
                  <TableCell>
                    {inquiry.firstName} {inquiry.lastName}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {inquiry.eventDate}
                      {isUrgent(inquiry) && (
                        <Tooltip>
                          <TooltipTrigger
                            render={<span />}
                            aria-label="Event soon — no response yet"
                          >
                            <AlertCircle className="size-3.5 text-amber-600" />
                          </TooltipTrigger>
                          <TooltipContent>Event soon — no response yet</TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{inquiry.guestCount}</TableCell>
                  <TableCell>{inquiry.eventType ?? "—"}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <InquiryStatusSelect id={inquiry.id} status={inquiry.status} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {inquiry.createdAt.toLocaleString()}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label="View details"
                        onClick={() => setSelectedId(inquiry.id)}
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="icon-sm" render={
                        <a
                          href={`mailto:${inquiry.email}?subject=${encodeURIComponent("Re: Your catering inquiry")}`}
                          aria-label="Reply via email"
                        />
                      }>
                        <Mail className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="size-4" />
            Prev
          </Button>
          <span className="text-sm text-ink/60">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}

      <AdminInquiryDetailDialog
        inquiry={selectedInquiry}
        open={selectedId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
      />
    </div>
  );
}
