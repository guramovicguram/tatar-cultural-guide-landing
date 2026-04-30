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
      "Науруз — один из древнейших праздников, который отмечается у многих народов Востока, в том числе и у татар. Его название переводится как «новый день», и он символизирует наступление весны, обновление природы и начало нового жизненного цикла. Праздник приходится на день весеннего равноденствия — примерно 21 марта, когда день и ночь становятся равными, а природа пробуждается после зимы.",
  },
  {
    type: "image",
    src: "/Nauruz/image.jpg",
    alt: "Науруз у татар",
    caption: "Науруз как праздник весны, обновления и нового жизненного цикла",
  },
  {
    type: "text",
    content:
      "Истоки Науруза уходят в глубокую древность и связаны с земледельческими традициями. Для людей, живших в тесной связи с природой, этот период означал начало нового сельскохозяйственного года. Поэтому Науруз воспринимался не просто как календарное событие, а как важный рубеж, с которого начинается новая жизнь, новые надежды и планы. В этот день люди стремились очиститься от всего плохого, оставить позади обиды и вступить в новый этап с добрыми мыслями.",
  },
  {
    type: "image",
    src: "/Nauruz/image%20copy.jpg",
    alt: "Традиции Науруза",
    caption: "Праздник, связанный с очищением дома, обновлением и добрыми пожеланиями",
  },
  {
    type: "text",
    content:
      "У татар Науруз сопровождался различными обрядами и традициями. Проводилась генеральная уборка, выбрасывались ненужные вещи, чтобы освободить место для нового. Люди надевали чистую праздничную одежду, старались выглядеть аккуратно и красиво. Считалось, что как встретишь Науруз, таким и будет весь год. Особое значение занимали угощения: на столе обязательно присутствовали блюда из зерна, молока и других продуктов, символизирующих достаток и плодородие.",
  },
  {
    type: "image",
    src: "/Nauruz/image%20copy%202.jpg",
    alt: "Угощения на Науруз",
    caption: "Щедрый стол и угощение гостей как символы плодородия и благополучия",
  },
  {
    type: "text",
    content:
      "Науруз также был временем общения и веселья. Люди ходили друг к другу в гости, поздравляли с праздником, устраивали игры, пели песни, водили хороводы. Дети участвовали в обходах домов, желали хозяевам благополучия и получали угощения. Всё это создавало атмосферу радости, единства и доброжелательности.",
  },
  {
    type: "image",
    src: "/Nauruz/image%20copy%203.jpg",
    alt: "Народные гуляния на Науруз",
    caption: "Игры, песни и встречи с близкими создают атмосферу праздника и единства",
  },
  {
    type: "text",
    content:
      "В современное время Науруз сохраняет своё значение как праздник весны и обновления. Он отмечается как культурное событие, объединяющее людей разных национальностей и поколений. Проводятся концерты, фестивали, народные гуляния, где демонстрируются традиции, музыка и кухня. Таким образом, Науруз остаётся важной частью культурного наследия, символизируя начало новой жизни, надежду и стремление к гармонии с природой и окружающими людьми.",
  },
];

const ARTICLE_META = {
  title: "Науруз",
  subtitle: "Древний праздник весны и обновления",
  heroImage: "/Nauruz/image.jpg",
  location: "Татарстан",
  period: "21 марта",
  tags: ["Праздники", "Весна", "Традиции", "Культура"],
};

export default function Nauruz() {
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