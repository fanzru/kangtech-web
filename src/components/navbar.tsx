"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Heart, User, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                src="/logos/black.png"
                alt="KangTech"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <div className="relative group">
                <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center">
                  Produk
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {/* Dropdown would go here */}
              </div>
              <Link
                href="/laptop"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Laptop
              </Link>
              <Link
                href="/pc"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                PC Desktop
              </Link>
              <Link
                href="/server"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Server
              </Link>
            </div>
          </div>

          {/* Right side icons and buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <Link
                href="/gaming"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Gaming
              </Link>
              <Link
                href="/enterprise"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Enterprise
              </Link>
              <Link
                href="/support"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Dukungan
              </Link>
              <div className="flex items-center space-x-2">
                <button className="text-gray-700 hover:text-gray-900 p-2">
                  <Search className="h-5 w-5" />
                </button>
                <button className="text-gray-700 hover:text-gray-900 p-2">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="text-gray-700 hover:text-gray-900 p-2">
                  <User className="h-5 w-5" />
                </button>
              </div>
              <div className="text-sm text-gray-500">ID,ID</div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <Link
              href="/products"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium"
            >
              Produk
            </Link>
            <Link
              href="/laptop"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium"
            >
              Laptop
            </Link>
            <Link
              href="/pc"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium"
            >
              PC Desktop
            </Link>
            <Link
              href="/server"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium"
            >
              Server
            </Link>
            <Link
              href="/gaming"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium"
            >
              Gaming
            </Link>
            <Link
              href="/enterprise"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium"
            >
              Enterprise
            </Link>
            <Link
              href="/support"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium"
            >
              Dukungan
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
