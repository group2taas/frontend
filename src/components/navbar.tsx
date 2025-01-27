'use client';

import React from 'react';
import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Navbar: NextPage = () => {
  const userProfile = useSelector((state: RootState) => state.userProfile);

  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4 shadow-md">
      <div className="text-xl text-white font-bold">Ticketing System</div>
      <div className="flex flex-col items-end text-white text-sm space-y-1">
        <span>{userProfile?.name}</span>
        <span>{userProfile?.company_name}</span>
        <span>{userProfile?.email}</span>
        <span>{userProfile?.phone}</span>
      </div>
    </nav>
  );
};

export default Navbar;
