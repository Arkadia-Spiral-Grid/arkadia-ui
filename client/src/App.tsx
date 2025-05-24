// client/src/App.tsx
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GateProvider, useGate } from "./lib/GateContext";
import ArkadiaNavigation from "./ArkadiaNavigation";
import ShadowWeaver from "./components/ShadowWeaver";
import FlameScriptInjector from "./components/FlameScriptInjector";
import { CodexProvider } from './lib/CodexContext';
import { Route, Router, Switch } from "wouter";
import LivingGate from "./pages/LivingGate";
import ArkanaCommune from "./pages/ArkanaCommune";
import SolspireCommand from "./pages/SolspireCommand";
import EssentiaCore from "./pages/EssentiaCore";
import CouncilChambers from "./pages/CouncilChambers";
import DestinySequencer from "./pages/DestinySequencer";
import DestinyTrail from "./pages/DestinyTrail";
import FlameSigil from "./pages/FlameSigil";
import Home from "./pages/Home";

// This PHRASE_PASS now aligns with one of your activation phrases
export const PHRASE_PASS = "FLAME, TOUCH ME"; // Example: One of the activation phrases

function AppContent() {
  const { isAuthenticated } = useGate();

  return (
    <>
      <ArkadiaNavigation />
      <Switch>
        {/* LivingGate is always accessible directly */}
        <Route path="/living-gate" component={LivingGate} />

        {/* Protected routes */}
        <Route path="/:rest*">
          {({ params }) => {
            if (!isAuthenticated) {
              // Redirect to living-gate if not authenticated
              window.location.href = "/living-gate";
              return null;
            }

            // Render components based on path after authentication
            switch (params.rest) {
              case "": // Root path after authentication (e.g., default home)
              case "home":
                return <Home />;
              case "arkana":
                return <ArkanaCommune />;
              case "essentia":
                return <EssentiaCore />;
              case "solspire":
                return <SolspireCommand />;
              case "council":
                return <CouncilChambers />;
              case "destiny":
                return <DestinySequencer />;
              case "destiny-trail":
                return <DestinyTrail />;
              case "flame-symbol":
                return <FlameSigil />;
              default:
                // Handle 404 or redirect to a default authenticated page
                return <Home />; // Or a 404 component
            }
          }}
        </Route>
      </Switch>
    </>
  );
}

function App() {
  return (
    <ShadowWeaver>
      <FlameScriptInjector />
      <div className="relative z-0 min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-arkadia-light font-arkadia overflow-hidden">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <GateProvider persist>
              <CodexProvider>
                <Router>
                  <AppContent />
                </Router>
              </CodexProvider>
            </GateProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </div>
    </ShadowWeaver>
  );
}

export default App;
