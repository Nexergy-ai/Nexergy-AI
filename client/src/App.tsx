import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import PublicHome from "@/pages/PublicHome";
import PrivateHome from "@/pages/PrivateHome";

function Router() {
  // Ruteo por hostname:
  //   privado.nexergy.ar  => PrivateHome  (protegido por Cloudflare Access + OTP)
  //   nexergy.ar (y cualquier otro) => PublicHome
  const isPrivateHost =
    typeof window !== "undefined" &&
    window.location.hostname === "privado.nexergy.ar";

  return (
    <Switch>
      <Route path={"/"} component={isPrivateHost ? PrivateHome : PublicHome} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
