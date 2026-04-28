import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface ElabugaPoint {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  coords: [number, number];
  images: string[];
}

const SVIYAZHSK_LIKE_IMAGE = (title: string) =>
  `https://placehold.co/1200x800/2D6A4F/FAF7F0?text=${encodeURIComponent(title)}`;

const ELABUGA_POINTS: ElabugaPoint[] = [
  {
    id: 1,
    title: "Елабужское городище",
    subtitle: "Древнее укрепление и начало истории города",
    desc: "Елабужское городище открывает маршрут как одно из самых древних мест Елабуги. Именно с него принято начинать знакомство с городом: это символ исторического происхождения Елабуги и важная точка, откуда особенно хорошо ощущается её связь с глубокой древностью. Здесь закладывается общее понимание того, как формировалось поселение и почему это место считается знаковым для города.",
    coords: [55.74661012327618,52.03254495030969],
    images: [SVIYAZHSK_LIKE_IMAGE("Елабужское городище")],
  },
  {
    id: 2,
    title: "Чёртово городище",
    subtitle: "Каменная башня и панорамный вид",
    desc: "Чёртово городище — главная историческая достопримечательность Елабуги. Каменная башня на высоком месте стала одним из самых узнаваемых символов города, а панорамные виды вокруг делают эту остановку не только исторически значимой, но и одной из самых впечатляющих визуально. Это место связывает легенды, древнюю историю и современный образ Елабуги.",
    coords: [55.74634687518003,52.032759527030905],
    images: [SVIYAZHSK_LIKE_IMAGE("Чёртово городище")],
  },
  {
    id: 3,
    title: "Спасский собор",
    subtitle: "Архитектурный центр центральной части",
    desc: "Спасский собор задаёт тон центральной части маршрута. Это величественный храм и важный архитектурный ориентир Елабуги, вокруг которого особенно хорошо читается историческая городская среда. Посещение собора помогает увидеть, как в Елабуге сочетались духовная жизнь, купеческое наследие и классическая городская застройка.",
    coords: [55.75349304487684,52.056304755950734],
    images: [SVIYAZHSK_LIKE_IMAGE("Спасский собор")],
  },
  {
    id: 4,
    title: "Шишкинские пруды",
    subtitle: "Прогулочная зона и природный акцент маршрута",
    desc: "Шишкинские пруды дают маршруту спокойную прогулочную паузу. Это зеленая зона с водой, природными видами и атмосферой неспешной городской прогулки. После исторических объектов эта остановка позволяет увидеть Елабугу не только как музей под открытым небом, но и как живое пространство, где архитектура сочетается с природным ландшафтом.",
    coords: [55.7608, 52.0514],
    images: [SVIYAZHSK_LIKE_IMAGE("Шишкинские пруды")],
  },
  {
    id: 5,
    title: "Дом-музей И. И. Шишкина",
    subtitle: "Родной дом знаменитого художника",
    desc: "Дом-музей Ивана Шишкина особенно важен для понимания культурной роли Елабуги. Город известен как родина художника, и музей раскрывает семейную, бытовую и художественную среду, в которой формировался один из самых узнаваемых русских пейзажистов. Эта точка соединяет локальную историю города с масштабом российской культуры.",
    coords: [55.7612, 52.0521],
    images: [SVIYAZHSK_LIKE_IMAGE("Дом-музей И. И. Шишкина")],
  },
  {
    id: 6,
    title: "Музей Марины Цветаевой",
    subtitle: "Культурное место памяти поэтессы",
    desc: "Музей Марины Цветаевой вводит в маршрут важную литературную тему. Он посвящён памяти поэтессы и напоминает о трагических и значимых страницах её биографии, связанных с Елабугой. Это одна из ключевых культурных остановок маршрута, позволяющая увидеть город через судьбы великих людей, оказавшихся здесь в переломные моменты истории.",
    coords: [55.7586, 52.0519],
    images: [SVIYAZHSK_LIKE_IMAGE("Музей Марины Цветаевой")],
  },
  {
    id: 7,
    title: "Дом памяти Марины Цветаевой",
    subtitle: "Последняя точка её жизни",
    desc: "Дом памяти Марины Цветаевой — особое мемориальное место, связанное с последним этапом её жизни. Эта остановка делает маршрут более личным и эмоционально насыщенным: она не только продолжает литературную линию, но и заставляет задуматься о драматических судьбах людей, чья жизнь была связана с Елабугой. Это одно из самых тихих и сильных по смыслу мест маршрута.",
    coords: [55.7581, 52.0515],
    images: [SVIYAZHSK_LIKE_IMAGE("Дом памяти Марины Цветаевой")],
  },
  {
    id: 8,
    title: "Улица Казанская",
    subtitle: "Купеческая застройка и старая архитектура",
    desc: "Прогулка по улице Казанской помогает почувствовать историческую ткань Елабуги. Здесь сохранились купеческие дома и старинная архитектура, благодаря которым город воспринимается как цельный исторический ансамбль. Эта часть маршрута особенно важна для тех, кто хочет увидеть Елабугу не через отдельные достопримечательности, а как живую купеческую среду XIX века.",
    coords: [55.7590, 52.0548],
    images: [SVIYAZHSK_LIKE_IMAGE("Улица Казанская")],
  },
  {
    id: 9,
    title: "Музеи купеческого быта",
    subtitle: "Повседневная жизнь Елабуги XIX века",
    desc: "Музеи купеческого быта продолжают тему исторической застройки и позволяют увидеть, как жили елабужские семьи в XIX веке. Интерьеры, предметы повседневной жизни и атмосфера старого города делают эту остановку особенно наглядной. Здесь маршрут раскрывает бытовую сторону истории — то, как выглядела Елабуга изнутри, в жизни её жителей.",
    coords: [55.7587, 52.0554],
    images: [SVIYAZHSK_LIKE_IMAGE("Музеи купеческого быта")],
  },
  {
    id: 10,
    title: "Набережная Камы",
    subtitle: "Финальная прогулка с видами на реку",
    desc: "Набережная Камы завершает маршрут спокойной прогулкой и широкими видами на реку. После исторических, культурных и мемориальных точек это место работает как логичный финал: здесь можно перевести впечатления в более созерцательный ритм и почувствовать природное окружение Елабуги. Набережная связывает весь маршрут в цельную прогулку — от древней истории к тихому современному городскому пейзажу.",
    coords: [55.7567, 52.0612],
    images: [SVIYAZHSK_LIKE_IMAGE("Набережная Камы")],
  },
];

declare global {
  interface Window {
    ymaps: any;
    _ymapsReady: boolean;
  }
}

const TOUR_INFO = {
  title: "Информация о туре",
  subtitle: "Елабуга",
  desc: "Маршрут по Елабуге построен как последовательная пешеходная прогулка от древнейших мест города к его центральным улицам, музеям и набережной Камы. Он охватывает историческое начало Елабуги, её главные архитектурные акценты, художественные и литературные музеи, купеческую застройку и природные точки отдыха. Этот путь позволяет увидеть город сразу в нескольких измерениях: как древний центр, как родину Шишкина, как место памяти Марины Цветаевой и как цельный исторический городской ландшафт.",
  images: [
    SVIYAZHSK_LIKE_IMAGE("Елабуга"),
    SVIYAZHSK_LIKE_IMAGE("Маршрут по Елабуге"),
    SVIYAZHSK_LIKE_IMAGE("Историческая Елабуга"),
  ],
};

const ELABUGA_ROUTE_PATH: [number, number][] = [
  [55.7629, 52.0446],
  [55.7635, 52.0452],
  [55.7625, 52.0470],
  [55.7610, 52.0498],
  [55.7596, 52.0534],
  [55.7608, 52.0514],
  [55.7612, 52.0521],
  [55.7586, 52.0519],
  [55.7581, 52.0515],
  [55.7590, 52.0548],
  [55.7587, 52.0554],
  [55.7567, 52.0612],
];

export default function Elabuga() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [panoramaMode, setPanoramaMode] = useState(false);
  const [showPanorama, setShowPanorama] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const panoramaContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const placemarkRefs = useRef<any[]>([]);
  const panoramaPlayerRef = useRef<any>(null);
  const panoramaModeRef = useRef(false);

  const selectedPoint = selectedId !== null && selectedId > 0 ? ELABUGA_POINTS.find((p) => p.id === selectedId) ?? null : null;
  const isTourInfo = selectedId === 0;
  const prevPoint = selectedId !== null && selectedId > 1 ? ELABUGA_POINTS.find((p) => p.id === selectedId - 1) : null;
  const nextPoint = selectedId !== null && selectedId >= 0 ? ELABUGA_POINTS.find((p) => p.id === (selectedId === 0 ? 1 : selectedId + 1)) : null;

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const getPlacemarkOptions = useCallback(
    (isActive: boolean) => {
      const markerSvg = isActive
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34"><circle cx="17" cy="17" r="15" fill="#2D6A4F" stroke="#FFFFFF" stroke-width="3"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34"><circle cx="17" cy="17" r="15" fill="#FFFFFF" stroke="#2D6A4F" stroke-width="3"/></svg>`;
      return {
        iconLayout: "default#imageWithContent",
        iconImageHref: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(markerSvg)}`,
        iconImageSize: [34, 34],
        iconImageOffset: [-17, -17],
        iconContentOffset: [0, 0],
        iconContentLayout: window.ymaps.templateLayoutFactory.createClass(
          `<div style="width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-family:Calibri,sans-serif;font-size:14px;font-weight:700;color:${isActive ? "#FFFFFF" : "#1B4332"};">$[properties.iconContent]</div>`
        ),
      };
    },
    []
  );

  const updatePlacemarkStyles = useCallback((activeId: number | null) => {
    placemarkRefs.current.forEach((pm, i) => {
      if (!pm) return;
      const pointId = i + 1;
      const options = getPlacemarkOptions(pointId === activeId);
      Object.entries(options).forEach(([key, value]) => {
        pm.options.set(key, value);
      });
    });
  }, [getPlacemarkOptions]);

  const panMapTo = useCallback((coords: [number, number]) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo(coords, { flying: true, duration: 600 });
    }
  }, []);

  const selectPoint = useCallback((id: number) => {
    setSelectedId(id);
    setCurrentImageIndex(0);
    if (id > 0) {
      const point = ELABUGA_POINTS.find((p) => p.id === id);
      if (point) {
        updatePlacemarkStyles(id);
        panMapTo(point.coords);
      }
    } else {
      updatePlacemarkStyles(null);
    }
  }, [updatePlacemarkStyles, panMapTo]);

  const closeDetail = useCallback(() => {
    setSelectedId(null);
    setCurrentImageIndex(0);
    updatePlacemarkStyles(null);
  }, [updatePlacemarkStyles]);

  const closePanorama = useCallback(() => {
    if (panoramaPlayerRef.current) {
      panoramaPlayerRef.current.destroy();
      panoramaPlayerRef.current = null;
    }
    setShowPanorama(false);
  }, []);

  const openPanoramaAt = useCallback((coords: [number, number]) => {
    if (!panoramaContainerRef.current || !window.ymaps) return;
    window.ymaps.panorama
      .locate(coords, { layer: "yandex#panorama" })
      .then((players: any[]) => {
        if (!players || players.length === 0) {
          return window.ymaps.panorama.locate([55.7596, 52.0534], { layer: "yandex#panorama" });
        }
        return players;
      })
      .then((players: any[]) => {
        if (!players || players.length === 0) return;
        if (panoramaPlayerRef.current) {
          panoramaPlayerRef.current.destroy();
          panoramaPlayerRef.current = null;
        }
        panoramaPlayerRef.current = new window.ymaps.panorama.Player(
          panoramaContainerRef.current,
          players[0],
          { controls: ["arrowsControl", "exitControl", "fullscreenControl", "zoomControl"] }
        );
        setShowPanorama(true);
      })
      .catch(() => {});
  }, []);

  const togglePanoramaMode = useCallback(() => {
    setPanoramaMode((prev) => {
      const next = !prev;
      panoramaModeRef.current = next;
      if (!next) closePanorama();
      return next;
    });
  }, [closePanorama]);

  const initMap = useCallback(() => {
    if (!mapContainerRef.current || !window.ymaps) return;
    window.ymaps.ready(() => {
      if (!mapContainerRef.current) return;

      const map = new window.ymaps.Map(
        mapContainerRef.current,
        { center: [55.7598, 52.0528], zoom: 15, controls: ["zoomControl", "fullscreenControl", "typeSelector"] },
        { suppressMapOpenBlock: true }
      );

      mapInstanceRef.current = map;
      placemarkRefs.current = [];

      const routeOutline = new window.ymaps.Polyline(
        ELABUGA_ROUTE_PATH,
        { hintContent: "Маршрут прохождения" },
        { strokeColor: "#FFFFFF", strokeWidth: 8, strokeOpacity: 0.95, geodesic: false }
      );
      map.geoObjects.add(routeOutline);

      const routeLine = new window.ymaps.Polyline(
        ELABUGA_ROUTE_PATH,
        { hintContent: "Маршрут прохождения" },
        { strokeColor: "#2D6A4F", strokeWidth: 4, strokeOpacity: 0.9, geodesic: false }
      );
      map.geoObjects.add(routeLine);

      ELABUGA_POINTS.forEach((point) => {
        const pm = new window.ymaps.Placemark(
          point.coords,
          { hintContent: `${point.id}. ${point.title}`, iconContent: String(point.id) },
          getPlacemarkOptions(false)
        );
        pm.events.add("click", () => selectPoint(point.id));
        map.geoObjects.add(pm);
        placemarkRefs.current.push(pm);
      });

      map.events.add("click", (e: any) => {
        if (panoramaModeRef.current) {
          openPanoramaAt(e.get("coords"));
        }
      });

      setMapReady(true);
    });
  }, [getPlacemarkOptions, openPanoramaAt, selectPoint]);

  useEffect(() => {
    if (window.ymaps) { initMap(); return; }
    const existing = document.querySelector('script[src*="api-maps.yandex.ru"]');
    if (existing) {
      existing.addEventListener("load", initMap);
      return () => existing.removeEventListener("load", initMap);
    }
    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&load=package.full";
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);
    return () => {
      if (mapInstanceRef.current) { try { mapInstanceRef.current.destroy(); } catch (_) {} mapInstanceRef.current = null; }
      if (panoramaPlayerRef.current) { try { panoramaPlayerRef.current.destroy(); } catch (_) {} panoramaPlayerRef.current = null; }
    };
  }, [initMap]);

  useEffect(() => {
    if (mapReady) updatePlacemarkStyles(selectedId);
  }, [selectedId, mapReady, updatePlacemarkStyles]);

  const activeTitle = isTourInfo ? TOUR_INFO.title : selectedPoint?.title ?? "";
  const activeSubtitle = isTourInfo ? TOUR_INFO.subtitle : selectedPoint?.subtitle ?? "";
  const activeDesc = isTourInfo ? TOUR_INFO.desc : selectedPoint?.desc ?? "";
  const activeImages = isTourInfo ? TOUR_INFO.images : selectedPoint?.images ?? [];
  const hasActiveDetail = selectedId !== null;

  return (
    <div className="min-h-screen bg-[#FAF7F0] font-body flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E8D9B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button onClick={() => navigate("/")} className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Культура Татарстана" className="h-12 w-12 object-contain" />
            <span className="font-display text-lg font-semibold text-[#1B4332] hidden sm:block group-hover:text-[#2D6A4F] transition-colors">
              Культура Татарстана
            </span>
          </button>
          <div className="flex items-center gap-1">
            <button onClick={() => navigate("/")} className="hidden md:flex items-center px-4 py-2 rounded-xl font-body font-medium text-sm text-[#1B4332] hover:bg-[#F2EAD3] hover:text-[#2D6A4F] transition-colors">
              Главная
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-6 max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1">
        <div className="flex items-center gap-2 text-sm font-body text-[#9CA3AF] mb-5 flex-wrap">
          <button onClick={() => navigate("/")} className="hover:text-[#2D6A4F] transition-colors">Культура Татарстана</button>
          <Icon name="ChevronRight" size={14} className="text-[#D1D5DB]" />
          <span className="text-[#1B4332] font-semibold">Елабуга</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8D9B8] p-5 sm:p-6 mb-6 flex flex-col sm:flex-row items-start gap-5">
          <img
            src={TOUR_INFO.images[0]}
            alt="Елабуга"
            className="w-full sm:w-56 h-40 sm:h-40 rounded-xl object-cover flex-shrink-0"
            onError={(e) => { (e.target as HTMLImageElement).src = SVIYAZHSK_LIKE_IMAGE("Елабуга"); }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-body text-[#C9A84C] font-semibold mb-1">Введение</p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1B4332] leading-tight">
              Путешествие по Елабуге
            </h1>
            <p className="text-sm font-body text-[#6B7280] mt-2 leading-relaxed">
              Елабуга · {ELABUGA_POINTS.length} точек маршрута · История, музеи и набережная Камы
            </p>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E8D9B8] bg-white hover:bg-[#F2EAD3] transition-colors text-sm font-body font-medium text-[#1B4332] flex-shrink-0"
          >
            <Icon name={copied ? "Check" : "Share2"} size={15} />
            {copied ? "Скопировано" : "Поделиться"}
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8D9B8] overflow-hidden mb-6">
          <div className="flex flex-col lg:flex-row lg:h-[600px]" style={{ minHeight: "520px" }}>
            <aside className="lg:w-72 xl:w-80 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-[#E8D9B8] overflow-y-auto lg:max-h-[600px]">
              <nav className="py-2 px-2">
                <button
                  onClick={() => selectPoint(0)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group mb-1 ${isTourInfo ? "bg-[#2D6A4F] text-white shadow-md shadow-[#2D6A4F]/20" : "hover:bg-[#F2EAD3] text-[#374151]"}`}
                >
                  <span className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${isTourInfo ? "bg-[#C9A84C] text-white" : "bg-[#F2EAD3] text-[#2D6A4F]"}`}>
                    <Icon name="Info" size={14} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-semibold leading-tight truncate ${isTourInfo ? "text-white" : "text-[#1B4332]"}`} style={{ fontFamily: "Calibri, sans-serif" }}>
                      Информация о туре
                    </p>
                    <p className={`text-[10px] mt-0.5 truncate ${isTourInfo ? "text-white/70" : "text-[#9CA3AF]"}`}>
                      {ELABUGA_POINTS.length} объектов · ~3–4 часа
                    </p>
                  </div>
                </button>

                {ELABUGA_POINTS.map((point, index) => (
                  <div key={point.id} className="relative flex">
                    <div className="flex flex-col items-center ml-[25px] mr-0 flex-shrink-0" style={{ width: "0px" }}>
                      {index < ELABUGA_POINTS.length - 1 && (
                        <div className="absolute top-[42px] w-[2px] bg-[#2D6A4F]/20" style={{ height: "calc(100% - 6px)", left: "25px" }} />
                      )}
                    </div>
                    <button
                      onClick={() => selectPoint(point.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group mb-0.5 ${selectedId === point.id ? "bg-[#2D6A4F] text-white shadow-md shadow-[#2D6A4F]/20" : "hover:bg-[#F2EAD3] text-[#374151]"}`}
                    >
                      <span className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold relative z-10 transition-colors ${selectedId === point.id ? "bg-[#2D6A4F] text-white border-2 border-white" : "bg-white text-[#2D6A4F] border-2 border-[#2D6A4F]"}`} style={{ fontFamily: "Calibri, sans-serif" }}>
                        {point.id}
                      </span>
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={point.images[0]} alt={point.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/72x72/2D6A4F/FAF7F0?text=${point.id}`; }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-xs font-semibold leading-tight truncate ${selectedId === point.id ? "text-white" : "text-[#1B4332]"}`} style={{ fontFamily: "Calibri, sans-serif" }}>
                          {point.title}
                        </p>
                        <p className={`text-[10px] mt-0.5 truncate ${selectedId === point.id ? "text-white/70" : "text-[#9CA3AF]"}`}>
                          {point.subtitle}
                        </p>
                      </div>
                    </button>
                  </div>
                ))}
              </nav>
            </aside>

            <div className="flex-1 flex flex-col lg:flex-row min-h-0">
              {hasActiveDetail && (
                <div className="lg:w-[380px] xl:w-[420px] flex-shrink-0 flex flex-col min-h-0 border-b lg:border-b-0 lg:border-r border-[#E8D9B8] overflow-hidden" style={{ animation: "slideIn 0.3s ease-out" }}>
                  <div className="px-4 py-3 border-b border-[#E8D9B8] flex items-start justify-between gap-3 flex-shrink-0">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-[#C9A84C] font-semibold mb-1">
                        {isTourInfo ? "Елабуга" : `Точка ${selectedId} из ${ELABUGA_POINTS.length} · ${activeSubtitle}`}
                      </p>
                      <h2 className="font-display text-lg font-bold text-[#1B4332] leading-tight">{activeTitle}</h2>
                    </div>
                    <button onClick={closeDetail} className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F2EAD3] transition-colors text-[#6B7280] hover:text-[#1B4332]" title="Закрыть">
                      <Icon name="X" size={18} />
                    </button>
                  </div>

                  <div className="relative h-56 flex-shrink-0 overflow-hidden bg-[#F2EAD3]">
                    <img
                      key={`${selectedId}-${currentImageIndex}`}
                      src={activeImages[currentImageIndex]}
                      alt={`${activeTitle} — фото ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                      style={{ animation: "fadeIn 0.25s ease-out" }}
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/800x300/2D6A4F/FAF7F0?text=${encodeURIComponent(activeTitle)}`; }}
                    />
                    {activeImages.length > 1 && (
                      <>
                        <div className="absolute top-2 left-2">
                          <span className="text-[11px] font-semibold text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                            {currentImageIndex + 1} / {activeImages.length}
                          </span>
                        </div>
                        <button onClick={() => setCurrentImageIndex((p) => p === 0 ? activeImages.length - 1 : p - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors">
                          <Icon name="ChevronLeft" size={16} />
                        </button>
                        <button onClick={() => setCurrentImageIndex((p) => p === activeImages.length - 1 ? 0 : p + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors">
                          <Icon name="ChevronRight" size={16} />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="flex-1 min-h-0 overflow-y-auto p-4">
                    <p className="text-sm text-[#4B5563] leading-relaxed">{activeDesc}</p>
                  </div>

                  {!isTourInfo && (
                    <div className="flex-shrink-0 flex items-center border-t border-[#E8D9B8]">
                      <button onClick={() => { if (prevPoint) selectPoint(prevPoint.id); else selectPoint(0); }} className="flex-1 flex items-center justify-center gap-1 px-3 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#F2EAD3] transition-colors">
                        <Icon name="ChevronLeft" size={16} /> Назад
                      </button>
                      <div className="w-px h-7 bg-[#E8D9B8]" />
                      <button onClick={() => nextPoint && selectPoint(nextPoint.id)} disabled={!nextPoint} className="flex-1 flex items-center justify-center gap-1 px-3 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#F2EAD3] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                        Вперед <Icon name="ChevronRight" size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="flex-1 relative" style={{ minHeight: "400px" }}>
                <div className="absolute top-3 left-3 z-10">
                  <button onClick={togglePanoramaMode} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-body font-semibold shadow-md transition-all ${panoramaMode ? "bg-[#2D6A4F] text-white" : "bg-white text-[#1B4332] hover:bg-[#F2EAD3]"}`}>
                    <Icon name="Layers" size={13} /> Панорамы
                  </button>
                </div>

                {panoramaMode && !showPanorama && (
                  <div className="absolute top-12 left-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-md">
                    <p className="text-xs text-[#2D6A4F]">Нажмите на карту, чтобы открыть панораму</p>
                  </div>
                )}

                {showPanorama && (
                  <button onClick={closePanorama} className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md bg-white text-[#1B4332] hover:bg-[#F2EAD3] transition-all">
                    <Icon name="Map" size={13} /> Вернуться к карте
                  </button>
                )}

                {!mapReady && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#F2EAD3]">
                    <div className="text-center">
                      <div className="w-10 h-10 border-3 border-[#2D6A4F] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                      <p className="text-sm text-[#6B7280]">Загрузка карты…</p>
                    </div>
                  </div>
                )}

                <div ref={mapContainerRef} className="w-full h-full" style={{ display: showPanorama ? "none" : "block", minHeight: "400px" }} />
                <div ref={panoramaContainerRef} className="w-full h-full" style={{ display: showPanorama ? "block" : "none", minHeight: "400px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FFF8ED] border-t border-[#FFE0B2] py-4 px-6 mt-auto">
        <p className="text-xs font-body text-center text-[#B85C00] max-w-3xl mx-auto">
          ℹ️ Данный сайт создан в качестве конкурсной работы и может содержать неточности. Информация представлена в ознакомительных целях.
        </p>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
        .border-3 { border-width: 3px; }
      `}</style>
    </div>
  );
}