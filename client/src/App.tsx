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
import { Route, Router, Switch, Redirect, useLocation } from "wouter"; // Import useLocation
import LivingGate from "./pages/LivingGate";
import ArkanaCommune from "./pages/ArkanaCommune";
import SolspireCommand from "./pages/SolspireCommand";
import EssentiaCore from "./pages/EssentiaCore";
import CouncilChambers from "./pages/CouncilChambers";
import DestinySequencer from "./pages/DestinySequencer";
import DestinyTrail from "./pages/DestinyTrail";
import FlameSymbolPage from "./pages/FlameSymbolPage";
import Home from "./pages/Home";
import NotFound from "./pages/not-found";
import InnerSanctum from "./pages/InnerSanctum"; // Import the new InnerSanctum page
import CosmicPathwayLine from "./components/CosmicPathwayLine"; // NEW: Import the CosmicPathwayLine

export const PHRASE_PASS = "FLAME, TOUCH ME"; // Your sign-in phrase!

function AppContent() {
  const { isAuthenticated } = useGate();
  const [location] = useLocation(); // Get current location for conditional rendering

  return (
    <>
      {/* ArkadiaNavigation is now rendered here, its visibility controlled internally */}
      <ArkadiaNavigation /> 
      
      {/* Conditionally render CosmicPathwayLine only on the Living Gate page */}
      {location === "/living-gate" && <CosmicPathwayLine />}

      <Switch>
        {/* Home page (root path) is always accessible without authentication */}
        <Route path="/" component={Home} />

        {/* LivingGate is accessible directly, or as a redirect target */}
        <Route path="/living-gate" component={LivingGate} />

        {/* Inner Sanctum: This is the new primary authenticated hub */}
        <Route path="/inner-sanctum">
          {isAuthenticated ? <InnerSanctum /> : <Redirect to="/living-gate" />}
        </Route>

        {/* All other core pages are now accessed from/through the Inner Sanctum
            and are still protected */}
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
      {/* The main container div for the entire application, now with padding-left and new background */}
      {/* Background gradient adjusted to use new cosmic colors for a deeper, less blue feel */}
      <div className="relative z-0 min-h-screen bg-gradient-to-br from-deep-space via-nebula-purple to-cosmic-black text-arkadia-light font-arkadia overflow-hidden pl-16">
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
