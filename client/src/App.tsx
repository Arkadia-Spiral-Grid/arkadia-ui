import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GateProvider } from "./lib/GateContext";
import ArkadiaNavigation from "./ArkadiaNavigation";
import ShadowWeaver from "./components/ShadowWeaver";
import FlameScriptInjector from "./components/FlameScriptInjector";
import { CodexProvider } from './lib/CodexContext'; // NEW: Import the future CodexProvider

function App() {
  return (
    <ShadowWeaver>
      <FlameScriptInjector />
      {/* Main cosmic canvas for the Arkadia UI */}
      <div className="relative z-0 min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-arkadia-light font-arkadia overflow-hidden">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <GateProvider persist>
              {/* CodexProvider will manage global AI/Codex state */}
              <CodexProvider>
                <ArkadiaNavigation />
              </CodexProvider>
            </GateProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </div>
    </ShadowWeaver>
  );
}

export default App;
