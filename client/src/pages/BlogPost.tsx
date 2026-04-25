import { useRoute, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Streamdown } from "streamdown";
import { Calendar, User, ArrowLeft } from "lucide-react";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const [, navigate] = useLocation();
  const { data: post, isLoading } = trpc.blog.getBySlug.useQuery(params?.slug || "", {
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
      <article className="max-w-3xl mx-auto px-4 py-16">
        {isLoading ? (
          <div className="text-center text-slate-400">Loading post...</div>
        ) : post ? (
          <>
            <Button
              onClick={() => navigate("/blog")}
              variant="ghost"
              className="mb-8 text-slate-400 hover:text-cyan-400"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>

            <header className="mb-8">
              <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">{post.category}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Coming soon"}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
              {post.excerpt && (
                <p className="text-xl text-slate-300">{post.excerpt}</p>
              )}
            </header>

            <div className="prose prose-invert max-w-none">
              <Streamdown>{post.content}</Streamdown>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-700">
              <Button
                onClick={() => navigate("/blog")}
                variant="outline"
                className="border-slate-600 hover:bg-slate-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Posts
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-slate-400 mb-4">Post not found</p>
            <Button onClick={() => navigate("/blog")} variant="outline" className="border-slate-600">
              Back to Blog
            </Button>
          </div>
        )}
      </article>
    </div>
  );
}
