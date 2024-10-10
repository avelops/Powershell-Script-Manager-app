import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { script } = await request.json();

  try {
    const { stdout, stderr } = await execAsync(`powershell -Command "${script}"`);
    const output = stdout || stderr;

    const client = await clientPromise;
    const db = client.db();

    await db.collection('executionHistory').insertOne({
      userId: session.user.id,
      script,
      output,
      executionDate: new Date(),
    });

    return NextResponse.json({ output });
  } catch (error) {
    console.error('Error executing PowerShell script:', error);
    return NextResponse.json({ error: 'Failed to execute script' }, { status: 500 });
  }
}