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
    content: "/Gubadiya/hero.png",
    caption: "Губадия - традиционный многослойный пирог",
  },
  {
    type: "text",
    content:
      "Губадия - традиционный многослойный пирог татарской кухни, считающийся одним из самых сложных и торжественных блюд. Он занимает особое место в культуре Татарстана и обычно готовится по важным случаям: на свадьбах, праздниках и семейных торжествах.",
  },
  {
    type: "text",
    content:
      "Главная особенность губадии - ее многослойная структура. В отличие от обычных пирогов, она состоит из нескольких начинок, которые укладываются слоями. Классический вариант включает отварной рис, мясо (чаще всего говядину), яйца, сухофрукты (изюм, курагу), а также особый сладкий творожный продукт - корт. Все эти ингредиенты располагаются в определенной последовательности, создавая сложное сочетание вкусов.",
  },
  {
    type: "text",
    content:
      "Тесто для губадии обычно делают дрожжевым. Оно должно быть мягким и хорошо пропекаться, удерживая внутри сочную начинку. При выпекании слои пропитываются соками и ароматами друг друга, благодаря чему пирог приобретает насыщенный и гармоничный вкус.",
  },
  {
    type: "text",
    content:
      "Существует два основных вида губадии: сладкая и мясная. В сладком варианте преобладают рис, корт и сухофрукты, а мясной вариант сочетает соленые и сладкие ингредиенты, что является характерной особенностью татарской кухни.",
  },
  {
    type: "text",
    content:
      "Губадия имеет символическое значение. Она ассоциируется с достатком, гостеприимством и уважением к гостям. Приготовление этого блюда требует времени и мастерства, поэтому оно всегда считалось показателем кулинарного искусства хозяйки.",
  },
  {
    type: "text",
    content:
      "Сегодня губадия остается важной частью татарской гастрономической традиции. Ее готовят как в домашних условиях, так и в ресторанах национальной кухни, сохраняя старинные рецепты и передавая их из поколения в поколение.",
  },
];

const ARTICLE_META = {
  title: "Губадия",
  subtitle: "Традиционный многослойный пирог татарской кухни",
  period: "Традиция",
  tags: ["Пирог", "Праздник", "Кулинарное наследие"],
};

export default function Gubadiya() {
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
        <img src="/Gubadiya/hero.png" alt={ARTICLE_META.title} className="w-full h-full object-cover" />
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
