"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Users,
  FileText,
  Newspaper,
  Package,
  LogOut,
  X,
  User,
  ChevronUp,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  {
    name: "User Management",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    name: "Content",
    href: "/dashboard/content",
    icon: FileText,
    hasSubmenu: true,
    subItems: [
      {
        name: "Blog",
        href: "/dashboard/blog",
        icon: FileText,
      },
      {
        name: "News",
        href: "/dashboard/news",
        icon: Newspaper,
      },
    ],
  },
  {
    name: "Product",
    href: "/dashboard/product",
    icon: Package,
  },
];

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-zinc-200 transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200">
          <div className="flex items-center justify-center w-full">
            <div className="w-12 h-12 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-xl flex items-center justify-center">
              <img
                src="/logos/white.png"
                alt="KangTech Logo"
                className="w-8 h-8"
              />
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="lg:hidden text-zinc-500 hover:text-zinc-700 absolute right-4"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Browse Section */}
        <div className="px-4 py-3 bg-zinc-100 border-b border-zinc-200">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-zinc-600" />
            <span className="text-sm font-medium text-zinc-900">Browse</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const isExpanded = expandedItems.includes(item.name);

            return (
              <div key={item.name}>
                <Button
                  variant="ghost"
                  className={`w-full justify-between h-10 text-left px-3 py-2 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 ${
                    isActive ? "bg-zinc-100 text-zinc-900" : ""
                  }`}
                  onClick={() => {
                    if (item.hasSubmenu) {
                      toggleExpanded(item.name);
                    } else {
                      router.push(item.href);
                      onToggle();
                    }
                  }}
                >
                  <div className="flex items-center">
                    {Icon && <Icon className="w-4 h-4 mr-3" />}
                    {item.name}
                  </div>
                  {item.hasSubmenu && (
                    <ChevronUp
                      className={`w-4 h-4 text-zinc-500 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Button>

                {/* Submenu */}
                {item.hasSubmenu && isExpanded && item.subItems && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = pathname === subItem.href;

                      return (
                        <Button
                          key={subItem.name}
                          variant="ghost"
                          className={`w-full justify-start h-8 text-left px-3 py-1 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 ${
                            isSubActive ? "bg-zinc-50 text-zinc-900" : ""
                          }`}
                          onClick={() => {
                            router.push(subItem.href);
                            onToggle();
                          }}
                        >
                          <div className="w-4 h-px bg-zinc-300 mr-3"></div>
                          <SubIcon className="w-3 h-3 mr-2" />
                          {subItem.name}
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Profile Section */}
        <div className="p-6 border-t border-zinc-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-900 truncate">
                Admin User
              </p>
              <p className="text-xs text-zinc-500 truncate">
                admin@kangtech.com
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full justify-start text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 border-zinc-300 rounded-lg h-10"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
