import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const TRANSLATIONS = {
  ru: {
    sections: "Разделы",
    language: "Язык",
    aboutProject: "О проекте",
    reviews: "Отзывы",
    feedback: "Обратная связь",
    startJourney: "Начать путешествие",
    projectInfo: "О проекте",
    objects: "объектов",
    object: "объект",
    culturalGuide: "Культура Татарстана",
    discoverTatarstan: "Откройте Татарстан заново",
  },
  en: {
    sections: "Sections",
    language: "Language",
    aboutProject: "About Project",
    reviews: "Reviews",
    feedback: "Feedback",
    startJourney: "Start Journey",
    projectInfo: "About",
    objects: "objects",
    object: "object",
    culturalGuide: "Tatarstan Guide",
    discoverTatarstan: "Discover Tatarstan Anew",
  }
};

const DROPDOWN_ITEMS = [
  { id: "routes", label: "Виртуальные маршруты" },
  { id: "landmarks", label: "Достопримечательности" },
  { id: "heritage", label: "Объекты наследия" },
  { id: "dates", label: "Памятные даты" },
  { id: "holidays", label: "Праздники" },
  { id: "traditions", label: "Традиции" },
  { id: "cuisine", label: "Национальная кухня" },
];

const CATEGORIES = [
  { id: "routes", label: "Виртуальные маршруты", icon: "Map" },
  { id: "landmarks", label: "Достопримечательности", icon: "Landmark" },
  { id: "traditions", label: "Традиции", icon: "Heart" },
  { id: "rituals", label: "Обряды", icon: "Sparkles" },
  { id: "holidays", label: "Национальные праздники", icon: "Star" },
  { id: "people", label: "Выдающиеся личности", icon: "User" },
  { id: "dates", label: "Памятные даты", icon: "Calendar" },
  { id: "heritage", label: "Объекты наследия", icon: "Building2" },
  { id: "cuisine", label: "Национальная кухня", icon: "UtensilsCrossed" },
];

const ALL_CARDS = [
  {
    id: 1, category: "routes", region: "Казань",
    title: "Казанский Кремль",
    desc: "Объект Всемирного наследия ЮНЕСКО. Белокаменная крепость с мечетью Кул-Шариф и Благовещенским собором — сердце татарской столицы.",
    period: "XVI век",
    tags: ["ЮНЕСКО", "Архитектура"],
    panorama: "",
    image: "/image copy 4.png"
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
    image: "https://a.d-cd.net/bMAAAgCZP2A-1920.jpg"
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
    image: "/photogost/image.png"
  },
  {
    id: 6, category: "traditions", region: "Весь Татарстан",
    title: "Татарская вышивка",
    desc: "Многовековое искусство вышивания золотой и серебряной нитью, шёлком и бисером. Узоры передавались из поколения в поколение.",
    period: "XIX–XX вв.",
    tags: ["Ремёсла", "Искусство"],
    panorama: "",
    image: "/homa/image copy 3.png"
  },
  {
    id: 7, category: "rituals", region: "Весь Татарстан",
    title: "Свадебный обряд «Никах»",
    desc: "Традиционное мусульманское бракосочетание, сопровождаемое чтением молитв, одариванием жениха и невесты, песнями и угощением.",
    period: "Традиция",
    tags: ["Семья", "Ислам"],
    panorama: "",
    image: "/Nikah/image.png"
  },
  {
    id: 8, category: "rituals", region: "Сельская местность",
    title: "Каз өмәсе — гусиное перо",
    desc: "Старинный осенний обряд коллективного ощипывания гусей. Молодёжь собиралась вместе, пели песни, готовились к зиме всем миром.",
    period: "Традиция",
    tags: ["Быт", "Коллектив"],
    panorama: "",
    image: "/kaz/image.png"
  },
  {
    id: 9, category: "holidays", region: "Весь Татарстан",
    title: "Сабантуй",
    desc: "Главный татарский праздник окончания полевых работ. Национальная борьба куреш, бег в мешках, перетягивание каната и конные скачки.",
    period: "Ежегодно, июнь",
    tags: ["Спорт", "Музыка"],
    panorama: "",
    image: "/Sabatyu/image.png"
  },
  {
    id: 10, category: "holidays", region: "Весь Татарстан",
    title: "Науруз",
    desc: "Древний праздник весеннего равноденствия. Символ обновления природы и жизни, встреча весны с народными гуляниями и угощениями.",
    period: "21 марта",
    tags: ["Весна", "Традиция"],
    panorama: "",
    image: "/Nauruz/image.png"
  },
  {
    id: 11, category: "holidays", region: "Весь Татарстан",
    title: "Курбан-байрам",
    desc: "Праздник жертвоприношения — один из главных мусульманских праздников. Молитва, жертвоприношение, угощение соседей и раздача милостыни.",
    period: "По лунному календарю",
    tags: ["Ислам", "Традиция"],
    panorama: "",
    image: "/Kurban/image.png"
  },
  {
    id: 12, category: "people", region: "Казань",
    title: "Габдулла Тукай",
    desc: "Великий татарский поэт (1886–1913), реформатор литературного языка. «Татарский Пушкин» — его творчество определило облик нации.",
    period: "1886–1913",
    tags: ["Поэзия", "Литература"],
    panorama: "",
    image: "/Tukay/hero.png"
  },
  {
    id: 13, category: "people", region: "Казань",
    title: "Муса Джалиль",
    desc: "Татарский поэт и Герой Советского Союза (1906–1944). Автор «Моабитской тетради», символ мужества, стойкости и любви к Родине.",
    period: "1906–1944",
    tags: ["Поэзия", "Герой"],
    panorama: "",
    image: "/MusaJalil/hero.png"
  },
  {
    id: 14, category: "people", region: "Казань",
    title: "Шаляпин Фёдор",
    desc: "Великий оперный бас (1873–1938), дебютировавший именно в Казани. Голос, покоривший весь мир, родом из Поволжья.",
    period: "1873–1938",
    tags: ["Опера", "Музыка"],
    panorama: "",
    image: "/Shalyapin/hero.png"
  },
  {
    id: 15, category: "dates", region: "Казань",
    title: "1000-летие Казани",
    desc: "В 2005 году Казань отметила своё тысячелетие. Масштабное строительство, открытие объектов ЮНЕСКО, превращение города в культурную столицу России.",
    period: "2005 год",
    tags: ["История", "Юбилей"],
    panorama: "",
    image: "/Kazan1000/hero.png"
  },
  {
    id: 16, category: "dates", region: "Весь Татарстан",
    title: "Принятие ислама 922 г.",
    desc: "В 922 году волжские булгары официально приняли ислам. Это событие определило культурный и духовный облик татарского народа на тысячелетия.",
    period: "922 год",
    tags: ["Ислам", "История"],
    panorama: "",
    image: "/Islam922/hero.png"
  },
  {
    id: 17, category: "heritage", region: "Весь Татарстан",
    title: "Татарский эпос «Идегей»",
    desc: "Героический эпос татарского народа о полководце Идегее. Объект нематериального культурного наследия, живая история в устной форме.",
    period: "XIV–XV вв.",
    tags: ["Эпос", "Устное творчество"],
    panorama: "",
    image: "/Idegei/hero.png"
  },
  {
    id: 18, category: "heritage", region: "Весь Татарстан",
    title: "Татарский мунаджат",
    desc: "Духовные лирические песни-молитвы татарского народа. Исполнялись женщинами, несли в себе молитву, печаль и надежду.",
    period: "Традиция",
    tags: ["Музыка", "Духовность"],
    panorama: "",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80"
  },
  {
    id: 19, category: "cuisine", region: "Весь Татарстан",
    title: "Чак-чак",
    desc: "Главный татарский десерт — обжаренное тесто, политое горячим мёдом. Подаётся на свадьбах и праздниках, символизирует счастье и достаток.",
    period: "Традиция",
    tags: ["Десерт", "Мёд"],
    panorama: "",
    image: "/ChakChak/hero.png"
  },
  {
    id: 20, category: "cuisine", region: "Весь Татарстан",
    title: "Эчпочмак",
    desc: "Треугольные пирожки с начинкой из мяса, картофеля и лука. Название переводится как «три угла» — визитная карточка татарской выпечки.",
    period: "Традиция",
    tags: ["Выпечка", "Мясо"],
    panorama: "",
    image: "/Echpochmak/hero.png"
  },
  {
    id: 21, category: "cuisine", region: "Весь Татарстан",
    title: "Казылык",
    desc: "Традиционная татарская вяленая колбаса из конины. Заготавливалась на зиму, высоко ценилась за питательность и насыщенный вкус.",
    period: "Традиция",
    tags: ["Мясо", "Конина"],
    panorama: "",
    image: "/Kazylyk/hero.png"
  },
  {
    id: 22, category: "cuisine", region: "Весь Татарстан",
    title: "Губадия",
    desc: "Многослойный праздничный пирог с рисом, яйцом, изюмом и мясом. Подаётся на особых торжествах — настоящий гастрономический шедевр.",
    period: "Традиция",
    tags: ["Пирог", "Праздник"],
    panorama: "",
    image: "/Gubadiya/hero.png"
  },
  {
    id: 23, category: "cuisine", region: "Весь Татарстан",
    title: "Катык",
    desc: "Катык — густой кисломолочный напиток, корт — сушёный творог. Основа татарского стола: освежают летом и питают в дальней дороге.",
    period: "Традиция",
    tags: ["Молочное", "Напитки"],
    panorama: "",
    image: "/Katyk/hero.png"
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

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <RevealDiv delay={index * 60}>
      <div
        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
          open ? "border-[#C9A84C] shadow-md shadow-[#C9A84C]/10" : "border-[#E8D9B8] hover:border-[#C9A84C]/50"
        } bg-white`}
      >
        <button
          onClick={() => setOpen(v => !v)}
          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
        >
          <span className="font-body font-semibold text-[#1B4332] text-base leading-snug">{question}</span>
          <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
            open ? "bg-[#C9A84C] rotate-180" : "bg-[#F2EAD3] group-hover:bg-[#E8D9B8]"
          }`}>
            <Icon name="ChevronDown" size={15} className={open ? "text-white" : "text-[#6B7280]"} />
          </span>
        </button>
        <div
          style={{
            maxHeight: open ? "400px" : "0",
            opacity: open ? 1 : 0,
            transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease",
            overflow: "hidden",
          }}
        >
          <p className="px-6 pb-5 font-body text-[#4B5563] leading-relaxed text-sm">{answer}</p>
        </div>
      </div>
    </RevealDiv>
  );
}

interface ReviewData {
  name: string; city: string; rating: number; short: string; full: string;
}

function ReviewItem({ review, index }: { review: ReviewData; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <RevealDiv delay={index * 80}>
      <div
        onClick={() => setOpen(v => !v)}
        className={`rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden ${
          open ? "border-[#2D6A4F] shadow-lg shadow-[#2D6A4F]/10" : "border-[#E8D9B8] hover:border-[#2D6A4F]/40 hover:shadow-md"
        } bg-white`}
      >
        <div className="px-6 py-5 flex items-start gap-4">
          {/* Avatar */}
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2D6A4F] to-[#C9A84C] flex items-center justify-center flex-shrink-0 text-white font-display font-bold text-lg">
            {review.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div>
                <span className="font-body font-semibold text-[#1B4332] text-sm">{review.name}</span>
                <span className="font-body text-xs text-[#9CA3AF] ml-2">{review.city}</span>
              </div>
              <div className="flex gap-0.5 flex-shrink-0">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-[#C9A84C] text-sm">★</span>
                ))}
              </div>
            </div>
            <p className="font-body text-[#4B5563] text-sm leading-relaxed">{review.short}</p>
          </div>
          <span className={`flex-shrink-0 mt-1 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
            <Icon name="ChevronDown" size={16} className="text-[#9CA3AF]" />
          </span>
        </div>
        <div
          style={{
            maxHeight: open ? "500px" : "0",
            opacity: open ? 1 : 0,
            transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease",
            overflow: "hidden",
          }}
        >
          <div className="px-6 pb-5 border-t border-[#F2EAD3] pt-4">
            <p className="font-body text-[#374151] text-sm leading-relaxed">{review.full}</p>
          </div>
        </div>
      </div>
    </RevealDiv>
  );
}

const SIDEBAR_NAV = [
  { id: "routes",     label: "Виртуальные маршруты" },
  { id: "landmarks",  label: "Достопримечательности" },
  { id: "traditions", label: "Традиции" },
  { id: "rituals",    label: "Обряды" },
  { id: "holidays",   label: "Национальные праздники" },
  { id: "people",     label: "Выдающиеся личности" },
  { id: "dates",      label: "Памятные даты" },
  { id: "heritage",   label: "Объекты наследия" },
  { id: "cuisine",    label: "Национальная кухня" },
];

const SIDEBAR_EXTRA = [
  { id: "faq",      label: "Часто задаваемые вопросы" },
  { id: "reviews",  label: "Отзывы" },
  { id: "feedback", label: "Обратная связь" },
];

function Sidebar({ open, onClose, onSelect }: { open: boolean; onClose: () => void; onSelect: (id: string) => void }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNav = (id: string) => {
    onSelect(id);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: "rgba(10,28,18,0.55)",
          backdropFilter: "blur(3px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      />

      {/* Panel */}
      <aside
        className="fixed top-0 left-0 h-full z-50 w-[300px] max-w-[85vw] bg-white flex flex-col shadow-2xl"
        style={{
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.32s cubic-bezier(0.16,1,0.3,1)",
          borderRadius: "0 20px 20px 0",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F2EAD3]">
          <button
            onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); onClose(); }}
            className="flex items-center gap-2.5 group"
          >
            <img src="/logo.png" alt="Культура Татарстана" className="h-16 w-16 object-contain flex-shrink-0" />
            <span className="font-display text-lg font-semibold text-[#1B4332] group-hover:text-[#2D6A4F] transition-colors">
              Культура Татарстана
            </span>
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F2EAD3] transition-colors"
          >
            <Icon name="X" size={18} className="text-[#6B7280]" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* Main nav */}
          <div className="px-4 py-4 border-b border-[#F2EAD3]">
            <p className="text-xs font-body text-[#9CA3AF] px-1 mb-2 uppercase tracking-wider">Разделы</p>
            <nav className="space-y-0.5">
              {SIDEBAR_NAV.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-[#F2EAD3] hover:text-[#1B4332] text-[#374151] transition-colors group"
                >
                  <span className="font-body text-sm font-medium flex-1">{item.label}</span>
                  <Icon name="ChevronRight" size={14} className="text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </nav>
          </div>

          {/* Extra links */}
          <div className="px-4 py-4">
            <p className="text-xs font-body text-[#9CA3AF] px-1 mb-2 uppercase tracking-wider">Дополнительно</p>
            <nav className="space-y-0.5">
              {SIDEBAR_EXTRA.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-[#F2EAD3] hover:text-[#1B4332] text-[#374151] transition-colors group"
                >
                  <span className="font-body text-sm font-medium flex-1">{item.label}</span>
                  <Icon name="ChevronRight" size={14} className="text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </nav>
            <a
              href="https://docs.google.com/forms/d/1jLSGfAcNRpjzkmEnho5fgnsyrO4QgO7KGJvOlFB5lxg/edit"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2D6A4F] px-3 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-[#1B4332]"
            >
              <Icon name="MessageCircle" size={15} />
              Оставить отзыв
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#F2EAD3]">
          <p className="font-body text-xs text-[#9CA3AF] text-center">© 2026 Культура Татарстана</p>
        </div>
      </aside>
    </>
  );
}

function SectionsDropdown({ onSelect, lang }: { onSelect: (id: string) => void; lang: "ru" | "en" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-body font-medium text-sm transition-all duration-200
          ${open
            ? "bg-[#2D6A4F] text-white shadow-md shadow-[#2D6A4F]/20"
            : "bg-transparent text-[#1B4332] hover:text-[#2D6A4F]"
          }`}
      >
        {TRANSLATIONS[lang].sections}
        <Icon
          name="ChevronDown"
          size={16}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className="absolute top-full right-0 mt-2 w-56 origin-top"
        style={{
          transform: open ? "scaleY(1)" : "scaleY(0.92)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "transform 0.22s cubic-bezier(0.16,1,0.3,1), opacity 0.18s ease",
        }}
      >
        <div className="bg-white rounded-2xl border border-[#E8D9B8] shadow-xl shadow-black/10 overflow-hidden py-1.5">
          {DROPDOWN_ITEMS.map((item, i) => (
            <button
              key={item.id}
              onClick={() => { onSelect(item.id); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-body text-[#374151] hover:bg-[#F2EAD3] hover:text-[#1B4332] transition-colors text-left group"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <span className="flex-1">{item.label}</span>
              <Icon name="ChevronRight" size={13} className="text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function LanguageSwitcher({ lang, onLangChange }: { lang: "ru" | "en"; onLangChange: (lang: "ru" | "en") => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-body font-medium text-sm transition-all duration-200
          ${open
            ? "bg-[#2D6A4F] text-white shadow-md shadow-[#2D6A4F]/20"
            : "bg-transparent text-[#1B4332] hover:text-[#2D6A4F]"
          }`}
      >
        {lang.toUpperCase()}
        <Icon
          name="ChevronDown"
          size={16}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className="absolute top-full right-0 mt-2 w-48 origin-top"
        style={{
          transform: open ? "scaleY(1)" : "scaleY(0.92)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "transform 0.22s cubic-bezier(0.16,1,0.3,1), opacity 0.18s ease",
        }}
      >
        <div className="bg-white rounded-2xl border border-[#E8D9B8] shadow-xl shadow-black/10 overflow-hidden py-1.5">
          {["ru", "en"].map((langCode) => (
            <button
              key={langCode}
              onClick={() => { onLangChange(langCode as "ru" | "en"); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-body transition-colors text-left ${
                lang === langCode
                  ? "bg-[#2D6A4F] text-white font-semibold"
                  : "text-[#374151] hover:bg-[#F2EAD3] hover:text-[#1B4332]"
              }`}
            >
              <span>{langCode === "ru" ? "🇷🇺 Русский" : "En English"}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [modalCard, setModalCard] = useState<CardData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState<"ru" | "en">("ru");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToCategory = (id: string) => {
    const sectionIds = ["faq", "reviews", "feedback", "about"];
    if (sectionIds.includes(id)) {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return;
    }
    setActiveCategory(id);
    setTimeout(() => {
      sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const groupedCards = CATEGORIES.reduce<Record<string, CardData[]>>((acc, cat) => {
    acc[cat.id] = ALL_CARDS.filter(c => c.category === cat.id);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#FAF7F0] font-body">

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onSelect={scrollToCategory} />

      {/* ══ NAVBAR ══ */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E8D9B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Left: burger + logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-[#F2EAD3] transition-colors group"
              aria-label="Открыть меню"
            >
              <span className="w-5 h-0.5 bg-[#2D6A4F] rounded-full transition-all group-hover:bg-[#C9A84C]" />
              <span className="w-5 h-0.5 bg-[#2D6A4F] rounded-full transition-all group-hover:bg-[#C9A84C]" />
              <span className="w-5 h-0.5 bg-[#2D6A4F] rounded-full transition-all group-hover:bg-[#C9A84C]" />
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 group"
            >
              <img src="/logo.png" alt="Культура Татарстана" className="h-12 w-12 object-contain" />
              <span className="font-display text-lg font-semibold text-[#1B4332] hidden sm:block group-hover:text-[#2D6A4F] transition-colors">
                Культура Татарстана
              </span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <SectionsDropdown onSelect={scrollToCategory} lang={lang} />
            <button
              onClick={() => scrollToCategory("about")}
              className="hidden md:flex items-center px-4 py-2 rounded-xl font-body font-medium text-sm text-[#1B4332] hover:bg-[#F2EAD3] hover:text-[#2D6A4F] transition-colors"
            >
              {TRANSLATIONS[lang].aboutProject}
            </button>
            <button
              onClick={() => scrollToCategory("reviews")}
              className="hidden md:flex items-center px-4 py-2 rounded-xl font-body font-medium text-sm text-[#1B4332] hover:bg-[#F2EAD3] hover:text-[#2D6A4F] transition-colors"
            >
              {TRANSLATIONS[lang].reviews}
            </button>
            <button
              onClick={() => scrollToCategory("feedback")}
              className="hidden md:flex items-center px-4 py-2 rounded-xl font-body font-medium text-sm text-[#1B4332] hover:bg-[#F2EAD3] hover:text-[#2D6A4F] transition-colors"
            >
              {TRANSLATIONS[lang].feedback}
            </button>
          </div>
        </div>
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



        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.1] mb-6"
            style={{ animation: "fade-up 0.7s 0.12s ease-out forwards" }}
          >
            Культура Республики Татарстан
          </h1>

          <p
            className="font-body text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ animation: "fade-up 0.7s 0.24s ease-out forwards" }}
          >
            Откройте для себя богатое многонациональное наследие Республики Татарстан — от древних традиций и обрядов до современных культурных достижений. Погрузитесь в атмосферу истории, искусства и единства народов через интерактивные маршруты и уникальные объекты.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: "fade-up 0.7s 0.36s ease-out forwards" }}
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
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" className="py-20 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <RevealDiv className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#F2EAD3] rounded-full px-4 py-1.5 mb-6">
              <Icon name="Landmark" size={13} className="text-[#C9A84C]" />
              <span className="text-sm font-body text-[#6B4226] font-medium">О проекте</span>
            </div>
            <h2 className="font-display text-4xl font-bold text-[#1B4332] mb-8 gold-underline">
              Откройте Татарстан заново
            </h2>
            <div className="space-y-4 font-body text-[#4B5563] leading-relaxed text-lg text-left">
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
          </RevealDiv>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: "Map", label: "Виртуальные маршруты", desc: "Исследуйте объекты культурного наследия Татарстана через 360° панорамы высокого разрешения. Совершите виртуальное путешествие по Казанскому Кремлю, Болгарским комплексам и другим значимым местам, не выходя из дома." },
              { icon: "BookOpen", label: "Культура и традиции", desc: "Погрузитесь в многовековое наследие татарского народа и других народностей региона. Узнайте о традиционных обрядах, праздниках, национальной кухне и ремёслах, которые передаются из поколения в поколение." },
              { icon: "Gamepad2", label: "Интерактивные задания", desc: "Участвуйте в увлекательных квестах и интерактивных заданиях для проверки знаний. Проверьте себя в викторинах о культуре Татарстана и получите сертификаты за прохождение тематических челленджей." },
              { icon: "Users", label: "Выдающиеся личности", desc: "Познакомьтесь с великими деятелями татарской культуры, науки и искусства. От поэтов и балетных дивов до политиков и учёных — люди, которые сформировали облик нации и её вклад в мировую культуру." },
            ].map((f, i) => (
              <RevealDiv key={f.label} delay={i * 80}>
                <div className="rounded-3xl p-8 border border-[#E8D9B8] hover:border-[#C9A84C] hover:shadow-lg transition-all group h-full flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#2D6A4F] group-hover:bg-[#C9A84C] rounded-2xl flex items-center justify-center mb-4 transition-colors shadow-md">
                    <Icon name={f.icon} size={28} className="text-white" />
                  </div>
                  <div className="font-display text-2xl font-semibold text-[#1B4332] mb-4">{f.label}</div>
                  <div className="text-base font-body text-[#6B7280] leading-relaxed">{f.desc}</div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MAIN CONTENT ══ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {CATEGORIES.map((cat) => {
          const cards = groupedCards[cat.id] || [];

          /* ── Virtual Routes: show only Казань city card ── */
          if (cat.id === "routes") {
            return (
              <section
                key={cat.id}
                ref={el => { sectionRefs.current[cat.id] = el; }}
                className="mb-20 scroll-mt-24"
              >
                <RevealDiv className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#2D6A4F] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md shadow-[#2D6A4F]/20">
                    <Icon name={cat.icon} size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1B4332] gold-underline pb-1">
                      {cat.label}
                    </h2>
                    <p className="font-body text-sm text-[#9CA3AF] mt-3">
                      Выберите город для путешествия
                    </p>
                  </div>
                </RevealDiv>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <RevealDiv>
                    <button
                      onClick={() => navigate("/kazan")}
                      className="group relative rounded-3xl overflow-hidden border border-[#E8D9B8] hover:border-[#C9A84C] hover:shadow-2xl hover:shadow-[#C9A84C]/15 transition-all duration-300 bg-white w-full text-left h-full flex flex-col"
                    >
                      <div className="relative h-56 overflow-hidden flex-shrink-0">
                        <img
                          src="/image copy 4.png"
                          alt="Казань"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/800x400/2D6A4F/FAF7F0?text=Казань";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                        <div className="absolute bottom-4 left-4 flex gap-2">
                          {["ЮНЕСКО", "1000 лет", "Маршруты"].map(t => (
                            <span key={t} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-3 flex-1">
                          <div>
                            <p className="text-xs font-body text-[#C9A84C] font-semibold mb-1">Столица Татарстана</p>
                            <h3 className="font-display text-2xl font-bold text-[#1B4332] mb-2">Казань</h3>
                            <p className="font-body text-sm text-[#6B7280] leading-relaxed">
                              Виртуальные прогулки по историческому центру: Кремль, Старо-Татарская слобода и другие знаковые места.
                            </p>
                          </div>
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2D6A4F] group-hover:bg-[#C9A84C] transition-colors flex items-center justify-center shadow-md mt-1">
                            <Icon name="ArrowRight" size={18} className="text-white" />
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#F2EAD3] text-xs text-[#9CA3AF] font-body">
                          <span className="flex items-center gap-1"><Icon name="MapPin" size={11} />2 маршрута</span>
                          <span className="flex items-center gap-1"><Icon name="Eye" size={11} />19 точек</span>
                          <span className="flex items-center gap-1"><Icon name="Map" size={11} />Яндекс.Карта</span>
                        </div>
                      </div>
                    </button>
                  </RevealDiv>
                  <RevealDiv delay={100}>
                    <button
                      onClick={() => navigate("/sviyazhsk")}
                      className="group relative rounded-3xl overflow-hidden border border-[#E8D9B8] hover:border-[#C9A84C] hover:shadow-2xl hover:shadow-[#C9A84C]/15 transition-all duration-300 bg-white w-full text-left h-full flex flex-col"
                    >
                      <div className="relative h-56 overflow-hidden flex-shrink-0">
                        <img
                          src="https://a.d-cd.net/bMAAAgCZP2A-1920.jpg"
                          alt="Свияжск"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/800x400/2D6A4F/FAF7F0?text=Свияжск";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                        <div className="absolute bottom-4 left-4 flex gap-2">
                          {["ЮНЕСКО", "XVI век", "Остров"].map(t => (
                            <span key={t} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-3 flex-1">
                          <div>
                            <p className="text-xs font-body text-[#C9A84C] font-semibold mb-1">Остров-град</p>
                            <h3 className="font-display text-2xl font-bold text-[#1B4332] mb-2">Свияжск</h3>
                            <p className="font-body text-sm text-[#6B7280] leading-relaxed">
                              Город-остров с монастырями XVI века и уникальными фресками на слиянии Волги и Свияги.
                            </p>
                          </div>
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2D6A4F] group-hover:bg-[#C9A84C] transition-colors flex items-center justify-center shadow-md mt-1">
                            <Icon name="ArrowRight" size={18} className="text-white" />
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#F2EAD3] text-xs text-[#9CA3AF] font-body">
                          <span className="flex items-center gap-1"><Icon name="MapPin" size={11} />1 маршрут</span>
                          <span className="flex items-center gap-1"><Icon name="Eye" size={11} />2 точки</span>
                          <span className="flex items-center gap-1"><Icon name="Map" size={11} />Яндекс.Карта</span>
                        </div>
                      </div>
                    </button>
                  </RevealDiv>
                  <RevealDiv delay={180}>
                    <button
                      onClick={() => navigate("/elabuga")}
                      className="group relative rounded-3xl overflow-hidden border border-[#E8D9B8] hover:border-[#C9A84C] hover:shadow-2xl hover:shadow-[#C9A84C]/15 transition-all duration-300 bg-white w-full text-left h-full flex flex-col"
                    >
                      <div className="relative h-56 overflow-hidden flex-shrink-0">
                        <img
                          src="https://placehold.co/800x400/2D6A4F/FAF7F0?text=%D0%95%D0%BB%D0%B0%D0%B1%D1%83%D0%B3%D0%B0"
                          alt="Елабуга"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/800x400/2D6A4F/FAF7F0?text=Елабуга";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                        <div className="absolute bottom-4 left-4 flex gap-2">
                          {["История", "Музеи", "Кама"].map(t => (
                            <span key={t} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-3 flex-1">
                          <div>
                            <p className="text-xs font-body text-[#C9A84C] font-semibold mb-1">Купеческий город на Каме</p>
                            <h3 className="font-display text-2xl font-bold text-[#1B4332] mb-2">Елабуга</h3>
                            <p className="font-body text-sm text-[#6B7280] leading-relaxed">
                              Маршрут по древним укреплениям, музеям Шишкина и Цветаевой, старым улицам и набережной Камы.
                            </p>
                          </div>
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2D6A4F] group-hover:bg-[#C9A84C] transition-colors flex items-center justify-center shadow-md mt-1">
                            <Icon name="ArrowRight" size={18} className="text-white" />
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#F2EAD3] text-xs text-[#9CA3AF] font-body">
                          <span className="flex items-center gap-1"><Icon name="MapPin" size={11} />1 маршрут</span>
                          <span className="flex items-center gap-1"><Icon name="Eye" size={11} />10 точек</span>
                          <span className="flex items-center gap-1"><Icon name="Map" size={11} />Яндекс.Карта</span>
                        </div>
                      </div>
                    </button>
                  </RevealDiv>
                </div>
              </section>
            );
          }

          /* ── Landmarks: clickable cards leading to article pages ── */
          if (cat.id === "landmarks") {
            return (
              <section
                key={cat.id}
                ref={el => { sectionRefs.current[cat.id] = el; }}
                className="mb-20 scroll-mt-24"
              >
                <RevealDiv className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#2D6A4F] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md shadow-[#2D6A4F]/20">
                    <Icon name="Landmark" size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1B4332] gold-underline pb-1">
                      Достопримечательности
                    </h2>
                    <p className="font-body text-sm text-[#9CA3AF] mt-3">
                      Узнайте больше о знаковых местах Татарстана
                    </p>
                  </div>
                </RevealDiv>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <RevealDiv>
                    <button
                      onClick={() => navigate("/landmarks/kul-sharif")}
                      className="group relative rounded-3xl overflow-hidden border border-[#E8D9B8] hover:border-[#C9A84C] hover:shadow-2xl hover:shadow-[#C9A84C]/15 transition-all duration-300 bg-white w-full text-left h-full flex flex-col"
                    >
                      <div className="relative h-56 overflow-hidden flex-shrink-0">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/c/c6/%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D0%9C%D0%B5%D1%87%D0%B5%D1%82%D1%8C_%D0%9A%D1%83%D0%BB-%D0%A8%D0%B0%D1%80%D0%B8%D1%84.jpg"
                          alt="Мечеть Кул-Шариф"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/800x400/2D6A4F/FAF7F0?text=Кул-Шариф";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                        <div className="absolute bottom-4 left-4 flex gap-2">
                          {["ЮНЕСКО", "Мечеть", "Казань"].map(t => (
                            <span key={t} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-3 flex-1">
                          <div>
                            <p className="text-xs font-body text-[#C9A84C] font-semibold mb-1">Главная мечеть Татарстана</p>
                            <h3 className="font-display text-2xl font-bold text-[#1B4332] mb-2">Мечеть Кул-Шариф</h3>
                            <p className="font-body text-sm text-[#6B7280] leading-relaxed">
                              Одна из крупнейших мечетей России и Европы. Символ возрождения татарского народа и его духовных традиций.
                            </p>
                          </div>
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2D6A4F] group-hover:bg-[#C9A84C] transition-colors flex items-center justify-center shadow-md mt-1">
                            <Icon name="ArrowRight" size={18} className="text-white" />
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#F2EAD3] text-xs text-[#9CA3AF] font-body">
                          <span className="flex items-center gap-1"><Icon name="MapPin" size={11} />Казань</span>
                          <span className="flex items-center gap-1"><Icon name="Clock" size={11} />2005 г.</span>
                          <span className="flex items-center gap-1"><Icon name="BookOpen" size={11} />Статья</span>
                        </div>
                      </div>
                    </button>
                  </RevealDiv>
                  <RevealDiv delay={80}>
                    <button
                      onClick={() => navigate("/landmarks/suyumbike")}
                      className="group relative rounded-3xl overflow-hidden border border-[#E8D9B8] hover:border-[#C9A84C] hover:shadow-2xl hover:shadow-[#C9A84C]/15 transition-all duration-300 bg-white w-full text-left h-full flex flex-col"
                    >
                      <div className="relative h-56 overflow-hidden flex-shrink-0">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Kazan_Kremlin_Soyembika_Tower_08-2016_img1.jpg/960px-Kazan_Kremlin_Soyembika_Tower_08-2016_img1.jpg"
                          alt="Башня Сююмбике"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/800x400/2D6A4F/FAF7F0?text=Сююмбике";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                        <div className="absolute bottom-4 left-4 flex gap-2">
                          {["Кремль", "Символ Казани", "История"].map(t => (
                            <span key={t} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-3 flex-1">
                          <div>
                            <p className="text-xs font-body text-[#C9A84C] font-semibold mb-1">Архитектурный символ города</p>
                            <h3 className="font-display text-2xl font-bold text-[#1B4332] mb-2">Башня Сююмбике</h3>
                            <p className="font-body text-sm text-[#6B7280] leading-relaxed">
                              Легендарная падающая башня Казанского кремля: история, архитектура и одна из главных легенд Татарстана.
                            </p>
                          </div>
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2D6A4F] group-hover:bg-[#C9A84C] transition-colors flex items-center justify-center shadow-md mt-1">
                            <Icon name="ArrowRight" size={18} className="text-white" />
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#F2EAD3] text-xs text-[#9CA3AF] font-body">
                          <span className="flex items-center gap-1"><Icon name="MapPin" size={11} />Казань</span>
                          <span className="flex items-center gap-1"><Icon name="Clock" size={11} />XVII–XVIII вв.</span>
                          <span className="flex items-center gap-1"><Icon name="BookOpen" size={11} />Статья</span>
                        </div>
                      </div>
                    </button>
                  </RevealDiv>
                  <RevealDiv delay={160}>
                    <button
                      onClick={() => navigate("/landmarks/temple-all-religions")}
                      className="group relative rounded-3xl overflow-hidden border border-[#E8D9B8] hover:border-[#C9A84C] hover:shadow-2xl hover:shadow-[#C9A84C]/15 transition-all duration-300 bg-white w-full text-left h-full flex flex-col"
                    >
                      <div className="relative h-56 overflow-hidden flex-shrink-0">
                        <img
                          src="/HramReligii/hero.png"
                          alt="Храм всех религий"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/800x400/2D6A4F/FAF7F0?text=Храм%20всех%20религий";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                        <div className="absolute bottom-4 left-4 flex gap-2">
                          {["Казань", "Архитектура", "Культура"].map(t => (
                            <span key={t} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-3 flex-1">
                          <div>
                            <p className="text-xs font-body text-[#C9A84C] font-semibold mb-1">Уникальный культурный комплекс</p>
                            <h3 className="font-display text-2xl font-bold text-[#1B4332] mb-2">Храм всех религий</h3>
                            <p className="font-body text-sm text-[#6B7280] leading-relaxed">
                              Символ межрелигиозного диалога в Казани, объединяющий архитектурные мотивы разных конфессий и культур.
                            </p>
                          </div>
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2D6A4F] group-hover:bg-[#C9A84C] transition-colors flex items-center justify-center shadow-md mt-1">
                            <Icon name="ArrowRight" size={18} className="text-white" />
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#F2EAD3] text-xs text-[#9CA3AF] font-body">
                          <span className="flex items-center gap-1"><Icon name="MapPin" size={11} />Казань</span>
                          <span className="flex items-center gap-1"><Icon name="Clock" size={11} />С 1994 г.</span>
                          <span className="flex items-center gap-1"><Icon name="BookOpen" size={11} />Статья</span>
                        </div>
                      </div>
                    </button>
                  </RevealDiv>
                  <RevealDiv delay={240}>
                    <button
                      onClick={() => navigate("/landmarks/farmers-palace")}
                      className="group relative rounded-3xl overflow-hidden border border-[#E8D9B8] hover:border-[#C9A84C] hover:shadow-2xl hover:shadow-[#C9A84C]/15 transition-all duration-300 bg-white w-full text-left h-full flex flex-col"
                    >
                      <div className="relative h-56 overflow-hidden flex-shrink-0">
                        <img
                          src="/FarmersPalace/hero.png"
                          alt="Дворец земледельцев"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/800x400/2D6A4F/FAF7F0?text=Дворец%20земледельцев";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                        <div className="absolute bottom-4 left-4 flex gap-2">
                          {["Казань", "Архитектура", "Символ города"].map(t => (
                            <span key={t} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-3 flex-1">
                          <div>
                            <p className="text-xs font-body text-[#C9A84C] font-semibold mb-1">Современная архитектура Татарстана</p>
                            <h3 className="font-display text-2xl font-bold text-[#1B4332] mb-2">Дворец земледельцев</h3>
                            <p className="font-body text-sm text-[#6B7280] leading-relaxed">
                              Монументальное здание у Кремля с бронзовым деревом на фасаде, ставшее одним из главных визуальных символов Казани.
                            </p>
                          </div>
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2D6A4F] group-hover:bg-[#C9A84C] transition-colors flex items-center justify-center shadow-md mt-1">
                            <Icon name="ArrowRight" size={18} className="text-white" />
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#F2EAD3] text-xs text-[#9CA3AF] font-body">
                          <span className="flex items-center gap-1"><Icon name="MapPin" size={11} />Казань</span>
                          <span className="flex items-center gap-1"><Icon name="Clock" size={11} />2010 г.</span>
                          <span className="flex items-center gap-1"><Icon name="BookOpen" size={11} />Статья</span>
                        </div>
                      </div>
                    </button>
                  </RevealDiv>
                </div>
              </section>
            );
          }

          if (cat.id === "traditions") {
            const mainTradition = cards.find((card) => card.id === 5);
            const otherTraditions = cards.filter((card) => card.id !== 5 && card.id !== 6);

            return (
              <section
                key={cat.id}
                ref={el => { sectionRefs.current[cat.id] = el; }}
                className="mb-20 scroll-mt-24"
              >
                <RevealDiv className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#2D6A4F] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md shadow-[#2D6A4F]/20">
                    <Icon name="Heart" size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1B4332] gold-underline pb-1">
                      Традиции
                    </h2>
                    <p className="font-body text-sm text-[#9CA3AF] mt-3">
                      {cards.length} {cards.length === 1 ? "объект" : cards.length < 5 ? "объекта" : "объектов"}
                    </p>
                  </div>
                </RevealDiv>

                {mainTradition && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <RevealDiv>
                      <button
                        onClick={() => navigate("/traditions/hospitality-tea")}
                        className="group relative rounded-3xl overflow-hidden border border-[#E8D9B8] hover:border-[#C9A84C] hover:shadow-2xl hover:shadow-[#C9A84C]/15 transition-all duration-300 bg-white w-full text-left h-full flex flex-col"
                      >
                        <div className="relative h-56 overflow-hidden flex-shrink-0">
                          <img
                            src={mainTradition.image}
                            alt={mainTradition.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/800x400/2D6A4F/FAF7F0?text=Традиции";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                          <div className="absolute bottom-4 left-4 flex gap-2">
                            {["Традиция", "Чаепитие", "Татарстан"].map(t => (
                              <span key={t} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-start justify-between gap-3 flex-1">
                            <div>
                              <p className="text-xs font-body text-[#C9A84C] font-semibold mb-1">Культурная традиция татар</p>
                              <h3 className="font-display text-2xl font-bold text-[#1B4332] mb-2">{mainTradition.title}</h3>
                              <p className="font-body text-sm text-[#6B7280] leading-relaxed">
                                Душевная традиция общения за столом: уважение к гостю, семейное тепло, чай и национальные угощения.
                              </p>
                            </div>
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2D6A4F] group-hover:bg-[#C9A84C] transition-colors flex items-center justify-center shadow-md mt-1">
                              <Icon name="ArrowRight" size={18} className="text-white" />
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#F2EAD3] text-xs text-[#9CA3AF] font-body">
                            <span className="flex items-center gap-1"><Icon name="MapPin" size={11} />Весь Татарстан</span>
                            <span className="flex items-center gap-1"><Icon name="Clock" size={11} />Традиция</span>
                            <span className="flex items-center gap-1"><Icon name="BookOpen" size={11} />Статья</span>
                          </div>
                        </div>
                      </button>
                    </RevealDiv>
                    <RevealDiv delay={80}>
                      <button
                        onClick={() => navigate("/traditions/embroidery")}
                        className="group relative rounded-3xl overflow-hidden border border-[#E8D9B8] hover:border-[#C9A84C] hover:shadow-2xl hover:shadow-[#C9A84C]/15 transition-all duration-300 bg-white w-full text-left h-full flex flex-col"
                      >
                        <div className="relative h-56 overflow-hidden flex-shrink-0">
                          <img
                            src="/homa/image copy 3.png"
                            alt="Татарская вышивка"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/800x400/2D6A4F/FAF7F0?text=Вышивка";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                          <div className="absolute bottom-4 left-4 flex gap-2">
                            {["Ремёсла", "Искусство", "XIX–XXI вв."].map(t => (
                              <span key={t} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-start justify-between gap-3 flex-1">
                            <div>
                              <p className="text-xs font-body text-[#C9A84C] font-semibold mb-1">Декоративно-прикладное искусство</p>
                              <h3 className="font-display text-2xl font-bold text-[#1B4332] mb-2">Татарская вышивка</h3>
                              <p className="font-body text-sm text-[#6B7280] leading-relaxed">
                                Многовековое искусство украшения нитью — тамбурная вышивка, золотное шитьё, узоры из шёлка и драгоценных нитей.
                              </p>
                            </div>
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2D6A4F] group-hover:bg-[#C9A84C] transition-colors flex items-center justify-center shadow-md mt-1">
                              <Icon name="ArrowRight" size={18} className="text-white" />
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#F2EAD3] text-xs text-[#9CA3AF] font-body">
                            <span className="flex items-center gap-1"><Icon name="MapPin" size={11} />Татарстан</span>
                            <span className="flex items-center gap-1"><Icon name="Clock" size={11} />XIV–XXI вв.</span>
                            <span className="flex items-center gap-1"><Icon name="BookOpen" size={11} />Статья</span>
                          </div>
                        </div>
                      </button>
                    </RevealDiv>
                  </div>
                )}

                {otherTraditions.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {otherTraditions.map((card, i) => (
                      <RevealDiv key={card.id} delay={i * 70}>
                        <ContentCard card={card} onOpen={setModalCard} />
                      </RevealDiv>
                    ))}
                  </div>
                )}
              </section>
            );
          }

          if (cat.id === "rituals") {
            const mainRitual = cards.find((card) => card.id === 7);
            const secondRitual = cards.find((card) => card.id === 8);
            const otherRituals = cards.filter((card) => card.id !== 7 && card.id !== 8);

            return (
              <section
                key={cat.id}
                ref={el => { sectionRefs.current[cat.id] = el; }}
                className="mb-20 scroll-mt-24"
              >
                <RevealDiv className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#2D6A4F] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md shadow-[#2D6A4F]/20">
                    <Icon name="Sparkles" size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1B4332] gold-underline pb-1">
                      Обряды
                    </h2>
                    <p className="font-body text-sm text-[#9CA3AF] mt-3">
                      {cards.length} {cards.length === 1 ? "объект" : cards.length < 5 ? "объекта" : "объектов"}
                    </p>
                  </div>
                </RevealDiv>

                {mainRitual && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <RevealDiv>
                      <button
                        onClick={() => navigate("/rituals/nikah")}
                        className="group relative rounded-3xl overflow-hidden border border-[#E8D9B8] hover:border-[#C9A84C] hover:shadow-2xl hover:shadow-[#C9A84C]/15 transition-all duration-300 bg-white w-full text-left h-full flex flex-col"
                      >
                        <div className="relative h-56 overflow-hidden flex-shrink-0">
                          <img
                            src={mainRitual.image}
                            alt={mainRitual.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/800x400/2D6A4F/FAF7F0?text=Никах";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                          <div className="absolute bottom-4 left-4 flex gap-2">
                            {["Обряд", "Никах", "Семья"].map(t => (
                              <span key={t} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-start justify-between gap-3 flex-1">
                            <div>
                              <p className="text-xs font-body text-[#C9A84C] font-semibold mb-1">Традиционный свадебный обряд</p>
                              <h3 className="font-display text-2xl font-bold text-[#1B4332] mb-2">Обряд Никах</h3>
                              <p className="font-body text-sm text-[#6B7280] leading-relaxed">
                                Религиозное заключение брака в исламской традиции: духовный смысл, этапы обряда и его роль в культуре Татарстана.
                              </p>
                            </div>
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2D6A4F] group-hover:bg-[#C9A84C] transition-colors flex items-center justify-center shadow-md mt-1">
                              <Icon name="ArrowRight" size={18} className="text-white" />
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#F2EAD3] text-xs text-[#9CA3AF] font-body">
                            <span className="flex items-center gap-1"><Icon name="MapPin" size={11} />Весь Татарстан</span>
                            <span className="flex items-center gap-1"><Icon name="Clock" size={11} />Традиция</span>
                            <span className="flex items-center gap-1"><Icon name="BookOpen" size={11} />Статья</span>
                          </div>
                        </div>
                      </button>
                    </RevealDiv>
                    {secondRitual && (
                      <RevealDiv delay={80}>
                        <button
                          onClick={() => navigate("/rituals/kaz-omase")}
                          className="group relative rounded-3xl overflow-hidden border border-[#E8D9B8] hover:border-[#C9A84C] hover:shadow-2xl hover:shadow-[#C9A84C]/15 transition-all duration-300 bg-white w-full text-left h-full flex flex-col"
                        >
                          <div className="relative h-56 overflow-hidden flex-shrink-0">
                            <img
                              src={secondRitual.image}
                              alt={secondRitual.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://placehold.co/800x400/2D6A4F/FAF7F0?text=Каз%20омасе";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                            <div className="absolute bottom-4 left-4 flex gap-2">
                              {["Обряд", "Каз омасе", "Татарстан"].map(t => (
                                <span key={t} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-start justify-between gap-3 flex-1">
                              <div>
                                <p className="text-xs font-body text-[#C9A84C] font-semibold mb-1">Традиционный бытовой обряд</p>
                                <h3 className="font-display text-2xl font-bold text-[#1B4332] mb-2">Каз омасе</h3>
                                <p className="font-body text-sm text-[#6B7280] leading-relaxed">
                                  Древний обряд совместного труда: заготовка пуха и перьев, песни, общение и угощение после работы.
                                </p>
                              </div>
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2D6A4F] group-hover:bg-[#C9A84C] transition-colors flex items-center justify-center shadow-md mt-1">
                                <Icon name="ArrowRight" size={18} className="text-white" />
                              </div>
                            </div>
                            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#F2EAD3] text-xs text-[#9CA3AF] font-body">
                              <span className="flex items-center gap-1"><Icon name="MapPin" size={11} />Сельская местность</span>
                              <span className="flex items-center gap-1"><Icon name="Clock" size={11} />Традиция</span>
                              <span className="flex items-center gap-1"><Icon name="BookOpen" size={11} />Статья</span>
                            </div>
                          </div>
                        </button>
                      </RevealDiv>
                    )}
                  </div>
                )}

                {otherRituals.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {otherRituals.map((card, i) => (
                      <RevealDiv key={card.id} delay={i * 70}>
                        <ContentCard card={card} onOpen={setModalCard} />
                      </RevealDiv>
                    ))}
                  </div>
                )}
              </section>
            );
          }

          if (cat.id === "holidays") {
            const mainHoliday = cards.find((card) => card.id === 9);
            const secondHoliday = cards.find((card) => card.id === 10);
            const thirdHoliday = cards.find((card) => card.id === 11);
            const otherHolidays = cards.filter((card) => card.id !== 9 && card.id !== 10 && card.id !== 11);

            return (
              <section
                key={cat.id}
                ref={el => { sectionRefs.current[cat.id] = el; }}
                className="mb-20 scroll-mt-24"
              >
                <RevealDiv className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#2D6A4F] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md shadow-[#2D6A4F]/20">
                    <Icon name="Star" size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1B4332] gold-underline pb-1">
                      Национальные праздники
                    </h2>
                    <p className="font-body text-sm text-[#9CA3AF] mt-3">
                      {cards.length} {cards.length === 1 ? "объект" : cards.length < 5 ? "объекта" : "объектов"}
                    </p>
                  </div>
                </RevealDiv>

                {mainHoliday && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <RevealDiv>
                      <button
                        onClick={() => navigate("/holidays/sabantuy")}
                        className="group relative rounded-3xl overflow-hidden border border-[#E8D9B8] hover:border-[#C9A84C] hover:shadow-2xl hover:shadow-[#C9A84C]/15 transition-all duration-300 bg-white w-full text-left h-full flex flex-col"
                      >
                        <div className="relative h-56 overflow-hidden flex-shrink-0">
                          <img
                            src={mainHoliday.image}
                            alt={mainHoliday.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/800x400/2D6A4F/FAF7F0?text=Сабантуй";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                          <div className="absolute bottom-4 left-4 flex gap-2">
                            {["Праздник", "Сабантуй", "Татарстан"].map(t => (
                              <span key={t} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-start justify-between gap-3 flex-1">
                            <div>
                              <p className="text-xs font-body text-[#C9A84C] font-semibold mb-1">Главный народный праздник</p>
                              <h3 className="font-display text-2xl font-bold text-[#1B4332] mb-2">Сабантуй</h3>
                              <p className="font-body text-sm text-[#6B7280] leading-relaxed">
                                Праздник плуга: традиции, корэш, народные игры, песни и угощения как символ единства и уважения к труду.
                              </p>
                            </div>
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2D6A4F] group-hover:bg-[#C9A84C] transition-colors flex items-center justify-center shadow-md mt-1">
                              <Icon name="ArrowRight" size={18} className="text-white" />
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#F2EAD3] text-xs text-[#9CA3AF] font-body">
                            <span className="flex items-center gap-1"><Icon name="MapPin" size={11} />Весь Татарстан</span>
                            <span className="flex items-center gap-1"><Icon name="Clock" size={11} />Ежегодно, июнь</span>
                            <span className="flex items-center gap-1"><Icon name="BookOpen" size={11} />Статья</span>
                          </div>
                        </div>
                      </button>
                    </RevealDiv>
                    {secondHoliday && (
                      <RevealDiv delay={80}>
                        <button
                          onClick={() => navigate("/holidays/nauruz")}
                          className="group relative rounded-3xl overflow-hidden border border-[#E8D9B8] hover:border-[#C9A84C] hover:shadow-2xl hover:shadow-[#C9A84C]/15 transition-all duration-300 bg-white w-full text-left h-full flex flex-col"
                        >
                          <div className="relative h-56 overflow-hidden flex-shrink-0">
                            <img
                              src={secondHoliday.image}
                              alt={secondHoliday.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://placehold.co/800x400/2D6A4F/FAF7F0?text=Науруз";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                            <div className="absolute bottom-4 left-4 flex gap-2">
                              {["Праздник", "Науруз", "Весна"].map(t => (
                                <span key={t} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-start justify-between gap-3 flex-1">
                              <div>
                                <p className="text-xs font-body text-[#C9A84C] font-semibold mb-1">Древний праздник весны</p>
                                <h3 className="font-display text-2xl font-bold text-[#1B4332] mb-2">Науруз</h3>
                                <p className="font-body text-sm text-[#6B7280] leading-relaxed">
                                  Праздник весеннего равноденствия, обновления, очищения, добрых пожеланий и щедрого угощения.
                                </p>
                              </div>
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2D6A4F] group-hover:bg-[#C9A84C] transition-colors flex items-center justify-center shadow-md mt-1">
                                <Icon name="ArrowRight" size={18} className="text-white" />
                              </div>
                            </div>
                            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#F2EAD3] text-xs text-[#9CA3AF] font-body">
                              <span className="flex items-center gap-1"><Icon name="MapPin" size={11} />Весь Татарстан</span>
                              <span className="flex items-center gap-1"><Icon name="Clock" size={11} />21 марта</span>
                              <span className="flex items-center gap-1"><Icon name="BookOpen" size={11} />Статья</span>
                            </div>
                          </div>
                        </button>
                      </RevealDiv>
                    )}
                    {thirdHoliday && (
                      <RevealDiv delay={120}>
                        <button
                          onClick={() => navigate("/holidays/kurban-bayram")}
                          className="group relative rounded-3xl overflow-hidden border border-[#E8D9B8] hover:border-[#C9A84C] hover:shadow-2xl hover:shadow-[#C9A84C]/15 transition-all duration-300 bg-white w-full text-left h-full flex flex-col"
                        >
                          <div className="relative h-56 overflow-hidden flex-shrink-0">
                            <img
                              src={thirdHoliday.image}
                              alt={thirdHoliday.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://placehold.co/800x400/2D6A4F/FAF7F0?text=Курбан-Байрам";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                            <div className="absolute bottom-4 left-4 flex gap-2">
                              {["Праздник", "Ислам", "Милосердие"].map(t => (
                                <span key={t} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-start justify-between gap-3 flex-1">
                              <div>
                                <p className="text-xs font-body text-[#C9A84C] font-semibold mb-1">Один из главных мусульманских праздников</p>
                                <h3 className="font-display text-2xl font-bold text-[#1B4332] mb-2">Курбан-Байрам</h3>
                                <p className="font-body text-sm text-[#6B7280] leading-relaxed">
                                  Праздник веры, жертвенности, милосердия и заботы о близких и нуждающихся.
                                </p>
                              </div>
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2D6A4F] group-hover:bg-[#C9A84C] transition-colors flex items-center justify-center shadow-md mt-1">
                                <Icon name="ArrowRight" size={18} className="text-white" />
                              </div>
                            </div>
                            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#F2EAD3] text-xs text-[#9CA3AF] font-body">
                              <span className="flex items-center gap-1"><Icon name="MapPin" size={11} />Весь Татарстан</span>
                              <span className="flex items-center gap-1"><Icon name="Clock" size={11} />По лунному календарю</span>
                              <span className="flex items-center gap-1"><Icon name="BookOpen" size={11} />Статья</span>
                            </div>
                          </div>
                        </button>
                      </RevealDiv>
                    )}
                  </div>
                )}

                {otherHolidays.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {otherHolidays.map((card, i) => (
                      <RevealDiv key={card.id} delay={i * 70}>
                        <ContentCard card={card} onOpen={setModalCard} />
                      </RevealDiv>
                    ))}
                  </div>
                )}
              </section>
            );
          }

          if (cards.length === 0) return null;

          return (
            <section
              key={cat.id}
              ref={el => { sectionRefs.current[cat.id] = el; }}
              className="mb-20 scroll-mt-24"
            >
              <RevealDiv className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#2D6A4F] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md shadow-[#2D6A4F]/20">
                  <Icon name={cat.icon} size={24} className="text-white" />
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
                    <ContentCard
                      card={card}
                      onOpen={(selectedCard) => {
                        if (selectedCard.id === 12) {
                          navigate("/people/tukay");
                          return;
                        }
                        if (selectedCard.id === 13) {
                          navigate("/people/musa-jalil");
                          return;
                        }
                        if (selectedCard.id === 14) {
                          navigate("/people/shalyapin");
                          return;
                        }
                        if (selectedCard.id === 15) {
                          navigate("/dates/kazan-1000");
                          return;
                        }
                        if (selectedCard.id === 16) {
                          navigate("/dates/islam-922");
                          return;
                        }
                        if (selectedCard.id === 17) {
                          navigate("/heritage/idegei");
                          return;
                        }
                        if (selectedCard.id === 18) {
                          navigate("/heritage/munajat");
                          return;
                        }
                        if (selectedCard.id === 19) {
                          navigate("/cuisine/chak-chak");
                          return;
                        }
                        if (selectedCard.id === 20) {
                          navigate("/cuisine/echpochmak");
                          return;
                        }
                        if (selectedCard.id === 21) {
                          navigate("/cuisine/kazylyk");
                          return;
                        }
                        if (selectedCard.id === 22) {
                          navigate("/cuisine/gubadiya");
                          return;
                        }
                        if (selectedCard.id === 23) {
                          navigate("/cuisine/katyk");
                          return;
                        }
                        setModalCard(selectedCard);
                      }}
                    />
                  </RevealDiv>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* ══ FAQ ══ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <RevealDiv className="text-center mb-12">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#1B4332] mb-3">
              Часто задаваемые вопросы
            </h2>
          </RevealDiv>
          <div className="space-y-3">
            {[
              {
                q: "Для чего был создан сайт?",
                a: "Сайт был сделан для Республиканского конкурса Татарстана «Культурный код Татарстана» (виртуальный маршрут)."
              },
              {
                q: "Про что сайт?",
                a: "Сайт посвящен культуре, традициям, национальным блюдам, достопримечательностям, историческим личностям, памятным датам Татарстана, которые стоит увидеть и побольше узнать."
              },
              {
                q: "У меня есть вопросы, есть ли контактная информация для их передачи?",
                a: "Да, есть. На сайте указана почта, на которую вы можете отправлять свои вопросы.А также был добавлен телеграмм-бот @tatarstan_culture_bot, вы можете задать ему вопросы и получить ответы."
              },
              {
                q: "Почему на сайте так мало написано про культуру Татарстана?",
                a: "Сайт был сделан недавно как конкурсная работа, поэтому к сожалению указаны не все обьекты культуры Татарстана . В будущем мы планируем продолжить поддержку сайта и увеличить количество достопримечательностей, обычаи, личностей и тд. Если вы знаете что можно добавить, пишите нам на почту."
              },
            ].map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ REVIEWS ══ */}
      <section id="reviews" className="py-20 bg-[#FAF7F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <RevealDiv className="text-center mb-12">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#1B4332] mb-3">
              Отзывы
            </h2>
            <p className="font-body text-[#9CA3AF]">Что говорят те, кто уже открыл для себя Татарстан</p>
          </RevealDiv>
          <div className="space-y-4">
            {[
              {
                name: "Демьяненко Никита",
                city: "Казань",
                rating: 5,
                short: "Очень хороший сайт",
                full: "Мне очень понравился данный сайт тк в нем размещено большое количество достопримечательностей и обьектов моего родного города Казани и в наших реалиях, считаю его очень нужным, потому что построек стало слишком много и найти из них что то интересное становится действительно трудно. Мне этот сайт очень помог- 5 звезд ⭐⭐⭐⭐⭐"
              },
              {
                name: "Газизов Шамиль",
                city: "Казань",
                rating: 5,
                short: "Полезно",
                full: "Этот сайт невероятно помог мне спланировать маршрут! Я открыл для себя столько удивительных мест, о которых даже не подозревал. Все необходимое для поиска и выбора было под рукой. Особенно понравились виртуальные туры — это как будто побывать там, не выходя из дома. Я уже рекомендовал этот ресурс всем своим друзьям, которые планируют поездку в Татарстан."
              },
              {
                name: "ГЫска Радмир",
                city: "Габишево",
                rating: 4,
                short: "Интересный сайт, но хотелось бы больше информации о традициях и культуре.",
                full: "Уже порекомендовал сайт нескольким знакомым. Мне понравилось оформление и простота в удобстве сайта. есть что доработать"
              },
              {
                name: "Кирилл",
                city: "Ярославль",
                rating: 5,
                short: "",
                full: "Я хоть не был в Татарстане, но благодаря этому сайту смог узнать много нового о его культуре и достопримечательностях. Мне понравился маршрут по Казанскому кремлю"
              },
              {
                name: "Артем",
                city: "Екатеринбург",
                rating: 4,
                short: "Мне нравится",
                full: "Сайт прикольный но жаль что мало написано. В целом 4 звезды"
              },
            ].map((review, i) => (
              <ReviewItem key={i} review={review} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEEDBACK ══ */}
      <section id="feedback" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <RevealDiv className="text-center mb-12">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#1B4332] mb-3">
              Обратная связь
            </h2>
            <p className="font-body text-[#9CA3AF]">Ваше мнение очень важно для нас.Расскажите о сайте</p>
          </RevealDiv>
          <RevealDiv>
            <div className="bg-[#FAF7F0] rounded-2xl border border-[#E8D9B8] p-6 sm:p-8 text-center space-y-4">
              <p className="font-body text-[#374151] text-base leading-relaxed">
                Сайт был сделан для участия в Республиканском конкурсе «Культурный код Татарстана» (виртуальный маршрут) ученика 10 класса
              </p>
              <p className="font-display text-xl font-semibold text-[#1B4332]">
                Ганеева Эрнеста Тимуровича
              </p>
              <p className="font-body text-[#6B7280] text-sm">
                МБОУ Школа №70, г. Казань
              </p>
              <div className="pt-2">
                <p className="font-body text-[#6B7280] text-sm mb-2">Для связи напишите по почте:</p>
                <a
                  href="mailto:nuri01919@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2D6A4F] text-white font-body font-medium text-sm hover:bg-[#1B4332] transition-colors"
                >
                  <Icon name="Mail" size={15} />
                  nuri01919@gmail.com
                </a>
              </div>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="bg-[#1B4332] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/logo.png" alt="Культура Татарстана" className="h-12 w-12 object-contain" />
                <span className="font-display text-xl font-semibold">Культура Татарстана</span>
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
                      {cat.label}
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
                      {cat.label}
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
              <span>Хомяк</span>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://t.me/tatarculture_bot"
              target="_blank"
              rel="noreferrer"
              aria-label="Открыть Telegram-бота"
              className="group inline-flex items-center gap-4 rounded-3xl border border-[#C9A84C]/30 bg-white/5 px-5 py-4 hover:bg-[#229ED9]/12 hover:border-[#229ED9]/60 transition-all duration-300 shadow-lg shadow-black/10"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#229ED9] shadow-md shadow-[#229ED9]/30 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/tg-logo.png"
                  alt="Telegram"
                  className="h-9 w-9 object-contain"
                />
              </span>
              <span className="text-left">
                <span className="block font-display text-lg font-semibold text-white group-hover:text-[#8FD8FF] transition-colors">
                  Telegram-бот
                </span>
                <span className="block font-body text-sm text-white/60 group-hover:text-white/80 transition-colors">
                  Открыть @tatarculture_bot
                </span>
              </span>
            </a>
            <a
              href="mailto:nuri01919@gmail.com"
              aria-label="Написать на почту"
              className="group inline-flex items-center gap-4 rounded-3xl border border-[#C9A84C]/30 bg-white/5 px-5 py-4 hover:bg-[#2D6A4F]/20 hover:border-[#2D6A4F]/60 transition-all duration-300 shadow-lg shadow-black/10"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2D6A4F] shadow-md shadow-[#2D6A4F]/30 transition-transform duration-300 group-hover:scale-105">
                <Icon name="Mail" size={30} className="text-white" />
              </span>
              <span className="text-left">
                <span className="block font-display text-lg font-semibold text-white group-hover:text-[#B7F0D2] transition-colors">
                  Электронная почта
                </span>
                <span className="block font-body text-sm text-white/60 group-hover:text-white/80 transition-colors">
                  nuri01919@gmail.com
                </span>
              </span>
            </a>
          </div>
        </div>
      </footer>

      {modalCard && <Modal card={modalCard} onClose={() => setModalCard(null)} />}
    </div>
  );
}