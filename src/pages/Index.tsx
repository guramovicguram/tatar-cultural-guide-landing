import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = [
  { id: "routes", label: "Виртуальные маршруты", icon: "Map", emoji: "🗺️" },
  { id: "traditions", label: "Традиции", icon: "Heart", emoji: "🌿" },
  { id: "rituals", label: "Обряды", icon: "Sparkles", emoji: "✨" },
  { id: "holidays", label: "Национальные праздники", icon: "Star", emoji: "🎉" },
  { id: "people", label: "Выдающиеся личности", icon: "User", emoji: "👤" },
  { id: "dates", label: "Памятные даты", icon: "Calendar", emoji: "📅" },
  { id: "heritage", label: "Объекты наследия", icon: "Building2", emoji: "🏛️" },
];

const ALL_CARDS = [
  {
    id: 1, category: "routes", region: "Казань",
    title: "Казанский Кремль",
    desc: "Объект Всемирного наследия ЮНЕСКО. Белокаменная крепость с мечетью Кул-Шариф и Благовещенским собором — сердце татарской столицы.",
    period: "XVI век",
    tags: ["ЮНЕСКО", "Архитектура"],
    panorama: "",
    image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=600&q=80"
  },
  {
    id: 2, category: "routes", region: "Казань",
    title: "Старо-Татарская слобода",
    desc: "Исторический квартал с мечетями, купеческими домами и музеями. Живое свидетельство татарской купеческой культуры XIX века.",
    period: "XIX век",
    tags: ["История", "Архитектура"],
    panorama: "",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
  },
  {
    id: 3, category: "routes", region: "Свияжск",
    title: "Остров-град Свияжск",
    desc: "Небольшой город-остров с монастырями XVI века и уникальными фресками. Здесь история России переплетается с историей Татарстана.",
    period: "XVI–XVIII вв.",
    tags: ["ЮНЕСКО", "Монастыри"],
    panorama: "https://www.google.com/maps/embed?pb=!4v1684000000000!6m8!1m7!1sCAoSLEFGMVFpcE5fV3VBbmdIVm5nM3hYU3BKMF9fZXo0MllwYTdqX2dQVjJScjlP!2m2!1d55.7698!2d48.6574!3f180!4f0!5f0.7820865974627469",
    image: "https://images.unsplash.com/photo-1580137197581-df2bb346a786?w=600&q=80"
  },
  {
    id: 4, category: "routes", region: "Болгар",
    title: "Болгарский историко-архитектурный комплекс",
    desc: "Древняя столица Волжской Булгарии. Белая мечеть, Чёрная палата, Ханская усыпальница — место принятия ислама волжскими булгарами.",
    period: "X–XIV вв.",
    tags: ["ЮНЕСКО", "Ислам"],
    panorama: "",
    image: "https://images.unsplash.com/photo-1592961674523-c5703cb73a5f?w=600&q=80"
  },
  {
    id: 5, category: "traditions", region: "Весь Татарстан",
    title: "Гостеприимство и чаепитие",
    desc: "Традиция татарского гостеприимства — угощение чаем с чак-чаком, баурсаком и медом. Отказаться от угощения — значит обидеть хозяина.",
    period: "Традиция",
    tags: ["Быт", "Кулинария"],
    panorama: "",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80"
  },
  {
    id: 6, category: "traditions", region: "Весь Татарстан",
    title: "Татарская вышивка",
    desc: "Многовековое искусство вышивания золотой и серебряной нитью, шёлком и бисером. Узоры передавались из поколения в поколение.",
    period: "XIX–XX вв.",
    tags: ["Ремёсла", "Искусство"],
    panorama: "",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80"
  },
  {
    id: 7, category: "rituals", region: "Весь Татарстан",
    title: "Свадебный обряд «Никах»",
    desc: "Традиционное мусульманское бракосочетание, сопровождаемое чтением молитв, одариванием жениха и невесты, песнями и угощением.",
    period: "Традиция",
    tags: ["Семья", "Ислам"],
    panorama: "",
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&q=80"
  },
  {
    id: 8, category: "rituals", region: "Сельская местность",
    title: "Каз өмәсе — гусиное перо",
    desc: "Старинный осенний обряд коллективного ощипывания гусей. Молодёжь собиралась вместе, пели песни, готовились к зиме всем миром.",
    period: "Традиция",
    tags: ["Быт", "Коллектив"],
    panorama: "",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80"
  },
  {
    id: 9, category: "holidays", region: "Весь Татарстан",
    title: "Сабантуй",
    desc: "Главный татарский праздник окончания полевых работ. Национальная борьба куреш, бег в мешках, перетягивание каната и конные скачки.",
    period: "Ежегодно, июнь",
    tags: ["Спорт", "Музыка"],
    panorama: "",
    image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600&q=80"
  },
  {
    id: 10, category: "holidays", region: "Весь Татарстан",
    title: "Навруз — Новый год",
    desc: "Древний праздник весеннего равноденствия. Символ обновления природы и жизни, встреча весны с народными гуляниями и угощениями.",
    period: "21 марта",
    tags: ["Весна", "Традиция"],
    panorama: "",
    image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=600&q=80"
  },
  {
    id: 11, category: "holidays", region: "Весь Татарстан",
    title: "Курбан-байрам",
    desc: "Праздник жертвоприношения — один из главных мусульманских праздников. Молитва, жертвоприношение, угощение соседей и раздача милостыни.",
    period: "По лунному календарю",
    tags: ["Ислам", "Традиция"],
    panorama: "",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&q=80"
  },
  {
    id: 12, category: "people", region: "Казань",
    title: "Габдулла Тукай",
    desc: "Великий татарский поэт (1886–1913), реформатор литературного языка. «Татарский Пушкин» — его творчество определило облик нации.",
    period: "1886–1913",
    tags: ["Поэзия", "Литература"],
    panorama: "",
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&q=80"
  },
  {
    id: 13, category: "people", region: "Казань",
    title: "Рудольф Нуриев",
    desc: "Величайший танцор XX века (1938–1993), уроженец Татарстана. Революционер балета, прима Королевского балета в Лондоне.",
    period: "1938–1993",
    tags: ["Балет", "Танец"],
    panorama: "",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80"
  },
  {
    id: 14, category: "people", region: "Казань",
    title: "Шаляпин Фёдор",
    desc: "Великий оперный бас (1873–1938), дебютировавший именно в Казани. Голос, покоривший весь мир, родом из Поволжья.",
    period: "1873–1938",
    tags: ["Опера", "Музыка"],
    panorama: "",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80"
  },
  {
    id: 15, category: "dates", region: "Казань",
    title: "1000-летие Казани",
    desc: "В 2005 году Казань отметила своё тысячелетие. Масштабное строительство, открытие объектов ЮНЕСКО, превращение города в культурную столицу России.",
    period: "2005 год",
    tags: ["История", "Юбилей"],
    panorama: "",
    image: "https://images.unsplash.com/photo-1467912407355-245f30185020?w=600&q=80"
  },
  {
    id: 16, category: "dates", region: "Весь Татарстан",
    title: "Принятие ислама 922 г.",
    desc: "В 922 году волжские булгары официально приняли ислам. Это событие определило культурный и духовный облик татарского народа на тысячелетия.",
    period: "922 год",
    tags: ["Ислам", "История"],
    panorama: "",
    image: "https://images.unsplash.com/photo-1565373677928-80834e3c326c?w=600&q=80"
  },
  {
    id: 17, category: "heritage", region: "Весь Татарстан",
    title: "Татарский эпос «Идегей»",
    desc: "Героический эпос татарского народа о полководце Идегее. Объект нематериального культурного наследия, живая история в устной форме.",
    period: "XIV–XV вв.",
    tags: ["Эпос", "Устное творчество"],
    panorama: "",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80"
  },
  {
    id: 18, category: "heritage", region: "Весь Татарстан",
    title: "Татарский мунажат",
    desc: "Духовные лирические песни-молитвы татарского народа. Исполнялись женщинами, несли в себе молитву, печаль и надежду.",
    period: "Традиция",
    tags: ["Музыка", "Духовность"],
    panorama: "",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80"
  },
];

const REGIONS = ["Все регионы", "Казань", "Свияжск", "Болгар", "Сельская местность", "Весь Татарстан"];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function RevealDiv({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function TatarOrnament() {
  return (
    <svg viewBox="0 0 400 40" className="w-full h-8 opacity-50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="tatar-p" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 4 L22 12 L30 10 L24 16 L28 24 L20 20 L12 24 L16 16 L10 10 L18 12 Z" fill="none" stroke="#C9A84C" strokeWidth="0.8"/>
          <circle cx="20" cy="20" r="3" fill="none" stroke="#2D6A4F" strokeWidth="0.8"/>
          <path d="M0 20 Q10 12 20 20 Q30 28 40 20" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity="0.6"/>
        </pattern>
      </defs>
      <rect width="400" height="40" fill="url(#tatar-p)"/>
    </svg>
  );
}

function TatarCorner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={`w-14 h-14 ${className}`} xmlns="http://www.w3.org/2000/svg">
      <path d="M5 5 Q30 5 30 30" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
      <path d="M5 5 Q5 30 30 30" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
      <circle cx="30" cy="30" r="4" fill="#C9A84C" opacity="0.6"/>
      <circle cx="5" cy="5" r="2" fill="#2D6A4F" opacity="0.8"/>
      <path d="M10 10 L18 6 L14 14 Z" fill="#C9A84C" opacity="0.5"/>
    </svg>
  );
}

interface CardData {
  id: number; category: string; region: string;
  title: string; desc: string; period: string;
  tags: string[]; panorama: string; image: string;
}

function ContentCard({ card, onOpen }: { card: CardData; onOpen: (c: CardData) => void }) {
  return (
    <div
      className="card-hover bg-white rounded-2xl overflow-hidden cursor-pointer border border-[#E8D9B8] group h-full flex flex-col"
      onClick={() => onOpen(card)}
    >
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/600x400/2D6A4F/FAF7F0?text=${encodeURIComponent(card.title)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
        {card.panorama && (
          <div className="absolute top-3 right-3">
            <span className="bg-[#C9A84C] text-white text-xs px-2 py-0.5 rounded-full font-body font-semibold">
              360°
            </span>
          </div>
        )}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {card.tags.slice(0, 2).map(t => (
            <span key={t} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display text-lg font-semibold text-[#1B4332] leading-tight mb-2">{card.title}</h3>
        <p className="text-sm text-[#6B7280] font-body leading-relaxed line-clamp-2 mb-3 flex-1">{card.desc}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#C9A84C] font-body font-medium flex items-center gap-1">
            <Icon name="MapPin" size={12} />
            {card.region}
          </span>
          <button className="text-xs font-body font-medium text-[#2D6A4F] hover:text-[#C9A84C] transition-colors flex items-center gap-1">
            Подробнее <Icon name="ArrowRight" size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Modal({ card, onClose }: { card: CardData; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onClick={onClose}>
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{ animation: "fade-up 0.3s ease-out forwards" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-64 overflow-hidden rounded-t-3xl flex-shrink-0">
          <img src={card.image} alt={card.title} className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/800x400/2D6A4F/FAF7F0?text=${encodeURIComponent(card.title)}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/40 transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
          <div className="absolute bottom-5 left-5">
            <div className="flex gap-2 mb-2">
              {card.tags.map(t => (
                <span key={t} className="bg-[#C9A84C] text-white text-xs px-3 py-1 rounded-full font-body">
                  {t}
                </span>
              ))}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">{card.title}</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4 text-sm text-[#6B7280] font-body">
            <span className="flex items-center gap-1.5"><Icon name="MapPin" size={14} />{card.region}</span>
            <span className="flex items-center gap-1.5"><Icon name="Clock" size={14} />{card.period}</span>
          </div>
          <p className="text-[#374151] font-body leading-relaxed text-base mb-6">{card.desc}</p>

          {card.panorama && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#C9A84C] text-white text-xs px-3 py-1 rounded-full font-body font-medium">360° панорама</span>
                <span className="text-sm text-[#6B7280] font-body">Виртуальный тур</span>
              </div>
              <div className="panorama-container">
                <iframe src={card.panorama} allowFullScreen title={`360° ${card.title}`} />
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl border-2 border-[#E8D9B8] text-[#2D6A4F] font-body font-medium hover:border-[#2D6A4F] hover:bg-[#F2EAD3] transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("Все регионы");
  const [modalCard, setModalCard] = useState<CardData | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    setMobileMenuOpen(false);
    setTimeout(() => {
      sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const filteredCards = ALL_CARDS.filter(card => {
    const matchSearch = search === "" ||
      card.title.toLowerCase().includes(search.toLowerCase()) ||
      card.desc.toLowerCase().includes(search.toLowerCase()) ||
      card.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchRegion = regionFilter === "Все регионы" || card.region === regionFilter;
    return matchSearch && matchRegion;
  });

  const groupedCards = CATEGORIES.reduce<Record<string, CardData[]>>((acc, cat) => {
    acc[cat.id] = filteredCards.filter(c => c.category === cat.id);
    return acc;
  }, {});

  const hasResults = filteredCards.length > 0;

  return (
    <div className="min-h-screen bg-[#FAF7F0] font-body">

      {/* ══ NAVBAR ══ */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E8D9B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5"
          >
            <div className="w-8 h-8 bg-[#2D6A4F] rounded-lg flex items-center justify-center">
              <span className="text-[#E8C97A] text-sm font-bold font-display">Т</span>
            </div>
            <span className="font-display text-lg font-semibold text-[#1B4332] hidden sm:block">
              Гид Татарстана
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-5">
            {CATEGORIES.slice(0, 5).map(cat => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`nav-link text-sm font-body transition-colors ${activeCategory === cat.id ? "active text-[#2D6A4F] font-medium" : "text-[#6B7280] hover:text-[#2D6A4F]"}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Поиск..."
                className="search-input pl-9 pr-4 py-2 text-sm font-body bg-[#F9F5EE] border border-[#E8D9B8] rounded-xl w-44 focus:w-60 transition-all duration-300 text-[#374151] placeholder:text-[#9CA3AF]"
              />
            </div>
            <button className="lg:hidden p-2 rounded-lg hover:bg-[#F2EAD3]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} className="text-[#2D6A4F]" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#E8D9B8] px-4 py-3 space-y-1">
            <div className="relative mb-3">
              <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Поиск маршрутов, традиций..."
                className="search-input pl-9 pr-4 py-2 text-sm font-body bg-[#F9F5EE] border border-[#E8D9B8] rounded-xl w-full text-[#374151]"
              />
            </div>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-body text-[#374151] hover:bg-[#F2EAD3] hover:text-[#2D6A4F] transition-colors flex items-center gap-2.5"
              >
                <span className="text-lg">{cat.emoji}</span> {cat.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-full"
            style={{
              background: "linear-gradient(135deg, #0D2B1D 0%, #1B4332 30%, #2D6A4F 60%, #1B4332 80%, #0D2B1D 100%)"
            }}
          />
          {/* Декоративная татарская сетка */}
          <div className="absolute inset-0 tatar-pattern" style={{ opacity: 0.35 }} />
          {/* Золотое свечение */}
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,168,76,0.12) 0%, transparent 70%)"
          }} />
        </div>

        <TatarCorner className="absolute top-20 left-8 opacity-50" />
        <TatarCorner className="absolute top-20 right-8 opacity-50 rotate-90" />
        <TatarCorner className="absolute bottom-20 left-8 opacity-50 -rotate-90" />
        <TatarCorner className="absolute bottom-20 right-8 opacity-50 rotate-180" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
          <div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-[#C9A84C]/30 rounded-full px-5 py-2 mb-8"
            style={{ animation: "fade-up 0.6s ease-out forwards", opacity: 0 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse"/>
            <span className="text-[#E8C97A] text-sm font-body">Республика Татарстан · Культура и наследие</span>
          </div>

          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.1] mb-6"
            style={{ animation: "fade-up 0.7s 0.12s ease-out forwards", opacity: 0 }}
          >
            Виртуальный гид<br/>
            <em className="text-[#E8C97A] not-italic">по культуре</em><br/>
            Татарстана
          </h1>

          <p
            className="font-body text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ animation: "fade-up 0.7s 0.24s ease-out forwards", opacity: 0 }}
          >
            Откройте многонациональную культуру, вековые традиции и духовное наследие
            народов Татарстана — интерактивные маршруты, 360° панорамы и живая история
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: "fade-up 0.7s 0.36s ease-out forwards", opacity: 0 }}
          >
            <button
              onClick={() => scrollToCategory("routes")}
              className="bg-[#C9A84C] hover:bg-[#E8C97A] text-[#1B4332] font-body font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,168,76,0.45)] flex items-center gap-2.5 justify-center text-lg"
            >
              <Icon name="Compass" size={20} />
              Начать путешествие
            </button>
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-body font-medium px-8 py-4 rounded-2xl border border-white/25 transition-all duration-300 flex items-center gap-2.5 justify-center text-lg"
            >
              <Icon name="Info" size={20} />
              О проекте
            </button>
          </div>

          <div
            className="flex justify-center gap-10 mt-16"
            style={{ animation: "fade-up 0.7s 0.48s ease-out forwards", opacity: 0 }}
          >
            {[
              { value: "18+", label: "объектов" },
              { value: "7", label: "категорий" },
              { value: "360°", label: "панорамы" },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold text-[#E8C97A]">{stat.value}</div>
                <div className="font-body text-sm text-white/50 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
          <Icon name="ChevronDown" size={28} className="text-white" />
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" className="py-20 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <RevealDiv className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#F2EAD3] rounded-full px-4 py-1.5 mb-6">
                <Icon name="Landmark" size={13} className="text-[#C9A84C]" />
                <span className="text-sm font-body text-[#6B4226] font-medium">О проекте</span>
              </div>
              <h2 className="font-display text-4xl font-bold text-[#1B4332] mb-8 gold-underline">
                Откройте Татарстан заново
              </h2>
              <div className="space-y-4 font-body text-[#4B5563] leading-relaxed">
                <p>
                  Татарстан — уникальный регион, где на протяжении веков мирно уживаются
                  татарская, русская, чувашская, марийская и многие другие культуры.
                </p>
                <p>
                  Наш проект — интерактивная энциклопедия культурного наследия республики.
                  Виртуальные маршруты с 360° панорамами, рассказы о традициях и обрядах,
                  портреты выдающихся деятелей и история памятных дат.
                </p>
                <p className="text-[#2D6A4F] font-semibold">
                  Путешествуйте, не выходя из дома — или готовьтесь к настоящей поездке.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "Map", label: "Виртуальные маршруты", desc: "360° панорамы локаций" },
                { icon: "BookOpen", label: "Культура и традиции", desc: "Живая история народов" },
                { icon: "Search", label: "Умный поиск", desc: "По всему контенту" },
                { icon: "Users", label: "Личности", desc: "Выдающиеся деятели" },
              ].map((f, i) => (
                <RevealDiv key={f.label} delay={i * 80}>
                  <div className="bg-[#FAF7F0] rounded-2xl p-4 border border-[#E8D9B8] hover:border-[#C9A84C] transition-colors group h-full">
                    <div className="w-10 h-10 bg-[#2D6A4F] group-hover:bg-[#C9A84C] rounded-xl flex items-center justify-center mb-3 transition-colors">
                      <Icon name={f.icon} size={17} className="text-white" />
                    </div>
                    <div className="font-display text-base font-semibold text-[#1B4332] mb-1">{f.label}</div>
                    <div className="text-xs font-body text-[#9CA3AF]">{f.desc}</div>
                  </div>
                </RevealDiv>
              ))}
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ══ ORNAMENT ══ */}
      <div className="bg-[#FAF7F0] py-3 px-8 border-y border-[#E8D9B8]">
        <TatarOrnament />
      </div>

      {/* ══ CATEGORY NAV ══ */}
      <section className="py-16 bg-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <RevealDiv className="text-center mb-12">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#1B4332] mb-3">
              Разделы гида
            </h2>
            <p className="font-body text-[#9CA3AF] max-w-md mx-auto text-base">
              Выберите тему для погружения в культуру Татарстана
            </p>
          </RevealDiv>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {CATEGORIES.map((cat, i) => (
              <RevealDiv key={cat.id} delay={i * 55}>
                <button
                  onClick={() => scrollToCategory(cat.id)}
                  className={`w-full flex flex-col items-center justify-center gap-2.5 rounded-2xl border-2 transition-all duration-300 py-5 px-3 group ${
                    activeCategory === cat.id
                      ? "bg-[#2D6A4F] border-[#2D6A4F] text-white shadow-lg shadow-[#2D6A4F]/25"
                      : "bg-white border-[#E8D9B8] hover:border-[#C9A84C] hover:shadow-md"
                  }`}
                >
                  <span className="text-2xl">{cat.emoji}</span>
                  <span className={`text-xs font-body font-medium text-center leading-tight ${
                    activeCategory === cat.id ? "text-white" : "text-[#374151]"
                  }`}>
                    {cat.label}
                  </span>
                </button>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FILTERS STICKY ══ */}
      <div className="sticky top-16 z-30 bg-white border-y border-[#E8D9B8] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="sm:hidden relative w-full">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск..."
              className="search-input pl-8 pr-4 py-2 text-sm font-body bg-[#F9F5EE] border border-[#E8D9B8] rounded-xl w-full text-[#374151]"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-body text-[#9CA3AF] flex items-center gap-1 flex-shrink-0">
              <Icon name="Filter" size={13} /> Регион:
            </span>
            {REGIONS.map(r => (
              <button
                key={r}
                onClick={() => setRegionFilter(r)}
                className={`filter-chip text-xs font-body px-3 py-1.5 rounded-full border transition-all ${
                  regionFilter === r
                    ? "bg-[#2D6A4F] text-white border-[#2D6A4F]"
                    : "bg-white text-[#374151] border-[#E8D9B8] hover:border-[#2D6A4F]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          {(search || regionFilter !== "Все регионы") && (
            <button
              onClick={() => { setSearch(""); setRegionFilter("Все регионы"); }}
              className="text-xs font-body text-[#C9A84C] hover:text-[#9B7A2E] flex items-center gap-1 ml-auto flex-shrink-0"
            >
              <Icon name="X" size={12} /> Сбросить
            </button>
          )}
        </div>
      </div>

      {/* ══ MAIN CONTENT ══ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {!hasResults ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display text-2xl text-[#1B4332] mb-2">Ничего не найдено</h3>
            <p className="font-body text-[#9CA3AF] mb-5">Попробуйте изменить запрос или фильтры</p>
            <button
              onClick={() => { setSearch(""); setRegionFilter("Все регионы"); }}
              className="bg-[#2D6A4F] text-white font-body font-medium px-6 py-2.5 rounded-xl hover:bg-[#1B4332] transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          CATEGORIES.map((cat) => {
            const cards = groupedCards[cat.id];
            if (cards.length === 0) return null;
            return (
              <section
                key={cat.id}
                ref={el => { sectionRefs.current[cat.id] = el; }}
                className="mb-20 scroll-mt-36"
              >
                <RevealDiv className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#2D6A4F] rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-md shadow-[#2D6A4F]/20">
                    {cat.emoji}
                  </div>
                  <div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1B4332] gold-underline pb-1">
                      {cat.label}
                    </h2>
                    <p className="font-body text-sm text-[#9CA3AF] mt-3">
                      {cards.length} {cards.length === 1 ? "объект" : cards.length < 5 ? "объекта" : "объектов"}
                    </p>
                  </div>
                </RevealDiv>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {cards.map((card, i) => (
                    <RevealDiv key={card.id} delay={i * 70}>
                      <ContentCard card={card} onOpen={setModalCard} />
                    </RevealDiv>
                  ))}
                </div>
              </section>
            );
          })
        )}
      </main>

      {/* ══ ORNAMENT ══ */}
      <div className="bg-[#F2EAD3] py-3 px-8 border-y border-[#E8D9B8]">
        <TatarOrnament />
      </div>

      {/* ══ FOOTER ══ */}
      <footer className="bg-[#1B4332] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-[#C9A84C] rounded-lg flex items-center justify-center">
                  <span className="text-[#1B4332] text-base font-bold font-display">Т</span>
                </div>
                <span className="font-display text-xl font-semibold">Гид Татарстана</span>
              </div>
              <p className="font-body text-sm text-white/55 leading-relaxed max-w-xs">
                Виртуальный проводник по культурному наследию Республики Татарстан
              </p>
            </div>
            <div>
              <h4 className="font-display text-base font-semibold mb-4 text-[#E8C97A]">Разделы</h4>
              <ul className="space-y-2">
                {CATEGORIES.slice(0, 4).map(cat => (
                  <li key={cat.id}>
                    <button
                      onClick={() => scrollToCategory(cat.id)}
                      className="font-body text-sm text-white/55 hover:text-[#C9A84C] transition-colors flex items-center gap-2"
                    >
                      {cat.emoji} {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-base font-semibold mb-4 text-[#E8C97A]">Ещё разделы</h4>
              <ul className="space-y-2">
                {CATEGORIES.slice(4).map(cat => (
                  <li key={cat.id}>
                    <button
                      onClick={() => scrollToCategory(cat.id)}
                      className="font-body text-sm text-white/55 hover:text-[#C9A84C] transition-colors flex items-center gap-2"
                    >
                      {cat.emoji} {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-body text-sm text-white/35">
              © 2026 Виртуальный гид по культуре Татарстана
            </p>
            <div className="flex items-center gap-1.5 text-white/35 font-body text-sm">
              <Icon name="Heart" size={13} className="text-[#C9A84C]" />
              <span>Создан с любовью к Татарстану</span>
            </div>
          </div>
        </div>
      </footer>

      {modalCard && <Modal card={modalCard} onClose={() => setModalCard(null)} />}
    </div>
  );
}
