import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

/* ─── Types ─────────────────────────────────────────────── */
interface SviyazhskPoint {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  coords: [number, number];
  images: string[];
}

/* ─── Data ─────────────────────────────────────────────── */
const SVIYAZHSK_POINTS: SviyazhskPoint[] = [
  {
    id: 1,
    title: "Конный двор",
    subtitle: "Этнографический комплекс XVII–XVIII веков",
    desc: "Конный двор на Успенской площади — бывший хозяйственный двор Успенского монастыря, сегодня превращённый в туристический этнографический комплекс. Здесь работают сувенирные лавки, кафе, кузница и гончарная мастерская, а в центре расположен манеж для верховой езды. Это удобная первая остановка маршрута: можно осмотреть исторические постройки, купить местный хлеб, мёд и медовуху и настроиться на прогулку по острову.",
    coords: [55.76940046028544,48.65408612746371],
    images: [
      "https://avatars.mds.yandex.net/i?id=7eb2ac50c4a4e494c42968782d44505c5182741d-5220447-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=050d8195e6c179cd3891bfab30cb624e995120ad-5668913-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/get-altay/16136409/2a0000019938197c8837d6652781481af259/L",
      "https://avatars.mds.yandex.net/get-altay/16443717/2a0000019938197c423a682eed9a80a1d475/L",

    ],
  },
  {
    id: 2,
    title: "Иоанно-Предтеченский монастырь",
    subtitle: "Троицкая церковь и собор «Всех скорбящих Радость»",
    desc: "Комплекс Иоанно-Предтеченского монастыря конца XVI века включает Троицкую деревянную церковь — единственный сохранившийся храм первоначального деревянного Свияжска. По преданию, здесь молился Иван Грозный перед штурмом Казани. На территории также находится высокий краснокирпичный собор «Всех скорбящих Радость» начала XX века, хорошо заметный из разных точек острова. Это одна из самых выразительных остановок маршрута, где особенно хорошо чувствуется историческая глубина Свияжска.",
    coords: [55.76978850197521,48.659370811868214],
    images: [
      "https://avatars.mds.yandex.net/i?id=220acdd978ea6474afced16bdd361713155e19d1-5284135-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=d30e097de8d0375a080279613aacedcb3e44063a-9844228-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=17c1b81484dfbbfda6b2bf6b62e387d2781f8e14-5656601-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=2d57dabce098e2bf0084271afa5afce4a131ec5a-16431930-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=f17f6654cd068802214b27208cfea127500c7b30-4230742-images-thumbs&n=13",


    ],
  },
  {
    id: 3,
    title: "Музей истории Свияжска",
    subtitle: "История города и быт разных эпох",
    desc: "Музей истории Свияжска расположен в историческом здании, которое в разные годы использовалось как школа, детский дом и даже тюремное учреждение. Экспозиция рассказывает о прошлом острова через старинные монеты, иконы, предметы быта, костюмы, интерьер крестьянской избы и реконструкцию тюремной камеры XIX века. Это ключевая остановка для тех, кто хочет понять, как жил Свияжск в разные периоды своей истории.",
    coords: [55.77064705241935,48.6554992565349],
    images: [
      "https://avatars.mds.yandex.net/i?id=7184c8a0f3063d269bcefff4459704b5514587d3-4907872-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=c4fe26cdbb513708fa76b7024cbc31e6fc71291c-4566669-images-thumbs&n=13",
      "https://visit-tatarstan.com/upload/resize_cache/iblock/6dc/1000_700_2/IMG_6126.jpg",
      "https://avatars.mds.yandex.net/i?id=fc1df562b0ebfc45b666661231be138dbc524075-8496825-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=d4fb369e856c23db632dbd1914afd64914ee4749-10160381-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=a28661d3f48c06f0676494e7ef2c00654ca4c89a-10807817-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=aa61e2ff8ea538996145226c604b1cbb6bc9c945-10303547-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=3d0fed039f73a6f5ba1564ce8414a218fb3e65a1-7760894-images-thumbs&n=13",
    ],
  },
  {
    id: 4,
    title: "Музей археологического дерева «Татарская слободка»",
    subtitle: "Раскопки улицы XVII–XVIII веков",
    desc: "Этот музей построен прямо над археологическими раскопками старой улицы Свияжска. Здесь можно увидеть срубы домов, остатки заборов, мостовых и другие подлинные элементы городской среды XVII–XVIII веков. Экспозицию дополняют макеты, предметы быта и большое панно с видом древнего города. Это один из самых необычных музеев маршрута, позволяющий буквально увидеть историю под ногами.",
    coords: [55.77443354723444,48.668597764095665],
    images: [
      "https://avatars.mds.yandex.net/i?id=5e67639f35ff9731bf6961af4f7a1947313c4f83-11389740-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=d7df78a68048157fe06006d777b6b750de13b4666e564a1d-11920434-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=d9c389369bee1e6150e57e921c602d8863191474-8496968-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=66f6c0db2d41d4b92fccbe530d1b56013c9155e7-5434194-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=18aa9466c4ff6668876a4e6aac73b346a0b43189-5227582-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=13285fd48ae323cfdf2aa0268c131cef7b80a510-5235706-images-thumbs&n=13",
    ],
  },
  {
    id: 5,
    title: "Набережная реки Свияги",
    subtitle: "Смотровые площадки и панорамы острова",
    desc: "Набережная Свияги — одна из самых спокойных и живописных точек маршрута. С верхнего яруса открываются виды на причал, слияние Свияги и Волги, сельские пейзажи и монастырь на противоположном берегу. Это место для короткой паузы, фотографий и отдыха между музеями и монастырями. Особенно красиво здесь в ясную погоду, когда остров раскрывается как единый исторический ландшафт.",
    coords: [55.773146862269535,48.66693892438413],
    images: [
      "https://avatars.mds.yandex.net/i?id=2a0000017a0cc5afc6524549d156c532da15-4576286-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=53e55baeb2647073a4cd2e481d1f6b937fb8fc0c-12384307-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=6c4b5f96253e056b6d40315ddeff4e67eb1667a9-7284491-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=4115db626fca99d77af834884c6b77233a6b763e-5877892-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=2d3562ffb63d3c2d50fe3f4cafcba5d148403d73-4438614-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=77b859d5fe4211f00d532dd8769edbe8c8d62a21-5083477-images-thumbs&n=13",
    ],
  },
  {
    id: 6,
    title: "Ремесленное училище и пожарный обоз",
    subtitle: "Исторические корпуса и пожарная каланча",
    desc: "Комплекс зданий на Рождественской площади включает бывшее ремесленное училище, хозяйственные постройки и восстановленную пожарную каланчу. Сегодня здесь работают визит-центр и художественная галерея, а подъем на каланчу позволяет увидеть панорамы острова и окрестных рек с высоты. Это важная точка для понимания повседневной жизни дореволюционного Свияжска и его городской инфраструктуры.",
    coords: [55.772779524562544,48.663343936927355],
    images: [
      "https://avatars.mds.yandex.net/i?id=c1774199023dcf3abef94a81d558795b51c6810f-7765754-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=1d425574886e6b5e7e115044925e95fe-5668465-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=fee3c4258dd36b2a1a389f574bdd4503220fd978-5887963-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=0a712c4f7a89617d472f5bfc9bf0386fad438017-10099509-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=cb0bc9645b1d75b4fcfc28ac1cd9e646709a8550-16504119-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=df5a24675e79f8bff8a621fe16ae9911645ce838-5234655-images-thumbs&n=13",
    ],
  },
  {
    id: 7,
    title: "Комплекс «Ленивый торжок»",
    subtitle: "Историческая реконструкция ярмарки под открытым небом",
    desc: "«Ленивый торжок» — площадка исторической реконструкции, где посетители могут познакомиться с атмосферой ярмарочного Свияжска. Здесь устраивают мастер-классы, показывают оружие и доспехи, предлагают пострелять из лука и арбалета, метнуть топор и посмотреть ремесленные демонстрации. Это наиболее интерактивная остановка маршрута, особенно интересная для семей и тех, кто хочет не только смотреть, но и участвовать.",
    coords: [55.772637406103634,48.66091385555987],
    images: [
      "https://avatars.mds.yandex.net/i?id=f954cf17f7905637acc1dfed552fb70bb839721d-4076840-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=fbda75b9f6c5ce1f825bff276b5e82c9c3520c80-5234369-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=377d6ad52bad95ef8246e27605bc0f5d7cb212a6-5453402-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=377d32ee7621e949e7b5f05b24c15055-4901367-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=7cfd84a4f2965c90163ea9c03a693a423ab1de1b-5159020-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=6a08fe27d23f6c87c8b5c30444eba878-5341226-images-thumbs&n=13",

    ],
  },
  {
    id: 8,
    title: "Богородице-Успенский Свияжский монастырь",
    subtitle: "Главный монастырский ансамбль острова",
    desc: "Богородице-Успенский монастырь, основанный в 1555 году, считается главным монастырским комплексом Свияжска. Внутри находятся Успенский собор и Никольская трапезная церковь XVI века, братские корпуса и монастырская ограда более позднего времени. Именно здесь сохранились знаменитые фрески эпохи Ивана Грозного, включая редкие росписи и исторические изображения. Это финальная и одна из самых значимых точек маршрута.",
    coords: [55.76998261599767,48.65283217703156],
    images: [
      "https://avatars.mds.yandex.net/i?id=b509e95d4d2ffecc92d77e66173e56289928297d3dbd7c20-12884907-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=0b6f1cf3ce6a3ee7ee70bce0fbdf689cb2f36985-9231626-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=0c27e3d6fc056b199a25a6909e65b98653dda8e2-5519086-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=b3e6410ae3162d08d0da1fa0593eb0a74a0c6afc-5308991-images-thumbs&n=13",
      "https://tatmitropolia.ru/www/news/2019/8/2973547-3_b.jpg",
      "https://tatmitropolia.ru/www/news2019/4/FSFmgYl5SuA_595.jpg",
      "https://avatars.mds.yandex.net/i?id=f5b169c20d7d4c14de483bf13a0a3d2bb91f1ccc-4936646-images-thumbs&n=13",
    ],
  },
];

/* ─── Yandex Maps declaration ─────────────────────────── */
declare global {
  interface Window {
    ymaps: any;
    _ymapsReady: boolean;
  }
}

/* ─── Tour info (id=0 pseudo-point) ───────────────────── */
const TOUR_INFO = {
  title: "Информация о туре",
  subtitle: "Остров-град Свияжск",
  desc: "Предлагаемый пешеходный маршрут по острову-граду Свияжску охватывает основные достопримечательности: Конный двор, два монастыря, музеи, прогулочные набережные, смотровые площадки и исторические общественные здания. На осмотр главных объектов обычно уходит около 4 часов, а сам маршрут удобно проходить за одну прогулку без возвратов. Рекомендуется приезжать с утра, так как парковка у острова быстро заполняется. Отправная точка — туристско-информационный центр у входа в историческую часть острова, где можно получить пропуск в музей-заповедник и уточнить режим работы музеев. На острове немного кафе и общественных туалетов, поэтому перекус лучше продумать заранее.",
  images: [
    "/Sviyazhsk/hero.png",
    "https://avatars.mds.yandex.net/i?id=fc5bbc90905e66e551f74bf1826bd278_l-3519607-images-thumbs&n=13",
    "https://yandex-images.clstorage.net/9UPrb7371/c25b56-WbT/ot7C0opuWeBhgijCXDDgf-DT6V9GuDyYbrNeFd7Yx169ImBxdhmQFRU5POlU0CY9RyDexgbs1KYuz_KTmvt9h-2Gh4rIMB7gZJZjyBAq7G_1n_QcU_olnGnqUhWx47d7x04eFV1nuG5VPmu8AMxqfFdJ5d4SvbHDdZaRqoWCD9e6yc_XoU47-UmUQtVnK8hq6YvXfWDAPM9itTFjrPKZU8l9FAR8R4NESBBwihzQMmpzY_iXKKeK6XK3kK2zjy3HoevE9IFMHON0v0rMWj_nXOK3xnlc4w_1cb4kb6TJrE_9SB0GQ2aDaW8xb4g0_iZhaUP2lQiXsNhGm6OPrJor1Jvu-PGPWx_8QIlk62km7337jMpARt09732ROlKt6ZRu41kwJHlSvVVpJWi-IfcAYmxQ6pY1i4nlWKyxqbevGvy57_npu3YE5mqbV_RyKM11263RXVbjGOtCkQBAq9acQudIEx9-cbZQZjh3rSjxNEJnddawBJet3GG7j4mgszrQnubb24J4PeZ_uE7USBrmdciE9X1G1h79d500dZnFoFLVVScPRlS3SV8KR5MA9zNPdVHLqzCOk-Neqpq9oIAN9Kzx59uKSCH-caJ-2GgQznHoscJSRPUE4F6yIky5xJFW6mMmA0dCt0xJKVaBDcULXVpH8ag2l5zlXYeauYKfId-C8s7_gnAt11SdZcp0GMpT1LHrdWv8Fv9iuTBMl_GnbcBiJyJSbINqaxlXjjbtDEFMdfu4ApqS92estLyytwXdrcbk4rRXMctvlEX3RAvuV9yJyW5E1B7Uc5o6YrzrgFfSSQElenq9VEA1QJQq0RdlaHT_ky2NkvZnlKaZuJk--pDl-sOrdgPMT6hAzXIrwk_wpfVpcd80zXGYG0651blsyWUhNntVpnBODW-hI98gbExl7K8NmK3URrmtq5GwIPeB1_z-uXkP4UqLX9ZwOfxAzpHtU0DlN_ZtoA5fqNc",
    "https://avatars.mds.yandex.net/get-vertis-journal/4080458/1.jpg_1714212604174/orig",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/%D0%A1%D0%BE%D0%B1%D0%BE%D1%80_%D0%A1%D0%B2%D0%B8%D1%8F%D0%B6%D1%81%D0%BA_%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0.jpg/1280px-%D0%A1%D0%BE%D0%B1%D0%BE%D1%80_%D0%A1%D0%B2%D0%B8%D1%8F%D0%B6%D1%81%D0%BA_%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0.jpg",
  ],
};

/* ─── Walking path between points ─────────────────────── */
const SVIYAZHSK_ROUTE_PATH: [number, number][] = [
  [55.7696540706391,48.6543620033549],
  [55.769669190810916,48.65533832743631],
  [55.76969943113689,48.65615371897683],
  [55.76989946254584,48.65747133696089],
  [55.76992667867882,48.65800777876386],
  [55.77009904707786,48.65853349173078],
  [55.76975430951435,48.659187950730406],
  [55.76935211182068,48.66001943552503],
  [55.768838018475506,48.65829209291944],
  [55.76956728634346,48.658215735333016],
  [55.76991697843425,48.65788346520724],
  [55.76991238087727,48.65741376342238],
  [55.77105554023993,48.65608573307141],
  [55.770735002784726,48.655222061768626],
  [55.77059287683962,48.655463460579966],
  [55.77109112843389,48.65459795081966],
  [55.771335410814224,48.65510177156342],
  [55.77178710830929,48.65366921157496],
  [55.77266099654818,48.655809614368835],
  [55.7733159528309,48.65763817927629],
  [55.774334943092924,48.656463371727746],
  [55.77476424350784,48.65831990216151],
  [55.77483681072408,48.659886312226206],
  [55.77393878187315,48.66030473683252],
  [55.77321152938165,48.66155792020108],
  [55.7746266222367,48.66337109349515],
  [55.77348138178361,48.66435117491084],
  [55.774005092401325,48.66732942725831],
  [55.774264524647094,48.668046113457976],
  [55.77364927418482,48.667718883958166],
  [55.77258793265407,48.66615247389346],
  [55.771230076839025,48.664035680610915],
  [55.771230076839025,48.664035680610915],
  [55.771230076839025,48.664035680610915],
  [55.76840622171071,48.658161939620186],
  [55.768620934500575,48.6570300474159],
  [55.76886578145932,48.65692812347332],
  [55.76878281274434,48.65794141397291],
  [55.768982403017795,48.658992839906745],
  [55.76947230206543,48.66030712232405],
  [55.770037243697594,48.66142857381471],
  [55.77051222820878,48.66206715501215],
  [55.7715740212385,48.663215140470534],
  [55.772867277299454,48.66369635291199],
  [55.772734230547904,48.663240377379466],
  [55.77294623775398,48.66179571666976],
  [55.773224423026925,48.6614953092575],
  [55.7727480906155,48.66049721121456],
  [55.77260899584638,48.66100146650935],
  [55.771806515719234,48.658091357183245],
  [55.77098196462443,48.655813206404574],
  [55.77023305288141,48.6541771787414],
  [55.76978852382854,48.653243770004224],
  [55.77001834900848,48.65304528653712],
];

/* ─── Component ─────────────────────────────────────────── */
export default function Sviyazhsk() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [panoramaMode, setPanoramaMode] = useState(false);
  const [showPanorama, setShowPanorama] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const panoramaContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const placemarkRefs = useRef<any[]>([]);
  const panoramaPlayerRef = useRef<any>(null);
  const panoramaModeRef = useRef(false);

  const selectedPoint = selectedId !== null && selectedId > 0 ? SVIYAZHSK_POINTS.find((p) => p.id === selectedId) ?? null : null;
  const isTourInfo = selectedId === 0;
  const prevPoint = selectedId !== null && selectedId > 1 ? SVIYAZHSK_POINTS.find((p) => p.id === selectedId - 1) : null;
  const nextPoint = selectedId !== null && selectedId >= 0 ? SVIYAZHSK_POINTS.find((p) => p.id === (selectedId === 0 ? 1 : selectedId + 1)) : null;

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const getPlacemarkOptions = useCallback(
    (isActive: boolean) => {
      const markerSvg = isActive
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34"><circle cx="17" cy="17" r="15" fill="#2D6A4F" stroke="#FFFFFF" stroke-width="3"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34"><circle cx="17" cy="17" r="15" fill="#FFFFFF" stroke="#2D6A4F" stroke-width="3"/></svg>`;
      return {
        iconLayout: "default#imageWithContent",
        iconImageHref: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(markerSvg)}`,
        iconImageSize: [34, 34],
        iconImageOffset: [-17, -17],
        iconContentOffset: [0, 0],
        iconContentLayout: window.ymaps.templateLayoutFactory.createClass(
          `<div style="width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-family:Calibri,sans-serif;font-size:14px;font-weight:700;color:${isActive ? "#FFFFFF" : "#1B4332"};">$[properties.iconContent]</div>`
        ),
      };
    },
    []
  );

  const updatePlacemarkStyles = useCallback((activeId: number | null) => {
    placemarkRefs.current.forEach((pm, i) => {
      if (!pm) return;
      const pointId = i + 1;
      const options = getPlacemarkOptions(pointId === activeId);
      Object.entries(options).forEach(([key, value]) => {
        pm.options.set(key, value);
      });
    });
  }, [getPlacemarkOptions]);

  const panMapTo = useCallback((coords: [number, number]) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo(coords, { flying: true, duration: 600 });
    }
  }, []);

  const selectPoint = useCallback(
    (id: number) => {
      setSelectedId(id);
      setCurrentImageIndex(0);
      if (id > 0) {
        const point = SVIYAZHSK_POINTS.find((p) => p.id === id);
        if (point) {
          updatePlacemarkStyles(id);
          panMapTo(point.coords);
        }
      } else {
        updatePlacemarkStyles(null);
      }
    },
    [updatePlacemarkStyles, panMapTo]
  );

  const closeDetail = useCallback(() => {
    setSelectedId(null);
    setCurrentImageIndex(0);
    updatePlacemarkStyles(null);
  }, [updatePlacemarkStyles]);

  const closePanorama = useCallback(() => {
    if (panoramaPlayerRef.current) {
      panoramaPlayerRef.current.destroy();
      panoramaPlayerRef.current = null;
    }
    setShowPanorama(false);
  }, []);

  const openPanoramaAt = useCallback((coords: [number, number]) => {
    if (!panoramaContainerRef.current || !window.ymaps) return;
    window.ymaps.panorama
      .locate(coords, { layer: "yandex#panorama" })
      .then((players: any[]) => {
        if (!players || players.length === 0) {
          return window.ymaps.panorama.locate([55.7702, 48.6578], { layer: "yandex#panorama" });
        }
        return players;
      })
      .then((players: any[]) => {
        if (!players || players.length === 0) return;
        if (panoramaPlayerRef.current) {
          panoramaPlayerRef.current.destroy();
          panoramaPlayerRef.current = null;
        }
        const player = new window.ymaps.panorama.Player(
          panoramaContainerRef.current,
          players[0],
          { controls: ["arrowsControl", "exitControl", "fullscreenControl", "zoomControl"] }
        );
        panoramaPlayerRef.current = player;
        setShowPanorama(true);
      })
      .catch(() => {});
  }, []);

  const togglePanoramaMode = useCallback(() => {
    setPanoramaMode((prev) => {
      const next = !prev;
      panoramaModeRef.current = next;
      if (!next) closePanorama();
      return next;
    });
  }, [closePanorama]);

  const initMap = useCallback(() => {
    if (!mapContainerRef.current || !window.ymaps) return;
    window.ymaps.ready(() => {
      if (!mapContainerRef.current) return;
      const map = new window.ymaps.Map(
        mapContainerRef.current,
        { center: [55.7703, 48.6580], zoom: 17, controls: ["zoomControl", "fullscreenControl", "typeSelector"] },
        { suppressMapOpenBlock: true }
      );
      mapInstanceRef.current = map;
      placemarkRefs.current = [];

      const routeOutline = new window.ymaps.Polyline(
        SVIYAZHSK_ROUTE_PATH,
        { hintContent: "Маршрут прохождения" },
        { strokeColor: "#FFFFFF", strokeWidth: 8, strokeOpacity: 0.95, geodesic: false }
      );
      map.geoObjects.add(routeOutline);

      const routeLine = new window.ymaps.Polyline(
        SVIYAZHSK_ROUTE_PATH,
        { hintContent: "Маршрут прохождения" },
        { strokeColor: "#2D6A4F", strokeWidth: 4, strokeOpacity: 0.9, geodesic: false }
      );
      map.geoObjects.add(routeLine);

      SVIYAZHSK_POINTS.forEach((point) => {
        const pm = new window.ymaps.Placemark(
          point.coords,
          { hintContent: `${point.id}. ${point.title}`, iconContent: String(point.id) },
          getPlacemarkOptions(false)
        );
        pm.events.add("click", () => selectPoint(point.id));
        map.geoObjects.add(pm);
        placemarkRefs.current.push(pm);
      });

      map.events.add("click", (e: any) => {
        if (panoramaModeRef.current) {
          openPanoramaAt(e.get("coords"));
        }
      });

      setMapReady(true);
    });
  }, [selectPoint, openPanoramaAt, getPlacemarkOptions]);

  useEffect(() => {
    if (window.ymaps) { initMap(); return; }
    const existing = document.querySelector('script[src*="api-maps.yandex.ru"]');
    if (existing) {
      existing.addEventListener("load", initMap);
      return () => existing.removeEventListener("load", initMap);
    }
    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&load=package.full";
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);
    return () => {
      if (mapInstanceRef.current) { try { mapInstanceRef.current.destroy(); } catch (_) {} mapInstanceRef.current = null; }
      if (panoramaPlayerRef.current) { try { panoramaPlayerRef.current.destroy(); } catch (_) {} panoramaPlayerRef.current = null; }
    };
  }, [initMap]);

  useEffect(() => {
    if (mapReady) updatePlacemarkStyles(selectedId);
  }, [selectedId, mapReady, updatePlacemarkStyles]);

  const activeTitle = isTourInfo ? TOUR_INFO.title : selectedPoint?.title ?? "";
  const activeSubtitle = isTourInfo ? TOUR_INFO.subtitle : selectedPoint?.subtitle ?? "";
  const activeDesc = isTourInfo ? TOUR_INFO.desc : selectedPoint?.desc ?? "";
  const activeImages = isTourInfo ? TOUR_INFO.images : selectedPoint?.images ?? [];
  const hasActiveDetail = selectedId !== null;

  return (
    <div className="min-h-screen bg-[#FAF7F0] font-body flex flex-col">
      {/* Header */}
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

      {/* Page content */}
      <div className="pt-20 pb-6 max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-body text-[#9CA3AF] mb-5 flex-wrap">
          <button onClick={() => navigate("/")} className="hover:text-[#2D6A4F] transition-colors">Культура Татарстана</button>
          <Icon name="ChevronRight" size={14} className="text-[#D1D5DB]" />
          <span className="text-[#1B4332] font-semibold">Свияжск</span>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl border border-[#E8D9B8] p-5 sm:p-6 mb-6 flex flex-col sm:flex-row items-start gap-5">
          <img
            src={SVIYAZHSK_POINTS[0].images[0]}
            alt="Свияжск"
            className="w-full sm:w-56 h-40 sm:h-40 rounded-xl object-cover flex-shrink-0"
            onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/400x300/2D6A4F/FAF7F0?text=Свияжск"; }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-body text-[#C9A84C] font-semibold mb-1">Введение</p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1B4332] leading-tight">
              Путешествие по острову-граду Свияжску
            </h1>
            <p className="text-sm font-body text-[#6B7280] mt-2 leading-relaxed">
              Свияжск · {SVIYAZHSK_POINTS.length} точек маршрута · Объект Всемирного наследия ЮНЕСКО
            </p>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E8D9B8] bg-white hover:bg-[#F2EAD3] transition-colors text-sm font-body font-medium text-[#1B4332] flex-shrink-0"
          >
            <Icon name={copied ? "Check" : "Share2"} size={15} />
            {copied ? "Скопировано" : "Поделиться"}
          </button>
        </div>

        {/* Map + List + Detail */}
        <div className="bg-white rounded-2xl border border-[#E8D9B8] overflow-hidden mb-6">
          <div className="flex flex-col lg:flex-row lg:h-[600px]" style={{ minHeight: "520px" }}>
            {/* Left: Object list */}
            <aside className="lg:w-72 xl:w-80 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-[#E8D9B8] overflow-y-auto lg:max-h-[600px]">
              <nav className="py-2 px-2">
                <button
                  onClick={() => selectPoint(0)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group mb-1
                    ${isTourInfo ? "bg-[#2D6A4F] text-white shadow-md shadow-[#2D6A4F]/20" : "hover:bg-[#F2EAD3] text-[#374151]"}`}
                >
                  <span className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${isTourInfo ? "bg-[#C9A84C] text-white" : "bg-[#F2EAD3] text-[#2D6A4F]"}`}>
                    <Icon name="Info" size={14} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-semibold leading-tight truncate ${isTourInfo ? "text-white" : "text-[#1B4332]"}`} style={{ fontFamily: "Calibri, sans-serif" }}>
                      Информация о туре
                    </p>
                    <p className={`text-[10px] mt-0.5 truncate ${isTourInfo ? "text-white/70" : "text-[#9CA3AF]"}`}>
                      {SVIYAZHSK_POINTS.length} объектов · ~4 часа
                    </p>
                  </div>
                </button>

                {SVIYAZHSK_POINTS.map((point, index) => (
                  <div key={point.id} className="relative flex">
                    <div className="flex flex-col items-center ml-[25px] mr-0 flex-shrink-0" style={{ width: "0px" }}>
                      {index < SVIYAZHSK_POINTS.length - 1 && (
                        <div className="absolute top-[42px] w-[2px] bg-[#2D6A4F]/20" style={{ height: "calc(100% - 6px)", left: "25px" }} />
                      )}
                    </div>
                    <button
                      onClick={() => selectPoint(point.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group mb-0.5
                        ${selectedId === point.id ? "bg-[#2D6A4F] text-white shadow-md shadow-[#2D6A4F]/20" : "hover:bg-[#F2EAD3] text-[#374151]"}`}
                    >
                      <span
                        className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold relative z-10 transition-colors
                          ${selectedId === point.id ? "bg-[#2D6A4F] text-white border-2 border-white" : "bg-white text-[#2D6A4F] border-2 border-[#2D6A4F]"}`}
                        style={{ fontFamily: "Calibri, sans-serif" }}
                      >
                        {point.id}
                      </span>
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={point.images[0]}
                          alt={point.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/72x72/2D6A4F/FAF7F0?text=${point.id}`; }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-xs font-semibold leading-tight truncate ${selectedId === point.id ? "text-white" : "text-[#1B4332]"}`} style={{ fontFamily: "Calibri, sans-serif" }}>
                          {point.title}
                        </p>
                        <p className={`text-[10px] mt-0.5 truncate ${selectedId === point.id ? "text-white/70" : "text-[#9CA3AF]"}`}>
                          {point.subtitle}
                        </p>
                      </div>
                    </button>
                  </div>
                ))}
              </nav>
            </aside>

            {/* Center/Right: Detail + Map */}
            <div className="flex-1 flex flex-col lg:flex-row min-h-0">
              {hasActiveDetail && (
                <div className="lg:w-[380px] xl:w-[420px] flex-shrink-0 flex flex-col min-h-0 border-b lg:border-b-0 lg:border-r border-[#E8D9B8] overflow-hidden" style={{ animation: "slideIn 0.3s ease-out" }}>
                  <div className="px-4 py-3 border-b border-[#E8D9B8] flex items-start justify-between gap-3 flex-shrink-0">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-[#C9A84C] font-semibold mb-1">
                        {isTourInfo ? "Остров-град Свияжск" : `Точка ${selectedId} из ${SVIYAZHSK_POINTS.length} · ${activeSubtitle}`}
                      </p>
                      <h2 className="font-display text-lg font-bold text-[#1B4332] leading-tight">
                        {activeTitle}
                      </h2>
                    </div>
                    <button
                      onClick={closeDetail}
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F2EAD3] transition-colors text-[#6B7280] hover:text-[#1B4332]"
                      title="Закрыть"
                    >
                      <Icon name="X" size={18} />
                    </button>
                  </div>

                  <div className="relative h-56 flex-shrink-0 overflow-hidden bg-[#F2EAD3]">
                    <img
                      key={`${selectedId}-${currentImageIndex}`}
                      src={activeImages[currentImageIndex]}
                      alt={`${activeTitle} — фото ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                      style={{ animation: "fadeIn 0.25s ease-out" }}
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/800x300/2D6A4F/FAF7F0?text=${encodeURIComponent(activeTitle)}`; }}
                    />
                    {activeImages.length > 1 && (
                      <>
                        <div className="absolute top-2 left-2">
                          <span className="text-[11px] font-semibold text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                            {currentImageIndex + 1} / {activeImages.length}
                          </span>
                        </div>
                        <button
                          onClick={() => setCurrentImageIndex((p) => p === 0 ? activeImages.length - 1 : p - 1)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                          <Icon name="ChevronLeft" size={16} />
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex((p) => p === activeImages.length - 1 ? 0 : p + 1)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                          <Icon name="ChevronRight" size={16} />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="flex-1 min-h-0 overflow-y-auto p-4">
                    <p className="text-sm text-[#4B5563] leading-relaxed">{activeDesc}</p>
                  </div>

                  {!isTourInfo && (
                    <div className="flex-shrink-0 flex items-center border-t border-[#E8D9B8]">
                      <button
                        onClick={() => { if (prevPoint) selectPoint(prevPoint.id); else selectPoint(0); }}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#F2EAD3] transition-colors"
                      >
                        <Icon name="ChevronLeft" size={16} /> Назад
                      </button>
                      <div className="w-px h-7 bg-[#E8D9B8]" />
                      <button
                        onClick={() => nextPoint && selectPoint(nextPoint.id)}
                        disabled={!nextPoint}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#F2EAD3] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        Вперед <Icon name="ChevronRight" size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Map */}
              <div className="flex-1 relative" style={{ minHeight: "400px" }}>
                <div className="absolute top-3 left-3 z-10">
                  <button
                    onClick={togglePanoramaMode}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-body font-semibold shadow-md transition-all
                      ${panoramaMode ? "bg-[#2D6A4F] text-white" : "bg-white text-[#1B4332] hover:bg-[#F2EAD3]"}`}
                  >
                    <Icon name="Layers" size={13} /> Панорамы
                  </button>
                </div>

                {panoramaMode && !showPanorama && (
                  <div className="absolute top-12 left-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-md">
                    <p className="text-xs text-[#2D6A4F]">Нажмите на карту, чтобы открыть панораму</p>
                  </div>
                )}

                {showPanorama && (
                  <button
                    onClick={closePanorama}
                    className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md bg-white text-[#1B4332] hover:bg-[#F2EAD3] transition-all"
                  >
                    <Icon name="Map" size={13} /> Вернуться к карте
                  </button>
                )}

                {!mapReady && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#F2EAD3]">
                    <div className="text-center">
                      <div className="w-10 h-10 border-3 border-[#2D6A4F] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                      <p className="text-sm text-[#6B7280]">Загрузка карты…</p>
                    </div>
                  </div>
                )}

                <div ref={mapContainerRef} className="w-full h-full" style={{ display: showPanorama ? "none" : "block", minHeight: "400px" }} />
                <div ref={panoramaContainerRef} className="w-full h-full" style={{ display: showPanorama ? "block" : "none", minHeight: "400px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-[#FFF8ED] border-t border-[#FFE0B2] py-4 px-6 mt-auto">
        <p className="text-xs font-body text-center text-[#B85C00] max-w-3xl mx-auto">
          ℹ️ Данный сайт создан в качестве конкурсной работы и может содержать неточности. Информация представлена в ознакомительных целях.
        </p>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
        .border-3 { border-width: 3px; }
      `}</style>
    </div>
  );
}
