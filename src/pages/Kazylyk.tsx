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
    content: "/Kazylyk/hero.png",
    caption: "Казылык - традиционная вяленая колбаса",
  },
  {
    type: "text",
    content:
      "Казылык - традиционное мясное блюдо татарской кухни, представляющее собой вяленую или сушеную колбасу, обычно приготовленную из конины. Это одно из древних блюд тюркских народов, тесно связанное с кочевым образом жизни и традициями сохранения мяса.",
  },
  {
    type: "text",
    content:
      "Исторически казылык был важной частью рациона, так как позволял долго хранить мясо без холодильника. Конина нарезалась крупными кусками, приправлялась солью и специями, после чего помещалась в натуральную оболочку и подвешивалась для сушки. Благодаря этому мясо приобретало насыщенный вкус и плотную текстуру, а также могло храниться длительное время.",
  },
  {
    type: "image",
    content: "/Kazylyk/gallery-1.png",
    caption: "Традиционная подготовка мяса",
  },
  {
    type: "text",
    content:
      "Приготовление казылыка требует времени и соблюдения традиционных технологий. Важную роль играет качество мяса и условия сушки. В процессе вяления продукт постепенно теряет влагу, концентрируя вкус и аромат. Иногда казылык дополнительно коптят, что придает ему особый оттенок вкуса.",
  },
  {
    type: "image",
    content: "/Kazylyk/gallery-2.png",
    caption: "Казылык в процессе вяления",
  },
  {
    type: "text",
    content:
      "Казылык обычно подают в нарезанном виде как холодную закуску. Его часто можно увидеть на праздничных столах, особенно во время национальных торжеств и семейных мероприятий. Блюдо хорошо сочетается с хлебом, овощами и другими традиционными продуктами.",
  },
  {
    type: "image",
    content: "/Kazylyk/gallery-3.png",
    caption: "Подача казылыка на национальном столе",
  },
  {
    type: "text",
    content:
      "В культуре татарского народа казылык считается деликатесом и символом достатка. Он отражает особенности традиционного хозяйства, уважение к продуктам и умение сохранять пищу. Сегодня казылык продолжает оставаться важной частью национальной кухни, сохраняя связь с историей и культурным наследием.",
  },
  {
    type: "image",
    content: "/Kazylyk/gallery-4.png",
    caption: "Казылык как часть кулинарного наследия Татарстана",
  },
];

const ARTICLE_META = {
  title: "Казылык",
  subtitle: "Традиционная вяленая колбаса из конины",
  period: "Традиция",
  tags: ["Мясо", "Конина", "Кулинарное наследие"],
};

export default function Kazylyk() {
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
        <img src="/Kazylyk/hero.png" alt={ARTICLE_META.title} className="w-full h-full object-cover" />
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
