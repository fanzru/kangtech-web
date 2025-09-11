"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, ArrowRight, Loader2 } from "lucide-react";

export default function Home() {
  const [isChecking, setIsChecking] = useState(true);
  const [hasAdmin, setHasAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAdminExists();
  }, []);

  const checkAdminExists = async () => {
    try {
      const response = await fetch("/api/admin/check");
      const data = await response.json();
      setHasAdmin(data.hasAdmin);
    } catch (error) {
      console.error("Error checking admin:", error);
    } finally {
      setIsChecking(false);
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 via-white to-zinc-50"></div>
        <div className="relative z-10 text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-2 border-zinc-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 via-white to-zinc-50"></div>

        <div className="relative z-10 w-full max-w-md mx-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-zinc-200 p-8 shadow-2xl text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <img
                src="/logos/white.png"
                alt="KangTech Logo"
                className="w-10 h-10"
              />
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">
              Welcome to KangTech
            </h1>
            <p className="text-zinc-600 text-sm mb-8">
              No admin user found. Please initialize your admin account to get
              started.
            </p>
            <Button
              onClick={() => router.push("/admin-init")}
              className="w-full h-12 bg-gradient-to-r from-zinc-600 to-zinc-800 hover:from-zinc-700 hover:to-zinc-900 text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Initialize Admin
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 via-white to-zinc-50"></div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-zinc-200 p-8 shadow-2xl text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <img
              src="/logos/white.png"
              alt="KangTech Logo"
              className="w-10 h-10"
            />
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">
            Welcome to KangTech
          </h1>
          <p className="text-zinc-600 text-sm mb-8">
            Your admin system is ready. Please sign in to access the dashboard.
          </p>
          <Button
            onClick={() => router.push("/login")}
            className="w-full h-12 bg-gradient-to-r from-zinc-600 to-zinc-800 hover:from-zinc-700 hover:to-zinc-900 text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Sign In to Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
