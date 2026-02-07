import { useState } from 'react';
import Layout from '@/components/Layout';
import { ChevronLeft, Bookmark } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  image: string;
  category: string;
}

export default function Lessons() {
  const [selectedLevel] = useState('Ikirenga 1');

  const lessons: Lesson[] = [
    {
      id: 1,
      title: 'Hitamo Icyciro',
      image: '🌾',
      category: 'Amasomo',
    },
    {
      id: 2,
      title: 'Gahunda y\'Amasomo',
      image: '👨‍👩‍👧‍👦',
      category: 'Ubwigize',
    },
    {
      id: 3,
      title: 'Imirimo y\'Amasomo',
      image: '🏃',
      category: 'Ubwigize',
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Amasomo</h1>
              <p className="text-xs text-muted-foreground">Kinyarwanda</p>
            </div>
          </div>

          {/* Level selector */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                {selectedLevel}
              </h2>
              <button className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full hover:bg-muted/80 transition-colors">
                Kugira Nabi
              </button>
            </div>

            {/* Lessons grid */}
            <div className="space-y-4">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center flex-shrink-0 text-3xl">
                      {lesson.image}
                    </div>

                    {/* Content */}
                    <div className="flex-1 py-4 pr-4">
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Urwego rwacu: Ikirenga 1
                      </p>
                    </div>

                    {/* Bookmark icon */}
                    <div className="flex items-center justify-center pr-4">
                      <Bookmark className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-8"></div>

          {/* Hitamo Icyciro section */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Hitamo Icyciro
            </h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <button
                  key={i}
                  className="w-full p-4 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg text-left hover:border-primary/40 hover:bg-primary/15 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        Ikirenga {i}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {12 - (i - 1) * 3} amasomo
                      </p>
                    </div>
                    <div className="text-2xl">📚</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
