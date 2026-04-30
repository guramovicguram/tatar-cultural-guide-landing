
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import Kazan from "./pages/Kazan";
import KazanKremlin from "./pages/KazanKremlin";
import StaroTatarskayaSloboda from "./pages/StaroTatarskayaSloboda";
import Sviyazhsk from "./pages/Sviyazhsk";
import KulSharif from "./pages/KulSharif";
import Suyumbike from "./pages/Suyumbike";
import TempleAllReligions from "./pages/TempleAllReligions";
import FarmersPalace from "./pages/FarmersPalace";
import Tukay from "./pages/Tukay";
import MusaJalil from "./pages/MusaJalil";
import Shalyapin from "./pages/Shalyapin";
import KazanMillennium from "./pages/KazanMillennium";
import Islam922 from "./pages/Islam922";
import Idegei from "./pages/Idegei";
import Munajat from "./pages/Munajat";
import ChakChak from "./pages/ChakChak";
import Echpochmak from "./pages/Echpochmak";
import Kazylyk from "./pages/Kazylyk";
import Gubadiya from "./pages/Gubadiya";
import Katyk from "./pages/Katyk";
import HospitalityTea from "./pages/HospitalityTea";
import TatarEmbroidery from "./pages/TatarEmbroidery";
import NikahRitual from "./pages/NikahRitual";
import KazOmase from "./pages/KazOmase";
import Elabuga from "./pages/Elabuga";
import Sabantuy from "./pages/Sabantuy";
import Nauruz from "./pages/Nauruz";
import KurbanBayram from "./pages/KurbanBayram";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const LAST_ROUTE_KEY = "lastVisitedRoute";

function RoutePersistence() {
  const location = useLocation();
  const navigate = useNavigate();
  const restoredRef = useRef(false);

  useEffect(() => {
    const currentRoute = `${location.pathname}${location.search}${location.hash}`;
    sessionStorage.setItem(LAST_ROUTE_KEY, currentRoute);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;

    const savedRoute = sessionStorage.getItem(LAST_ROUTE_KEY);
    const currentRoute = `${location.pathname}${location.search}${location.hash}`;
    if (!savedRoute || savedRoute === currentRoute || savedRoute === "/") return;

    if (currentRoute === "/") {
      navigate(savedRoute, { replace: true });
    }
  }, [location.pathname, location.search, location.hash, navigate]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <RoutePersistence />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/kazan" element={<Kazan />} />
          <Route path="/kazan/kremlin" element={<KazanKremlin />} />
          <Route path="/kazan/sloboda" element={<StaroTatarskayaSloboda />} />
          <Route path="/sviyazhsk" element={<Sviyazhsk />} />
          <Route path="/landmarks/kul-sharif" element={<KulSharif />} />
          <Route path="/landmarks/suyumbike" element={<Suyumbike />} />
          <Route path="/landmarks/temple-all-religions" element={<TempleAllReligions />} />
          <Route path="/landmarks/farmers-palace" element={<FarmersPalace />} />
          <Route path="/people/tukay" element={<Tukay />} />
          <Route path="/people/musa-jalil" element={<MusaJalil />} />
          <Route path="/people/shalyapin" element={<Shalyapin />} />
          <Route path="/dates/kazan-1000" element={<KazanMillennium />} />
          <Route path="/dates/islam-922" element={<Islam922 />} />
          <Route path="/heritage/idegei" element={<Idegei />} />
          <Route path="/heritage/munajat" element={<Munajat />} />
          <Route path="/cuisine/chak-chak" element={<ChakChak />} />
          <Route path="/cuisine/echpochmak" element={<Echpochmak />} />
          <Route path="/cuisine/kazylyk" element={<Kazylyk />} />
          <Route path="/cuisine/gubadiya" element={<Gubadiya />} />
          <Route path="/cuisine/katyk" element={<Katyk />} />
          <Route path="/traditions/hospitality-tea" element={<HospitalityTea />} />
          <Route path="/traditions/embroidery" element={<TatarEmbroidery />} />
          <Route path="/rituals/nikah" element={<NikahRitual />} />
          <Route path="/rituals/kaz-omase" element={<KazOmase />} />
          <Route path="/elabuga" element={<Elabuga />} />
          <Route path="/holidays/sabantuy" element={<Sabantuy />} />
          <Route path="/holidays/nauruz" element={<Nauruz />} />
          <Route path="/holidays/kurban-bayram" element={<KurbanBayram />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
