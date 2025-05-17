'use client';

import { type Icon } from '@tabler/icons-react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
    subMenus?: { title: string; url: string; icon?: Icon }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item, idx) => (
            <Collapsible key={item.title} defaultOpen={idx === 0} className="group/collapsible">
              <SidebarMenuItem className="mb-2">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    {!!item.subMenus && item.subMenus?.length > 0 && (
                      <ChevronUp className="ml-auto transition-transform rotate-90 group-data-[state=open]/collapsible:rotate-180" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {item.subMenus &&
                    item.subMenus.length > 0 &&
                    item.subMenus.map(submenu => (
                      <SidebarMenuSub key={submenu.title} className="pl-4 ">
                        <SidebarMenuSubItem className="my-1">
                          <Button variant="ghost" className="w-full justify-start" size="sm">
                            <Link href={submenu.url} className="w-full text-left">
                              {submenu.title}
                            </Link>
                          </Button>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    ))}
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
