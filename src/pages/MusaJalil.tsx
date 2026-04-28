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
      "Муса Джалиль — выдающийся татарский поэт, Герой Советского Союза и один из символов мужества и стойкости. Он родился в 1906 году в Оренбургской губернии и с ранних лет проявлял интерес к литературе.",
  },
  {
    type: "image",
    src: "/MusaJalil/hero.png",
    alt: "Муса Джалиль",
    caption: "Муса Джалиль — поэт и герой Татарстана",
  },
  {
    type: "text",
    content:
      "Джалиль получил образование в Казани, где активно включился в литературную и общественную жизнь. Он писал стихи, статьи, работал в редакциях газет и журналов. Раннее творчество поэта отражало идеи времени, стремление к справедливости, развитию общества и важность культуры.",
  },
  {
    type: "text",
    content:
      "Особое место в его жизни занимает период Великой Отечественной войны. В 1942 году Муса Джалиль попал в плен, но даже в тяжелейших условиях продолжал сопротивление и стал участником подпольной антифашистской организации среди военнопленных.",
  },
  {
    type: "image",
    src: "/MusaJalil/gallery-1.png",
    alt: "Память о Мусе Джалиле",
    caption: "Наследие Джалиля связано с мужеством и духовной стойкостью",
  },
  {
    type: "text",
    content:
      "Находясь в заключении, поэт писал стихи, впоследствии известные как «Моабитская тетрадь». Эти тексты проникнуты верой в свободу, любовью к Родине и силой человеческого духа. Стихи были тайно вынесены из тюрьмы и позже опубликованы.",
  },
  {
    type: "text",
    content:
      "В 1944 году Муса Джалиль был казнен в Берлине. Долгое время его подвиг оставался неизвестным, но после войны он был посмертно признан героем. За мужество и героизм ему присвоили звание Героя Советского Союза.",
  },
  {
    type: "image",
    src: "/MusaJalil/gallery-2.png",
    alt: "Памятник Мусе Джалилю",
    caption: "Имя Мусы Джалиля увековечено в культуре Татарстана и России",
  },
  {
    type: "text",
    content:
      "Сегодня произведения Мусы Джалиля изучаются в школах, а его именем названы улицы, театры и учреждения. Он остается символом не только литературного таланта, но и несгибаемой воли, преданности убеждениям и любви к своему народу.",
  },
];

const ARTICLE_META = {
  title: "Муса Джалиль",
  subtitle: "Поэт, ставший символом мужества и стойкости",
  heroImage: "/MusaJalil/hero.png",
  location: "Татарстан",
  period: "1906–1944",
  tags: ["Поэзия", "История", "Герой", "Татарстан"],
};

export default function MusaJalil() {
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
