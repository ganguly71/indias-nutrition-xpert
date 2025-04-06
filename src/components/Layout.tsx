
import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="mt-auto py-6 bg-xd-green text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="font-bold">Xpert-Diet</h3>
              <p className="text-sm">Nutrition for everyone</p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm">© {new Date().getFullYear()} Xpert-Diet. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
