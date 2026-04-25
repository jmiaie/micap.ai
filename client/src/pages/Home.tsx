import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { ArrowRight, CheckCircle2, Zap, Brain, Users, TrendingUp, ChevronDown, MessageCircle, X } from "lucide-react";

export default function Home() {
  const { user } = useAuth();
  const [showLeadMagnet, setShowLeadMagnet] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", resourceType: "assessment" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    { role: "assistant", content: "Hi! 👋 I'm here to answer questions about our AI consulting services. How can I help?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  const submitLeadMutation = trpc.leads.submit.useMutation();
  const featuredCaseStudies = trpc.caseStudies.featured.useQuery();

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitLeadMutation.mutateAsync({
        name: leadForm.name,
        email: leadForm.email,
        resourceType: leadForm.resourceType as "assessment" | "playbook" | "calculator",
      });

      toast.success("Thank you! Check your email for your resource.");
      setShowLeadMagnet(false);
      setLeadForm({ name: "", email: "", resourceType: "assessment" });
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setChatInput("");
    setIsChatLoading(true);

    // Simulate AI response with common questions
    setTimeout(() => {
      let response = "";
      const lowerInput = userMessage.toLowerCase();

      if (lowerInput.includes("price") || lowerInput.includes("cost")) {
        response = "Our pricing is custom based on project scope and complexity. Digital Assets & Employees typically start at $25k-$50k depending on requirements. I'd recommend booking a strategy call to discuss your specific needs and get an accurate quote.";
      } else if (lowerInput.includes("timeline") || lowerInput.includes("how long")) {
        response = "Most Digital Assets & Employees implementations take 4-12 weeks. We start with a 2-week discovery phase, followed by 2-4 weeks of development, and then deployment and optimization. The timeline depends on your system complexity.";
      } else if (lowerInput.includes("private") || lowerInput.includes("security") || lowerInput.includes("data")) {
        response = "We specialize in private AI infrastructure using OpenClaw. Your data stays on your hardware, behind your firewall, under your control. We also offer cloud solutions with enterprise-grade encryption and strict access controls.";
      } else if (lowerInput.includes("roi") || lowerInput.includes("return")) {
        response = "Most clients see 30-50% reduction in manual labor costs within 90 days. Additional benefits include faster response times, improved accuracy, and 24/7 operational capability. We define specific KPIs at project start to track measurable success.";
      } else if (lowerInput.includes("support") || lowerInput.includes("after")) {
        response = "All engagements include comprehensive team training, documentation, and 90 days of post-deployment support. We also offer ongoing optimization retainers to ensure your digital agents evolve with your business needs.";
      } else if (lowerInput.includes("digital assets") || lowerInput.includes("chatbot")) {
        response = "Digital Assets & Employees are autonomous systems that can make decisions, coordinate with other agents, and learn from interactions. Unlike traditional chatbots, they proactively handle complex workflows, manage data, and integrate with your business systems.";
      } else {
        response = "Great question! For more detailed information about our services, I'd recommend scheduling a strategy call with Jeff. He can dive deep into your specific needs and create a custom solution. Would you like to book a call?";
      }

      setChatMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsChatLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663473200649/CWetRtUvMZQH6B24jA9kkb/micap-logo-branded-TwtPYDrZorgQyNFzxYFZTZ.webp"
              alt="Micap AI"
              className="h-10"
            />
          </a>
          <div className="flex gap-6">
            <a href="#services" className="hover:text-cyan-400 transition">Services</a>
            <a href="#showcase" className="hover:text-cyan-400 transition">Showcase</a>
            <a href="/blog" className="hover:text-cyan-400 transition">Blog</a>
            <Button onClick={() => setShowLeadMagnet(true)} className="bg-cyan-500 hover:bg-cyan-600">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          AI-Engineered Solutions for Enterprise Transformation
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Strategic consulting, custom AI implementations, and digital transformation services designed for forward-thinking organizations.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => setShowLeadMagnet(true)} size="lg" className="bg-cyan-500 hover:bg-cyan-600">
            Explore Services <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline" className="border-slate-600 hover:bg-slate-800">
            View Case Studies
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Brain,
              title: "AI Consulting Engagements",
              description: "Strategic guidance on AI integration, implementation roadmaps, and technology selection tailored to your business needs.",
            },
            {
              icon: Zap,
              title: "Digital Assets & Employees",
              description: "Deploy intelligent digital agents and autonomous systems that amplify your team's capabilities and drive operational efficiency.",
            },
            {
              icon: TrendingUp,
              title: "Digital Transformations",
              description: "Comprehensive business transformation consulting ($50k+) to modernize operations and drive competitive advantage.",
            },
          ].map((service, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-cyan-500/50 transition">
              <service.icon className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-slate-300">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 p-6 bg-slate-800/30 border border-slate-700 rounded-lg text-center">
          <p className="text-slate-300">
            <strong>Pricing:</strong> Engagement costs reflect the scope, complexity, and timeline of your specific project. We provide transparent, custom quotes during your discovery call.
          </p>
        </div>
      </section>

      {/* Featured Case Studies */}
      {featuredCaseStudies.data && featuredCaseStudies.data.length > 0 && (
        <section id="showcase" className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Client Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCaseStudies.data.map((caseStudy) => (
              <a
                key={caseStudy.id}
                href={`/case-study/${caseStudy.slug}`}
                className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden hover:border-cyan-500/50 transition group"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition">{caseStudy.clientName}</h3>
                  <p className="text-sm text-cyan-400 mb-3">{caseStudy.industry}</p>
                  <p className="text-slate-300 line-clamp-3">{caseStudy.challenge}</p>
                  <div className="mt-4 text-cyan-400 flex items-center gap-2">
                    Read More <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="/case-studies" className="text-cyan-400 hover:text-cyan-300 flex items-center justify-center gap-2">
              View All Case Studies <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      )}

      {/* Success Metrics Dashboard */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Proven Results</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              metric: "40%",
              label: "Average Efficiency Gain",
              description: "Operational improvements across all client engagements",
            },
            {
              metric: "$15k",
              label: "Average Monthly Savings",
              description: "Cost reduction through automation and optimization",
            },
            {
              metric: "12 weeks",
              label: "Average Implementation",
              description: "From discovery to full deployment and training",
            },
            {
              metric: "100%",
              label: "Data Sovereignty",
              description: "Private infrastructure keeps your data secure",
            },
          ].map((item, i) => (
            <div key={i} className="bg-gradient-to-br from-cyan-500/10 to-slate-800/50 border border-cyan-500/30 rounded-lg p-8 text-center hover:border-cyan-500/60 transition">
              <div className="text-5xl font-bold text-cyan-400 mb-2">{item.metric}</div>
              <h3 className="text-lg font-bold mb-2">{item.label}</h3>
              <p className="text-sm text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote: "Our Digital Assets & Employees deployment handles 85% of customer inquiries autonomously. The ROI was immediate, and the technical execution was flawless.",
              author: "David R.",
              role: "Founder, FinTech Startup",
              metric: "$18k/mo saved in support costs",
            },
            {
              quote: "The Digital Transformation engagement was a turning point for our firm. Jeff didn't just give us tools; he gave us a new way to operate that saved us hundreds of hours monthly.",
              author: "Sarah K.",
              role: "COO, Regional Logistics",
              metric: "45% increase in operational efficiency",
            },
            {
              quote: "As a CEO, I needed someone who understood the P&L as well as the Python. Jeff's MBA background made the strategy sessions incredibly productive.",
              author: "Marcus T.",
              role: "CEO, Manufacturing Group",
              metric: "Full AI roadmap delivered in 2 weeks",
            },
            {
              quote: "The private AI agent network gives us the power of LLMs without any of the privacy concerns. It's the perfect enterprise solution.",
              author: "Elena G.",
              role: "Head of IT, Legal Services",
              metric: "100% data sovereignty maintained",
            },
          ].map((testimonial, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-cyan-400">★</span>
                ))}
              </div>
              <p className="text-slate-300 mb-6 italic">"{testimonial.quote}"</p>
              <div className="border-t border-slate-700 pt-4">
                <p className="font-bold text-white">{testimonial.author}</p>
                <p className="text-sm text-slate-400 mb-3">{testimonial.role}</p>
                <div className="inline-block px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-xs text-cyan-400 font-medium">
                  {testimonial.metric}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Comparison Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Why Digital Assets & Employees?</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-4 px-4 font-bold text-white">Feature</th>
                <th className="text-center py-4 px-4 font-bold text-cyan-400">Digital Assets & Employees</th>
                <th className="text-center py-4 px-4 font-bold text-slate-400">Traditional Chatbots</th>
                <th className="text-center py-4 px-4 font-bold text-slate-400">Generic AI Solutions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "Autonomous Decision Making", dae: "✓", chatbot: "✗", generic: "◐" },
                { feature: "Multi-Agent Coordination", dae: "✓", chatbot: "✗", generic: "◐" },
                { feature: "Custom Business Logic", dae: "✓", chatbot: "◐", generic: "✓" },
                { feature: "Real-time Learning", dae: "✓", chatbot: "✗", generic: "◐" },
                { feature: "Private Deployment Option", dae: "✓", chatbot: "✗", generic: "✗" },
                { feature: "Executive Consulting Included", dae: "✓", chatbot: "✗", generic: "✗" },
                { feature: "ROI Optimization", dae: "✓", chatbot: "◐", generic: "◐" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition">
                  <td className="py-4 px-4 text-white font-medium">{row.feature}</td>
                  <td className="text-center py-4 px-4 text-cyan-400 font-bold">{row.dae}</td>
                  <td className="text-center py-4 px-4 text-slate-400">{row.chatbot}</td>
                  <td className="text-center py-4 px-4 text-slate-400">{row.generic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center text-slate-400 text-sm mt-6">✓ = Full support | ◐ = Partial support | ✗ = Not available</p>
      </section>

      {/* Expanded FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              question: "How do Digital Assets & Employees differ from traditional chatbots?",
              answer: "Digital Assets & Employees are autonomous systems that can make decisions, coordinate with other agents, and learn from interactions. Unlike traditional chatbots that respond to queries, they proactively handle complex workflows, manage data, and integrate with your business systems.",
            },
            {
              question: "Can Digital Assets & Employees be customized for my specific industry?",
              answer: "Absolutely. We build custom digital agents tailored to your industry's unique workflows, compliance requirements, and business logic. Whether you're in finance, healthcare, legal, or manufacturing, we design agents that understand your domain.",
            },
            {
              question: "What kind of integration is required with existing systems?",
              answer: "We handle all integration work. Our digital agents can connect to your CRM, ERP, databases, APIs, and communication platforms. Most integrations are completed within 2-4 weeks depending on system complexity.",
            },
            {
              question: "How is my data secured with Digital Assets & Employees?",
              answer: "We offer both cloud and private deployment options. For maximum security, we deploy agents on your own infrastructure using OpenClaw, ensuring your data never leaves your systems. All deployments include enterprise-grade encryption and access controls.",
            },
            {
              question: "What kind of ROI can I expect from Digital Assets & Employees?",
              answer: "Most clients see 30-50% reduction in manual labor costs within 90 days. Additional benefits include faster response times, improved accuracy, and 24/7 operational capability. We define specific KPIs at project start to track measurable success.",
            },
            {
              question: "How long does implementation take?",
              answer: "Typical implementations take 4-12 weeks depending on complexity. We start with a 2-week discovery phase, followed by 2-4 weeks of development, testing, and deployment. Ongoing optimization continues post-launch.",
            },
            {
              question: "Do you provide training and ongoing support?",
              answer: "Yes. All engagements include comprehensive team training, documentation, and 90 days of post-deployment support. We also offer ongoing optimization retainers to ensure your digital agents evolve with your business needs.",
            },
          ].map((faq, i) => (
            <div key={i} className="border border-slate-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-slate-800/50 transition bg-slate-800/30"
              >
                <span className="text-left font-bold text-white">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-cyan-400 transition-transform ${expandedFAQ === i ? "rotate-180" : ""}`} />
              </button>
              {expandedFAQ === i && (
                <div className="px-6 py-4 bg-slate-800/20 border-t border-slate-700">
                  <p className="text-slate-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* About Founder Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Meet Your Consultant</h2>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="flex items-center justify-center">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663473200649/qqIJMdGWyEJEpnWA.webp"
                alt="Founder"
                className="rounded-lg w-full max-w-sm shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-4">Strategic AI Leadership</h3>
              <p className="text-slate-300 mb-6">
                With deep expertise in AI engineering, business strategy, and digital transformation, I bring a unique perspective to enterprise consulting. My approach combines technical excellence with business acumen to deliver measurable results.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-cyan-400 mb-2">MBA</h4>
                  <p className="text-slate-300">
                    Advanced Finance, Blockchain, Entrepreneurship, & Managing Software Development — providing strategic insight into fintech, decentralized systems, business innovation, and technology leadership.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-cyan-400 mb-2">Master of Science in AI Engineering (MSAIE)</h4>
                  <p className="text-slate-300">
                    Currently pursuing advanced AI engineering through Quantic School of Business and Technology, staying at the forefront of AI innovation and best practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section Before Modal */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Operations?</h2>
        <p className="text-xl text-slate-300 mb-8">Let's discuss how Digital Assets & Employees can drive measurable impact for your organization.</p>
        <Button onClick={() => setShowLeadMagnet(true)} size="lg" className="bg-cyan-500 hover:bg-cyan-600">
          Schedule Your Strategy Call <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </section>

      {/* Lead Magnet Modal */}
      <Dialog open={showLeadMagnet} onOpenChange={setShowLeadMagnet}>
        <DialogContent className="bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle>Unlock Your Free AI Resource</DialogTitle>
            <DialogDescription>
              Choose which resource would be most valuable for your organization.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLeadSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input
                placeholder="Your name"
                value={leadForm.name}
                onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                required
                className="bg-slate-800 border-slate-700"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={leadForm.email}
                onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                required
                className="bg-slate-800 border-slate-700"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Choose Your Resource</label>
              <Select value={leadForm.resourceType} onValueChange={(value) => setLeadForm({ ...leadForm, resourceType: value })}>
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="assessment">AI Readiness Assessment</SelectItem>
                  <SelectItem value="playbook">Digital Transformation Playbook</SelectItem>
                  <SelectItem value="calculator">AI ROI Calculator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-cyan-500 hover:bg-cyan-600"
            >
              {isSubmitting ? "Submitting..." : "Get Resource"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Live Chat Widget */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 z-40"
          title="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {showChat && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] bg-slate-900 border border-slate-700 rounded-lg shadow-2xl flex flex-col z-40 max-h-[600px]">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-4 flex justify-between items-center rounded-t-lg">
            <h3 className="font-bold text-white">Micap AI Support</h3>
            <button
              onClick={() => setShowChat(false)}
              className="text-white hover:bg-cyan-700 p-1 rounded transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-cyan-500 text-white rounded-br-none"
                      : "bg-slate-800 text-slate-300 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-300 px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleChatSubmit} className="border-t border-slate-700 p-4 flex gap-2">
            <Input
              type="text"
              placeholder="Ask a question..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={isChatLoading}
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
            />
            <Button
              type="submit"
              disabled={isChatLoading || !chatInput.trim()}
              className="bg-cyan-500 hover:bg-cyan-600 px-4"
            >
              Send
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
