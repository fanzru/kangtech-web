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
import { Loader2, Menu, Package, Plus } from "lucide-react";

export default function ProductPage() {
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
                  Product Management
                </h1>
                <p className="text-sm text-zinc-600">
                  Manage products and inventory
                </p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-zinc-600 to-zinc-800 hover:from-zinc-700 hover:to-zinc-900 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <Card className="bg-white border-zinc-200">
            <CardHeader>
              <CardTitle className="text-zinc-900">Products</CardTitle>
              <CardDescription className="text-zinc-600">
                This page is under development. Product management features will
                be available soon.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-zinc-900 mb-2">
                  Coming Soon
                </h3>
                <p className="text-zinc-600">
                  Product management functionality is being developed and will
                  be available in the next update.
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
