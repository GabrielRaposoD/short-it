import { SquarePen } from 'lucide-react';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center p-24 bg-dots bg-[#313434]'>
      <h1 className='text-6xl font-bold mb-96'>Short - It</h1>
      <p className='text-xl mb-8'>
        The Simplest URL Shortner You Were Waiting For
      </p>
      <div className='flex flex-row gap-x-3 w-full items-center justify-center'>
        <input
          type='text'
          placeholder='Enter your link here'
          className='bg-[#1C1E20] px-3 py-2.5 rounded-md border border-solid border-[#ffffff] w-1/2'
        />
        <button className='bg-[#1C1E20] p-3 rounded-md border border-solid border-[#ffffff]'>
          <SquarePen />
        </button>
      </div>
    </main>
  );
}
