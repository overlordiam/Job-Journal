'use client';

import Logo from '@/assets/logo.svg';
import links from '@/utils/links';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

function Sidebar() {
  const path = usePathname();
  return (
    <aside className='bg-muted h-full px-8 py-4'>
        <Image src={Logo} alt="Logo" className='mx-auto' />
        <div className="flex flex-col mt-20 gap-y-6">
            {links.map((link) => {
                return <Button asChild key={link.href} variant={path === link.href ? "default" : "link"}>
                    <Link href={link.href} className="gap-x-2 flex items-center">
                        {link.icon} <span className='capitalize'>{link.label}</span>
                    </Link>
                </Button>
            })}
        </div>
    </aside>
  )
}

export default Sidebar