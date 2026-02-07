import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";

export default function Home() {
  const [userName] = useState("Alice");

  return (
    <Layout>
      <div className="min-h-screen bg-white px-4 py-8">
        {/* Header */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-foreground">
              Muraho, {userName}! 👋
            </h1>
            <div className="text-2xl">🎯</div>
          </div>
          <p className="text-sm text-muted-foreground">
            Komeza kwiga Kinyarwanda
          </p>
        </div>

        {/* Lesson Card */}
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border mb-6">
            {/* Image */}
            <div className="w-full h-48 bg-gradient-to-br from-emerald-100 to-emerald-50 overflow-hidden flex items-center justify-center">
              <div className="text-6xl">🌿</div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-2">
                Ijinja & Hitamo Urumuri
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Injira ubwenge, Ijinja ni inzira zitari nzira. Ubwenge
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                  <span className="text-gray-300 text-lg">★</span>
                </div>
                <span className="text-xs text-muted-foreground">(234)</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-block bg-emerald-50 text-primary text-xs px-3 py-1 rounded-full">
                  Kinyarwanda
                </span>
                <span className="inline-block bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full">
                  Ubwigize
                </span>
              </div>

              {/* CTA Button */}
              <Link
                to="/lessons"
                className="w-full bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                Ijinja <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick tips card */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-primary mb-1">
                Icyongereza cy'umunsi
              </p>
              <p className="text-xs text-primary/70">
                Niba wifuza, injira ubwenge buri munsi!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
