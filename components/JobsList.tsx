'use client';
import JobCard from './JobCard';
import { useSearchParams } from 'next/navigation';
import ButtonContainer from './ButtonContainer';
import ComplexButtonContainer from "./ComplexButtonContainer"
import { getJobsAction } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

function JobsList() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || ""
    const jobStatus = searchParams.get("jobStatus") || "All";

    const pageNumber = Number(searchParams.get("page")) || 1;

    const { data, isPending} = useQuery({
        queryKey: ["jobs", search, jobStatus, pageNumber],
        queryFn: () => getJobsAction({ search, jobStatus, page: pageNumber })
    })

    const count = data?.count || 0;
    const page = data?.page || 0;
    const totalPages = data?.totalPages || 0;

    const jobs = data?.jobs || []

    if (isPending) return <h2 className='text-xl'>Fetching jobs...</h2>;
    if (jobs.length < 1) return <h2 className='text-xl'>No jobs found...</h2>;

    return (
        <div>
            <div className='flex items-center justify-between mb-8'>
                <h2 className='text-xl font-semibold capitalize '>
                    {count} jobs found
                </h2>
                {totalPages < 2 ? null : (
                <ComplexButtonContainer currentPage={page} totalPages={totalPages} />
                )}
            </div>
            <div className='grid md:grid-cols-2 gap-8'>
                    {
                        jobs.map((job) => {
                            return (<JobCard key={job.id} job={job} />)
                        })
                    }
            </div>
        </div>
    )
    }

export default JobsList