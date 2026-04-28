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
    content: "/ChakChak/hero.png",
    caption: "Чак-чак - символ татарской кухни",
  },
  {
    type: "text",
    content:
      "Чак-чак - традиционное сладкое блюдо татарской кухни, которое занимает особое место в культуре и обрядах народа. Он представляет собой десерт из кусочков теста, обжаренных в масле и соединенных между собой медом. Чак-чак широко известен не только в Татарстане, но и далеко за его пределами, являясь символом гостеприимства и национальной кухни.",
  },
  {
    type: "text",
    content:
      "История чак-чака уходит в глубокую древность. Считается, что это блюдо появилось у кочевых тюркских народов, где ценились простые, сытные и долго хранящиеся продукты. Основными ингредиентами являются мука, яйца, мед и масло - доступные продукты, из которых создается насыщенный и сладкий десерт.",
  },
  {
    type: "image",
    content: "/ChakChak/gallery-1.png",
    caption: "Традиционное приготовление чак-чака",
  },
  {
    type: "text",
    content:
      "Приготовление чак-чака включает несколько этапов. Сначала замешивается тесто, которое затем нарезают на небольшие кусочки или формируют в виде тонких палочек. Эти кусочки обжариваются в горячем масле до золотистого цвета. После этого их заливают горячим медом и формируют в общую массу - чаще всего в виде горки или пирамиды. После остывания чак-чак становится плотным и сохраняет форму.",
  },
  {
    type: "image",
    content: "/ChakChak/gallery-2.png",
    caption: "Чак-чак на праздниках и торжествах",
  },
  {
    type: "text",
    content:
      "Чак-чак традиционно подается на праздниках и торжествах. Особенно важную роль он играет на свадьбах, где символизирует достаток, благополучие и сладкую жизнь молодой семьи. Его также готовят на национальных праздниках, семейных встречах и приемах гостей.",
  },
  {
    type: "text",
    content:
      "В татарской культуре чак-чак считается не просто десертом, а важным элементом традиций. Его часто дарят как сувенир, угощают гостей и используют в качестве символа уважения и гостеприимства. В Казани даже существует музей, посвященный этому блюду, где можно узнать о его истории и способах приготовления.",
  },
  {
    type: "image",
    content: "/ChakChak/gallery-3.png",
    caption: "Чак-чак как кулинарное наследие Татарстана",
  },
  {
    type: "text",
    content:
      "Сегодня чак-чак остается популярным и любимым десертом. Он производится как в домашних условиях, так и на предприятиях, сохраняя при этом традиционные рецепты. Несмотря на развитие кулинарии, чак-чак продолжает занимать важное место в культуре Татарстана, являясь символом национальной идентичности и кулинарного наследия.",
  },
];

const ARTICLE_META = {
  title: "Чак-чак",
  subtitle: "Сладкий символ татарского гостеприимства",
  period: "Традиция",
  tags: ["Десерт", "Мед", "Кулинарное наследие"],
};

export default function ChakChak() {
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
        <img src="/ChakChak/hero.png" alt={ARTICLE_META.title} className="w-full h-full object-cover" />
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
