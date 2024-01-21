'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { ClipboardCopy, Link, Loader2, SquarePen } from 'lucide-react';

import cs from 'clsx';
import { isValidUrl } from '@/utils';
import { toast } from 'sonner';

type ShortenerState = 'initial' | 'loading' | 'error' | 'success' | 'apiError';

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [shortenerState, setShortenerState] =
    useState<ShortenerState>('initial');
  const [url, setUrl] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (shortenerState === 'error') {
      setShortenerState('initial');
    }

    setUrl(e.target.value);
  };

  const onSubmit = async () => {
    setShortenerState('loading');

    const isUrlValid = isValidUrl(url);

    if (!isUrlValid) {
      setShortenerState('error');
      toast.error('Please enter a valid URL');
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

    if (data.error) {
      toast.error('Something went wrong, please try again later');
      setShortenerState('apiError');
    } else {
      setShortenerState('success');
      setUrl(process.env.NEXT_PUBLIC_HOST_URL + data.shortUrl);
      toast.success('Successfully shortened the URL');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.error('Successfully copied to clipboard');
    } catch (err) {
      toast.error('Something went wrong, please copy the link manually');
    }
  };

  return (
    <main className='flex flex-col w-full h-full'>
      <p className='text-xl mb-8 text-center'>
        The Simplest URL Shortener You Were Waiting For
      </p>
      <div className='flex md:flex-row flex-col md:gap-3 gap-5 w-full items-center justify-center'>
        <div
          className={cs('relative md:w-1/2 w-full text-white', {
            'text-opacity-15': shortenerState === 'loading',
            'text-red-100': shortenerState === 'error',
            'text-green-100': shortenerState === 'success',
          })}
        >
          <Link className='absolute ml-3 top-[50%] translate-y-[-50%] size-4' />
          <input
            type='text'
            placeholder='Enter your link here'
            value={url}
            className={cs(
              'bg-[#1C1E20] pr-3 pl-8 py-2.5 rounded-md border border-solid w-full md:text-base text-sm',
              {
                'border-red-500': shortenerState === 'error',
                'border-white': ['initial', 'loading'].includes(shortenerState),
                'border-green-500': shortenerState === 'success',
              }
            )}
            onChange={onChange}
            ref={inputRef}
            disabled={['apiError', 'success', 'loading'].includes(
              shortenerState
            )}
          />
        </div>
        <button
          className={cs('bg-[#1C1E20] p-3 rounded-md border border-solid', {
            'border-red-500 text-red-100': shortenerState === 'error',
            'border-white': ['initial', 'loading'].includes(shortenerState),
            'border-green-500 text-green-100': shortenerState === 'success',
          })}
          onClick={shortenerState === 'success' ? copyToClipboard : onSubmit}
          disabled={['error', 'loading', 'apiError'].includes(shortenerState)}
        >
          {shortenerState === 'success' ? (
            <ClipboardCopy />
          ) : shortenerState === 'loading' ? (
            <Loader2 className='animate-spin' />
          ) : (
            <SquarePen />
          )}
        </button>
      </div>
    </main>
  );
}
