import { redirect } from 'next/navigation';

export default async function ShortenedURL({
  params,
}: {
  params: { url: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/${params.url}`
  );

  if (res.status === 404) {
    return <h1>Shortened Link not found</h1>;
  }

  const data = await res.json();

  redirect(data.url);
}
