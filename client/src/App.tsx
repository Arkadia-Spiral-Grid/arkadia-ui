// app.tsx
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import "client/src/styles/arkadia-style-core.css"
<link rel="stylesheet" href="/path/to/arkadia.style.core.css" />
import "./index.css"

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Gateway from "@/pages/Gateway";
import ArkanaCommune from "@/pages/ArkanaCommune";
import EssentiaCore from "@/pages/EssentiaCore";
import SolspireCommand from "@/pages/SolspireCommand";
import LivingGate from "@/pages/LivingGate";
import CouncilChambers from "@/pages/CouncilChambers";
import DestinySequencer from "@/pages/DestinySequencer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/enter" component={LivingGate} />
      <Route path="/gateway" component={Gateway} />
      <Route path="/arkana" component={ArkanaCommune} />
      <Route path="/essentia" component={EssentiaCore} />
      <Route path="/solspire" component={SolspireCommand} />
      <Route path="/council" component={CouncilChambers} />
      <Route path="/destiny" component={DestinySequencer} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Future support: meta/title can be inserted here */}
        <main className="min-h-screen bg-background text-foreground transition-all duration-300 ease-in-out">
          <Toaster />
          <Router />
        </main>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
