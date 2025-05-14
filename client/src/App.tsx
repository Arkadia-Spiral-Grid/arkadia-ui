import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
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
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
