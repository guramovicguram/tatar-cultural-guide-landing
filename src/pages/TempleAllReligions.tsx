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
      "Храм всех религий (Вселенский храм) - уникальный архитектурный комплекс в Казани, созданный художником и архитектором Ильдаром Хановым.",
  },
  {
    type: "image",
    src: "/HramReligii/hero.png",
    alt: "Храм всех религий",
    caption: "Храм всех религий в Казани",
  },
  {
    type: "text",
    content:
      "Это культурный центр и памятник мировым религиям, объединяющий в своей архитектуре элементы православной церкви, мусульманской мечети, иудейской синагоги, буддийского храма, китайской пагоды и других культовых традиций.",
  },
  {
    type: "text",
    content:
      "Комплекс не является действующим храмом одной конфессии. Его главная идея - символ единства культур, взаимоуважения и межрелигиозного диалога.",
  },
  {
    type: "image",
    src: "/HramReligii/gallery-1.png",
    alt: "Купола Храма всех религий",
    caption: "Разнообразие архитектурных форм и куполов",
  },
  {
    type: "text",
    content:
      "Строительство началось в 1994 году по инициативе Ильдара Ханова. Он мечтал о пространстве, где люди разных вероисповеданий могли бы объединиться в поиске истины, гармонии и мира.",
  },
  {
    type: "text",
    content:
      "Проект возводился на личные средства автора и пожертвования. После смерти Ильдара Ханова в 2013 году работу продолжили его ученики и последователи.",
  },
  {
    type: "image",
    src: "/HramReligii/gallery-2.png",
    alt: "Архитектурные детали Храма всех религий",
    caption: "Яркие фасады и символика разных традиций",
  },
  {
    type: "text",
    content:
      "Сегодня комплекс включает 16 куполов, символизирующих разные религии и духовные системы: православие, ислам, католицизм, буддизм, иудаизм, индуизм и другие верования.",
  },
  {
    type: "text",
    content:
      "Внутри находятся концертный зал, картинная галерея и музейные пространства. Благодаря этому Храм всех религий стал важной культурной точкой Казани, которую ежегодно посещают туристы из разных стран.",
  },
  {
    type: "image",
    src: "/HramReligii/gallery-3.png",
    alt: "Вид на Храм всех религий",
    caption: "Символ толерантности и диалога культур",
  },
  {
    type: "text",
    content:
      "Это место, где особенно ясно ощущается идея единства человечества: при различии традиций люди могут сохранять уважение, интерес друг к другу и стремление к миру.",
  },
];

const ARTICLE_META = {
  title: "Храм всех религий",
  subtitle: "Символ единства культур и конфессий",
  heroImage: "/HramReligii/hero.png",
  location: "Казань, поселок Старое Аракчино",
  period: "С 1994 года",
  tags: ["Архитектура", "Культура", "Толерантность", "Казань"],
};

export default function TempleAllReligions() {
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
          <span>Достопримечательности</span>
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
