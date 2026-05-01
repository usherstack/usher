import { Switch, Route, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import { Suspense, useEffect, lazy } from "react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Loader } from "@/components/shared/Loader";
import { useScrollRestore } from "@/hooks/useScrollRestore";
import { fetchProjects, queryKeys } from "@/hooks/useProjects";

const CursorEffect = lazy(() =>
  import("@/components/shared/CursorEffect").then((module) => ({
    default: module.CursorEffect,
  })),
);
const Chatbot = lazy(() =>
  import("@/components/features/Chatbot").then((module) => ({
    default: module.Chatbot,
  })),
);

const Home = lazy(() => import("@/pages/Home"));
const Services = lazy(() => import("@/pages/Services"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const ProjectDetails = lazy(() => import("@/pages/ProjectDetails"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes - prevents refetching on every page navigation
      staleTime: 5 * 60 * 1000,
      // Keep unused data in cache for 10 minutes for back navigation
      gcTime: 10 * 60 * 1000,
      // Don't refetch on window focus for this app
      refetchOnWindowFocus: false,
      // Retry failed requests once
      retry: 1,
    },
  },
});

// Component to prefetch initial data
function DataPrefetcher() {
  useEffect(() => {
    async function prefetchData() {
      try {
        await queryClient.fetchQuery({
          queryKey: queryKeys.projects,
          queryFn: fetchProjects,
        });
      } catch {
        // Silently fail - local fallback will be used
      }
    }

    prefetchData();
  }, []);

  return null;
}

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense
        fallback={
          <div className="min-h-[70vh] flex items-center justify-center text-sm text-muted-foreground">
            Loading page...
          </div>
        }
      >
        <Switch key={location}>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/portfolio/:id" component={ProjectDetails} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/terms" component={TermsOfService} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  // Enable scroll-to-top behavior on page refresh/load/navigation
  useScrollRestore();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="flex flex-col min-h-screen relative selection:bg-primary/30 selection:text-primary-foreground">
            <Loader />
            <Suspense fallback={null}>
              <CursorEffect />
            </Suspense>
            <Navbar />
            <main className="flex-1 w-full overflow-x-hidden">
              <Router />
            </main>
            <Footer />
            <Suspense fallback={null}>
              <Chatbot />
            </Suspense>
          </div>
          <DataPrefetcher />
          <Toaster position="bottom-right" theme="system" />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
