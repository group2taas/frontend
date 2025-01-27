'use client';

import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isCompleted?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, isCompleted = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-300 rounded-lg mb-4">
      <div
        className="flex items-center justify-between p-4 bg-gray-100 cursor-pointer"
        onClick={toggleAccordion}
      >
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <div className="flex items-center space-x-2">
          {isCompleted && (
            <span className="w-4 h-4 bg-green-500 rounded-full"></span>
          )}
          <span className="text-gray-500">{isOpen ? '-' : '+'}</span>
        </div>
      </div>
      {isOpen && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
};

export default Accordion;