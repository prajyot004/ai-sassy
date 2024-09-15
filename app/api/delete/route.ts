import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb'; // Assuming this is your Prisma instance

export async function GET() {
    try {
        // Delete all records from the `userApiLimit` table
        const deletedRecords = await prismadb.userSubscription.deleteMany({});

        // Return the number of deleted records
        return NextResponse.json({
            message: 'All records have been deleted',
            deletedCount: deletedRecords.count,
        });
    } catch (error:any) {
        console.error('Error deleting records:', error);
        return NextResponse.json({
            message: 'Error deleting records',
            error: error.message,
        }, { status: 500 });
    }
}
