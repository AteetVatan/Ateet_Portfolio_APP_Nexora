
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageViewTracker from "./components/PageViewTracker";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./contexts/ThemeContext";
import { prefetchAllBlogs } from "./hooks/use-static-blog-posts";

import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import MasxAI from "./pages/MasxAI";
import MasxAICaseStudy from "./pages/MasxAICaseStudy";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import CV from "./pages/CV";
import AiNews from "./pages/AiNews";
import Services from "./pages/Services";
import BusinessCard from "./pages/BusinessCard";

// Prefetch all blogs at app startup for static-like generation
prefetchAllBlogs().catch(err => console.error("Error prefetching blogs:", err));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <PageViewTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/masx-ai" element={<MasxAI />} />
            <Route path="/masx-ai/case-study" element={<MasxAICaseStudy />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/ai-news" element={<AiNews />} />
            <Route path="/services" element={<Services />} />
            <Route path="/business-card" element={<BusinessCard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
