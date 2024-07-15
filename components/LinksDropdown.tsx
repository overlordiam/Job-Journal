import React from 'react'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { AlignLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import links from "@/utils/links";
import Link from "next/link";


function LinksDropdown() {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild className='lg:hidden'>
            <Button variant="default" size="icon" >
                <AlignLeft />
                <span className="sr-only">Toggle list</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='lg:hidden w-52' align='start' sideOffset={25}>
            {links.map((link) => {
                return <DropdownMenuItem asChild key={link.href}>
                    <Link href={link.href} className='flex items-center gap-x-2'>
                        {link.icon} <span className='capitalize'>{link.label}</span>
                    </Link>
                </DropdownMenuItem>
            })}
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropdown