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
      "Башня Сююмбике — самая известная башня Казанского Кремля и один из главных архитектурных символов Казани. Это сторожевая башня с заметным наклоном, поэтому ее часто называют падающей.",
  },
  {
    type: "image",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Kazan_Kremlin_Soyembika_Tower_08-2016_img1.jpg/960px-Kazan_Kremlin_Soyembika_Tower_08-2016_img1.jpg",
    alt: "Башня Сююмбике в Казанском кремле",
    caption: "Башня Сююмбике на территории Казанского кремля",
  },
  {
    type: "text",
    content:
      "Высота башни составляет 58 метров, а отклонение шпиля от вертикали достигает 1,98 метра. Вместе с Казанским Кремлем и мечетью Кул-Шариф башня формирует узнаваемый исторический силуэт города.",
  },
  {
    type: "text",
    content:
      "Согласно преданию, башня названа в честь последней царицы Казанского ханства Сююмбике. Легенда рассказывает, что после взятия Казани Иваном Грозным она попросила построить за семь дней самую высокую башню города, поднялась на вершину и бросилась вниз.",
  },
  {
    type: "image",
    src: "https://avatars.mds.yandex.net/i?id=4ca12434e208ffb3a27e7ae27531b100eeb5eba1-7011710-images-thumbs&n=13",
    alt: "Башня Сююмбике крупным планом",
    caption: "Наклон башни хорошо заметен даже с дальних точек обзора",
  },
  {
    type: "text",
    content:
      "Историки считают, что башня была построена в XVII–XVIII веках, уже после завоевания Казани. Точная дата строительства до сих пор остается предметом научных дискуссий.",
  },
  {
    type: "text",
    content:
      "По архитектуре башня относится к редким образцам русского шатрового зодчества: она состоит из семи ярусов, где три нижних имеют квадратный план, а четыре верхних выполнены в форме восьмигранников.",
  },
  {
    type: "image",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4f/%D0%91%D0%B0%D1%88%D0%BD%D1%8F_%D0%A1%D1%8E%D1%8E%D0%BC%D0%B1%D0%B8%D0%BA%D0%B5_%D0%B2_%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%81%D0%BA%D0%BE%D0%BC_%D0%9A%D1%80%D0%B5%D0%BC%D0%BB%D0%B5._%D0%9B%D0%B5%D1%82%D0%BE.jpg",
    alt: "Башня Сююмбике летом",
    caption: "Башня Сююмбике летом",
  },
  {
    type: "text",
    content:
      "Наклон сооружения начал проявляться вскоре после постройки из-за особенностей грунта. В 1990-х годах были проведены масштабные реставрационные работы, которые позволили укрепить фундамент и сохранить памятник.",
  },
  {
    type: "text",
    content:
      "Сегодня башня Сююмбике остается не только историческим объектом, но и важной частью культурной памяти Татарстана, объединяя в себе легенды, архитектуру и историю Казани.",
  },
  {
    type: "image",
    src: "https://avatars.mds.yandex.net/i?id=cff52d3a53d3946824236833f8b79125_l-13215483-images-thumbs&n=13",
    alt: "Вид на башню Сююмбике в панораме Кремля",
    caption: "Башня в панораме Казанского кремля",
  },
];

const ARTICLE_META = {
  title: "Башня Сююмбике",
  subtitle: "Падающая башня и символ Казани",
  heroImage:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Kazan_Kremlin_Soyembika_Tower_08-2016_img1.jpg/960px-Kazan_Kremlin_Soyembika_Tower_08-2016_img1.jpg",
  location: "Казань, Казанский кремль",
  period: "XVII–XVIII вв.",
  tags: ["Кремль", "Архитектура", "История", "Казань"],
};

export default function Suyumbike() {
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