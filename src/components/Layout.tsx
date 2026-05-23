import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="p-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold">JSFilters</h1>
      </header>
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}
