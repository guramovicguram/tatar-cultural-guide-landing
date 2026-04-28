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
      "Сабантуй — один из самых ярких и значимых народных праздников у татар, имеющий глубокие исторические корни и богатое культурное содержание. Его название происходит от слов «сабан» — плуг и «туй» — праздник, что буквально означает «праздник плуга». Изначально Сабантуй был связан с окончанием весенних полевых работ и символизировал благодарность за труд земледельцев, надежду на хороший урожай и благополучие в будущем.",
  },
  {
    type: "image",
    src: "/Sabatyu/image.png",
    alt: "Сабантуй в Татарстане",
    caption: "Сабантуй — народный праздник труда, силы и единства",
  },
  {
    type: "text",
    content:
      "История Сабантуя уходит в древние времена, когда земледелие играло ключевую роль в жизни народа. После завершения посевной работы люди устраивали массовые гуляния, чтобы отдохнуть от тяжёлого труда, порадоваться наступлению лета и укрепить чувство общности. Со временем праздник приобрёл более широкий смысл и стал не только сельскохозяйственным, но и культурным событием, объединяющим людей разных возрастов и профессий.",
  },
  {
    type: "image",
    src: "/Sabatyu/image%20copy.png",
    alt: "Праздничное открытие Сабантуя",
    caption: "Торжественное открытие с песнями, танцами и выступлениями",
  },
  {
    type: "text",
    content:
      "Современный Сабантуй представляет собой масштабное народное гуляние, которое проходит на открытых площадках — в деревнях, городах и даже за пределами Татарстана. Праздник начинается с торжественного открытия, звучат народные песни, выступают творческие коллективы, проходят концерты и театрализованные представления. Одним из центральных элементов Сабантуя являются народные игры и соревнования, которые требуют силы, ловкости и выносливости.",
  },
  {
    type: "image",
    src: "/Sabatyu/image%20copy%202.png",
    alt: "Народные игры на Сабантуе",
    caption: "Соревнования и игры создают атмосферу дружеского соперничества",
  },
  {
    type: "text",
    content:
      "Особой популярностью пользуется борьба на поясах — корэш. Это традиционный вид спорта, в котором участники стараются повалить соперника на землю, удерживая его за пояс. Победитель получает главный приз праздника, который в старину часто представлял собой барана. Помимо борьбы, проводятся и другие состязания: бег в мешках, лазание на высокий столб за призом, перетягивание каната, разбивание горшка с завязанными глазами и многие другие игры.",
  },
  {
    type: "image",
    src: "/Sabatyu/image%20copy%203.png",
    alt: "Борьба корэш на Сабантуе",
    caption: "Корэш — главный спортивный символ праздника",
  },
  {
    type: "text",
    content:
      "Неотъемлемой частью Сабантуя является угощение. Гостей праздника встречают традиционными блюдами татарской кухни: чак-чак, баурсак, эчпочмак, кыстыбый и другими национальными кушаньями. Чаепитие на свежем воздухе становится важной частью общения, объединяя людей за одним столом.",
  },
  {
    type: "image",
    src: "/Sabatyu/image%20copy%204.png",
    alt: "Татарские угощения на Сабантуе",
    caption: "Национальная кухня и чаепитие как часть праздничной культуры",
  },
  {
    type: "text",
    content:
      "Сабантуй выполняет важную социальную функцию — он объединяет людей, укрепляет культурные традиции и передаёт их новым поколениям. В наше время праздник проводится не только в Татарстане, но и в других регионах России и за рубежом, где проживают татары. Он стал символом национальной идентичности, дружбы народов и уважения к труду.",
  },
  {
    type: "image",
    src: "/Sabatyu/image%20copy%205.png",
    alt: "Современный Сабантуй",
    caption: "Традиция, которая объединяет татар по всему миру",
  },
  {
    type: "text",
    content:
      "Таким образом, Сабантуй — это не просто праздник окончания полевых работ, а многогранное культурное явление. Он сочетает в себе элементы истории, спорта, искусства и народных традиций, сохраняя дух единства, радости и уважения к труду, который остаётся актуальным и в современном мире.",
  },
  {
    type: "image",
    src: "/Sabatyu/image%20copy%206.png",
    alt: "Сабантуй как культурное наследие Татарстана",
    caption: "Праздник, сохраняющий историческую память и живые традиции",
  },
];

const ARTICLE_META = {
  title: "Сабантуй",
  subtitle: "Главный народный праздник татарского народа",
  heroImage: "/Sabatyu/image.png",
  location: "Татарстан",
  period: "Ежегодно, июнь",
  tags: ["Праздники", "Традиции", "Спорт", "Культура"],
};

export default function Sabantuy() {
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
