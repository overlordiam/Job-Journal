'use client';
import JobCard from './JobCard';
import { useSearchParams } from 'next/navigation';
import { getJobsAction } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

function JobsList() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || ""
    const jobStatus = searchParams.get("jobStatus") || "All";

    const pageNumber = Number(searchParams.get("number")) || 1;

    const { data, isPending} = useQuery({
        queryKey: ["jobs", search, jobStatus, pageNumber],
        queryFn: () => getJobsAction({ search, jobStatus, page: pageNumber })
    })

    const jobs = data?.jobs || []

    if (isPending) return <h2 className='text-xl'>Fetching jobs...</h2>;
    if (jobs.length < 1) return <h2 className='text-xl'>No jobs found...</h2>;

    return (
        <div className='grid md:grid-cols-2 gap-8'>
            {
                jobs.map((job) => {
                    return (<JobCard key={job.id} job={job} />)
                })
            }
        </div>
    )
    }

export default JobsList