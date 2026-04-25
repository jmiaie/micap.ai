import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import { useLocation } from "wouter";

export default function Blog() {
  const [, navigate] = useLocation();
  const { data: posts, isLoading } = trpc.blog.list.useQuery({ limit: 10 });

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
            <a href="/blog" className="text-cyan-400">Blog</a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">AI & Consulting Insights</h1>
        <p className="text-xl text-slate-300">
          Thoughts on AI engineering, digital transformation, and enterprise technology.
        </p>
      </section>

      {/* Blog Posts */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="text-center text-slate-400">Loading posts...</div>
        ) : posts && posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-cyan-500/50 transition cursor-pointer group"
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
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
                <h2 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition">{post.title}</h2>
                <p className="text-slate-300 mb-4">{post.excerpt || post.content.substring(0, 150)}...</p>
                <div className="flex items-center gap-2 text-cyan-400 group-hover:gap-3 transition">
                  Read More <ArrowRight className="w-4 h-4" />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-400">
            <p className="mb-4">No blog posts yet. Check back soon!</p>
            <Button onClick={() => navigate("/")} variant="outline" className="border-slate-600">
              Back to Home
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
