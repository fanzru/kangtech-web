"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, Play, Star } from "lucide-react";
import Navbar from "@/components/navbar";

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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasAdmin) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="w-full max-w-md mx-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <img
                  src="/logos/white.png"
                  alt="KangTech Logo"
                  className="w-10 h-10"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                Welcome to KangTech
              </h1>
              <p className="text-gray-600 text-sm mb-8">
                No admin user found. Please initialize your admin account to get
                started.
              </p>
              <Button
                onClick={() => router.push("/admin-init")}
                className="w-full h-12 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Initialize Admin
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  KangTech
                  <span className="block text-4xl lg:text-5xl text-gray-600">
                    PC & Server Distributor
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Distributor terpercaya untuk PC, Laptop, dan Server
                  berkualitas tinggi. Solusi teknologi terbaik untuk kebutuhan
                  bisnis dan personal Anda.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => router.push("/login")}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Lihat Katalog
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Konsultasi Gratis
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span>4.9/5 Rating</span>
                </div>
                <div>•</div>
                <div>5000+ Pelanggan</div>
                <div>•</div>
                <div>10+ Tahun Pengalaman</div>
              </div>
            </div>

            {/* Right Content - Product Showcase */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center mb-4">
                    <div className="text-white text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <img
                          src="/logos/white.png"
                          alt="KangTech"
                          className="w-8 h-8"
                        />
                      </div>
                      <p className="text-sm font-medium">Gaming PC Setup</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">
                      Gaming PC RTX 4070
                    </h3>
                    <p className="text-sm text-gray-600">
                      Intel i7-13700K • 32GB RAM • 1TB SSD
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        Rp 25.999.000
                      </span>
                      <span className="text-sm text-gray-500">Ready Stock</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mengapa Pilih KangTech?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kami menyediakan produk PC, Laptop, dan Server berkualitas tinggi
              dengan layanan terbaik dan harga kompetitif.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-gray-600 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Produk Berkualitas
              </h3>
              <p className="text-gray-600">
                Hanya menjual produk original dari brand terpercaya dengan
                garansi resmi.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-gray-600 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Harga Kompetitif
              </h3>
              <p className="text-gray-600">
                Harga terbaik di pasaran dengan berbagai pilihan pembayaran yang
                fleksibel.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-gray-600 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Layanan Lengkap
              </h3>
              <p className="text-gray-600">
                Mulai dari konsultasi, instalasi, hingga maintenance dan support
                teknis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Siap Mencari Solusi IT Terbaik?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pelanggan yang telah mempercayai KangTech
            untuk kebutuhan PC, Laptop, dan Server mereka.
          </p>
          <Button
            onClick={() => router.push("/login")}
            className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Lihat Katalog Produk
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
