
import { signUp } from '@/utils/firebase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const userCredential = await signUp(email, password);
    return NextResponse.json({ user: userCredential.user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}

export async function PUT(req: NextRequest) {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}

export async function DELETE(req: NextRequest) {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}

