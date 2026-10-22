import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: Fetch all placement drives
export async function GET() {
  try {
    const drives = await prisma.placementDrive.findMany({
      orderBy: { driveDate: 'asc' },
    })
    return NextResponse.json(drives, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch drives' }, { status: 500 })
  }
}

// POST: Add a new placement drive
export async function POST(request) {
  try {
    const body = await request.json()
    const { companyName, role, driveDate, eligibleBranch, minCGPA, jobType } = body

    const newDrive = await prisma.placementDrive.create({
      data: {
        companyName,
        role,
        driveDate: new Date(driveDate),
        eligibleBranch,
        minCGPA: minCGPA ? parseFloat(minCGPA) : null,
        jobType,
      },
    })

    return NextResponse.json(newDrive, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create drive' }, { status: 500 })
  }
}