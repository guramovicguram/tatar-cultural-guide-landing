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
  caption: string;
}

type ArticleBlock = TextBlock | ImageBlock;

const ARTICLE_BLOCKS: ArticleBlock[] = [
  {
    type: "text",
    content:
      "Вышивка — вид декоративно-прикладного искусства; украшение одежды, бытовых и обрядовых предметов узорами из различных нитей ручным или машинным способом. Один из массовых видов традиционного татарского искусства, развивавшийся в форме домашнего производства и художественного промысла — украшение головных уборов и обуви.",
  },
  {
    type: "text",
    content:
      "Наиболее ранние из сохранившихся образцов вышивок в технике глади золотыми и серебряными нитями с сюжетными и орнаментальными мотивами датируются XIV – первой половиной XV веков. Предположительно ко времени Казанского ханства относится уникальный образец золотошвейного покрывала, декорированный золотным шитьём и вышивкой в технике глади из собрания Национального музея РТ. Подавляющее большинство старинных вышивок относится ко второй половине XIX – началу XX века, сохранились отдельные музейные образцы конца XVIII века.",
  },
  {
    type: "image",
    src: "/homa/image.png",
    alt: "Подзор покрывала. Середина XIX века",
    caption: "Подзор покрывала. Середина XIX века. Фрагмент. Шёлк, золотая бахрома; тамбурная вышивка, ковровый шов. Государственный музей изобразительных искусств РТ",
  },
  {
    type: "text",
    content:
      "Наиболее популярной у татар, как и у других тюркских народов, была вышивка в технике тамбура — элмә (в региональных вариантах — татар чигүе). Она подразделяется на низкий тамбур, шитый крестными стежками, и высокий тамбур, шитый мелкими стежками — күперткән элмә, иногда — үреп чигү, создающий рельефную поверхность за счёт использования толстых нитей из крученого шёлка. Использовались также шерстяные и металлические нити, с конца XIX века — гарус.",
  },
  {
    type: "text",
    content:
      "До второй половины XIX века вышивали иглой, позднее также крючком, использовали специальные вышивальные приспособления киерге (пяльцы). С середины 1870-х годов широкое распространение, особенно среди городских татар, получила европейская тамбурная машинка. Наряду с ручной тамбурной вышивкой, однако гораздо реже, применялся гладевый шов — нагыш (в региональных вариантах — йомшак чигү, шома чигү).",
  },
  {
    type: "text",
    content:
      "Со второй половины XVIII века широкое распространение получила золотошвейная гладь (укалап чигү), выполнявшаяся золотой и серебряной канителью (шёлковая или бумажная нить с накрученной на неё полоской металла). Для создания рельефного узора под нити подкладывались ткань или бумага. Вышивка дополнительно украшалась витыми металлическими спиралями — трунцалами, блёстками, бисером, жемчугом, пришивались бахрома, кисти, кружева.",
  },
  {
    type: "image",
    src: "/homa/image copy.png",
    alt: "Кузьминых С.Д. Алтынчеч. 1960-е годы",
    caption: "Кузьминых С.Д. Алтынчеч. 1960-е годы. Подушка. Бархат, тамбурная вышивка",
  },
  {
    type: "text",
    content:
      "В конце XIX века получает распространение вышивка, исполненная петельным или «ковровым» швом — күпертеп чигү, элмәкләп чигү. Среди татар-кряшен бытовала вышивка крестом — камба, распространившаяся со второй половины XX века среди основной массы татар под названием «рус чигүе».",
  },
  {
    type: "image",
    src: "/homa/image copy 2.png",
    alt: "Файзрахманова Р.Ф. Сумочка. 1980-е годы",
    caption: "Файзрахманова Р.Ф. Сумочка. 1980-е годы. Бархат, жемчуг, канитель; вышивка",
  },
  {
    type: "text",
    content:
      "Основой для вышивки служили самодельные и покупные (ситец, сатин, шёлк, парча, бархат, вельвет) ткани, тонкой выделки кожа. Популярными были голубые, зелёные, золотисто-жёлтые, фиолетовые, красные и белые цвета. Для вышивок характерен цветочно-растительный орнамент в ленточной, букетной и сетчатой композициях с мотивами тюльпанов, колокольчиков, незабудок, маков, гвоздик, роз, «турецких» огурцов, гранатов. Использовались стилизованные мотивы птиц, мотыльков, бабочек, пчёл, петухов, голубей; характерные для булгарского и золотоордынского орнамента трилистники, пальметты, розетки, вьюнки. Вышивки отличались богатством цветового решения — в одном изделии могло сочетаться до 10–12 тонов.",
  },
  {
    type: "image",
    src: "/homa/image copy 3.png",
    alt: "Калфак с «птичками счастья». XIX век",
    caption: "Калфак с «птичками счастья». XIX век. Бархат, золотные нити, канитель; золотое шитьё. Национальный музей РТ",
  },
  {
    type: "text",
    content:
      "Вышивкой украшались концы бытовых и обрядовых полотенец, подзоры покрывал, занавеси, молитвенные коврики, скатерти, наволочки, сумки для приданого невесты, панно из тканей с изречениями из Корана, нагрудники, фартуки, рукава и подолы женских платьев, свадебные онучи; головные уборы — калфак, тюбетейки; тканевая и кожаная обувь; сумочки для хранения амулетов.",
  },
  {
    type: "text",
    content:
      "Современные самодеятельные мастерицы вышивают в основном в технике шёлковой глади и болгарского креста. Профессиональные художники и народные мастера развивают национальные традиции тамбурной и золотошвейной вышивки. Сувенирные изделия, украшенные татарской вышивкой, производятся в мастерских «Туран Арт» и других. Образцы вышивок хранятся в музеях Казани, а также во Всероссийском музее декоративно-прикладного искусства (Москва), в Национальном музее в Хельсинки и других учреждениях по всей России и за рубежом.",
  },
];

const ARTICLE_META = {
  title: "Татарская вышивка",
  subtitle: "Многовековое искусство украшения нитью",
  heroImage: "/homa/image.png",
  location: "Татарстан",
  period: "XIV–XXI вв.",
  tags: ["Традиции", "Ремёсла", "Искусство", "Татарстан"],
};

export default function TatarEmbroidery() {
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
                <figcaption className="mt-3 text-center font-body text-sm text-[#9CA3AF] italic">
                  {block.caption}
                </figcaption>
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
