"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, LogIn } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else if (result?.ok) {
        // Check if user is admin
        const session = await getSession();
        if (session?.user?.role === "ADMIN") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 via-white to-zinc-50"></div>

      {/* Main form container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-zinc-200 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <img
                src="/logos/white.png"
                alt="KangTech Logo"
                className="w-10 h-10"
              />
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-zinc-600 text-sm">
              Sign in to your admin account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-zinc-700 mb-2 block"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="h-12 bg-zinc-50 border-zinc-300 text-zinc-900 placeholder-zinc-500 rounded-xl focus:ring-2 focus:ring-zinc-500 focus:border-zinc-400"
                />
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-zinc-700 mb-2 block"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                    className="h-12 bg-zinc-50 border-zinc-300 text-zinc-900 placeholder-zinc-500 rounded-xl focus:ring-2 focus:ring-zinc-500 focus:border-zinc-400 pr-12"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-700"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <Alert
                variant="destructive"
                className="bg-red-50 border-red-200 text-red-800"
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-zinc-600 to-zinc-800 hover:from-zinc-700 hover:to-zinc-900 text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-zinc-600 text-sm">
              Already have an account?{" "}
              <a
                href="#"
                className="text-zinc-800 hover:text-zinc-900 font-medium"
              >
                Log In
              </a>
            </p>
          </div>

          {/* Terms */}
          <div className="mt-6 text-center">
            <p className="text-xs text-zinc-500">
              By continuing, you agree to our{" "}
              <a href="#" className="text-zinc-800 hover:text-zinc-900">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-zinc-800 hover:text-zinc-900">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
