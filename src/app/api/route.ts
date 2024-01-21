import { NextRequest } from 'next/server';
import { nanoid } from 'nanoid';
import { prisma } from '@/services/db';

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  let shortenedUrl = nanoid(5);

  while (await prisma.link.findUnique({ where: { shortUrl: shortenedUrl } })) {
    shortenedUrl = nanoid(5);
  }

  const data = await prisma.link.create({
    data: {
      shortUrl: shortenedUrl,
      url,
    },
  });

  return Response.json(data);
}
