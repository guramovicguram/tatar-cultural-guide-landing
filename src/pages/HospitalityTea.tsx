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
      "Гостеприимство и чаепитие у татар — это не просто бытовая традиция, а важная часть национальной культуры, в которой отражаются уважение к человеку, доброжелательность, щедрость и душевное тепло. С древних времен у татар гость считался особым человеком, а его приход — радостным событием для всей семьи. В татарском доме всегда старались встретить пришедшего с уважением, накормить его, угостить чаем и создать уютную, спокойную атмосферу.",
  },
  {
    type: "image",
    src: "/photogost/image.jpg",
    alt: "Татарское гостеприимство и чаепитие",
    caption: "Чаепитие как символ уважения и домашнего тепла",
  },
  {
    type: "text",
    content:
      "Одной из самых ярких традиций татарского народа является чаепитие. Чай для татар — это не просто напиток, а символ общения, мира и домашнего уюта. За чашкой чая собирается вся семья, ведутся неспешные разговоры, обсуждаются новости, вспоминаются добрые истории, принимаются решения. Чаепитие у татар всегда сопровождается угощениями: на стол ставят сладости, мед, варенье, выпечку, а также национальные блюда.",
  },
  {
    type: "image",
    src: "/photogost/image%20copy.jpg",
    alt: "Традиционный стол к чаю у татар",
    caption: "На столе: чак-чак, баурсак и домашняя выпечка",
  },
  {
    type: "text",
    content:
      "Татарское гостеприимство проявляется не только в богатом столе, но и в особом отношении к человеку. Хозяева стараются, чтобы гость чувствовал себя как дома, чтобы ему было удобно и приятно находиться в их жилище. Чай подают несколько раз, щедро предлагают угощение, интересуются делами гостя, проявляют внимание и заботу. Это показывает, что для татар важно не только накормить человека, но и окружить его искренним уважением.",
  },
  {
    type: "image",
    src: "/photogost/image%20copy%202.jpg",
    alt: "Татарские семейные традиции чаепития",
    caption: "Семейное общение за чаем объединяет поколения",
  },
  {
    type: "text",
    content:
      "Особая ценность татарского чаепития заключается в том, что оно объединяет людей. В современном мире, где многие спешат и редко находят время для душевного общения, эта традиция напоминает о важности семейных и человеческих отношений. За столом люди становятся ближе друг к другу, делятся теплом, поддержкой и добрыми словами. Именно поэтому чаепитие у татар можно назвать настоящим символом дружбы и единства.",
  },
  {
    type: "image",
    src: "/photogost/image%20copy%203.jpg",
    alt: "Татарские чайные традиции",
    caption: "Традиция, которая передается из поколения в поколение",
  },
  {
    type: "text",
    content:
      "Таким образом, гостеприимство и чаепитие у татар занимают особое место в культуре народа. Они отражают мудрость, доброту и открытость татарского характера. Эти традиции передаются из поколения в поколение и сохраняют свою значимость до сих пор. Через уважение к гостю, щедрое угощение и душевное чаепитие татары показывают, что дом — это пространство тепла, согласия и взаимопонимания.",
  },
  {
    type: "image",
    src: "/photogost/image%20copy%204.jpg",
    alt: "Культура гостеприимства Татарстана",
    caption: "Гостеприимство как часть культурной идентичности Татарстана",
  },
  {
    type: "image",
    src: "/photogost/image%20copy%205.jpg",
    alt: "Чаепитие в татарских традициях",
    caption: "Татарское чаепитие: традиция общения и уважения",
  },
];

const ARTICLE_META = {
  title: "Гостеприимство и чаепитие",
  subtitle: "Традиция душевного общения в татарской культуре",
  heroImage: "/photogost/image.jpg",
  location: "Татарстан",
  period: "Народная традиция",
  tags: ["Традиции", "Чаепитие", "Культура", "Татарстан"],
};

export default function HospitalityTea() {
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
              setTimeout(() => document.getElementById("traditions")?.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            className="hover:text-[#2D6A4F] transition-colors"
          >
            Традиции
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
