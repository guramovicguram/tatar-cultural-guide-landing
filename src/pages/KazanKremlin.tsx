import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

/* ─── Types ─────────────────────────────────────────────── */
interface KremlinPoint {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  coords: [number, number];
  image: string;
}

/* ─── Data ─────────────────────────────────────────────── */
const KREMLIN_POINTS: KremlinPoint[] = [
  {
    id: 1,
    title: "Спасская башня",
    subtitle: "Главный вход в Кремль",
    desc: "Спасская башня — главные ворота Казанского Кремля, возведённые в XVI веке по приказу Ивана Грозного псковскими мастерами. Башня украшена часами и иконой Спасителя, в честь которой получила своё название. Через её арку проходят гости и официальные делегации. Это главный парадный вход, открытый для посетителей ежедневно.",
    coords: [55.7986, 49.1059],
    image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=900&q=85",
  },
  {
    id: 2,
    title: "Мечеть Кул-Шариф",
    subtitle: "Главная мечеть Татарстана",
    desc: "Мечеть Кул-Шариф — одна из крупнейших мечетей России и главная мечеть Республики Татарстан. Восстановлена в 2005 году к 1000-летию Казани на месте легендарной многоминаретной мечети, разрушенной при взятии Казани в 1552 году. Здание выполнено в неотатарском стиле с четырьмя 57-метровыми минаретами и вмещает до 1500 верующих.",
    coords: [55.7988, 49.1027],
    image: "https://images.unsplash.com/photo-1580137197581-df2bb346a786?w=900&q=85",
  },
  {
    id: 3,
    title: "Благовещенский собор",
    subtitle: "Православная святыня XVI века",
    desc: "Благовещенский собор — первый православный храм Казани, заложенный по указу Ивана Грозного в 1552 году. Белокаменный собор в псковском стиле стал символом присоединения Казанского ханства к России. Внутри хранятся уникальные фрески XVI–XIX веков и почитаемые иконы. Собор является объектом Всемирного наследия ЮНЕСКО.",
    coords: [55.7982, 49.1039],
    image: "https://images.unsplash.com/photo-1565373677928-80834e3c326c?w=900&q=85",
  },
  {
    id: 4,
    title: "Президентский дворец",
    subtitle: "Резиденция Президента Татарстана",
    desc: "Президентский дворец (бывший Губернаторский дворец) — официальная резиденция Президента Республики Татарстан. Возведён в 1843–1848 годах в классическом стиле по проекту архитектора К. А. Тона. Перед дворцом открывается великолепный вид на слияние Волги и Казанки. Здание является важнейшим государственным и историческим символом республики.",
    coords: [55.7979, 49.1044],
    image: "https://images.unsplash.com/photo-1467912407355-245f30185020?w=900&q=85",
  },
  {
    id: 5,
    title: "Башня Сеюмбике",
    subtitle: "Падающая башня — символ Казани",
    desc: "Башня Сеюмбике — «падающая» башня Казанского Кремля, наклонённая более чем на 1,98 метра от вертикали. Семиярусная башня высотой 58 метров является одним из главных символов Казани и Татарстана. По легенде, названа в честь казанской царицы Сеюмбике, которая бросилась с её вершины, не желая стать пленницей Ивана Грозного. Входит в список архитектурных памятников федерального значения.",
    coords: [55.7982, 49.1031],
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=900&q=85",
  },
  {
    id: 6,
    title: "Эрмитаж-Казань",
    subtitle: "Выставочный центр в Манеже",
    desc: "Эрмитаж-Казань — выставочный центр, открытый в 2005 году в историческом здании Манежа в Казанском Кремле. Здесь регулярно проводятся временные выставки из фондов Государственного Эрмитажа Санкт-Петербурга. Здание Манежа построено в XIX веке и является памятником архитектуры. Центр стал важнейшей культурной площадкой Казани.",
    coords: [55.7977, 49.1046],
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=85",
  },
  {
    id: 7,
    title: "Тайницкая башня",
    subtitle: "Южные ворота Кремля",
    desc: "Тайницкая башня — одна из 13 башен Казанского Кремля, расположенная на южной стороне крепостной стены. Название получила от тайного подземного хода, который вёл к источнику воды в осаде. Башня построена в XVI веке псковскими мастерами из белого известняка. Через неё открывается вид на панораму реки Казанки.",
    coords: [55.7974, 49.1055],
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=900&q=85",
  },
  {
    id: 8,
    title: "Воскресенская башня",
    subtitle: "Северо-восточная башня",
    desc: "Воскресенская башня расположена на северо-восточном углу Казанского Кремля. Название получила от стоявшей рядом Воскресенской церкви. Башня входит в систему укреплений, возведённых псковскими мастерами в XVI веке. Является частью охраняемого периметра кремлёвских стен. В наши дни с её стороны открывается вид на набережную Казанки.",
    coords: [55.7993, 49.1061],
    image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=900&q=85",
  },
  {
    id: 9,
    title: "Преображенская башня",
    subtitle: "Северная башня Кремля",
    desc: "Преображенская башня — одна из северных башен Казанского Кремля. Своё название получила от Преображенского монастыря, располагавшегося рядом в XVI–XVIII веках. Башня сохранила архитектурные черты псковского зодчества. С её стен открывается живописный вид на Казанку, заречные луга и новые кварталы города.",
    coords: [55.7995, 49.1047],
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900&q=85",
  },
  {
    id: 10,
    title: "Северная стена Кремля",
    subtitle: "Белокаменные стены XVI века",
    desc: "Северная стена Казанского Кремля — часть крепостного периметра протяжённостью более 1800 метров, сложенного из белого известняка. Строительство велось псковскими зодчими в 1556–1562 годах. Стены достигают 8–12 метров высоты и 3,5 метра ширины. Вдоль стен можно пройти исторический маршрут, осмотрев все сохранившиеся башни. Включены в список Всемирного наследия ЮНЕСКО.",
    coords: [55.7993, 49.1031],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
  },
];

/* ─── Yandex Maps declaration ─────────────────────────── */
declare global {
  interface Window {
    ymaps: any;
    _ymapsReady: boolean;
  }
}

/* ─── Component ─────────────────────────────────────────── */
export default function KazanKremlin() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(1);
  const [viewMode, setViewMode] = useState<"map" | "panorama">("map");
  const [mapReady, setMapReady] = useState(false);
  const [panoramaError, setPanoramaError] = useState(false);

  const mapDivRef = useRef<HTMLDivElement>(null);
  const panoramaDivRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const placemarkRefs = useRef<any[]>([]);
  const panoramaPlayerRef = useRef<any>(null);

  const selectedPoint = KREMLIN_POINTS.find((p) => p.id === selectedId)!;
  const prevPoint = KREMLIN_POINTS.find((p) => p.id === selectedId - 1);
  const nextPoint = KREMLIN_POINTS.find((p) => p.id === selectedId + 1);

  /* ── update placemark styles when selection changes ── */
  const updatePlacemarkStyles = useCallback((activeId: number) => {
    placemarkRefs.current.forEach((pm, i) => {
      if (!pm) return;
      const pointId = i + 1;
      pm.options.set(
        "preset",
        pointId === activeId ? "islands#darkOrangeCircleIcon" : "islands#darkGreenCircleIcon"
      );
    });
  }, []);

  /* ── pan map to coords ── */
  const panMapTo = useCallback((coords: [number, number]) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo(coords, { flying: true, duration: 600 });
    }
  }, []);

  /* ── select a point ── */
  const selectPoint = useCallback(
    (id: number) => {
      setSelectedId(id);
      if (viewMode === "panorama") {
        setViewMode("map");
        setPanoramaError(false);
      }
      const point = KREMLIN_POINTS.find((p) => p.id === id);
      if (point) {
        updatePlacemarkStyles(id);
        panMapTo(point.coords);
      }
    },
    [viewMode, updatePlacemarkStyles, panMapTo]
  );

  /* ── open panorama ── */
  const openPanorama = useCallback(() => {
    if (!panoramaDivRef.current || !window.ymaps) return;
    setPanoramaError(false);
    const coords = selectedPoint.coords;
    window.ymaps.panorama
      .locate(coords, { layer: "yandex#panorama" })
      .then((players: any[]) => {
        if (!players || players.length === 0) {
          // Try nearby coordinates (Kremlin area)
          return window.ymaps.panorama.locate([55.7984, 49.1053], { layer: "yandex#panorama" });
        }
        return players;
      })
      .then((players: any[]) => {
        if (!players || players.length === 0) {
          setPanoramaError(true);
          return;
        }
        if (panoramaPlayerRef.current) {
          panoramaPlayerRef.current.destroy();
          panoramaPlayerRef.current = null;
        }
        const player = new window.ymaps.panorama.Player(
          panoramaDivRef.current,
          players[0],
          {
            controls: ["arrowsControl", "exitControl", "fullscreenControl", "zoomControl"],
          }
        );
        panoramaPlayerRef.current = player;
        setViewMode("panorama");
      })
      .catch(() => setPanoramaError(true));
  }, [selectedPoint.coords]);

  /* ── close panorama ── */
  const closePanorama = useCallback(() => {
    if (panoramaPlayerRef.current) {
      panoramaPlayerRef.current.destroy();
      panoramaPlayerRef.current = null;
    }
    setViewMode("map");
    setPanoramaError(false);
  }, []);

  /* ── initialize Yandex Map ── */
  const initMap = useCallback(() => {
    if (!mapDivRef.current || !window.ymaps) return;

    window.ymaps.ready(() => {
      if (!mapDivRef.current) return;

      const map = new window.ymaps.Map(
        mapDivRef.current,
        {
          center: [55.7984, 49.1045],
          zoom: 17,
          controls: ["zoomControl", "fullscreenControl", "typeSelector"],
        },
        { suppressMapOpenBlock: true }
      );

      mapInstanceRef.current = map;
      placemarkRefs.current = [];

      KREMLIN_POINTS.forEach((point) => {
        const pm = new window.ymaps.Placemark(
          point.coords,
          { hintContent: `${point.id}. ${point.title}` },
          {
            preset:
              point.id === 1
                ? "islands#darkOrangeCircleIcon"
                : "islands#darkGreenCircleIcon",
            iconContent: String(point.id),
          }
        );
        pm.events.add("click", () => selectPoint(point.id));
        map.geoObjects.add(pm);
        placemarkRefs.current.push(pm);
      });

      setMapReady(true);
    });
  }, [selectPoint]);

  /* ── load Yandex Maps script ── */
  useEffect(() => {
    if (window.ymaps) {
      initMap();
      return;
    }

    const existing = document.querySelector(
      'script[src*="api-maps.yandex.ru"]'
    );
    if (existing) {
      existing.addEventListener("load", initMap);
      return () => existing.removeEventListener("load", initMap);
    }

    const script = document.createElement("script");
    script.src =
      "https://api-maps.yandex.ru/2.1/?lang=ru_RU&load=package.full";
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.destroy();
        } catch (_) {}
        mapInstanceRef.current = null;
      }
      if (panoramaPlayerRef.current) {
        try {
          panoramaPlayerRef.current.destroy();
        } catch (_) {}
        panoramaPlayerRef.current = null;
      }
    };
  }, [initMap]);

  /* ── keep placemarks in sync when selectPoint changes after map init ── */
  useEffect(() => {
    if (mapReady) {
      updatePlacemarkStyles(selectedId);
    }
  }, [selectedId, mapReady, updatePlacemarkStyles]);

  /* ─── Render ─────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#FAF7F0] font-body flex flex-col">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8D9B8] h-14">
        <div className="max-w-full px-3 sm:px-5 flex items-center gap-3 h-full">
          <button
            onClick={() => navigate("/kazan")}
            className="flex items-center gap-1.5 text-[#2D6A4F] hover:text-[#1B4332] transition-colors font-body font-medium text-sm whitespace-nowrap"
          >
            <Icon name="ChevronLeft" size={17} />
            <span className="hidden sm:inline">Маршруты Казани</span>
            <span className="sm:hidden">Назад</span>
          </button>

          <div className="h-4 w-px bg-[#E8D9B8]" />

          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#2D6A4F] flex-shrink-0 flex items-center justify-center">
              <Icon name="Castle" size={14} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-[#1B4332] text-sm leading-none truncate">
                Казанский Кремль
              </p>
              <p className="text-[10px] text-[#9CA3AF] font-body mt-0.5 hidden sm:block">
                Объект Всемирного наследия ЮНЕСКО · 10 точек маршрута
              </p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-body text-[#9CA3AF]">
              <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />
              Точка {selectedId} из {KREMLIN_POINTS.length}
            </span>
          </div>
        </div>
      </nav>

      {/* ── Main 3-column layout ── */}
      <div className="flex flex-col lg:flex-row flex-1 pt-14 h-[calc(100vh-0px)]">
        {/* ── Left: points list ── */}
        <aside className="lg:w-64 xl:w-72 flex-shrink-0 bg-white border-r border-[#E8D9B8] overflow-y-auto order-3 lg:order-1 lg:h-full">
          <div className="p-3 border-b border-[#F2EAD3]">
            <p className="text-xs font-body font-semibold text-[#9CA3AF] uppercase tracking-wider">
              Точки маршрута
            </p>
          </div>
          <nav className="p-2">
            {KREMLIN_POINTS.map((point) => (
              <button
                key={point.id}
                onClick={() => selectPoint(point.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group mb-0.5
                  ${selectedId === point.id
                    ? "bg-[#2D6A4F] text-white shadow-md shadow-[#2D6A4F]/20"
                    : "hover:bg-[#F2EAD3] text-[#374151]"
                  }`}
              >
                {/* Number badge */}
                <span
                  className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold font-display transition-colors
                    ${selectedId === point.id
                      ? "bg-[#C9A84C] text-white"
                      : "bg-[#F2EAD3] text-[#2D6A4F] group-hover:bg-[#E8D9B8]"
                    }`}
                >
                  {point.id}
                </span>
                {/* Thumbnail */}
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={point.image}
                    alt={point.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/80x80/2D6A4F/FAF7F0?text=${point.id}`;
                    }}
                  />
                </div>
                {/* Title */}
                <div className="min-w-0 flex-1">
                  <p className={`text-xs font-body font-semibold leading-tight truncate ${selectedId === point.id ? "text-white" : "text-[#1B4332]"}`}>
                    {point.title}
                  </p>
                  <p className={`text-[10px] font-body mt-0.5 truncate ${selectedId === point.id ? "text-white/70" : "text-[#9CA3AF]"}`}>
                    {point.subtitle}
                  </p>
                </div>
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Center: point details ── */}
        <section className="flex-1 lg:max-w-sm xl:max-w-md flex flex-col bg-[#FAF7F0] border-r border-[#E8D9B8] order-2 lg:order-2 overflow-y-auto lg:h-full">
          {/* Point image */}
          <div className="relative h-52 flex-shrink-0 overflow-hidden">
            <img
              key={selectedPoint.id}
              src={selectedPoint.image}
              alt={selectedPoint.title}
              className="w-full h-full object-cover"
              style={{ animation: "fadeIn 0.3s ease-out" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/800x400/2D6A4F/FAF7F0?text=${encodeURIComponent(selectedPoint.title)}`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            {/* Number badge overlay */}
            <div className="absolute top-3 left-3">
              <span className="w-9 h-9 bg-[#C9A84C] text-white rounded-full flex items-center justify-center font-display font-bold text-base shadow-lg">
                {selectedPoint.id}
              </span>
            </div>
            {/* Share button placeholder */}
            <button className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/35 transition-colors">
              <Icon name="Share2" size={15} />
            </button>
          </div>

          {/* Point info */}
          <div className="p-4 flex-1">
            <p className="text-xs font-body text-[#C9A84C] font-semibold mb-1">
              {selectedPoint.subtitle}
            </p>
            <h2 className="font-display text-xl font-bold text-[#1B4332] mb-3 leading-tight">
              {selectedPoint.title}
            </h2>

            {/* Close panorama hint if applicable */}
            {viewMode === "panorama" && (
              <button
                onClick={closePanorama}
                className="mb-3 flex items-center gap-1.5 text-xs font-body text-[#2D6A4F] bg-[#E8F4EE] px-3 py-1.5 rounded-full hover:bg-[#D1EAD9] transition-colors"
              >
                <Icon name="Map" size={12} />
                Вернуться к карте
              </button>
            )}

            {panoramaError && (
              <div className="mb-3 text-xs font-body text-[#B85C00] bg-[#FFF3E0] px-3 py-2 rounded-xl">
                Панорама в этой точке недоступна. Попробуйте другую точку маршрута.
              </div>
            )}

            <p className="text-sm font-body text-[#4B5563] leading-relaxed">
              {selectedPoint.desc}
            </p>
          </div>

          {/* Prev / Next navigation */}
          <div className="flex items-center border-t border-[#E8D9B8] bg-white">
            <button
              onClick={() => prevPoint && selectPoint(prevPoint.id)}
              disabled={!prevPoint}
              className="flex-1 flex items-center gap-2 px-4 py-3 text-sm font-body font-medium text-[#374151] hover:bg-[#F2EAD3] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Icon name="ChevronLeft" size={16} />
              <span className="truncate">{prevPoint?.title ?? "Начало"}</span>
            </button>
            <div className="w-px h-8 bg-[#E8D9B8]" />
            <button
              onClick={() => nextPoint && selectPoint(nextPoint.id)}
              disabled={!nextPoint}
              className="flex-1 flex items-center justify-end gap-2 px-4 py-3 text-sm font-body font-medium text-[#374151] hover:bg-[#F2EAD3] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <span className="truncate">{nextPoint?.title ?? "Конец"}</span>
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        </section>

        {/* ── Right: map ── */}
        <div className="flex-1 flex flex-col order-1 lg:order-3 relative" style={{ minHeight: "360px" }}>
          {/* Map toolbar */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2 flex-wrap">
            {/* Map/Satellite is handled by Yandex typeSelector */}
            <button
              onClick={viewMode === "panorama" ? closePanorama : openPanorama}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-body font-semibold shadow-md transition-all
                ${viewMode === "panorama"
                  ? "bg-[#2D6A4F] text-white"
                  : "bg-white text-[#1B4332] hover:bg-[#F2EAD3]"
                }`}
            >
              <Icon name={viewMode === "panorama" ? "Map" : "Eye"} size={13} />
              {viewMode === "panorama" ? "Карта" : "3D панорама"}
            </button>
          </div>

          {/* Loading overlay */}
          {!mapReady && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#F2EAD3]">
              <div className="text-center">
                <div className="w-10 h-10 border-3 border-[#2D6A4F] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm font-body text-[#6B7280]">Загрузка карты…</p>
              </div>
            </div>
          )}

          {/* Yandex Map div */}
          <div
            ref={mapDivRef}
            className="w-full h-full"
            style={{ display: viewMode === "map" ? "block" : "none", minHeight: "360px" }}
          />

          {/* Panorama div */}
          <div
            ref={panoramaDivRef}
            className="w-full h-full"
            style={{ display: viewMode === "panorama" ? "block" : "none", minHeight: "360px" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .border-3 { border-width: 3px; }
      `}</style>
    </div>
  );
}
