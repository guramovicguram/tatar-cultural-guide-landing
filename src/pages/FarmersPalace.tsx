import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ArticleBlock {
  type: "text" | "image";
  content: string;
  caption?: string;
}

const ARTICLE_BLOCKS: ArticleBlock[] = [
  {
    type: "image",
    content: "/FarmersPalace/hero.png",
    caption: "Дворец земледельцев в Казани",
  },
  {
    type: "text",
    content:
      "Дворец земледельцев - одно из самых узнаваемых современных зданий Казани, расположенное рядом с Казанским Кремлем. Сегодня оно известно как эффектный архитектурный символ города, однако его история связана с развитием государственного управления сельским хозяйством в Республике Татарстан.",
  },
  {
    type: "text",
    content:
      "Идея строительства здания возникла в начале 2000-х годов в рамках масштабного обновления облика Казани, которое активно велось в преддверии 1000-летия города и продолжилось в последующие годы. В этот период в столице Татарстана реализовывались крупные градостроительные проекты, направленные на формирование современного и одновременно исторически выразительного архитектурного пространства.",
  },
  {
    type: "image",
    content: "/FarmersPalace/gallery-1.png",
    caption: "Архитектурный ансамбль рядом с Кремлем",
  },
  {
    type: "text",
    content:
      "Строительство Дворца земледельцев было завершено в 2010 году. Здание задумывалось как штаб-квартира Министерства сельского хозяйства и продовольствия Республики Татарстан, а также ряда подведомственных организаций. Таким образом, его функциональное назначение напрямую связано с аграрной отраслью - одной из ключевых сфер экономики региона.",
  },
  {
    type: "text",
    content:
      "Архитектурный облик здания выполнен в эклектичном стиле с элементами классицизма, барокко и ампира. При проектировании архитекторы стремились создать образ, который ассоциировался бы с устойчивостью, развитием и плодородием. Центральным элементом фасада стало большое бронзовое дерево, размещенное в арке здания. Оно символизирует жизнь, рост и процветание сельского хозяйства. В вечернее время дерево подсвечивается, что усиливает визуальный эффект и делает здание особенно выразительным.",
  },
  {
    type: "image",
    content: "/FarmersPalace/gallery-2.png",
    caption: "Бронзовое дерево - главный символ фасада",
  },
  {
    type: "text",
    content:
      "Проект Дворца земледельцев вызвал широкий общественный резонанс. С одной стороны, его высоко оценили за масштабность, декоративность и оригинальность. С другой стороны, звучала критика, связанная с тем, что столь пышный стиль контрастирует с исторической средой Казанского Кремля. Тем не менее со временем здание стало одной из самых фотографируемых достопримечательностей города и популярной точкой для туристов.",
  },
  {
    type: "image",
    content: "/FarmersPalace/gallery-3.png",
    caption: "Площадь перед Дворцом земледельцев",
  },
  {
    type: "text",
    content:
      "Перед Дворцом земледельцев располагается просторная площадь, на которой проводятся культурные мероприятия, концерты и городские праздники. Таким образом, здание выполняет не только административную, но и общественную функцию, становясь частью культурной жизни города.",
  },
  {
    type: "text",
    content:
      "История Дворца земледельцев отражает современный этап развития Казани - стремление соединить традиции и новаторство, подчеркнуть значимость сельского хозяйства и создать новые архитектурные символы. Сегодня это здание является ярким примером современной городской архитектуры и важной частью туристического образа столицы Татарстана.",
  },
];

const ARTICLE_META = {
  title: "Дворец земледельцев",
  subtitle: "Современный архитектурный символ Казани",
  period: "2010 год",
  tags: ["Казань", "Архитектура", "Достопримечательность"],
};

export default function FarmersPalace() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate("/")}>
            Главная
          </span>
          <span>/</span>
          <span className="text-foreground font-medium">{ARTICLE_META.title}</span>
        </div>
      </nav>

      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src="/FarmersPalace/hero.png" alt={ARTICLE_META.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 md:p-10">
          <div className="flex flex-wrap gap-2 mb-3">
            {ARTICLE_META.tags.map((tag) => (
              <span key={tag} className="text-xs bg-white/20 text-white rounded-full px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white">{ARTICLE_META.title}</h1>
          <p className="text-white/80 mt-1 text-sm md:text-base">
            {ARTICLE_META.subtitle} · {ARTICLE_META.period}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {ARTICLE_BLOCKS.map((block, i) => {
          if (block.type === "text") {
            return (
              <p key={i} className="text-base md:text-lg leading-relaxed text-foreground">
                {block.content}
              </p>
            );
          }

          return (
            <figure key={i} className="space-y-2">
              <img src={block.content} alt={block.caption ?? ""} className="w-full rounded-xl object-cover max-h-96" />
              {block.caption && <figcaption className="text-sm text-muted-foreground text-center">{block.caption}</figcaption>}
            </figure>
          );
        })}
      </div>
    </div>
  );
}
