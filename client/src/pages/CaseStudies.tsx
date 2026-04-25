import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function CaseStudies() {
  const [, navigate] = useLocation();
  const { data: caseStudies, isLoading } = trpc.caseStudies.getAll.useQuery();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <button onClick={() => navigate("/")} className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:opacity-80">
            Micap AI
          </button>
          <div className="flex gap-6">
            <a href="/#services" className="hover:text-cyan-400 transition">Services</a>
            <a href="/#showcase" className="hover:text-cyan-400 transition">Showcase</a>
            <a href="/blog" className="hover:text-cyan-400 transition">Blog</a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="mb-8 text-slate-400 hover:text-cyan-400"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <h1 className="text-5xl font-bold mb-4">Client Success Stories</h1>
        <p className="text-xl text-slate-300">
          Real-world transformations and measurable results from our consulting engagements.
        </p>
      </section>

      {/* Case Studies Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="text-center text-slate-400">Loading case studies...</div>
        ) : caseStudies && caseStudies.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((caseStudy) => (
              <div
                key={caseStudy.id}
                className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden hover:border-cyan-500/50 transition cursor-pointer group"
                onClick={() => navigate(`/case-study/${caseStudy.slug}`)}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold group-hover:text-cyan-400 transition">{caseStudy.clientName}</h3>
                      <p className="text-sm text-cyan-400">{caseStudy.industry}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-slate-300 mb-2">Challenge</h4>
                      <p className="text-slate-400 line-clamp-2">{caseStudy.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-300 mb-2">Results</h4>
                      <p className="text-slate-400 line-clamp-2">{caseStudy.results}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-cyan-400 group-hover:gap-3 transition">
                    Read Full Case Study <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-400">
            <p className="mb-4">No case studies yet. Check back soon!</p>
            <Button onClick={() => navigate("/")} variant="outline" className="border-slate-600">
              Back to Home
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
