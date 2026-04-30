import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface ElabugaPoint {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  coords: [number, number];
  images: string[];
}

const SVIYAZHSK_LIKE_IMAGE = (title: string) =>
  `https://placehold.co/1200x800/2D6A4F/FAF7F0?text=${encodeURIComponent(title)}`;

const withFallbackImages = (title: string, images: string[]) => {
  const filteredImages = images.filter(Boolean);
  return filteredImages.length > 0 ? filteredImages : [SVIYAZHSK_LIKE_IMAGE(title)];
};

const ELABUGA_POINTS: ElabugaPoint[] = [
  {
    id: 1,
    title: "Елабужское городище",
    subtitle: "Древнее укрепление и начало истории города",
    desc: "Елабужское городище открывает маршрут как одно из самых древних мест Елабуги. Именно с него принято начинать знакомство с городом: это символ исторического происхождения Елабуги и важная точка, откуда особенно хорошо ощущается её связь с глубокой древностью. Здесь закладывается общее понимание того, как формировалось поселение и почему это место считается знаковым для города.",
    coords: [55.74661012327618,52.03254495030969],
    images: withFallbackImages("Елабужское городище", [
      "https://avatars.mds.yandex.net/i?id=80192085e843427988cbc0835d743b918eec3174-5234536-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=82196356f4bd9a7bdf3c0eda1fccd6650f6c52cd-12361708-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=a12d13def7b63876934a582086430d6bbb21fb5c-7570549-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=f6e64fd862f112b8857b2f94cf4656a8297b0b40-5228381-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=5cd6908094d7b1e1d6b5346d3184074b751589af-4009035-images-thumbs&n=13",
    ]),
  },
  {
    id: 2,
    title: "До 1917 после",
    subtitle: "Музей истории Елабуги и его экспозиция о жизни города в разные эпохи",
    desc: "Музей истории Елабуги — один из ключевых музеев Елабуга, посвящённый истории города, в том числе периоду до 1917 года и после революции. Экспозиция музея позволяет проследить, как менялась жизнь Елабуги на протяжении разных эпох.До 1917 года Елабуга была крупным уездным городом с развитой торговлей и купеческой культурой. В музее представлены материалы, отражающие этот период: документы, фотографии, предметы быта, купеческие интерьеры, изделия ремесленников. Особое внимание уделено жизни зажиточных семей, развитию торговли и роли города как важного экономического центра. Посетители могут увидеть, как выглядела повседневная жизнь горожан, какие традиции существовали и как формировалась городская среда.После 1917 года, в результате революционных событий, жизнь города существенно изменилась. В музее показан переход к советскому периоду: национализация собственности, изменение социальной структуры, развитие промышленности и образования. Экспозиции рассказывают о трудных этапах становления новой власти, а также о повседневной жизни людей в советское время.Особое место занимает тема Великая Отечественная война. В годы войны Елабуга стала местом эвакуации предприятий и людей, что сыграло важную роль в её развитии. В музее представлены материалы о вкладе жителей города в победу, их трудовом и военном подвиге.Таким образом, музей истории Елабуги даёт целостное представление о развитии города: от купеческого уездного центра до современного культурного пространства. Он помогает понять, как исторические события повлияли на жизнь людей и формирование облика города.",
    coords: [55.754842713861706,52.055172632609946],
    images: withFallbackImages("Чёртово городище", [
      "https://avatars.mds.yandex.net/i?id=fead04180abaf2dc626428bd7f777302df7c9e09-5859978-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/get-altay/1909414/2a00000184afc79b0a412e25bd4c16227590/L",
      "https://avatars.mds.yandex.net/get-altay/15394162/2a0000019a4dbf29d2530fcac491a5bc7031/L",
      "https://avatars.mds.yandex.net/get-altay/10879408/2a00000191890c58e67f70214bbd503f1ea9/L",
      "https://avatars.mds.yandex.net/get-altay/12800836/2a00000190491699fec7fead1505c69386b3/L",
      "https://avatars.mds.yandex.net/get-altay/16899665/2a00000197ca5ac894a3340a23ea1461392b/L",

    ]),
  },
  {
    id: 3,
    title: "Спасский собор",
    subtitle: "Архитектурный центр центральной части",
    desc: "Спасский собор задаёт тон центральной части маршрута. Это величественный храм и важный архитектурный ориентир Елабуги, вокруг которого особенно хорошо читается историческая городская среда. Посещение собора помогает увидеть, как в Елабуге сочетались духовная жизнь, купеческое наследие и классическая городская застройка.",
    coords: [55.75349304487684,52.056304755950734],
    images: withFallbackImages("Спасский собор", [
      "https://avatars.mds.yandex.net/i?id=a5ef804d34e4ebf2970c1b08f50fa664089ffa4d-10473632-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=986156acf4bcd29df0e3d5dad383f6dd8d10df78-10339875-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=13f461c51c4a857f8423fc697131d2854a3ffc5b-8185027-images-thumbs&n=13",
    ]),
  },
  {
    id: 4,
    title: "Шишкинские пруды",
    subtitle: "Прогулочная зона и природный акцент маршрута",
    desc: "Шишкинские пруды дают маршруту спокойную прогулочную паузу. Это зеленая зона с водой, природными видами и атмосферой неспешной городской прогулки. После исторических объектов эта остановка позволяет увидеть Елабугу не только как музей под открытым небом, но и как живое пространство, где архитектура сочетается с природным ландшафтом.",
    coords: [55.75306407378653,52.05154365267235],
    images: withFallbackImages("Шишкинские пруды", [
      "https://avatars.mds.yandex.net/i?id=6466a3c5bd9a043e562ffafc97cd8883a958f2c2-8497136-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=870fab1c20eb02185e20f19c0c55c975c063c96d-12154353-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=d488a20bbc3de86558d387c0884e05c9a006ec5b-12585840-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=8ca43c3035aec0d279c6c8fddcd9051941dddfd6-5354114-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/get-altay/16480821/2a0000019aad63249ee92c121772a7f8cbbd/L",
      "https://avatars.mds.yandex.net/i?id=55e805a193d49e635aa322db74321078a3e84fda-5248728-images-thumbs&n=13",

    ]),
  },
  {
    id: 5,
    title: "Дом-музей И. И. Шишкина",
    subtitle: "Родной дом знаменитого художника",
    desc: "Дом-музей Ивана Шишкина особенно важен для понимания культурной роли Елабуги. Город известен как родина художника, и музей раскрывает семейную, бытовую и художественную среду, в которой формировался один из самых узнаваемых русских пейзажистов. Эта точка соединяет локальную историю города с масштабом российской культуры.",
    coords: [55.75410906740045,52.054520593429196],
    images: withFallbackImages("Дом-музей И. И. Шишкина", [
      "https://avatars.mds.yandex.net/i?id=423ab7c0409bb73855c8f521bc90dab22545e149d628a1c0-13071435-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=e92b5698e0cbaedfae081e6de609eeeba8942888-10662832-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=c8699d8802f82690e5d6b38da948e46b5ba55bff-5754905-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=6627c9ed0c132a0bf03c6689757d7278ad309d6f-5870067-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=c8699d8802f82690e5d6b38da948e46b5ba55bff-5754905-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=f01097efcd44ef2fd3f05d9225c33bbc96471332-5255469-images-thumbs&n=13",
      "https://yandex-images.clstorage.net/Z9a8Nc348/da3420hrJlqp/U7kUuqr_Axw5KfS0PxczQy4rrMwf1o04h0y4XP8VdWIexbUBmiMFtoiLX6I9N08AvGXV317XbUGkPpWsutZe3AKt0N67apbYiFy0NA9HEpb6Gr0Jv5NcnKKMeUw6kLX3GLNCY6glZ3AvGQig_MIvgNxkEQ4qAb7gkSgiDIxH2slhiGWrL59wXi15NpSdNQKHfCvMKC-RLIijrGtaqFWAkbgCAhE6JmeQDXlakx0QvnAspfS8mnNOtZIZAa-85ojbo_gl6P19E608-eUED4Zh9FxKbwo-Ql9a0d_4qWsmIHDJsDPhCUbl0X74eHNfwM4zPzQXDchgzdQCSAPMXYVLuEI7Vhs-jqFtHTlVJK2H4YceS-_YngHfe0C9m-jLV_Chu6BRMSjXFyFsKZpin8AN8x-05owrYyxkManifQ2G24pxWBTKzC6R7l5alCXvlPPF75nMGf2j7-hRvNlLaSQgM2rBoXErRoQCLao48n0gvyHtJXSuW8AMB_JYIBx_hynZ4FuXCA1tMQ29KcfGXkdQZu6pfbodED27Uj4aiLqVkACJ0oMAq0bGkn6aarONAX2CzzakTZuhXSRzSOPe_fQp6eDJF0ncXnLNLFlG5Y730iaN-Z36HwPc22KuOcuoJzOAq8OBEStX52PtWmhxjtJ_kFxF5X1JAo8lwYlRzF7E63rj2eQZrO1z3BzYNwX8d6J1rfrNm98BXVhwPEtbCkdwgJsTkoLIFNcx7Vva0C1gfXIvtMUPabNv1RC7kGwtd1vrE8n2mg5M8k_8qyQlfBXwpywbLViMA-24QIyaO2nXocEpMZMRmTS24C4aO7ENMF0g3ObUjilwX2WQWtIO7kXr28CbN3iNv8AtfKslxc_n00ePiGyZvfGdiWKM20maJdIyi5ICs4iHhLCvOOjQb7ItIL12hd1IID9mo7gjvr7HKQgimJW4rW6gXh2Y9hetBSK1PAiNeiziTMgCHDhY8",
      "https://avatars.mds.yandex.net/i?id=6837f3e93d0492f06258fff66571d505d6f095b4-5481525-images-thumbs&n=13",
    ]),
  },
  {
    id: 6,
    title: "Музей Марины Цветаевой",
    subtitle: "Культурное место памяти поэтессы",
    desc: "Музей Марины Цветаевой вводит в маршрут важную литературную тему. Он посвящён памяти поэтессы и напоминает о трагических и значимых страницах её биографии, связанных с Елабугой. Это одна из ключевых культурных остановок маршрута, позволяющая увидеть город через судьбы великих людей, оказавшихся здесь в переломные моменты истории.",
    coords: [55.75515852455338,52.07203226191177],
    images: withFallbackImages("Музей Марины Цветаевой", [
      "https://avatars.mds.yandex.net/i?id=8d3d2716de5ecae1bf3c1b8dba1f2d7658928233-6557067-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=632ee97d80e1ee304f62f54586ec0d4aceeacc8d-4578804-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=2ec5f645e8177c54bdae62790ad3a44ed9705738-16498523-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=f71eb9309266e1d66a70c128baed7af5d1509d6b-3891756-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=562bb0c4df7254f5af9bc40594e71e9d602533e6-7040875-images-thumbs&n=13",

    ]),
  },
  {
    id: 7,
    title: "Литературный музей Марины Цветаевой",
    subtitle: "Последняя точка её жизни",
    desc: "Литературный музей Марины Цветаевой — особое мемориальное место, связанное с последним этапом её жизни. Эта остановка делает маршрут более личным и эмоционально насыщенным: она не только продолжает литературную линию, но и заставляет задуматься о драматических судьбах людей, чья жизнь была связана с Елабугой. Это одно из самых тихих и сильных по смыслу мест маршрута.",
    coords: [55.75472228852134,52.07090145130798],
    images: withFallbackImages("Литературный музей Марины Цветаевой", [
      "https://avatars.mds.yandex.net/get-altay/4971637/2a0000017c8ddd1e4d7451087a8735eed9e3/L",
      "https://avatars.mds.yandex.net/get-altay/4552098/2a00000181153250f4ff9b393f3e1989d6c6/L",
      "https://avatars.mds.yandex.net/get-altay/7652307/2a00000184290ae8d7625e3846ea0a0c03b1/L",
      "https://avatars.mds.yandex.net/get-altay/10812365/2a0000018af16f3db666e592a52a48ab1915/L",
      "https://avatars.mds.yandex.net/get-altay/9663145/2a00000189271b19a8bc567b194d8db1ad88/L",
      "https://avatars.mds.yandex.net/get-altay/11396712/2a0000018c0708ed3b00eefe9e4f2c0da093/L",
      "https://avatars.mds.yandex.net/get-altay/5491685/2a000001811531fc8b3bb151b0e36cf0aad6/L",
      "https://avatars.mds.yandex.net/get-altay/10963046/2a0000018b5b5c31f11b81da73702eb8f11d/L",
      "https://avatars.mds.yandex.net/get-altay/5554141/2a000001843817825f965a8b377963b4d01b/L",
      "https://avatars.mds.yandex.net/get-altay/5479189/2a0000017c8dde44f1b1617997b6e4a0cb8a/L",
      "https://avatars.mds.yandex.net/get-altay/9770129/2a0000018af16edef7e2578c374f57164f4e/L",
    ]),
  },
  {
    id: 8,
    title: "Музей Усадьба Н.А. Дуровой",
    subtitle: "Дом, связанный с первой женщиной-офицером русской армии",
    desc: "Дом Дуровой — историческое здание в Елабуга, связанное с жизнью и деятельностью известной личности XIX века — Надежда Дурова, первой женщины-офицера русской армии и участницы Отечественной войны 1812 года.Надежда Дурова вошла в историю как выдающаяся и необычная фигура своего времени. Под мужским именем она служила в армии, участвовала в военных действиях и проявила мужество и храбрость. Позже она стала писательницей и оставила мемуары, в которых подробно описала свою жизнь и службу.Дом в Елабуге связан с последним периодом её жизни. Здесь Дурова провела многие годы после завершения военной карьеры. Здание представляет собой типичный образец городской застройки XIX века и сохраняет атмосферу того времени.Сегодня в доме расположен музей, посвящённый Надежде Дуровой. В экспозиции представлены личные вещи, документы, предметы быта и материалы, рассказывающие о её судьбе. Посетители могут узнать о её военной службе, литературной деятельности и роли в истории России.Дом Дуровой имеет большое культурное значение. Он не только сохраняет память о выдающейся личности, но и отражает особенности эпохи, в которой она жила. Это место помогает лучше понять исторический контекст XIX века и роль женщин в обществе того времени.Таким образом, Дом Дуровой является важной достопримечательностью Елабуги и частью её культурного наследия, привлекая внимание туристов и исследователей истории.",
    coords: [55.75869962845227,52.06749783302703],
    images: withFallbackImages("Музей Усадьба Н.А. Дуровой", [
      "https://avatars.mds.yandex.net/i?id=5ae6a5289f207eb4c6f0647efd7c447d1f5a6d3e-12410808-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=6acbf710fb8ee5811f19360d4f3ca01ca0346212-8266553-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=720838a19b6dc771a89600e7601074203ffa0d50-9181668-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/get-altay/14102738/2a00000194347f6fa3eeceef48542c4277df/L",
      "https://avatars.mds.yandex.net/get-altay/5457543/2a0000017d196a2897f542f319ecea2632d8/L",
      "https://avatars.mds.yandex.net/get-altay/14329771/2a0000019392994530321243d768641859b5/L",
      "https://avatars.mds.yandex.net/get-altay/15257527/2a000001968376c5ee130e9f8dc0a01d8e06/L",
      "https://avatars.mds.yandex.net/get-altay/13805978/2a0000019284e0097808c66c17e3eec6d504/L",
      "https://avatars.mds.yandex.net/get-altay/7650129/2a00000183e3cca9be103df07112ef479714/L",
      "https://avatars.mds.yandex.net/get-altay/11937221/2a0000018f59416c75985ae8d81a7227bba5/L",

    ]),
  },
  {
    id: 9,
    title: "Пожарная каланча",
    subtitle: "Архитектурный памятник и взгляд на городскую жизнь XIX века",
    desc: "Пожарная каланча продолжает тему исторической застройки и позволяет увидеть, как жили елабужские семьи в XIX веке. Интерьеры, предметы повседневной жизни и атмосфера старого города делают эту остановку особенно наглядной. Здесь маршрут раскрывает бытовую сторону истории — то, как выглядела Елабуга изнутри, в жизни её жителей.",
    coords: [55.75869213470425,52.06532915095131],
    images: withFallbackImages("Пожарная каланча", [
      "https://avatars.mds.yandex.net/i?id=f992b8e19275967f66044063ae40b4b84dead27c-7000229-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=7d5a12a111d2351f2b6f7897fbed662abd9190b8-5335399-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=0e76baea9d08a253d091df8dd7c5faeb9be7bc48-5655541-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=2d0c5d5043f658f8c3c67290faae4efc67b65526-5317815-images-thumbs&n=13",
    ]),
  },
  {
    id: 10,
    title: "Музей уездной медицины имени В.М. Бехтерева",
    subtitle: "Дом-музей выдающегося русского учёного",
    desc: "Дом-музей В.М. Бехтерева — музей в Елабуга, посвящённый жизни и научной деятельности выдающегося русского учёного Владимир Бехтерев — невролога, психиатра и основателя рефлексологии.Владимир Бехтерев родился в Елабужском уезде, и именно с этим регионом связаны его ранние годы. Музей расположен в доме, где он провёл часть своего детства. Здание представляет собой образец жилой архитектуры XIX века и сохраняет атмосферу того времени.Экспозиция музея рассказывает о жизненном пути учёного: от детских лет до становления как одного из крупнейших специалистов в области неврология и психиатрии. Здесь представлены личные вещи, документы, фотографии, научные труды и материалы, отражающие его вклад в развитие науки.Особое внимание уделено научным достижениям Бехтерева. Он внёс значительный вклад в изучение работы головного мозга, нервной системы и поведения человека. Учёный разработал новые методы исследования и лечения, которые оказали влияние на развитие медицины во всём мире.Музей также знакомит посетителей с историей науки конца XIX — начала XX века, показывая, в каких условиях формировались новые научные направления. Это позволяет лучше понять значение открытий Бехтерева и их влияние на современную медицину.Сегодня Дом-музей Бехтерева является важным культурно-образовательным объектом Елабуги. Он привлекает не только туристов, но и студентов, исследователей и всех, кто интересуется историей науки. Музей сохраняет память о выдающемся учёном и его вкладе в развитие мировой науки.",
    coords: [55.75972878423935,52.04720803121592],
    images: withFallbackImages("Музей уездной медицины имени В.М. Бехтерева", [
      "https://avatars.mds.yandex.net/i?id=2c88f0d22a5d338231df8bbca31744e84b9c504a-10805126-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=0d35bcb729494a821d823181630792d82ef3bfa1-8235878-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=625baf342ed9f777fbb87e08f56391c3adbe0509-8529854-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=043d6d6bcff07b68a56f41b4d349dfadfceb8541-13014061-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=d4693041f39425593cef22134cc56093fef5df73-4055819-images-thumbs&n=13",

    ]),
  },
];

declare global {
  interface Window {
    ymaps: any;
    _ymapsReady: boolean;
  }
}

const TOUR_INFO = {
  title: "Информация о туре",
  subtitle: "Елабуга",
  desc: "Маршрут по Елабуге построен как последовательная пешеходная прогулка от древнейших мест города к его центральным улицам, музеям и набережной Камы. Он охватывает историческое начало Елабуги, её главные архитектурные акценты, художественные и литературные музеи, купеческую застройку и природные точки отдыха. Этот путь позволяет увидеть город сразу в нескольких измерениях: как древний центр, как родину Шишкина, как место памяти Марины Цветаевой и как цельный исторический городской ландшафт.",
  images: [
    "/Elabuga/hero.jpg",
    SVIYAZHSK_LIKE_IMAGE("Маршрут по Елабуге"),
    SVIYAZHSK_LIKE_IMAGE("Историческая Елабуга"),
  ],
};

const ELABUGA_ROUTE_PATH: [number, number][] = [
  [55.74654400361768,52.03269754977004],
  [55.747530889102016,52.033670397228406],
  [55.74814253910588,52.03448602899465],
  [55.74816069336513,52.0350546573058],
  [55.74869926586403,52.03548381074817],
  [55.748106927924475,52.03692849446347],
  [55.75290430327367,52.041034928695034],
  [55.753769540791744,52.0425584234155],
  [55.755286553464856,52.04520213014105],
  [55.75561326873883,52.046811455549985],
  [55.75567982151324,52.04736935502509],
  [55.75538335827702,52.05109226113775],
  [55.755188342408424,52.05222713720516],
  [55.754876749493164,52.053267834302936],
  [55.754704313504384,52.054903981802006],
  [55.754504649824106,52.05611634027674],
  [55.753494505888064,52.05596038126777],
  [55.75347268337344,52.05537868500712],
  [55.753884121373154,52.05446673394207],
  [55.75405051050298,52.0531041717625],
  [55.75312679367636,52.05135729933072],
  [55.752815184221866,52.05166843557645],
  [55.752815184221866,52.05166843557645],
  [55.75369697782884,52.05208202487994],
  [55.75417496880572,52.05167432910967],
  [55.75441504069824,52.05235829996552],
  [55.75400249385781,52.054443477324774],
  [55.75443782827268,52.05358533831837],
  [55.754812226735474,52.05385747509846],
  [55.754812226735474,52.05385747509846],
  [55.75444298487945,52.07151371304374],
  [55.75518109076388,52.07206864781014],
  [55.7550903357869,52.07166095203988],
  [55.75461538128179,52.071451739736695],
  [55.75461538128179,52.071451739736695],
  [55.75478036830462,52.06920528370416],
  [55.75820994611699,52.070635386236646],
  [55.75820994611699,52.070635386236646],
  [55.75885652437453,52.06571343313571],
  [55.758658658859495,52.06557867391968],
  [55.76070200348514,52.049894649151675],
  [55.76060823667002,52.04987319147952],
  [55.76064453352855,52.04962642825015],
  [55.7591943010773,52.04906757676577],
  [55.75940603998345,52.0471471151111],
  [55.75976901827939,52.047072013258685],
];

export default function Elabuga() {
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

  const selectedPoint = selectedId !== null && selectedId > 0 ? ELABUGA_POINTS.find((p) => p.id === selectedId) ?? null : null;
  const isTourInfo = selectedId === 0;
  const prevPoint = selectedId !== null && selectedId > 1 ? ELABUGA_POINTS.find((p) => p.id === selectedId - 1) : null;
  const nextPoint = selectedId !== null && selectedId >= 0 ? ELABUGA_POINTS.find((p) => p.id === (selectedId === 0 ? 1 : selectedId + 1)) : null;

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

  const selectPoint = useCallback((id: number) => {
    setSelectedId(id);
    setCurrentImageIndex(0);
    if (id > 0) {
      const point = ELABUGA_POINTS.find((p) => p.id === id);
      if (point) {
        updatePlacemarkStyles(id);
        panMapTo(point.coords);
      }
    } else {
      updatePlacemarkStyles(null);
    }
  }, [updatePlacemarkStyles, panMapTo]);

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
          return window.ymaps.panorama.locate([55.7596, 52.0534], { layer: "yandex#panorama" });
        }
        return players;
      })
      .then((players: any[]) => {
        if (!players || players.length === 0) return;
        if (panoramaPlayerRef.current) {
          panoramaPlayerRef.current.destroy();
          panoramaPlayerRef.current = null;
        }
        panoramaPlayerRef.current = new window.ymaps.panorama.Player(
          panoramaContainerRef.current,
          players[0],
          { controls: ["arrowsControl", "exitControl", "fullscreenControl", "zoomControl"] }
        );
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
        { center: [55.7598, 52.0528], zoom: 15, controls: ["zoomControl", "fullscreenControl", "typeSelector"] },
        { suppressMapOpenBlock: true }
      );

      mapInstanceRef.current = map;
      placemarkRefs.current = [];

      const routeOutline = new window.ymaps.Polyline(
        ELABUGA_ROUTE_PATH,
        { hintContent: "Маршрут прохождения" },
        { strokeColor: "#FFFFFF", strokeWidth: 8, strokeOpacity: 0.95, geodesic: false }
      );
      map.geoObjects.add(routeOutline);

      const routeLine = new window.ymaps.Polyline(
        ELABUGA_ROUTE_PATH,
        { hintContent: "Маршрут прохождения" },
        { strokeColor: "#2D6A4F", strokeWidth: 4, strokeOpacity: 0.9, geodesic: false }
      );
      map.geoObjects.add(routeLine);

      ELABUGA_POINTS.forEach((point) => {
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
  }, [getPlacemarkOptions, openPanoramaAt, selectPoint]);

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

      <div className="pt-20 pb-6 max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1">
        <div className="flex items-center gap-2 text-sm font-body text-[#9CA3AF] mb-5 flex-wrap">
          <button onClick={() => navigate("/")} className="hover:text-[#2D6A4F] transition-colors">Культура Татарстана</button>
          <Icon name="ChevronRight" size={14} className="text-[#D1D5DB]" />
          <span className="text-[#1B4332] font-semibold">Елабуга</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8D9B8] p-5 sm:p-6 mb-6 flex flex-col sm:flex-row items-start gap-5">
          <img
            src={TOUR_INFO.images[0]}
            alt="Елабуга"
            className="w-full sm:w-56 h-40 sm:h-40 rounded-xl object-cover flex-shrink-0"
            onError={(e) => { (e.target as HTMLImageElement).src = SVIYAZHSK_LIKE_IMAGE("Елабуга"); }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-body text-[#C9A84C] font-semibold mb-1">Введение</p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1B4332] leading-tight">
              Путешествие по Елабуге
            </h1>
            <p className="text-sm font-body text-[#6B7280] mt-2 leading-relaxed">
              Елабуга · {ELABUGA_POINTS.length} точек маршрута · История, музеи и набережная Камы
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

        <div className="bg-white rounded-2xl border border-[#E8D9B8] overflow-hidden mb-6">
          <div className="flex flex-col lg:flex-row lg:h-[600px]" style={{ minHeight: "520px" }}>
            <aside className="lg:w-72 xl:w-80 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-[#E8D9B8] overflow-y-auto lg:max-h-[600px]">
              <nav className="py-2 px-2">
                <button
                  onClick={() => selectPoint(0)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group mb-1 ${isTourInfo ? "bg-[#2D6A4F] text-white shadow-md shadow-[#2D6A4F]/20" : "hover:bg-[#F2EAD3] text-[#374151]"}`}
                >
                  <span className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${isTourInfo ? "bg-[#C9A84C] text-white" : "bg-[#F2EAD3] text-[#2D6A4F]"}`}>
                    <Icon name="Info" size={14} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-semibold leading-tight truncate ${isTourInfo ? "text-white" : "text-[#1B4332]"}`} style={{ fontFamily: "Calibri, sans-serif" }}>
                      Информация о туре
                    </p>
                    <p className={`text-[10px] mt-0.5 truncate ${isTourInfo ? "text-white/70" : "text-[#9CA3AF]"}`}>
                      {ELABUGA_POINTS.length} объектов · ~3–4 часа
                    </p>
                  </div>
                </button>

                {ELABUGA_POINTS.map((point, index) => (
                  <div key={point.id} className="relative flex">
                    <div className="flex flex-col items-center ml-[25px] mr-0 flex-shrink-0" style={{ width: "0px" }}>
                      {index < ELABUGA_POINTS.length - 1 && (
                        <div className="absolute top-[42px] w-[2px] bg-[#2D6A4F]/20" style={{ height: "calc(100% - 6px)", left: "25px" }} />
                      )}
                    </div>
                    <button
                      onClick={() => selectPoint(point.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group mb-0.5 ${selectedId === point.id ? "bg-[#2D6A4F] text-white shadow-md shadow-[#2D6A4F]/20" : "hover:bg-[#F2EAD3] text-[#374151]"}`}
                    >
                      <span className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold relative z-10 transition-colors ${selectedId === point.id ? "bg-[#2D6A4F] text-white border-2 border-white" : "bg-white text-[#2D6A4F] border-2 border-[#2D6A4F]"}`} style={{ fontFamily: "Calibri, sans-serif" }}>
                        {point.id}
                      </span>
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={point.images[0]} alt={point.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/72x72/2D6A4F/FAF7F0?text=${point.id}`; }} />
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

            <div className="flex-1 flex flex-col lg:flex-row min-h-0">
              {hasActiveDetail && (
                <div className="lg:w-[380px] xl:w-[420px] flex-shrink-0 flex flex-col min-h-0 border-b lg:border-b-0 lg:border-r border-[#E8D9B8] overflow-hidden" style={{ animation: "slideIn 0.3s ease-out" }}>
                  <div className="px-4 py-3 border-b border-[#E8D9B8] flex items-start justify-between gap-3 flex-shrink-0">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-[#C9A84C] font-semibold mb-1">
                        {isTourInfo ? "Елабуга" : `Точка ${selectedId} из ${ELABUGA_POINTS.length} · ${activeSubtitle}`}
                      </p>
                      <h2 className="font-display text-lg font-bold text-[#1B4332] leading-tight">{activeTitle}</h2>
                    </div>
                    <button onClick={closeDetail} className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F2EAD3] transition-colors text-[#6B7280] hover:text-[#1B4332]" title="Закрыть">
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
                        <button onClick={() => setCurrentImageIndex((p) => p === 0 ? activeImages.length - 1 : p - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors">
                          <Icon name="ChevronLeft" size={16} />
                        </button>
                        <button onClick={() => setCurrentImageIndex((p) => p === activeImages.length - 1 ? 0 : p + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors">
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
                      <button onClick={() => { if (prevPoint) selectPoint(prevPoint.id); else selectPoint(0); }} className="flex-1 flex items-center justify-center gap-1 px-3 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#F2EAD3] transition-colors">
                        <Icon name="ChevronLeft" size={16} /> Назад
                      </button>
                      <div className="w-px h-7 bg-[#E8D9B8]" />
                      <button onClick={() => nextPoint && selectPoint(nextPoint.id)} disabled={!nextPoint} className="flex-1 flex items-center justify-center gap-1 px-3 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#F2EAD3] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                        Вперед <Icon name="ChevronRight" size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="flex-1 relative" style={{ minHeight: "400px" }}>
                <div className="absolute top-3 left-3 z-10">
                  <button onClick={togglePanoramaMode} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-body font-semibold shadow-md transition-all ${panoramaMode ? "bg-[#2D6A4F] text-white" : "bg-white text-[#1B4332] hover:bg-[#F2EAD3]"}`}>
                    <Icon name="Layers" size={13} /> Панорамы
                  </button>
                </div>

                {panoramaMode && !showPanorama && (
                  <div className="absolute top-12 left-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-md">
                    <p className="text-xs text-[#2D6A4F]">Нажмите на карту, чтобы открыть панораму</p>
                  </div>
                )}

                {showPanorama && (
                  <button onClick={closePanorama} className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md bg-white text-[#1B4332] hover:bg-[#F2EAD3] transition-all">
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