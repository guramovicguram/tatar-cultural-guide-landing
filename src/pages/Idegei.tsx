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
    content: "/Idegei/hero.png",
    caption: "Героический эпос «Идегей»",
  },
  {
    type: "text",
    content:
      "Идегей — героический эпос тюркских народов, в том числе татар, отражающий важные исторические события и идеалы своего времени. Он занимает особое место в устном народном творчестве и является значимой частью культурного наследия народов Поволжья и степных регионов.",
  },
  {
    type: "text",
    content:
      "В основе эпоса лежит образ героя Идегея — мудрого правителя, храброго воина и защитника своего народа. Прототипом этого персонажа считается реальная историческая личность — эмир Золотой Орды Едигей, живший в конце XIV — начале XV века. Однако в народном творчестве его образ был значительно переработан и наделён чертами идеального героя.",
  },
  {
    type: "image",
    content: "/Idegei/gallery-1.png",
    caption: "Иллюстрации к эпосу",
  },
  {
    type: "text",
    content:
      "Сюжет эпоса строится вокруг борьбы за справедливость, защиты родной земли и противостояния врагам. Идегей выступает как символ силы, мудрости и верности своему народу. В произведении также затрагиваются темы власти, чести, долга и взаимоотношений между правителями и подданными.",
  },
  {
    type: "text",
    content:
      "Эпос «Идегей» передавался из поколения в поколение в устной форме. Его исполняли сказители, используя особую манеру повествования, сопровождая рассказ интонацией, ритмом и иногда музыкальными элементами. Благодаря этому эпос сохранялся на протяжении веков, несмотря на отсутствие письменной фиксации.",
  },
  {
    type: "image",
    content: "/Idegei/gallery-2.png",
    caption: "Традиция устного исполнения эпоса",
  },
  {
    type: "text",
    content:
      "Со временем произведение было записано и стало объектом изучения учёных. Различные версии эпоса существуют у разных тюркских народов, но все они сохраняют общую основу и ключевые образы. Это свидетельствует о широком распространении и значении эпоса в тюркском мире.",
  },
  {
    type: "image",
    content: "/Idegei/gallery-3.png",
    caption: "Эпос «Идегей» в культурном наследии",
  },
  {
    type: "text",
    content:
      "Эпос «Идегей» имеет большое культурное значение. Он отражает мировоззрение народа, его представления о героизме, справедливости и идеальном правителе. Кроме того, произведение помогает лучше понять исторические процессы, происходившие в эпоху Золотой Орды.",
  },
  {
    type: "text",
    content:
      "Таким образом, «Идегей» является не просто литературным произведением, а важным элементом нематериального культурного наследия, который сохраняет историческую память и духовные ценности народа.",
  },
];

const ARTICLE_META = {
  title: "Татарский эпос «Идегей»",
  subtitle: "Героический эпос тюркских народов",
  period: "XIV–XV вв.",
  tags: ["Эпос", "Устное творчество", "Нематериальное наследие"],
};

export default function Idegei() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span
            className="hover:text-foreground cursor-pointer"
            onClick={() => navigate("/")}
          >
            Главная
          </span>
          <span>/</span>
          <span className="text-foreground font-medium">
            {ARTICLE_META.title}
          </span>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="/Idegei/hero.png"
          alt={ARTICLE_META.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 md:p-10">
          <div className="flex flex-wrap gap-2 mb-3">
            {ARTICLE_META.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-white/20 text-white rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            {ARTICLE_META.title}
          </h1>
          <p className="text-white/80 mt-1 text-sm md:text-base">
            {ARTICLE_META.subtitle} · {ARTICLE_META.period}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {ARTICLE_BLOCKS.map((block, i) => {
          if (block.type === "text") {
            return (
              <p key={i} className="text-base md:text-lg leading-relaxed text-foreground">
                {block.content}
              </p>
            );
          }
          if (block.type === "image") {
            return (
              <figure key={i} className="space-y-2">
                <img
                  src={block.content}
                  alt={block.caption ?? ""}
                  className="w-full rounded-xl object-cover max-h-96"
                />
                {block.caption && (
                  <figcaption className="text-sm text-muted-foreground text-center">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
