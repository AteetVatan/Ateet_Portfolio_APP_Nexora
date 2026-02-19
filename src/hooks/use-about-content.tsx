
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type AboutContent = {
  id: string;
  name: string;
  title: string;
  tagline: string;
  bio: string;
  expertise: string[];
  cta_footer: string;
  created_at: string;
  updated_at: string;
};

const FALLBACK_ABOUT_CONTENT: AboutContent = {
  id: "fallback",
  name: "Ateet Bahamani",
  title: 'AI Architect and Agentic AI Engineer',
  tagline: 'I build AI systems that work in the real world, not just in demos.',
  bio: `I'm Ateet Bahamani, an AI Architect and Agentic AI Engineer based in Essen, Germany. I design and ship deterministic, auditable AI platforms. That means multi-agent workflows, RAG pipelines, and LLM-driven automation built for real-world reliability, not "demo-day vibes."

Right now, I'm building execution-driven agent systems where you can clearly answer:
- What did the system do?
- Why did it do it?
- Which model, tool, or data influenced the outcome?
- How confident is it, and what failed safely when things went wrong?

At the architecture level, I obsess over the stuff that makes agentic systems usable in production: execution order, context propagation, budget control, fault isolation, confidence scoring, and multi-model validation. That way your system behaves like software, not a dice roll.

My work blends hands-on Python engineering with system design:
Backend and AI infra: Python, FastAPI, Pydantic, async patterns
Data + memory: PostgreSQL, Supabase, vector DBs (Chroma, FAISS)
Agent frameworks: LangChain, LangGraph, AutoGen
NLP pipelines: summarization, embeddings, translation, clustering, structured outputs

And because "it worked once" is not a strategy, I put heavy focus on LLMOps:
- Evaluation and quality controls (so you can measure reliability, not guess it)
- Observability and tracing (so debugging isn't a horror movie)
- CI/CD, prompt versioning, and rollout safety
- Cost controls (so scaling doesn't silently bankrupt the product)

Before going deep into AI, I spent 15+ years building enterprise systems and leading modernization initiatives, especially large migrations across AWS + modern frontends, where shipping cleanly, safely, and consistently actually mattered. That background is why I'm ruthless about making AI systems predictable, traceable, and scalable.

If you're building an agentic AI product and want it to be auditable, production-ready, and engineering-grade, I'm your person.`,
  expertise: [
    "Agentic AI Systems",
    "LLM Integration",
    "RAG Pipelines",
    "Multi-Agent Workflows",
    "LLMOps",
    "Python and FastAPI",
    "Full-Stack Development",
    "Cloud Engineering (AWS)",
    "System Architecture",
    "Observability and Tracing",
  ],
  cta_footer: "Building an agentic AI product?\nLet's make it auditable, production-ready, and engineering-grade.",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const useAboutContent = () => {
  return useQuery<AboutContent | null>({
    queryKey: ["about-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("about_content")
        .select("*")
        .single();

      if (error) {
        console.error("Error fetching about content:", error);
        // Return fallback content instead of null when DB has no data
        return FALLBACK_ABOUT_CONTENT;
      }

      return data as AboutContent;
    },
  });
};
