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

  const tasks = await db.collection('scheduledTasks')
    .find({ userId: session.user.id })
    .toArray();

  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { scriptId, schedule } = await request.json();

  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection('scheduledTasks').insertOne({
    userId: session.user.id,
    scriptId,
    schedule,
    createdAt: new Date(),
  });

  return NextResponse.json({ id: result.insertedId });
}