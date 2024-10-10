import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Script from '@/models/Script';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  const scripts = await Script.find({
    $or: [
      { userId: session.user.id },
      { isPrivate: false },
    ],
  });

  return NextResponse.json(scripts);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, content, isPrivate } = await request.json();

  await dbConnect();

  const script = new Script({
    name,
    content,
    isPrivate,
    userId: session.user.id,
  });

  await script.save();

  return NextResponse.json({ id: script._id });
}