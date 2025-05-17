// App.tsx
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GateProvider } from "./lib/GateContext";
import ArkadiaNavigation from "./ArkadiaNavigation";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <GateProvider>
          <ArkadiaNavigation />
        </GateProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;