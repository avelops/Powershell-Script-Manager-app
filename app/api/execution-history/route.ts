import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();

  const history = await db.collection('executionHistory')
    .find({ userId: session.user.id })
    .sort({ executionDate: -1 })
    .limit(50)
    .toArray();

  return NextResponse.json(history);
}