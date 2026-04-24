'use client';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./mapcode'), { 
  ssr: false,
  loading: () => <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">Loading Map...</div>
});

export default function Page() {
  return <Map />;
}