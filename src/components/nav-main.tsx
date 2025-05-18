"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items, subs, footer
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[],
  subs: {
    name: string
    url: string
    icon: LucideIcon
  }[],
  footer?: {
    title: string
    url: string
    icon: LucideIcon
  } | any
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon className="text-blue-500"/>}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-2 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span className={subItem.title === "Generated Articles" ? "text-blue-600" : ""}>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}

        {/* rest of nav items */}
        {subs.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon className="text-blue-500"/>
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}

        {/* profile nav item */}
        {footer && (
          
          <SidebarMenuItem key={footer.name}>
            <SidebarMenuButton asChild>
              <a href={footer.url} className="border-t border-t-slate-300 dark:border-t-slate-700">
                <footer.icon className="text-blue-500"/>
                <span>{footer.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}

      </SidebarMenu>
    </SidebarGroup>
  )
}
