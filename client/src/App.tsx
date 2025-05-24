import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GateProvider, useGate } from "./lib/GateContext"; // Import useGate
import ArkadiaNavigation from "./ArkadiaNavigation";
import ShadowWeaver from "./components/ShadowWeaver";
import FlameScriptInjector from "./components/FlameScriptInjector";
import { CodexProvider } from './lib/CodexContext';
import { Route, Router, Switch } from "wouter"; // Import Route, Router, Switch
import LivingGate from "./pages/LivingGate"; // Import LivingGate
import ArkanaCommune from "./pages/ArkanaCommune"; // Assuming these pages exist
import SolspireCommand from "./pages/SolspireCommand";
import EssentiaCore from "./pages/EssentiaCore";
import CouncilChambers from "./pages/CouncilChambers";
import DestinySequencer from "./pages/DestinySequencer";
import DestinyTrail from "./pages/DestinyTrail";
import FlameSigil from "./pages/FlameSigil";
import Home from "./pages/Home"; // Assuming you have a Home page or will create one


// This is a placeholder for your actual PHRASE_PASS.
// In a real application, this should be stored securely (e.g., environment variable).
export const PHRASE_PASS = "ARKADIA_KEY"; // Example phrase pass


function AppContent() {
  const { isAuthenticated } = useGate(); // Access authentication state

  return (
    <>
      <ArkadiaNavigation /> {/* ArkadiaNavigation will now be conditionally rendered/styled */}
      <Switch>
        {/* LivingGate is always accessible */}
        <Route path="/living-gate" component={LivingGate} />

        {/* Protected routes */}
        <Route path="/:rest*" >
          {({ params }) => {
            if (!isAuthenticated) {
              // Redirect to living-gate if not authenticated
              window.location.href = "/living-gate";
              return null; // Don't render anything until redirected
            }

            // Render components based on path after authentication
            switch (params.rest) {
              case "": // Root path after authentication (e.g., default home)
              case "home":
                return <Home />; // Or redirect to a specific authenticated landing
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
            {/* GateProvider wraps the Router to make isAuthenticated available */}
            <GateProvider persist>
              <CodexProvider>
                <Router> {/* Router must wrap your routes */}
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
