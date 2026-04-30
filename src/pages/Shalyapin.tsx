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
      "Фёдор Шаляпин — выдающийся русский оперный певец, один из величайших басов в истории мировой музыки. Он родился в 1873 году в Казани в семье простых людей, и его путь к мировой славе был связан с огромным трудом и талантом.",
  },
  {
    type: "image",
    src: "/Shalyapin/hero.jpg",
    alt: "Фёдор Шаляпин",
    caption: "Фёдор Шаляпин — легенда мировой оперной сцены",
  },
  {
    type: "text",
    content:
      "С ранних лет Шаляпин проявлял интерес к музыке: пел в церковном хоре, участвовал в любительских постановках. Специального системного образования сначала не имел, однако благодаря природному голосу и упорству смог выйти на профессиональную сцену.",
  },
  {
    type: "text",
    content:
      "Со временем он начал выступать в театрах, где быстро привлек внимание публики и профессионального сообщества. Настоящая известность пришла после работы в Большом и Мариинском театрах.",
  },
  {
    type: "image",
    src: "/Shalyapin/gallery-1.jpg",
    alt: "Шаляпин на сцене",
    caption: "Шаляпин прославился не только голосом, но и актерским талантом",
  },
  {
    type: "text",
    content:
      "Шаляпин исполнял ведущие партии в операх русских и зарубежных композиторов. Среди его самых известных образов — Борис Годунов, Мефистофель, Иван Сусанин и другие.",
  },
  {
    type: "text",
    content:
      "Особенностью его творчества стало сочетание мощного, выразительного вокала с глубоким актерским перевоплощением. Он по-новому раскрывал характеры героев, передавая их внутренний мир, и тем самым изменил представление о возможностях оперного артиста.",
  },
  {
    type: "image",
    src: "/Shalyapin/gallery-2.jpg",
    alt: "Архивные материалы о Шаляпине",
    caption: "Творческий путь артиста стал частью истории мировой музыки",
  },
  {
    type: "text",
    content:
      "После революции певец много гастролировал за границей и в 1922 году покинул Россию. Он жил и выступал в разных странах Европы, в том числе в Париже, оставаясь востребованным артистом мирового уровня.",
  },
  {
    type: "image",
    src: "/Shalyapin/gallery-3.jpg",
    alt: "Память о Фёдоре Шаляпине",
    caption: "Имя Шаляпина неразрывно связано с культурной историей Казани",
  },
  {
    type: "text",
    content:
      "Фёдор Шаляпин умер в 1938 году, но его вклад в искусство остается огромным. Он стал символом русской оперной школы и оказал влияние на развитие вокального мастерства во всем мире.",
  },
  {
    type: "image",
    src: "/Shalyapin/gallery-4.jpg",
    alt: "Наследие Шаляпина",
    caption: "Его творчество продолжает вдохновлять новые поколения музыкантов",
  },
  {
    type: "text",
    content:
      "Сегодня память о великом певце сохраняется в Татарстане и далеко за его пределами: имя Шаляпина носят фестивали, музеи и культурные проекты, а его исполнительская школа остается эталоном для оперных артистов.",
  },
];

const ARTICLE_META = {
  title: "Фёдор Шаляпин",
  subtitle: "Великий бас, прославивший оперное искусство",
  heroImage: "/Shalyapin/hero.jpg",
  location: "Казань",
  period: "1873–1938",
  tags: ["Опера", "Музыка", "Казань", "Искусство"],
};

export default function Shalyapin() {
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
          <span>Выдающиеся личности</span>
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
