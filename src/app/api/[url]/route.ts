import { NextRequest, NextResponse } from 'next/server';

import { notFound } from 'next/navigation';
import { prisma } from '@/services/db';
import { redirect } from 'next/navigation';

export async function GET(
  request: NextRequest,
  { params }: { params: { url: string } }
) {
  const data = await prisma.link.findUnique({
    where: {
      shortUrl: params.url,
    },
  });

  if (!data) {
    return NextResponse.json({ message: 'Invalid URL' }, { status: 404 });
  } else {
    return NextResponse.json(data, { status: 202 });
  }
}
