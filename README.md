# Job-Journal

## Overview
Job Journal is a comprehensive tool designed to help job seekers efficiently manage and monitor their job applications. This user-friendly platform ensures that you stay organized throughout your job search, keeping all essential information in one place. It is a full-stack application that includes authentication, storage and also a statistics page. The inspiration for this project comes from my journey of applying to many companies and losing track of them as time passes.

## A preview:
<div>
    <a href="https://www.loom.com/share/51f3c2a4ac6342c9bfb3ca3c2847925b">
      <p>Job-Journal - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/51f3c2a4ac6342c9bfb3ca3c2847925b">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/51f3c2a4ac6342c9bfb3ca3c2847925b-b04b8388e35776d0-full-play.gif">
    </a>
  </div>

## Features
- **Frontend and Backend**: The online journal is built with Next.js, making the interaction between the frontend and backend flawless.
- **Static Type checking**: Uses TypeScript, to enhance debugging of application and improve readability.
- **State Management, Caching, Re-rendering**: Utilizes React Query for efficient state management and caching across components (especially between backend and frontend).
- **TailwindCSS for styling**: All styling is done with  TailwindCSS, providing a unique look and feel.
- **Database**: The data storage is taken care by Prisma, which is an ORM for SQL.

## Technologies Used
- **Front-end**: Next.js
- **State Management**: React Query
- **Database**: Prisma
- **Authentication**: Clerk
- **Type Check**: TypeScript
- **Styling**: TailwindCSS
- **Version Control**: Git

## Installation
To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js and npm installed on your local machine. You can download them online.
- An account with Clerk (authentication library)
- Prisma DB

### Clone the Repository
```bash
git clone https://github.com/overlordiam/Job-Journal.git
cd Job-Journal
```

### Install Dependencies
```bash
npm install
```

### Start the Application
```bash
npm start dev
```

### Run the prisma studio
```bash
npx prisma studio
```

