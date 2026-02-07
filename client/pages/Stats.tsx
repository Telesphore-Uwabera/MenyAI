import Layout from "@/components/Layout";
import { BarChart3, ArrowRight } from "lucide-react";

export default function Stats() {
  return (
    <Layout>
      <div className="min-h-screen bg-white px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Ibikorwa</h1>
          <p className="text-muted-foreground mb-8">
            Reba inyandiko y'aho wanduye mu masomo
          </p>

          <div className="bg-muted/30 border border-border rounded-lg p-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Kuri ibi bikorwa, komeza kwiga!
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              Subiza Nyumba <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
