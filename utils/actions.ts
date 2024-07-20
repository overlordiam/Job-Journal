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
      const job = await prisma.job.findUnique({
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