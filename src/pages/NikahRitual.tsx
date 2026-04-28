import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

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
      "Никах — традиционный мусульманский свадебный обряд. Это один из важнейших обрядов в исламской культуре, представляющий собой религиозное заключение брака между мужчиной и женщиной. В Республике Татарстан он занимает особое место, являясь не только духовным актом, но и значимой частью национальных традиций татарского народа.",
  },
  {
    type: "image",
    src: "/Nikah/image.png",
    alt: "Обряд никах в татарской культуре",
    caption: "Никах как духовный союз и важная семейная традиция",
  },
  {
    type: "text",
    content:
      "В исламе брак рассматривается как священный союз, установленный с благословения Аллаха. Никах подтверждает намерения супругов создать семью и жить в соответствии с религиозными и этическими принципами. Этот обряд подчеркивает важность честности, верности и заботы друг о друге. Кроме духовного значения, никах имеет и социальную роль: он объединяет не только двух людей, но и их семьи.",
  },
  {
    type: "image",
    src: "/Nikah/image copy.png",
    alt: "Свадебные традиции Татарстана",
    caption: "Семейный обряд, соединяющий два рода",
  },
  {
    type: "text",
    content:
      "Обычно никах проводится в мечети или в доме невесты. В церемонии участвуют имам, жених и невеста, свидетели, родственники и гости. Основные этапы обряда включают чтение молитв и аятов из Корана, согласие сторон, обсуждение брачного дара (махра), после чего имам объявляет пару мужем и женой.",
  },
  {
    type: "image",
    src: "/Nikah/image copy 2.png",
    alt: "Никах в мечети",
    caption: "Религиозная часть обряда: молитвы, наставления и согласие сторон",
  },
  {
    type: "text",
    content:
      "В татарской культуре никах сопровождается множеством традиций. После религиозной части обычно устраивается праздничное застолье, гостей угощают национальными блюдами: чак-чаком, эчпочмаком, кыстыбый. Среди традиционных элементов — благословение родителей, вручение подарков, поздравления от гостей и соблюдение скромности в одежде и поведении.",
  },
  {
    type: "image",
    src: "/Nikah/image copy 3.png",
    alt: "Праздничное застолье после никаха",
    caption: "Продолжение обряда: благословения, поздравления и национальные угощения",
  },
  {
    type: "text",
    content:
      "Раньше никах был главным способом заключения брака, и без него союз не считался действительным в обществе. Сегодня он обычно дополняет официальную регистрацию брака в органах ЗАГС. Несмотря на изменения в обществе, никах остается важной традицией и частью культурной и религиозной идентичности татарского народа.",
  },
  {
    type: "image",
    src: "/Nikah/image copy 4.png",
    alt: "Современный никах в Татарстане",
    caption: "Традиция, сохраняющая актуальность в современном мире",
  },
  {
    type: "text",
    content:
      "Никах является ярким примером нематериального культурного наследия Татарстана. Он отражает религиозные ценности, семейные традиции и особенности татарской культуры, объединяет поколения и помогает сохранять культурную самобытность народа.",
  },
  {
    type: "image",
    src: "/Nikah/image copy 5.png",
    alt: "Никах как культурное наследие Татарстана",
    caption: "Обряд, передающий ценности семьи, уважения и преемственности",
  },
];

const ARTICLE_META = {
  title: "Обряд Никах",
  subtitle: "Традиционный мусульманский свадебный обряд Татарстана",
  heroImage: "/Nikah/image.png",
  location: "Татарстан",
  period: "Традиция",
  tags: ["Обряды", "Семья", "Ислам", "Татарстан"],
};

export default function NikahRitual() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF7F0] font-body flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E8D9B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button onClick={() => navigate("/")} className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Культура Татарстана" className="h-12 w-12 object-contain" />
            <span className="font-display text-lg font-semibold text-[#1B4332] hidden sm:block group-hover:text-[#2D6A4F] transition-colors">
              Культура Татарстана
            </span>
          </button>
          <div className="flex items-center gap-1">
            <button onClick={() => navigate("/")} className="hidden md:flex items-center px-4 py-2 rounded-xl font-body font-medium text-sm text-[#1B4332] hover:bg-[#F2EAD3] hover:text-[#2D6A4F] transition-colors">
              Главная
            </button>
          </div>
        </div>
      </nav>

      <div className="relative pt-16">
        <div className="relative h-72 sm:h-96 overflow-hidden">
          <img
            src={ARTICLE_META.heroImage}
            alt={ARTICLE_META.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/1400x500/2D6A4F/FAF7F0?text=${encodeURIComponent(ARTICLE_META.title)}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              {ARTICLE_META.tags.map((t) => (
                <span key={t} className="bg-[#C9A84C] text-white text-xs px-3 py-1 rounded-full font-body font-medium">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight mb-2">
              {ARTICLE_META.title}
            </h1>
            <p className="font-body text-white/80 text-base sm:text-lg">{ARTICLE_META.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex items-center gap-2 text-sm font-body text-[#9CA3AF] my-5 flex-wrap">
          <button onClick={() => navigate("/")} className="hover:text-[#2D6A4F] transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} className="text-[#D1D5DB]" />
          <button
            onClick={() => {
              navigate("/");
              setTimeout(() => document.getElementById("rituals")?.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            className="hover:text-[#2D6A4F] transition-colors"
          >
            Обряды
          </button>
          <Icon name="ChevronRight" size={14} className="text-[#D1D5DB]" />
          <span className="text-[#1B4332] font-semibold">{ARTICLE_META.title}</span>
        </div>

        <div className="flex items-center gap-5 mb-8 text-sm text-[#6B7280] font-body">
          <span className="flex items-center gap-1.5"><Icon name="MapPin" size={14} className="text-[#C9A84C]" />{ARTICLE_META.location}</span>
          <span className="flex items-center gap-1.5"><Icon name="Clock" size={14} className="text-[#C9A84C]" />{ARTICLE_META.period}</span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 w-full flex-1">
        <div className="space-y-8">
          {ARTICLE_BLOCKS.map((block, index) => {
            if (block.type === "text") {
              return (
                <p key={index} className="font-body text-[#374151] text-base sm:text-lg leading-relaxed">
                  {block.content}
                </p>
              );
            }

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
                {block.caption && (
                  <figcaption className="mt-3 text-center font-body text-sm text-[#9CA3AF] italic">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-[#E8D9B8]">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[#2D6A4F] hover:text-[#1B4332] transition-colors font-body font-medium"
          >
            <Icon name="ChevronLeft" size={18} />
            Вернуться на главную
          </button>
        </div>
      </article>

      <div className="bg-[#FFF8ED] border-t border-[#FFE0B2] py-4 px-6 mt-auto">
        <p className="text-xs font-body text-center text-[#B85C00] max-w-3xl mx-auto">
          ℹ️ Данный сайт создан в качестве конкурсной работы и может содержать неточности. Информация представлена в ознакомительных целях.
        </p>
      </div>
    </div>
  );
}
