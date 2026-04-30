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
      "Каз омасе (каз омэсе) — традиционный татарский бытовой обряд, связанный с обработкой гусей и заготовкой пуха и перьев. Этот обычай объединяет в себе труд, общение и элементы праздника, поэтому считается важной частью нематериального культурного наследия Татарстана.",
  },
  {
    type: "image",
    src: "/kaz/image.jpg",
    alt: "Каз омасе — татарский обряд",
    caption: "Каз омасе: совместный труд как часть народной традиции",
  },
  {
    type: "text",
    content:
      "Изначально обряд имел практическое значение: в холодное время года семьи ощипывали гусей, заготавливали мясо на зиму, а пух и перья использовали для подушек и одеял. Со временем процесс превратился в коллективное мероприятие, где участвовали соседи, родственники и друзья.",
  },
  {
    type: "image",
    src: "/kaz/image copy.jpg",
    alt: "Подготовка к обряду каз омасе",
    caption: "Подготовка к обряду и сбор участников",
  },
  {
    type: "text",
    content:
      "Главная идея каз омасе — взаимопомощь и единство. Люди собирались вместе, помогали друг другу в работе и одновременно общались, делились новостями, пели песни и создавали атмосферу общего праздника. Обычно обряд проводился поздней осенью или в начале зимы, когда наступало время забоя гусей.",
  },
  {
    type: "image",
    src: "/kaz/image copy 2.jpg",
    alt: "Совместная работа во время каз омасе",
    caption: "Совместная работа: женщины и девушки выполняют обрядовые действия",
  },
  {
    type: "text",
    content:
      "Основные этапы включали подготовку и приглашение помощниц, ощипывание гусей с аккуратным разделением пуха и перьев, сушку пуха для дальнейшего использования, а также общение и песни во время работы. После завершения устраивали чаепитие или ужин с традиционными блюдами.",
  },
  {
    type: "image",
    src: "/kaz/image copy 3.jpg",
    alt: "Татарские песни и общение во время обряда",
    caption: "Во время работы участницы общаются, шутят и поют народные песни",
  },
  {
    type: "text",
    content:
      "Каз омасе всегда проходил в теплой, дружеской атмосфере. Это был не просто труд, а своеобразный праздник. Характерные черты обряда: участие преимущественно женщин и девушек, коллективная работа как форма общения, народные песни и угощение после окончания. Нередко такие встречи становились местом знакомства молодежи.",
  },
  {
    type: "image",
    src: "/kaz/image copy 4.jpg",
    alt: "Угощение после каз омасе",
    caption: "Завершение обряда: совместное угощение и благодарность участникам",
  },
  {
    type: "text",
    content:
      "Раньше каз омасе был необходимой частью сельской жизни, так как каждой семье требовались теплые вещи и запасы еды на зиму. Сегодня обряд утратил прежнюю хозяйственную необходимость, но сохранился как культурная традиция. В наши дни его часто проводят в формате фольклорных праздников, этнографических мероприятий и музейных программ.",
  },
  {
    type: "image",
    src: "/kaz/image copy 5.jpg",
    alt: "Каз омасе в современной культуре Татарстана",
    caption: "Каз омасе сегодня: живая традиция, сохраняемая на праздниках и фестивалях",
  },
  {
    type: "text",
    content:
      "Каз омасе отражает традиционный уклад жизни, ценность коллективного труда и уважение к обычаям предков. Этот обряд помогает сохранять связь поколений и передавать культурные традиции молодежи.",
  },
];

const ARTICLE_META = {
  title: "Каз омасе",
  subtitle: "Традиционный татарский обряд взаимопомощи",
  heroImage: "/kaz/image.jpg",
  location: "Татарстан",
  period: "Народная традиция",
  tags: ["Обряды", "Быт", "Татарстан", "Наследие"],
};

export default function KazOmase() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF7F0] font-body flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E8D9B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button onClick={() => navigate("/")} className="flex items-center gap-3 group">
            <img src="/logo.jpg" alt="Культура Татарстана" className="h-12 w-12 object-contain" />
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
