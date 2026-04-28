import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

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
      "Тысячелетие Казани - масштабное историко-культурное событие, посвященное 1000-летию основания города, которое широко отмечалось в 2005 году. Юбилей стал важной вехой в истории столицы Татарстана и подчеркнул ее значение как одного из крупнейших культурных центров России.",
  },
  {
    type: "image",
    src: "/Kazan1000/hero.png",
    alt: "Празднование тысячелетия Казани",
    caption: "Тысячелетие Казани - исторический юбилей 2005 года",
  },
  {
    type: "text",
    content:
      "Подготовка к юбилею велась несколько лет и сопровождалась масштабной программой реконструкции городской инфраструктуры. Были отреставрированы исторические здания, обновлены улицы, площади и набережные, построены новые объекты культуры, спорта и транспорта.",
  },
  {
    type: "text",
    content:
      "Особое внимание уделялось сохранению архитектурного облика города и его исторических памятников. Одним из ключевых направлений стало обновление Казанского Кремля - главного символа города и объекта Всемирного наследия ЮНЕСКО.",
  },
  {
    type: "image",
    src: "/Kazan1000/gallery-1.png",
    alt: "Казань во время юбилея",
    caption: "Город заметно преобразился к юбилейным торжествам",
  },
  {
    type: "text",
    content:
      "В этот период были реализованы и новые знаковые проекты. Среди них - мечеть Кул-Шариф, ставшая одной из крупнейших мечетей России и символом духовного возрождения Татарстана.",
  },
  {
    type: "text",
    content:
      "В рамках празднования прошли концерты, фестивали, выставки, театрализованные представления и международные встречи. В мероприятиях участвовали гости из разных стран, что подчеркнуло международное значение тысячелетия Казани.",
  },
  {
    type: "image",
    src: "/Kazan1000/gallery-2.png",
    alt: "Юбилейные мероприятия в Казани",
    caption: "Культурные и общественные события объединили жителей и гостей города",
  },
  {
    type: "text",
    content:
      "Юбилей стал не только праздником, но и сильным импульсом развития города. Казань укрепила статус образовательного, туристического и культурного центра, а также получила новые возможности для роста экономики и качества городской среды.",
  },
  {
    type: "text",
    content:
      "Тысячелетие сыграло важную роль в укреплении межнационального согласия. Казань традиционно остается городом мирного сосуществования культур и религий, а юбилей стал символом единства народов.",
  },
  {
    type: "image",
    src: "/Kazan1000/gallery-3.png",
    alt: "Современная Казань после тысячелетия",
    caption: "Наследие юбилея продолжает влиять на развитие города",
  },
  {
    type: "text",
    content:
      "Таким образом, 1000-летие Казани - это не просто юбилейная дата, а событие, оказавшее долговременное влияние на развитие столицы Татарстана и подчеркнувшее ее уникальное место в истории и культуре России.",
  },
];

const ARTICLE_META = {
  title: "1000-летие Казани",
  subtitle: "Юбилей, изменивший город",
  heroImage: "/Kazan1000/hero.png",
  location: "Казань",
  period: "2005 год",
  tags: ["История", "Юбилей", "Казань", "Культура"],
};

export default function KazanMillennium() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF7F0] font-body">
      <section className="relative h-[46vh] min-h-[320px] overflow-hidden">
        <img
          src={ARTICLE_META.heroImage}
          alt={ARTICLE_META.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/1400x500/2D6A4F/FAF7F0?text=${encodeURIComponent(ARTICLE_META.title)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

        <div className="absolute top-6 left-6 right-6 z-10">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 transition-colors"
          >
            <Icon name="ArrowLeft" size={16} />
            Назад на главную
          </button>
        </div>

        <div className="absolute bottom-8 left-6 right-6 z-10 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {ARTICLE_META.tags.map((tag) => (
              <span key={tag} className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
            {ARTICLE_META.title}
          </h1>
          <p className="font-body text-white/90 text-lg max-w-3xl">{ARTICLE_META.subtitle}</p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <nav className="flex items-center gap-2 text-sm font-body text-[#6B7280] mb-8">
          <button onClick={() => navigate("/")} className="hover:text-[#2D6A4F] transition-colors">
            Главная
          </button>
          <Icon name="ChevronRight" size={14} />
          <span>Памятные даты</span>
          <Icon name="ChevronRight" size={14} />
          <span className="text-[#1B4332]">{ARTICLE_META.title}</span>
        </nav>

        <div className="bg-white rounded-3xl border border-[#E8D9B8] p-6 sm:p-10 shadow-sm">
          <div className="flex flex-wrap gap-6 text-sm mb-8 pb-6 border-b border-[#F2EAD3]">
            <div className="flex items-center gap-2 text-[#6B7280]">
              <Icon name="MapPin" size={16} className="text-[#C9A84C]" />
              <span>{ARTICLE_META.location}</span>
            </div>
            <div className="flex items-center gap-2 text-[#6B7280]">
              <Icon name="Clock" size={16} className="text-[#C9A84C]" />
              <span>{ARTICLE_META.period}</span>
            </div>
          </div>

          <article className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-[#1B4332] prose-p:font-body prose-p:text-[#374151] prose-p:leading-relaxed">
            {ARTICLE_BLOCKS.map((block, index) => {
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
                    {block.caption && <figcaption className="mt-2 text-sm text-[#6B7280]">{block.caption}</figcaption>}
                  </figure>
                );
              }

              return (
                <p key={index} className="mb-5 text-[17px] leading-8 text-[#374151]">
                  {block.content}
                </p>
              );
            })}
          </article>

          <div className="mt-10 pt-8 border-t border-[#F2EAD3]">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2D6A4F] text-white hover:bg-[#1B4332] transition-colors"
            >
              <Icon name="ArrowLeft" size={16} />
              Вернуться на главную
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
