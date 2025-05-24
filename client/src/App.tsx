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
import { Route, Router, Switch, Redirect } from "wouter"; // Import Redirect
import LivingGate from "./pages/LivingGate";
import ArkanaCommune from "./pages/ArkanaCommune";
import SolspireCommand from "./pages/SolspireCommand";
import EssentiaCore from "./pages/EssentiaCore";
import CouncilChambers from "./pages/CouncilChambers";
import DestinySequencer from "./pages/DestinySequencer";
import DestinyTrail from "./pages/DestinyTrail";
import FlameSymbolPage from "./pages/FlameSymbolPage"; // Corrected import for FlameSymbolPage
import Home from "./pages/Home";
import NotFound from "./pages/not-found"; // Ensure NotFound is imported

// This PHRASE_PASS now aligns with one of your activation phrases
export const PHRASE_PASS = "FLAME, TOUCH ME"; // Example: One of the activation phrases

function AppContent() {
  const { isAuthenticated } = useGate();

  return (
    <>
      {/* ArkadiaNavigation is now rendered here, its visibility controlled internally */}
      <ArkadiaNavigation /> 

      <Switch>
        {/* Home page is always accessible without authentication */}
        <Route path="/" component={Home} />

        {/* LivingGate is accessible directly, or as a redirect target */}
        <Route path="/living-gate" component={LivingGate} />

        {/* Protected Routes: If not authenticated, redirect to LivingGate */}
        <Route path="/arkana">
          {isAuthenticated ? <ArkanaCommune /> : <Redirect to="/living-gate" />}
        </Route>
        <Route path="/essentia">
          {isAuthenticated ? <EssentiaCore /> : <Redirect to="/living-gate" />}
        </Route>
        <Route path="/solspire">
          {isAuthenticated ? <SolspireCommand /> : <Redirect to="/living-gate" />}
        </Route>
        <Route path="/council">
          {isAuthenticated ? <CouncilChambers /> : <Redirect to="/living-gate" />}
        </Route>
        <Route path="/destiny">
          {isAuthenticated ? <DestinySequencer /> : <Redirect to="/living-gate" />}
        </Route>
        <Route path="/destiny-trail">
          {isAuthenticated ? <DestinyTrail /> : <Redirect to="/living-gate" />}
        </Route>
        <Route path="/flame-symbol">
          {isAuthenticated ? <FlameSymbolPage /> : <Redirect to="/living-gate" />}
        </Route>

        {/* Fallback route for any other path not explicitly defined */}
        <Route>
          {/* If authenticated, show 404. If not, redirect to LivingGate. */}
          {isAuthenticated ? <NotFound /> : <Redirect to="/living-gate" />}
        </Route>
      </Switch>
    </>
  );
}

function App() {
  return (
    <ShadowWeaver>
      <FlameScriptInjector />
      {/* The main container div for the entire application */}
      <div className="relative z-0 min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-arkadia-light font-arkadia overflow-hidden">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <GateProvider persist>
              <CodexProvider>
                <Router> {/* Wouter's Router must wrap all Route components */}
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
