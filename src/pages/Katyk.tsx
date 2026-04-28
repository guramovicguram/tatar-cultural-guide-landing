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
    content: "/Katyk/hero.png",
    caption: "Катык - традиционный кисломолочный продукт",
  },
  {
    type: "text",
    content:
      "Катык - традиционный кисломолочный продукт, широко распространенный у татар и других тюркских народов. Он занимает важное место в национальной кухне и повседневном питании, являясь не только вкусным, но и полезным продуктом.",
  },
  {
    type: "text",
    content:
      "Катык изготавливается из кипяченого молока, чаще всего коровьего или овечьего. После кипячения молоко охлаждают до теплого состояния и добавляют закваску - небольшое количество уже готового катыка или специальную молочнокислую культуру. Затем смесь оставляют в теплом месте на несколько часов, в результате чего происходит процесс брожения. Готовый продукт имеет густую консистенцию и насыщенный кисловатый вкус.",
  },
  {
    type: "image",
    content: "/Katyk/gallery-1.png",
    caption: "Традиционный способ приготовления катыка",
  },
  {
    type: "text",
    content:
      "Одной из особенностей катыка является его плотность. В отличие от обычного йогурта или простокваши, он более густой и однородный. Иногда его дополнительно выдерживают, чтобы добиться еще более насыщенного вкуса и текстуры.",
  },
  {
    type: "text",
    content:
      "Катык употребляют как самостоятельное блюдо или используют в качестве основы для других традиционных продуктов. Например, из него делают айран - освежающий напиток, разбавляя катык водой. Также его подают с выпечкой, добавляют в супы и соусы.",
  },
  {
    type: "image",
    content: "/Katyk/gallery-2.png",
    caption: "Катык как основа традиционных напитков",
  },
  {
    type: "text",
    content:
      "В традиционной культуре катык ценится за свои питательные свойства. Он богат белками, кальцием и полезными бактериями, которые благоприятно влияют на пищеварение. В условиях кочевого и сельского образа жизни такие продукты были особенно важны, так как они хорошо сохранялись и обеспечивали организм необходимыми веществами.",
  },
  {
    type: "image",
    content: "/Katyk/gallery-3.png",
    caption: "Катык в современной татарской кухне",
  },
  {
    type: "text",
    content:
      "Катык является неотъемлемой частью гастрономического наследия Татарстана. Он отражает древние традиции молочного производства и передается из поколения в поколение. Сегодня этот продукт остается популярным и широко используется как в домашней кухне, так и в промышленном производстве, сохраняя свою культурную и историческую значимость.",
  },
];

const ARTICLE_META = {
  title: "Катык",
  subtitle: "Традиционный кисломолочный продукт татарской кухни",
  period: "Традиция",
  tags: ["Молочное", "Кулинарное наследие", "Татарская кухня"],
};

export default function Katyk() {
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
        <img src="/Katyk/hero.png" alt={ARTICLE_META.title} className="w-full h-full object-cover" />
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
