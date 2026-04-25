import { useRoute, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Streamdown } from "streamdown";
import { ArrowLeft, Quote } from "lucide-react";

export default function CaseStudy() {
  const [match, params] = useRoute("/case-study/:slug");
  const [, navigate] = useLocation();
  const { data: caseStudy, isLoading } = trpc.caseStudies.getBySlug.useQuery(params?.slug || "", {
    enabled: !!params?.slug,
  });

  if (!match) return null;

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

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 py-16">
        {isLoading ? (
          <div className="text-center text-slate-400">Loading case study...</div>
        ) : caseStudy ? (
          <>
            <Button
              onClick={() => navigate("/case-studies")}
              variant="ghost"
              className="mb-8 text-slate-400 hover:text-cyan-400"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Case Studies
            </Button>

            <header className="mb-12">
              <p className="text-cyan-400 text-sm font-semibold mb-2">{caseStudy.industry}</p>
              <h1 className="text-5xl font-bold mb-4">{caseStudy.clientName}</h1>
              <p className="text-xl text-slate-300">{caseStudy.challenge}</p>
            </header>

            <div className="grid md:grid-cols-3 gap-8 mb-12 bg-slate-800/30 p-8 rounded-lg border border-slate-700">
              <div>
                <h3 className="text-sm font-semibold text-slate-400 mb-2">INDUSTRY</h3>
                <p className="text-lg font-bold">{caseStudy.industry}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-400 mb-2">ENGAGEMENT TYPE</h3>
                <p className="text-lg font-bold">Consulting & Implementation</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-400 mb-2">OUTCOME</h3>
                <p className="text-lg font-bold text-cyan-400">Successful Transformation</p>
              </div>
            </div>

            <div className="space-y-12">
              <section>
                <h2 className="text-3xl font-bold mb-4">The Challenge</h2>
                <div className="prose prose-invert max-w-none">
                  <Streamdown>{caseStudy.challenge}</Streamdown>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Our Solution</h2>
                <div className="prose prose-invert max-w-none">
                  <Streamdown>{caseStudy.solution}</Streamdown>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Results & Impact</h2>
                <div className="prose prose-invert max-w-none">
                  <Streamdown>{caseStudy.results}</Streamdown>
                </div>
              </section>

              {caseStudy.metrics && (
                <section>
                  <h2 className="text-3xl font-bold mb-4">Key Metrics</h2>
                  <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
                    <Streamdown>{caseStudy.metrics}</Streamdown>
                  </div>
                </section>
              )}

              {caseStudy.testimonial && (
                <section className="bg-slate-800/50 border-l-4 border-cyan-500 p-8 rounded-lg">
                  <div className="flex gap-4">
                    <Quote className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-lg italic mb-4">{caseStudy.testimonial}</p>
                      <div>
                        <p className="font-semibold">{caseStudy.testimonialAuthor}</p>
                        <p className="text-sm text-slate-400">{caseStudy.testimonialTitle}</p>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>

            <div className="mt-16 pt-8 border-t border-slate-700">
              <Button
                onClick={() => navigate("/case-studies")}
                variant="outline"
                className="border-slate-600 hover:bg-slate-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Case Studies
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-slate-400 mb-4">Case study not found</p>
            <Button onClick={() => navigate("/case-studies")} variant="outline" className="border-slate-600">
              Back to Case Studies
            </Button>
          </div>
        )}
      </article>
    </div>
  );
}
