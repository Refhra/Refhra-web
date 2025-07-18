'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
  <>      
     <nav className="bg-black text-white p-2 flex gap-4 justify-center">
     
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/analytics">Analytics</Link>
      <Link href="/task">Tasks</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/settings">Settings</Link>
    </nav>
  
  </>
  );
}