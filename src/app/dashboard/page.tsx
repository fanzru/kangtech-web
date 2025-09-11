"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sidebar } from "@/components/ui/sidebar";
import {
  Loader2,
  Menu,
  Users,
  FileText,
  Settings,
  BarChart3,
} from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
      return;
    }
    if ((session.user as any)?.role !== "ADMIN") {
      router.push("/");
      return;
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-zinc-600"></div>
      </div>
    );
  }

  if (!session || (session.user as any)?.role !== "ADMIN") {
    return null;
  }

  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Blog Posts",
      value: "89",
      change: "+5%",
      icon: FileText,
      color: "text-green-600",
    },
    {
      title: "News Articles",
      value: "156",
      change: "+23%",
      icon: FileText,
      color: "text-purple-600",
    },
    {
      title: "Products",
      value: "342",
      change: "+8%",
      icon: BarChart3,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-zinc-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-zinc-600 hover:text-zinc-900"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
                  Dashboard
                </h1>
                <p className="text-sm text-zinc-600">
                  Welcome back, {session.user?.name}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-white border-zinc-200 hover:shadow-lg transition-all duration-300 group"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-600 group-hover:text-zinc-800 transition-colors">
                    {stat.title}
                  </CardTitle>
                  <stat.icon
                    className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform`}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors">
                    {stat.value}
                  </div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Welcome Card */}
          <Card className="bg-white border-zinc-200 mb-6">
            <CardHeader>
              <CardTitle className="text-zinc-900">
                Welcome to KangTech Admin
              </CardTitle>
              <CardDescription className="text-zinc-600">
                Manage your application from this centralized dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-blue-900">
                    User Management
                  </div>
                  <div className="text-xs text-blue-700">
                    Manage users and permissions
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                  <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-green-900">
                    Blog Management
                  </div>
                  <div className="text-xs text-green-700">
                    Create and manage blog posts
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                  <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-purple-900">
                    News Management
                  </div>
                  <div className="text-xs text-purple-700">
                    Manage news and announcements
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                  <BarChart3 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-orange-900">
                    Product Management
                  </div>
                  <div className="text-xs text-orange-700">
                    Manage products and inventory
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white border-zinc-200">
            <CardHeader>
              <CardTitle className="text-zinc-900">Quick Actions</CardTitle>
              <CardDescription className="text-zinc-600">
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  className="w-full justify-start h-12 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 border-zinc-300"
                  variant="outline"
                  onClick={() => router.push("/dashboard/users")}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
                <Button
                  className="w-full justify-start h-12 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 border-zinc-300"
                  variant="outline"
                  onClick={() => router.push("/dashboard/blog")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Manage Blog
                </Button>
                <Button
                  className="w-full justify-start h-12 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 border-zinc-300"
                  variant="outline"
                  onClick={() => router.push("/dashboard/news")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Manage News
                </Button>
                <Button
                  className="w-full justify-start h-12 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 border-zinc-300"
                  variant="outline"
                  onClick={() => router.push("/dashboard/product")}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Manage Products
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
