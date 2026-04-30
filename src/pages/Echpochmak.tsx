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
    content: "/Echpochmak/hero.jpg",
    caption: "Эчпочмак - треугольный пирожок татарской кухни",
  },
  {
    type: "text",
    content:
      "Эчпочмак - одно из самых известных и традиционных блюд татарской кухни, представляющее собой треугольный пирожок с мясной начинкой. Название происходит от татарских слов " +
      '"эч" - три и "почмак" - угол, что буквально означает "треугольник".',
  },
  {
    type: "text",
    content:
      "Эчпочмак имеет глубокие исторические корни и связан с кочевым образом жизни тюркских народов. Блюдо ценилось за свою сытность, удобство и простоту приготовления. Его можно было легко брать с собой в дорогу, а сочетание теста и мясной начинки обеспечивало полноценное питание.",
  },
  {
    type: "image",
    content: "/Echpochmak/gallery-1.jpg",
    caption: "Традиционный процесс приготовления",
  },
  {
    type: "text",
    content:
      "Классический эчпочмак готовится из пресного или дрожжевого теста. В качестве начинки используются мелко нарезанные сырое мясо (чаще всего говядина или баранина), картофель и лук. В отличие от многих других пирогов, начинка закладывается сырой, что придает блюду особый вкус. В процессе выпекания ингредиенты томятся внутри теста, пропитываясь соками и ароматами.",
  },
  {
    type: "text",
    content:
      "Характерной особенностью эчпочмака является небольшое отверстие в центре. Во время приготовления через него иногда добавляют бульон, чтобы начинка оставалась сочной и насыщенной. Это придает блюду дополнительную мягкость и делает вкус более глубоким.",
  },
  {
    type: "image",
    content: "/Echpochmak/gallery-2.jpg",
    caption: "Эчпочмак на семейном и праздничном столе",
  },
  {
    type: "text",
    content:
      "Эчпочмак традиционно подают горячим, часто вместе с бульоном или чаем. Он широко распространен как в домашней кухне, так и в кафе и ресторанах. Это блюдо можно встретить на праздничных столах, семейных встречах и различных национальных мероприятиях.",
  },
  {
    type: "text",
    content:
      "В культуре Татарстана эчпочмак является не просто едой, а важной частью национальной идентичности. Он символизирует традиции, гостеприимство и связь с историей народа. Сегодня эчпочмак остается одним из самых узнаваемых символов татарской кухни и продолжает передаваться из поколения в поколение.",
  },
];

const ARTICLE_META = {
  title: "Эчпочмак",
  subtitle: "Треугольный пирожок с мясной начинкой",
  period: "Традиция",
  tags: ["Выпечка", "Мясо", "Кулинарное наследие"],
};

export default function Echpochmak() {
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
        <img src="/Echpochmak/hero.jpg" alt={ARTICLE_META.title} className="w-full h-full object-cover" />
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
