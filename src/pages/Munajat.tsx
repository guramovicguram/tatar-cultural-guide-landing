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
    type: "text",
    content:
      "Монажат — это традиционная форма духовного песнопения у татар, связанная с исламской культурой и религиозной практикой. Монажат представляет собой особый вид молитвенно-лирического исполнения, в котором человек обращается к Богу с просьбами, благодарностью или размышлениями о жизни.",
  },
  {
    type: "text",
    content:
      "Монажаты исполняются на татарском языке и имеют глубокое духовное содержание. В них затрагиваются темы веры, покаяния, смысла жизни, быстротечности времени, судьбы человека и его отношения с Всевышним. Такие песнопения отличаются спокойной, протяжной мелодикой и выразительной интонацией, что создаёт атмосферу сосредоточенности и внутреннего размышления.",
  },
  {
    type: "text",
    content:
      "Исторически монажаты исполнялись в домашней обстановке, во время религиозных собраний, а также на поминальных мероприятиях. Чаще всего их исполняли пожилые женщины, обладающие хорошим голосом и знанием текстов. Передача традиции происходила устно — от поколения к поколению.",
  },
  {
    type: "text",
    content:
      "Монажат занимает особое место в татарской культуре, так как объединяет в себе религиозные и народные элементы. С одной стороны, он связан с исламской духовной традицией, а с другой — сохраняет особенности национального музыкального стиля.",
  },
  {
    type: "text",
    content:
      "В современности интерес к монажатам сохраняется и даже усиливается. Их можно услышать на культурных фестивалях, в этнографических программах и на религиозных мероприятиях. Также ведётся работа по записи и сохранению старинных текстов и мелодий.",
  },
  {
    type: "text",
    content:
      "Таким образом, монажат является важной частью нематериального культурного наследия татарского народа. Он отражает духовную жизнь общества, его ценности и традиции, а также служит средством сохранения культурной памяти.",
  },
];

const ARTICLE_META = {
  title: "Татарский мунаджат",
  subtitle: "Духовные лирические песни-молитвы",
  period: "Традиция",
  tags: ["Музыка", "Духовность", "Нематериальное наследие"],
};

export default function Munajat() {
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
          src="/Munajat/hero.png"
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
