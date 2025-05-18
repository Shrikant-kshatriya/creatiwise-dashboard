import * as React from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import { FaWordpress } from "react-icons/fa";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown } from "lucide-react";
import moment from "moment";
import { Skeleton } from "./ui/skeleton";

export const schema = z.object({
  id: z.number(),
  title: z.string(),
  keyword: z.string(),
  traffic: z.number(),
  words: z.number(),
  createdOn: z.date(),
  action: z.string(),
  publish: z.string(),
});

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Article Title",
    cell: ({ row }) => (
      <div className="whitespace-normal break-words max-w-xs">
        <Label className="px-1.5 w-full">{row.original.title}</Label>
      </div>
    ),
  },
  {
    accessorKey: "keyword",
    header: "Keyword[traffic]",
    cell: ({ row }) => (
      <Label className="px-1.5">
        {`${row.original.keyword}[${row.original.traffic}]`}
      </Label>
    ),
  },
  {
    accessorKey: "words",
    header: "Words",
    cell: ({ row }) => <Label className="px-1.5">{row.original.words}</Label>,
  },
  {
    accessorKey: "createdOn",
    header: "Created On",
    cell: ({ row }) => {
      const createdOn = row.original.createdOn;
      let displayValue = "--";
      if (createdOn) {
        const now = moment();
        const created = moment(createdOn);
        const diffMinutes = now.diff(created, "minutes");
        const diffDays = now.diff(created, "days");
        if (diffMinutes < 60) {
          displayValue =
            diffMinutes <= 1 ? "a min ago" : `${diffMinutes} min ago`;
        } else if (diffDays < 1) {
          const diffHours = now.diff(created, "hours");
          displayValue =
            diffHours <= 1 ? "1 hour ago" : `${diffHours} hours ago`;
        } else if (diffDays < 2) {
          displayValue = diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
        } else {
          displayValue = created.local().format("LL");
        }
      }
      return (
        <Label className="px-1.5 flex items-center justify-center">
          {displayValue}
        </Label>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    cell: () => (
      <div className="flex items-center justify-center">
        <Button
          variant="outline"
          className="data-[state=open]:bg-muted text-green-500 border border-green-500 "
        >
          <span className="px-6">View</span>
        </Button>
      </div>
    ),
  },
  {
    id: "publish",
    header: "Publish",
    cell: () => (
      <div className="flex items-center justify-center">
        <Button variant="ghost" size="lg" className="flex items-center gap-2">
          <span className="text-2xl">
            <FaWordpress className="text-blue-500" />
          </span>
          <ChevronDown />
        </Button>
      </div>
    ),
  },
];

function Row({ row }: { row: Row<z.infer<typeof schema>> }) {
  return (
    <TableRow className="relative z-0">
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[];
}) {
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); // Simulated load
    return () => clearTimeout(timer);
  }, []);

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Filter data based on searchValue for title and keyword
  const filteredData = React.useMemo(() => {
    if (!searchValue.trim()) return initialData;
    const lower = searchValue.toLowerCase();
    return initialData.filter(
      (row) =>
        row.title.toLowerCase().includes(lower) ||
        row.keyword.toLowerCase().includes(lower)
    );
  }, [initialData, searchValue]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <Tabs
      defaultValue="Generated Articles"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex flex-col gap-4 items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="Generated Articles">
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Generated Articles">
              Generated Articles
            </SelectItem>
            <SelectItem value="Published Articles">
              Published Articles
            </SelectItem>
            <SelectItem value="Scheduled Articles">
              Scheduled Articles
            </SelectItem>
            <SelectItem value="Archived Articles">Archived Articles</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex items-center justify-center mx-auto gap-2">
          <TabsTrigger value="Generated Articles">
            Generated Articles
          </TabsTrigger>
          <TabsTrigger value="Published Articles">
            Published Articles
          </TabsTrigger>
          <TabsTrigger value="Scheduled Articles">
            Scheduled Articles
          </TabsTrigger>
          <TabsTrigger value="Archived Articles">Archived Articles</TabsTrigger>
        </TabsList>
        {/* search */}
        <div>
          <Input
            placeholder="Search for Title and Keyword"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-[150px] lg:w-[250px] h-8 mt-3"
          />
        </div>
      </div>
      <TabsContent
        value="Generated Articles"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg">
          <Table>
            <TableHeader className="sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    // Use the column id to check for title/keyword[traffic]
                    const key = header.column.id?.toLowerCase() || "";
                    const isTitle = key === "title";
                    const isKeywordTraffic =
                      key === "keyword" || key === "keyword[traffic]";
                    const className =
                      isTitle || isKeywordTraffic
                        ? "font-bold"
                        : "font-bold text-center";
                    return (
                      <TableHead
                        className={className}
                        key={header.id}
                        colSpan={header.colSpan}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {isLoading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full rounded" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows?.length ? (
                table
                  .getRowModel()
                  .rows.map((row) => <Row key={row.id} row={row} />)
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Articles per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="past-performance"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent
        value="focus-documents"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  );
}
