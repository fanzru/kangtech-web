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
import { Loader2, FileText, Newspaper } from "lucide-react";

export default function ContentPage() {
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
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
                Content Management
              </h1>
              <p className="text-sm text-zinc-600">
                Manage your blog posts and news articles
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Blog Card */}
            <Card className="bg-white border-zinc-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-zinc-900">
                      Blog Management
                    </CardTitle>
                    <CardDescription className="text-zinc-600">
                      Create and manage blog posts
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 mb-4">
                  This section is under development. Blog management features
                  will be available soon.
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                  onClick={() => router.push("/dashboard/blog")}
                >
                  Manage Blog
                </Button>
              </CardContent>
            </Card>

            {/* News Card */}
            <Card className="bg-white border-zinc-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Newspaper className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-zinc-900">
                      News Management
                    </CardTitle>
                    <CardDescription className="text-zinc-600">
                      Manage news and announcements
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 mb-4">
                  This section is under development. News management features
                  will be available soon.
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                  onClick={() => router.push("/dashboard/news")}
                >
                  Manage News
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

