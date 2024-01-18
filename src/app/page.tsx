'use client';

import { Link, SquarePen } from 'lucide-react';
import { useRef, useState } from 'react';

import cs from 'clsx';
import { isValidUrl } from '@/utils';

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    const input = inputRef.current;
    if (!input) return;

    const url = input.value;

    if (!url) {
      setError(true);
      return;
    }

    const isUrlValid = isValidUrl(url);

    if (!isUrlValid) {
      setError(true);
      return;
    }

    const res = await fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <main className='flex flex-col w-full h-full'>
      <p className='text-xl mb-8 text-center'>
        The Simplest URL Shortener You Were Waiting For
      </p>
      <div className='flex flex-row gap-x-3 w-full items-center justify-center'>
        <div className='relative w-1/2'>
          <Link className='absolute ml-3 top-[50%] translate-y-[-50%] size-4' />
          <input
            type='text'
            placeholder='Enter your link here'
            className={cs(
              'bg-[#1C1E20] pr-3 pl-8 py-2.5 rounded-md border border-solid w-full',
              {
                'border-red-500': error,
                'border-white': !error,
              }
            )}
            onChange={() => setError(false)}
            ref={inputRef}
            disabled={loading}
          />
        </div>
        <button
          className={cs(
            'bg-[#1C1E20] p-3 rounded-md border border-solid border-[#ffffff]',
            {
              'border-red-500': error,
              'border-white': !error,
            }
          )}
          onClick={onSubmit}
          disabled={loading || error}
        >
          <SquarePen />
        </button>
      </div>
    </main>
  );
}
