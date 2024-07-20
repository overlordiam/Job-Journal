'use client';

import React from 'react'
import { Input } from './ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { JobStatus } from '@/utils/types';

function SearchForm() {

    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";
    const jobStatus = searchParams.get("jobStatus") || "All";

    const router = useRouter();
    const pathName = usePathname();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get("search") as string;
        const jobStatus = formData.get("jobStatus") as string;    
        let params = new URLSearchParams();
        params.set("search", search);
        params.set("jobStatus", jobStatus);
        router.push(`${pathName}?${params.toString()}`)
    }

  return (
    <form className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3  gap-4 rounded-lg" onSubmit={handleSubmit}>
        <Input placeholder="Search Jobs" type="text" name="search" defaultValue={search}/>
        <Select name="jobStatus" defaultValue={jobStatus}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {
                    ["All", ...Object.values(JobStatus)].map((jobStatus) => {
                        return (
                            <SelectItem key={jobStatus} value={jobStatus}>
                                {jobStatus}
                            </SelectItem>
                        )
                    })
                }
            </SelectContent>
        </Select>
        <Button type="submit">Search</Button>
    </form>
  )
}

export default SearchForm