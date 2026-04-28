import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

/* ─── Article content blocks ────────────────────────────── */
/* Each block is either { type: "text", content: string }
   or { type: "image", src: string, alt: string, caption?: string }
   This allows inserting images anywhere in the article. */

interface TextBlock {
  type: "text";
  content: string;
}

interface ImageBlock {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

type ArticleBlock = TextBlock | ImageBlock;

const ARTICLE_BLOCKS: ArticleBlock[] = [
  {
    type: "text",
    content:
      "Мечеть Кул-Шариф — главная соборная мечеть Республики Татарстан и Казани, одна из крупнейших мечетей в России и Европе. Расположена на территории Казанского кремля, внесённого в список Всемирного наследия ЮНЕСКО. Мечеть названа в честь Кул-Шарифа — последнего имама Казанского ханства, погибшего при обороне города от войск Ивана Грозного в 1552 году.",
  },
  {
    type: "image",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/c6/%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D0%9C%D0%B5%D1%87%D0%B5%D1%82%D1%8C_%D0%9A%D1%83%D0%BB-%D0%A8%D0%B0%D1%80%D0%B8%D1%84.jpg",
    alt: "Мечеть Кул-Шариф — вид снаружи",
    caption: "Мечеть Кул-Шариф на территории Казанского кремля",
  },
  {
    type: "text",
    content:
      "Историческая мечеть Кул-Шарифа была разрушена в октябре 1552 года при штурме Казани. Она являлась центром религиозного просвещения и развития наук Среднего Поволжья XVI столетия. Многоминаретная мечеть была одним из величайших сооружений своей эпохи — по свидетельствам современников, она поражала великолепием и была «центром и рассадником» мусульманской учёности.",
  },
  {
    type: "text",
    content:
      "Решение о воссоздании мечети было принято в 1995 году. Строительство началось в 1996 году по проекту группы архитекторов под руководством Ильдара Сайфуллина. Перед архитекторами стояла сложнейшая задача — воссоздать мечеть, о внешнем виде которой сохранились лишь отрывочные исторические описания. В основу были положены традиции булгарского, татарского и русского зодчества.",
  },
  {
    type: "image",
    src: "https://i2015.otzovik.com/2015/08/18/2343494/img/32781234.jpg",
    alt: "Интерьер мечети Кул-Шариф",
    caption: "Внутреннее убранство мечети поражает великолепием",
  },
  {
    type: "text",
    content:
      "Торжественное открытие мечети состоялось 24 июня 2005 года, в день празднования тысячелетия Казани. На церемонии открытия присутствовали президенты Российской Федерации и Республики Татарстан, духовные лидеры мусульманского мира. Открытие стало символическим событием — спустя 453 года мечеть Кул-Шарифа была возрождена.",
  },
  {
    type: "text",
    content:
      "Архитектурный облик мечети сочетает восточные и европейские мотивы. Здание выполнено в бело-голубых тонах, что символизирует небо и чистоту. Восемь пересекающихся стрел-арок образуют «Казанскую шапку» — корону казанских ханов, ставшую основным элементом композиции. Четыре основных минарета достигают высоты 58 метров и видны из любой точки города.",
  },
  {
    type: "image",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9d/%D0%92%D0%B5%D1%80%D1%81%D0%B8%D1%8F_%D0%B4%D0%BB%D1%8F_%D0%BF%D0%B5%D1%87%D0%B0%D1%82%D0%B8_%D0%9A%D0%BE%D0%BC%D0%BF%D0%BB%D0%B5%D0%BA%D1%81_%D0%BC%D0%B5%D1%87%D0%B5%D1%82%D0%B8_%D0%9A%D1%83%D0%BB_%D0%A8%D0%B0%D1%80%D0%B8%D1%84_-_panoramio.jpg",
    alt: "Комплекс мечети Кул-Шариф — панорама",
    caption: "Панорамный вид на комплекс мечети",
  },
  {
    type: "text",
    content:
      "Внутреннее убранство мечети выполнено с использованием дорогих материалов: гранит и мрамор из Урала, змеевик — камень тёмно-зелёного оттенка, иранские ковры ручной работы, хрустальные люстры из Чехии весом по полторы тонны. Стены украшены арабской каллиграфией — аятами из Корана, резными орнаментами и витражами.",
  },
  {
    type: "text",
    content:
      "Мечеть вмещает до 1500 молящихся внутри здания, а на площади перед ней могут разместиться ещё до 10 000 верующих. В цокольном этаже расположен Музей ислама, где представлена экспозиция об истории ислама в Поволжье, а также собрана уникальная коллекция рукописей и артефактов. Мечеть является действующей — ежедневно проводятся намазы.",
  },
  {
    type: "image",
    src: "https://diary-culture.ru/upload/wysiwyg/c8d5a7723ce8b92ff5d94ce97123b779.jpg",
    alt: "Мечеть Кул-Шариф — ночная подсветка",
    caption: "Ночная подсветка мечети создаёт особую атмосферу",
  },
  {
    type: "text",
    content:
      "Сегодня мечеть Кул-Шариф является одним из главных символов Казани и Татарстана. Она входит в число наиболее посещаемых достопримечательностей города. Мечеть стала не только духовным центром мусульман, но и символом межрелигиозного мира и согласия — ведь она стоит по соседству с Благовещенским собором XVI века. Это соседство олицетворяет многовековую традицию мирного сосуществования культур и религий на земле Татарстана.",
  },
];

const ARTICLE_META = {
  title: "Мечеть Кул-Шариф",
  subtitle: "Главная соборная мечеть Республики Татарстан",
  heroImage:
    "https://upload.wikimedia.org/wikipedia/commons/c/c6/%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D0%9C%D0%B5%D1%87%D0%B5%D1%82%D1%8C_%D0%9A%D1%83%D0%BB-%D0%A8%D0%B0%D1%80%D0%B8%D1%84.jpg",
  location: "Казань, Казанский кремль",
  period: "1996–2005",
  tags: ["ЮНЕСКО", "Мечеть", "Архитектура", "Казань"],
};

export default function KulSharif() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF7F0] font-body flex flex-col">
      {/* Header */}
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

      {/* Hero */}
      <div className="relative pt-16">
        <div className="relative h-72 sm:h-96 overflow-hidden">
          <img
            src={ARTICLE_META.heroImage}
            alt={ARTICLE_META.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/1400x500/2D6A4F/FAF7F0?text=${encodeURIComponent(ARTICLE_META.title)}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              {ARTICLE_META.tags.map((t) => (
                <span key={t} className="bg-[#C9A84C] text-white text-xs px-3 py-1 rounded-full font-body font-medium">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight mb-2">
              {ARTICLE_META.title}
            </h1>
            <p className="font-body text-white/70 text-base sm:text-lg">{ARTICLE_META.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Breadcrumb + Meta */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex items-center gap-2 text-sm font-body text-[#9CA3AF] my-5 flex-wrap">
          <button onClick={() => navigate("/")} className="hover:text-[#2D6A4F] transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} className="text-[#D1D5DB]" />
          <button onClick={() => { navigate("/"); setTimeout(() => document.getElementById("landmarks")?.scrollIntoView({ behavior: "smooth" }), 100); }} className="hover:text-[#2D6A4F] transition-colors">
            Достопримечательности
          </button>
          <Icon name="ChevronRight" size={14} className="text-[#D1D5DB]" />
          <span className="text-[#1B4332] font-semibold">{ARTICLE_META.title}</span>
        </div>

        <div className="flex items-center gap-5 mb-8 text-sm text-[#6B7280] font-body">
          <span className="flex items-center gap-1.5"><Icon name="MapPin" size={14} className="text-[#C9A84C]" />{ARTICLE_META.location}</span>
          <span className="flex items-center gap-1.5"><Icon name="Clock" size={14} className="text-[#C9A84C]" />{ARTICLE_META.period}</span>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 w-full flex-1">
        <div className="space-y-8">
          {ARTICLE_BLOCKS.map((block, index) => {
            if (block.type === "text") {
              return (
                <p key={index} className="font-body text-[#374151] text-base sm:text-lg leading-relaxed">
                  {block.content}
                </p>
              );
            }

            if (block.type === "image") {
              return (
                <figure key={index} className="my-8">
                  <div className="rounded-2xl overflow-hidden border border-[#E8D9B8] shadow-sm">
                    <img
                      src={block.src}
                      alt={block.alt}
                      className="w-full h-auto object-cover max-h-[500px]"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/1000x500/2D6A4F/FAF7F0?text=${encodeURIComponent(block.alt)}`;
                      }}
                    />
                  </div>
                  {block.caption && (
                    <figcaption className="mt-3 text-center font-body text-sm text-[#9CA3AF] italic">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }

            return null;
          })}
        </div>

        {/* Back */}
        <div className="mt-12 pt-8 border-t border-[#E8D9B8]">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[#2D6A4F] hover:text-[#1B4332] transition-colors font-body font-medium"
          >
            <Icon name="ChevronLeft" size={18} />
            Вернуться на главную
          </button>
        </div>
      </article>

      {/* Disclaimer */}
      <div className="bg-[#FFF8ED] border-t border-[#FFE0B2] py-4 px-6 mt-auto">
        <p className="text-xs font-body text-center text-[#B85C00] max-w-3xl mx-auto">
          ℹ️ Данный сайт создан в качестве конкурсной работы и может содержать неточности. Информация представлена в ознакомительных целях.
        </p>
      </div>
    </div>
  );
}
