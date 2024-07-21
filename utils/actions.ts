'use server';

import prisma from './db';
import { auth } from '@clerk/nextjs';
import { JobType, CreateAndEditJobType, createAndEditJobSchema } from './types';
import { redirect } from 'next/navigation';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';

function authenticateAndRedirect(): string {
    const { userId } = auth();
    if (!userId) {
      redirect('/');
    }
    return userId;
  }
  
export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const userId = authenticateAndRedirect();
  try {
    createAndEditJobSchema.parse(values);
    const job: JobType = await prisma.job.create({
      data: {
        ...values,

        clerkId: userId,
      },
    });
    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
}

type GetJobsActionType = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
}

export async function getJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetJobsActionType): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const userId = authenticateAndRedirect();
  try {
    let whereObject: Prisma.JobWhereInput = {
      clerkId: userId
    };

    if (search) {
      whereObject = {
        ...whereObject,
        OR: [
          {
            position: {
              contains: search
            }
          },
          {
            company: {
              contains: search
            }
          }
        ]
      }
    }

    if (jobStatus && jobStatus != 'All') {
      whereObject = {
        ...whereObject,
        status: jobStatus
      }
    }

    const jobs: JobType[] = await prisma.job.findMany({
      where: whereObject,
      orderBy: {
        createdAt: 'desc'
      },
    })

    return {jobs, count: 0, page: 1, totalPages: 0}

  } catch (error) {
    console.log(error);
    return {jobs: [], count: 0, page: 1, totalPages: 0}
  }
}


export async function deleteJobAction (id: string): 
Promise<JobType | null> {
  try {
    const userId = authenticateAndRedirect();
    const job = await prisma.job.delete({
      where: { 
        id: id,
        clerkId: userId
      }
    })

    return job;

  } catch (e) {
    return null;
  }
}

export async function getSingleJobAction (id: string) : 
Promise<JobType | null> {

    let job: JobType | null = null;
    const userId = authenticateAndRedirect();

    try {
        job = await prisma.job.findUnique({
        where: {
          id: id,
          clerkId: userId
        }
      })
    } catch (e) {
        console.log(e);
        job = null;
    }
    
    if (!job) {
      redirect("/jobs");
    }

    return job
}

export async function updateJobAction (
  id: string, 
  values: CreateAndEditJobType) :
Promise<JobType | null> {
  const userId = authenticateAndRedirect();
  try {
    const job = await prisma.job.update({
      where: { 
        id: id,
        clerkId: userId
      },
      data: {
        ...values
      }
    })

    return job;

  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getStatsAction () : Promise<{
  pending: number;
  interview: number;
  declined: number
}> {
    const userId = authenticateAndRedirect();
    try {
        const stats = await prisma.job.groupBy({
          where: {
            clerkId: userId
          },
          by: ['status'],
        _count: {
          status: true
        }
        })

        const statsObject = stats.reduce((acc, curr) => {
          acc[curr.status] = curr._count.status;
          return acc;
        }, {} as Record<string, number>)

        const defaultState = {
          pending: 0,
          interview: 0,
          declined: 0,
          ...statsObject
        }
        console.log(defaultState)
        return defaultState

    } catch (e) {
      redirect("/jobs");
    }
}

export async function getChartsDataAction() : Promise<
  Array<{date: string, count: number}> 
> {
    const userId = authenticateAndRedirect();
    const sixMonthsAgo = dayjs().subtract(6, 'month').toDate();
    try {
      const jobs = await prisma.job.findMany({
        where: {
          clerkId: userId,
          createdAt: {
            gte: sixMonthsAgo
          }
        },
        orderBy: {
          createdAt:'asc'
        }
      })


      let applicationsPerMonth = jobs.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format('MMM YY');

      const existingEntry = acc.find((entry) => entry.date === date);

      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({ date, count: 1 });
      }

      return acc;
    }, [] as Array<{ date: string; count: number }>);

    return applicationsPerMonth;
  } catch (error) {
    redirect('/jobs');
  }
}