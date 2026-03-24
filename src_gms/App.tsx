import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Layout } from "@/components/layout/Layout";
import { JoinModalProvider } from "@/contexts/JoinModalContext";
import { JoinModal } from "@/components/JoinModal";

import Home from "@/pages/Home";
import Subscription from "@/pages/Subscription";
import Events from "@/pages/Events";
import Testimonials from "@/pages/Testimonials";
import AISupport from "@/pages/AISupport";
import IgnitionSummit from "@/pages/IgnitionSummit";
import Policy from "@/pages/Policy";
import Blog from "@/pages/Blog";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/subscription" component={Subscription} />
        <Route path="/events" component={Events} />
        <Route path="/testimonials" component={Testimonials} />
        <Route path="/ai-support" component={AISupport} />
        <Route path="/ignition-summit" component={IgnitionSummit} />
        <Route path="/policy" component={Policy} />
        <Route path="/blog" component={Blog} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <JoinModalProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <JoinModal />
        </JoinModalProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
