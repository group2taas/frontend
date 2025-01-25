'use client';

import React from 'react';
import { UserProfile } from '@/types/mongo-documents';
import { NextPage } from 'next';

interface NavbarProps {
  userProfile: UserProfile;
}

const Navbar: NextPage<NavbarProps> = ({ userProfile }) => {
  const { name, company_name, phone, email } = userProfile;

  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4 shadow-md">
      <div className="text-xl text-white font-bold">Ticketing System</div>
      <div className="flex flex-col items-end text-white text-sm space-y-1">
        <span>{name}</span>
        <span>{company_name}</span>
        <span>{email}</span>
        <span>{phone}</span>
      </div>
    </nav>
  );
};

export default Navbar;
