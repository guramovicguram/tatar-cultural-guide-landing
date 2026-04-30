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
      "Курбан-Байрам — один из важнейших религиозных праздников у мусульман, в том числе и у татар. Он отмечается через 70 дней после праздника Ураза-байрам и совпадает с завершением паломничества в Мекку — Хадж. Этот праздник связан с идеей жертвенности, искренней веры и готовности человека следовать воле Всевышнего.",
  },
  {
    type: "image",
    src: "/Kurban/image.jpg",
    alt: "Курбан-Байрам в татарской культуре",
    caption: "Курбан-Байрам как праздник веры, милосердия и духовной ответственности",
  },
  {
    type: "text",
    content:
      "Истоки Курбан-Байрама восходят к преданию о пророке Ибрахим, который по велению Бога был готов принести в жертву своего сына. Однако в последний момент жертва была заменена животным, что стало символом милости и испытания веры. В память об этом событии мусульмане совершают обряд жертвоприношения, который и дал название празднику.",
  },
  {
    type: "image",
    src: "/Kurban/image%20copy.jpg",
    alt: "Истоки Курбан-Байрама",
    caption: "Праздник напоминает о преданности, испытании веры и милости Всевышнего",
  },
  {
    type: "text",
    content:
      "Праздник начинается с раннего утра. Верующие совершают праздничную молитву в мечети — намаз, после чего поздравляют друг друга, желая мира, здоровья и благополучия. В этот день принято надевать чистую, нарядную одежду, проявлять уважение к старшим и заботу о близких. Центральным обрядом становится жертвоприношение животного. Мясо делится на три части: одну оставляют семье, вторую отдают родственникам и друзьям, а третью обязательно раздают нуждающимся.",
  },
  {
    type: "image",
    src: "/Kurban/image%20copy%202.jpg",
    alt: "Традиции Курбан-Байрама",
    caption: "Молитва, уважение к близким и помощь нуждающимся — основа праздничного дня",
  },
  {
    type: "text",
    content:
      "Особое внимание в этот день уделяется благотворительности. Люди стараются помочь бедным, поддержать одиноких, посетить родственников и соседей. Принято ходить в гости, угощать друг друга традиционными блюдами, проводить время в кругу семьи. У татар Курбан-Байрам сопровождается богатым столом: подаются национальные блюда, выпечка и сладости, а чаепитие создаёт атмосферу тепла и уюта.",
  },
  {
    type: "image",
    src: "/Kurban/image%20copy%203.jpg",
    alt: "Угощение на Курбан-Байрам",
    caption: "Семейное угощение и щедрость как важная часть праздничной традиции",
  },
  {
    type: "text",
    content:
      "В современном мире Курбан-Байрам сохраняет своё значение как символ духовных ценностей. Он напоминает о важности веры, сострадания и готовности делиться с другими. Этот праздник объединяет людей, помогает сохранить традиции и передать их следующим поколениям. Таким образом, Курбан-Байрам — это не просто религиозный обряд, а глубокий по смыслу праздник, в котором соединяются вера, доброта и уважение к окружающим.",
  },
];

const ARTICLE_META = {
  title: "Курбан-Байрам",
  subtitle: "Один из главных мусульманских праздников",
  heroImage: "/Kurban/image.jpg",
  location: "Татарстан",
  period: "По лунному календарю",
  tags: ["Праздники", "Ислам", "Традиции", "Милосердие"],
};

export default function KurbanBayram() {
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
              setTimeout(() => document.getElementById("holidays")?.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            className="hover:text-[#2D6A4F] transition-colors"
          >
            Праздники
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