import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Script from '@/models/Script';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, content, isPrivate } = await request.json();

  await dbConnect();

  const script = await Script.findOneAndUpdate(
    { _id: params.id, userId: session.user.id },
    { name, content, isPrivate },
    { new: true }
  );

  if (!script) {
    return NextResponse.json({ error: 'Script not found or unauthorized' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  const result = await Script.deleteOne({ _id: params.id, userId: session.user.id });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: 'Script not found or unauthorized' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}