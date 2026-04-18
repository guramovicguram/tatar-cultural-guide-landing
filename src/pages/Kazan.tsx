import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const KAZAN_ROUTES = [
  {
    id: "kremlin",
    path: "/kazan/kremlin",
    title: "Казанский Кремль",
    subtitle: "Объект Всемирного наследия ЮНЕСКО",
    desc: "Белокаменная крепость с мечетью Кул-Шариф, Благовещенским собором и башней Сеюмбике. 10 ключевых объектов с интерактивной картой и панорамными видами.",
    points: 10,
    duration: "2–3 часа",
    tags: ["ЮНЕСКО", "Архитектура", "История"],
    image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80",
    available: true,
  },
  {
    id: "sloboda",
    path: "#",
    title: "Старо-Татарская слобода",
    subtitle: "Исторический квартал XIX века",
    desc: "Мечети, купеческие дома и музеи — живое свидетельство татарской купеческой культуры. Скоро доступно.",
    points: 8,
    duration: "1,5–2 часа",
    tags: ["История", "Архитектура"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    available: false,
  },
  {
    id: "bauman",
    path: "#",
    title: "Улица Баумана",
    subtitle: "Главная пешеходная улица Казани",
    desc: "«Казанский Арбат» — пешеходная улица с театрами, кафе и историческими памятниками в центре города. Скоро доступно.",
    points: 7,
    duration: "1–1,5 часа",
    tags: ["Прогулка", "Центр"],
    image: "https://images.unsplash.com/photo-1467912407355-245f30185020?w=800&q=80",
    available: false,
  },
];

export default function Kazan() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF7F0] font-body">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E8D9B8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-[#2D6A4F] hover:text-[#1B4332] transition-colors font-body font-medium text-sm"
            >
              <Icon name="ChevronLeft" size={18} />
              На главную
            </button>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-[#2D6A4F] rounded-lg flex items-center justify-center">
              <span className="text-[#E8C97A] text-sm font-bold font-display">Т</span>
            </div>
            <span className="font-display text-lg font-semibold text-[#1B4332] hidden sm:block">
              Гид Татарстана
            </span>
          </button>
          <div className="w-28" />
        </div>
      </nav>

      {/* Hero */}
      <div
        className="relative pt-16 pb-12 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0D2B1D 0%, #1B4332 50%, #2D6A4F 100%)",
        }}
      >
        <div className="absolute inset-0 tatar-pattern opacity-20" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-12">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-sm font-body mb-6"
          >
            <Icon name="ChevronLeft" size={14} />
            Виртуальные маршруты
          </button>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center text-3xl">
              🏙️
            </div>
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-white">
                Казань
              </h1>
              <p className="text-white/60 font-body text-sm mt-1">
                Виртуальные маршруты
              </p>
            </div>
          </div>
          <p className="font-body text-white/70 text-lg max-w-xl mt-4">
            Выберите маршрут для виртуального путешествия по столице Татарстана.
            Изучайте историю, культуру и архитектуру города с интерактивными картами.
          </p>
        </div>
      </div>

      {/* Routes grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {KAZAN_ROUTES.map((route) => (
            <div
              key={route.id}
              onClick={() => route.available && navigate(route.path)}
              className={`rounded-3xl overflow-hidden border bg-white transition-all duration-300 group flex flex-col
                ${route.available
                  ? "border-[#E8D9B8] hover:border-[#C9A84C] hover:shadow-xl hover:shadow-[#C9A84C]/10 cursor-pointer"
                  : "border-[#E8D9B8] opacity-70 cursor-not-allowed"
                }`}
            >
              <div className="relative h-52 overflow-hidden flex-shrink-0">
                <img
                  src={route.image}
                  alt={route.title}
                  className={`w-full h-full object-cover transition-transform duration-500 ${route.available ? "group-hover:scale-105" : ""}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/800x400/2D6A4F/FAF7F0?text=${encodeURIComponent(route.title)}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                {!route.available && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="bg-white/20 backdrop-blur-sm text-white font-body font-semibold text-sm px-4 py-2 rounded-full border border-white/30">
                      Скоро
                    </span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                  {route.tags.map((t) => (
                    <span key={t} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs font-body text-[#C9A84C] font-medium mb-1">{route.subtitle}</p>
                <h2 className="font-display text-xl font-bold text-[#1B4332] mb-2 leading-tight">
                  {route.title}
                </h2>
                <p className="font-body text-sm text-[#6B7280] leading-relaxed mb-4 flex-1">
                  {route.desc}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-[#F2EAD3]">
                  <div className="flex items-center gap-3 text-xs text-[#9CA3AF] font-body">
                    <span className="flex items-center gap-1">
                      <Icon name="MapPin" size={11} />
                      {route.points} точек
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={11} />
                      {route.duration}
                    </span>
                  </div>
                  {route.available && (
                    <span className="flex items-center gap-1 text-xs font-body font-semibold text-[#2D6A4F] group-hover:text-[#C9A84C] transition-colors">
                      Начать <Icon name="ArrowRight" size={13} />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8D9B8] bg-white py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#2D6A4F] transition-colors font-body text-sm"
          >
            <Icon name="ChevronLeft" size={15} />
            Все разделы
          </button>
          <p className="font-body text-xs text-[#9CA3AF]">© 2026 Гид Татарстана</p>
        </div>
      </footer>
    </div>
  );
}
