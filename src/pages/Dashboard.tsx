import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "../components/data-table";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";

import data from "../app/dashboard/data.json";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>

        <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 mt-3 shrink-0 items-center transition-[width,height] ease-linear">
          <div className="flex h-full w-full items-center justify-center px-4 py-6 md:px-8">
            <h1 className="text-3xl font-bold">Articles</h1>
          </div>
        </header>

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
