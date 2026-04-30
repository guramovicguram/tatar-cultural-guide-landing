import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

/* ─── Types ─────────────────────────────────────────────── */
interface KremlinPoint {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  coords: [number, number];
  images: string[];
}

/* ─── Data ─────────────────────────────────────────────── */
const KREMLIN_POINTS: KremlinPoint[] = [
  {
    id: 1,
    title: "Спасская башня",
    subtitle: "Главный вход в Кремль",
    desc: "Спасская башня — главные ворота Казанский Кремль и один из самых узнаваемых символов Казань. Она была построена во второй половине XVI века после взятия города войсками Иван IV Грозный и включения Казани в состав Русского государства. С самого начала башня выполняла важную роль — через неё осуществлялся главный въезд в крепость, она служила не только парадными воротами, но и частью оборонительной системы Кремля.Первоначально Спасская башня имела более строгий и функциональный вид, соответствующий военному назначению, однако в последующие века она неоднократно перестраивалась и постепенно приобрела более декоративный облик. В её архитектуре сочетаются элементы древнерусского зодчества и более поздних стилевых решений. Высота башни достигает примерно 47 метров, благодаря чему она доминирует над входной частью Кремля и хорошо видна из разных точек города.Особое значение имеют часы, установленные на верхнем ярусе башни в XVIII веке. Их бой на протяжении долгого времени служил ориентиром для жителей Казани, а сегодня является одной из узнаваемых особенностей этого места. Через Спасскую башню проходят основные туристические маршруты, и именно с неё для многих начинается знакомство с историческим центром города.Спасская башня — это не только архитектурный памятник, но и символ важного этапа в истории Казани. Она отражает переход города в новую историческую эпоху и остаётся главным входом в его культурное и историческое пространство, соединяя прошлое и настоящее Татарстана.",
    coords: [55.796509, 49.108405],
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/0/02/%D0%A1%D0%BF%D0%B0%D1%81%D1%81%D0%BA%D0%B0%D1%8F_%D0%B1%D0%B0%D1%88%D0%BD%D1%8F_%28%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%8C%29.jpg",
      "https://tur-kazan.ru/storage/0a2b68e3-7f30-5417-9f79-e6548cfad2dc.jpg",
      "https://avatars.mds.yandex.net/get-altay/8133749/2a00000186e15b03e1183f13ac47275f8994/orig",
      "https://upload.wikimedia.org/wikipedia/commons/b/bd/%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%8C._%D0%98%D0%BB%D0%BB%D1%8E%D0%BC%D0%B8%D0%BD%D0%B0%D1%86%D0%B8%D1%8F_%D0%A1%D0%BF%D0%B0%D1%81%D1%81%D0%BA%D0%BE%D0%B9_%D0%B1%D0%B0%D1%88%D0%BD%D0%B8_%D0%9A%D1%80%D0%B5%D0%BC%D0%BB%D1%8F_%D0%B2_%D0%B4%D0%BD%D0%B8_%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F_XVI_%D1%81%D0%B0%D0%BC%D0%BC%D0%B8%D1%82%D0%B0_%D0%91%D0%A0%D0%98%D0%9A%D0%A1_%284%29.JPG",
      "https://dic.academic.ru/pictures/wiki/files/75/Kazan_alexandr.jpg",
    ],
  },
  {
    id: 2,
    title: "Мечеть Кул-Шариф",
    subtitle: "Главная мечеть Татарстана",
    desc: "Мечеть Кул Шариф — главная соборная мечеть Республики Татарстан и Казани, один из крупнейших мусульманских храмов в России и Европе. Расположена на территории Казанского кремля. Названа в честь имама Кул Шарифа, одного из предводителей обороны Казани при штурме города войсками Ивана Грозного. Мечеть вмещает до 1500 человек, а на площади перед ней могут разместиться ещё 10 000 верующих.Строительство мечети началось в 1996 году как воссоздание легендарной многоминаретной мечети столицы Казанского ханства, центра религиозного просвещения и развития наук Среднего Поволжья XVI века. Историческая мечеть была разрушена в октябре 1552 года во время штурма Казани войсками Ивана Грозного. Современное здание было построено на месте, где предположительно находилась разрушенная мечеть. Открытие мечети состоялось 24 июня 2005 года в день празднования тысячелетия Казани. Архитектурный облик мечети сочетает в себе традиции булгарского, татарского и русского зодчества. Восемь башен символизируют восемь дней создания мира, а четыре минарета высотой 58 метров видны из любой точки города. Внутреннее убранство поражает красотой: витражи, мозаика, каллиграфия, хрустальные люстры весом полторы тонны. Мечеть стала символом возрождения татарского народа и его духовных традиций.",
    coords: [55.798512, 49.105227],
    images: [
      "https://i2015.otzovik.com/2015/08/18/2343494/img/32781234.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/c/c6/%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D0%9C%D0%B5%D1%87%D0%B5%D1%82%D1%8C_%D0%9A%D1%83%D0%BB-%D0%A8%D0%B0%D1%80%D0%B8%D1%84.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/9/9d/%D0%92%D0%B5%D1%80%D1%81%D0%B8%D1%8F_%D0%B4%D0%BB%D1%8F_%D0%BF%D0%B5%D1%87%D0%B0%D1%82%D0%B8_%D0%9A%D0%BE%D0%BC%D0%BF%D0%BB%D0%B5%D0%BA%D1%81_%D0%BC%D0%B5%D1%87%D0%B5%D1%82%D0%B8_%D0%9A%D1%83%D0%BB_%D0%A8%D0%B0%D1%80%D0%B8%D1%84_-_panoramio.jpg",
      "https://s01.yapfiles.ru/files/3367317/017580a75a5a460890f517975e45fe9e.jpg",
      "https://travelask.ru/system/images/files/000/088/194/wysiwyg_jpg/10957.jpg?1486423320",
      "https://diary-culture.ru/upload/wysiwyg/c8d5a7723ce8b92ff5d94ce97123b779.jpg",
      "https://konkyrs.com/images/cms/data/gm-009.jpg",
      "https://img-fotki.yandex.ru/get/4602/51132524.7b/0_10294d_66e91732_orig.jpg",
      "http://to-kazan.ru/web/uploads/content/63ce112aa8ffe.jpg",
      "https://irecommend.ru/sites/default/files/imagecache/copyright1/user-images/1548250/tyaFoVwf5RT0C3w5dQ.jpg",
    ],
  },
  {
    id: 3,
    title: "Благовещенский собор",
    subtitle: "Православная святыня XVI века",
    desc: "Благовещенский собор — один из старейших православных храмов Казань, расположенный на территории Казанский Кремль. Он был построен в XVI веке вскоре после присоединения Казани к Русскому государству по приказу Иван IV Грозный. Собор стал первым каменным православным храмом города и на протяжении многих столетий играл важную роль в духовной жизни региона.Архитектура собора выполнена в традициях русской храмовой архитектуры с элементами псковской школы. Здание отличается строгими формами, белокаменными стенами и характерными куполами, которые создают величественный и одновременно сдержанный облик. За свою долгую историю собор неоднократно перестраивался, но сумел сохранить историческое значение и основные архитектурные черты.Внутреннее убранство собора также имеет большую культурную ценность. Здесь находились иконы, фрески и другие элементы церковного искусства, отражающие традиции православной культуры. Собор был не только религиозным центром, но и важным общественным местом, где проходили значимые события городской жизни.Благовещенский собор является символом православной культуры Казани и наглядным примером сосуществования разных религий и народов в одном городе. Сегодня он остаётся важной исторической и культурной достопримечательностью, входящей в ансамбль Казанского Кремля, и помогает лучше понять многогранную историю Татарстана.",
    coords: [55.799850, 49.106104],
    images: [
      "https://avatars.mds.yandex.net/get-altay/16480821/2a000001979d61100302bf918a54b35a7231/orig",
      "https://avatars.mds.yandex.net/i?id=ec56a66995e9c7757479e529f63eae2d50c8a6e5-16116239-images-thumbs&n=13",
      "https://tatmitropolia.ru/www/news/2023/8/14212013151_b.jpg",
      "https://a.d-cd.net/ba218ees-960.jpg",
      "https://tatmitropolia.ru/www/news/2023/8/14211953843_b.jpg",
    ],
  },
  {
    id: 4,
    title: "Президентский дворец",
    subtitle: "Резиденция Президента Татарстана",
    desc: "Президентский дворец — одно из ключевых административных зданий Казанский Кремль и официальная резиденция главы Республики Татарстан. Здание было построено в середине XIX века на месте бывшего ханского дворца, что придаёт ему особое историческое значение и символическую связь с прошлым Казани.Архитектура дворца выполнена в классическом стиле с элементами русского зодчества. Здание отличается строгой симметрией, монументальностью и торжественным обликом. Светлый фасад, колонны и декоративные элементы подчёркивают статус этого места как центра власти и управления. Несмотря на относительно более позднее строительство по сравнению с другими объектами Кремля, дворец органично вписывается в общий исторический ансамбль.Сегодня Президентский дворец выполняет важную государственную функцию — здесь проходят официальные встречи, приёмы и ключевые мероприятия республиканского уровня. Здание закрыто для свободного посещения, однако остаётся значимой частью экскурсионного маршрута по Кремлю и привлекает внимание туристов своим внешним видом и историей.Президентский дворец символизирует преемственность власти и развитие региона от времён Казанского ханства до современности. Он соединяет в себе историческое наследие и современную политическую жизнь, являясь важным элементом культурного и государственного центра Татарстана.",
    coords: [55.800878, 49.105624],
    images: [
      "https://yandex-images.clstorage.net/9UPrb7371/c25b56-WbT/ot7C0opuWeBhgijCXDDgf-DT6V9GuDyYbrNeEtqEwFuyIWRxckKSE0ppPe1V13NsQCePzQHugPEgmfj4kLd6i-yNh57KKUS_NcM1llQz5X39jqpOWuI4xXTxAkueh5gHtCIOGFVhs39jDUyfLPo9b0xy34ZOrZHMSN2yrqOGK9mF2cXnvngZ-3yVX-hxKsh_3JPdT37nJNFXkDFxh9STWNdUEwl7Sb1MaRxtvxfQIEFXRMOaFru15lWUiLSYrCz4hN7z6pxoAtl3tn_qVjD1VNSK4FtR0S_tRpQNUrTugFPCWBsyTlWJeWAeUp4X_QdgSEbrtAKwr8ZblqiEop0Y1Lf87P-aezjcS7Nx_VUvwWL6rdNCWfA21kqtF2yG9Ix83GUSEnZ0l2hNPGiqKcEBdE9w_r0ks6rVR5WVmJugBuOl2vfKq1Ma3UqrRdBONetwybLITHv4FvdRsAdSo_CzfOZ3FC1-WJN5bgdviSLEDmlQY_e7EJOh8HuzpIS_mT_0m_rg1ot_PdRomXzedzX-U9CS8n5Q-AXedZAXZ6XmhnDSQiY-QkihZFoXV6wj3TdbYF3fvRees9RmqJCdgaYA5Y7O4OW8Ww_DVJl07mst8EngntJ0ePwl60K_FUS_-69fxHsGP3NMnlJbG1a6I9gheHFP0o8vjJzCXKuWhI6gA8iOysL6kHAhwH29fNZnBNV2-4zOfHzeGetrmDpNreSTVNZ7KApFd7RTWjpDlBf-A0hwQOmnKJCK8Fa7oomAsjnjoM_y0rRyDvRXoErxexjuf9ux_m9Y2hHTSYMVZaXPgnfcVQMQYk2meHw9a4IpwChkZ1r1mzO0rvFSkI2egLM527Lq-PyPVTPXSYFV0EkfzkPei8hPdMI9_3WEIG6P1oB1_XkGLlt2vVRcLmqtMuQmXEhv_JUEvYrgQayti7-RGPa52NHVkVgi5U-8R99FMstgwZDKXUrNA8ttvhFUjO0",
      "https://megotel.ru/images/places/881/cc32b3fdf184f279.jpg",
      "https://tatarstan.ru/file/photoreport2/view_4307267_3230280.jpg",
      "https://odakgroup.com.tr/upload/gallery/gallery_2023-01-20_13-43-46.jpg",
      "https://megotel.ru/images/places/881/1e4db03c9c441d58.jpg",
    ],
  },
  {
    id: 5,
    title: "Башня Сеюмбике",
    subtitle: "Падающая башня — символ Казани",
    desc: "Башня Сююмбике — самая известная башня Казанского Кремля, являющаяся архитектурным символом города. Это сторожевая башня, имеющая ярко выраженный наклон, из-за чего её часто называют падающей. Высота башни составляет 58 метров, а отклонение шпиля от вертикали — 1,98 метра. Башня является одним из символов Казани наряду с Казанским Кремлём и мечетью Кул Шариф.Башня названа в честь последней царицы Казанского ханства Сююмбике (Сююн-бике), которая правила в XVI веке после смерти своего мужа хана Джан-Гали. Согласно легенде, Иван Грозный, захватив Казань, пожелал взять царицу в жёны. Сююмбике согласилась при условии, что за семь дней будет построена самая высокая башня в городе. Когда строительство было завершено, царица поднялась на вершину башни и бросилась вниз. Историки считают, что башня была построена в XVII–XVIII веках, уже после завоевания Казани. Точная дата строительства остаётся предметом споров. Башня является редким образцом русского шатрового зодчества. Она состоит из семи ярусов: три нижних яруса в плане квадратные, остальные четыре — восьмигранные. Наклон башни начал проявляться вскоре после постройки из-за особенностей грунта. В 1990-х годах были проведены масштабные реставрационные работы для укрепления фундамента.",
    coords: [55.800501, 49.105184],
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Kazan_Kremlin_Soyembika_Tower_08-2016_img1.jpg/960px-Kazan_Kremlin_Soyembika_Tower_08-2016_img1.jpg",
      "https://avatars.mds.yandex.net/i?id=4ca12434e208ffb3a27e7ae27531b100eeb5eba1-7011710-images-thumbs&n=13",
      "https://upload.wikimedia.org/wikipedia/commons/4/4f/%D0%91%D0%B0%D1%88%D0%BD%D1%8F_%D0%A1%D1%8E%D1%8E%D0%BC%D0%B1%D0%B8%D0%BA%D0%B5_%D0%B2_%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%81%D0%BA%D0%BE%D0%BC_%D0%9A%D1%80%D0%B5%D0%BC%D0%BB%D0%B5._%D0%9B%D0%B5%D1%82%D0%BE.jpg",
      "https://avatars.mds.yandex.net/i?id=cff52d3a53d3946824236833f8b79125_l-13215483-images-thumbs&n=13",
      "https://i.ytimg.com/vi/eqyz-9BO95s/maxresdefault.jpg",
    ],
  },
  {
    id: 6,
    title: "Эрмитаж-Казань",
    subtitle: "Выставочный центр в Манеже",
    desc: "Эрмитаж-Казань — музейно-выставочный центр, расположенный на территории Казанский Кремль. Он является филиалом одного из крупнейших музеев мира — Государственный Эрмитаж — и представляет собой уникальное культурное пространство, где жители и гости Казань могут познакомиться с произведениями искусства и историческими экспонатами мирового уровня.Центр был открыт в начале XXI века и стал важным шагом в развитии культурных связей между регионами России. Здесь регулярно проходят временные выставки, посвящённые различным эпохам, странам и направлениям искусства — от древних цивилизаций до современности. Экспозиции постоянно обновляются, благодаря чему посетители могут каждый раз открывать для себя что-то новое.Выставочные залы оборудованы с учётом современных музейных технологий, что позволяет создавать насыщенные и интерактивные экспозиции. Посетители могут не только увидеть редкие экспонаты, но и глубже понять их исторический и культурный контекст.«Эрмитаж-Казань» играет важную роль в культурной жизни города, делая мировое искусство более доступным для широкой аудитории. Он подчёркивает статус Казани как крупного культурного центра и демонстрирует, как традиции и современность могут гармонично сочетаться в одном пространстве.",
    coords: [55.798404, 49.106158],
    images: [
      "https://yastatic.net/naydex/yandex-search/mfsNf8876/1315a8RTSAz2/3XFZaa5kw_25HIcgM6YPyJijyDavhoEA9vFBM6iY1oPNLr679geVlEST5Bl1DVjfwrB3efuOLMv-tZ9Qgj1Ns_x1nR0f8Za56InHoAP2Lh1MktnzD8NQpNM0gHZIGHPWnogJLOGkMlIGVObO0Zg9qgLU1s3_jYo6e6GKsJb4jWYtBU",
      "https://avatars.mds.yandex.net/get-altay/2761244/2a00000170f7c571169b33ec1f0ae0beb7f7/L",
      "https://yastatic.net/naydex/yandex-search/mfsNf8876/1315a8RTSAz2/3XFZaa5kw_25HIcgM6YPyJijyDavhoEA9vEURti45pbtTq67Y7fgtEHjwWmwODhPZ5BCGf6b-Zv-pe8VoogI01wlnQ3f8XbZ-OnHoAP2Lh1MktnzD8NQpNM0gHZIGHPWnogJLOGkMlIGVObO0Zg9qgLU1s3_jYo6e6GKsJb4jWYtBU",
      "https://yastatic.net/naydex/yandex-search/mfsNf8876/1315a8RTSAz2/3XFZaa5kw_25HIcgM6YPyJijyDavhoEA9vFU9q3YI5btG95e48LFhGTW9GkFTUgv1wASeav7Ca471UpFIs0No0mlnQ3P8UbZCHnHoAP2Lh1MktnzD8NQpNM0gHZIGHPWnogJLOGkMlIGVObO0Zg9qgLU1s3_jYo6e6GKsJb4jWYtBU",
      "https://yastatic.net/naydex/yandex-search/mfsNf8876/1315a8RTSAz2/3XFZaa5kw_25HIcgM6YPyJijyDavhoEA9vQxZqjI41aYS65-s7JAxKGjsWwFbShPV_DHGVurSZtORYplJ9hIhvmlnS3fkYa5GLnHoAP2Lh1MktnzD8NQpNM0gHZIGHPWnogJLOGkMlIGVObO0Zg9qgLU1s3_jYo6e6GKsJb4jWYtBU",
      "https://yastatic.net/naydex/yandex-search/mfsNf8876/1315a8RTSAz2/3XFZaa5kw_25HIcgM6YPyJijyDavhoEA9vQ0M7ittoPofp47thLVMRFTwQmwPR0qJ7BiHIurXOvu9Z_Fwq0Ig-l1nR3_4QaZ-HnHoAP2Lh1MktnzD8NQpNM0gHZIGHPWnogJLOGkMlIGVObO0Zg9qgLU1s3_jYo6e6GKsJb4jWYtBU",
      "https://avatars.mds.yandex.net/get-altay/12550566/2a0000018e94c1973f8cf7dc960afb840408/XXL_height",
      "https://tatarica.org/application/files/1716/8328/0027/Ehrmitazh-Kazan_hudozhestvennoe_oruzhie.jpg",
    ],
  },
  {
    id: 7,
    title: "Тайницкая башня",
    subtitle: "Оборонительная башня у реки",
    desc: "Тайницкая башня — одна из древнейших башен Казанский Кремль, расположенная со стороны реки и игравшая важную роль в оборонительной системе крепости. Она была построена в XVI веке после присоединения Казань к Русскому государству и служила не только укреплением, но и стратегическим объектом.Название башни связано со словом «тайник» — скрытым проходом или секретным ходом. Считается, что из башни существовал потайной выход к воде, который использовался для снабжения крепости в случае осады или для незаметного перемещения. Такие элементы были характерны для оборонительных сооружений того времени и имели большое значение для выживания гарнизона.Архитектура Тайницкой башни отличается сдержанностью и функциональностью. В отличие от парадных башен, она не имеет излишнего декоративного оформления, так как её основное назначение было практическим — защита и контроль территории. Несмотря на это, башня органично вписывается в общий ансамбль Кремля и дополняет его исторический облик.Сегодня Тайницкая башня является важной частью архитектурного наследия Казани и напоминает о военном прошлом города. Она помогает лучше понять, как была устроена крепость и какие меры предпринимались для её защиты, сохраняя память о ключевых этапах истории Татарстана.",
    coords: [55.801197, 49.104212],
    images: [
      "https://avatars.mds.yandex.net/i?id=a736f47494b75f9e6c459de01da4cf10c9b69bcc-4237635-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=3a580a10be258b9744b96bdc76cd5f04a8954a6d-4884623-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=639b70474fc293b310281f74409084f55fe73cec-5293830-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/get-altay/4824927/2a000001817c49422160d33626c91d1a93a6/L",
      "https://avatars.mds.yandex.net/get-altay/16411237/2a00000199f1ed755181426eabdb3afb6cab/XXXL",
    ],
  },
  {
    id: 8,
    title: "Воскресенская башня",
    subtitle: "Северо-восточная башня",
    desc: "Воскресенская башня — одна из башен Казанский Кремль, расположенная в северо-западной части крепости и являющаяся частью его оборонительной системы. Она была построена в XVI веке в период активного укрепления Казань после присоединения города к Русскому государству.Башня получила своё название в честь расположенного рядом Воскресенского монастыря, который в прошлом играл важную роль в духовной жизни города. В отличие от главных парадных башен Кремля, Воскресенская башня имела преимущественно оборонительное значение: она контролировала подходы к крепости и обеспечивала защиту её северо-западной части.Архитектура башни отличается простотой и функциональностью. Её внешний облик сдержан и лишён излишнего декора, что характерно для оборонительных сооружений того времени. Толстые стены и продуманная конструкция обеспечивали надёжную защиту, а расположение позволяло эффективно наблюдать за окружающей территорией.Сегодня Воскресенская башня является важной частью исторического ансамбля Казанского Кремля.Она дополняет образ крепости как мощного оборонительного сооружения и помогает представить, каким был город в прошлом, сохраняя память о его военной и духовной истории.",
    coords: [55.801765627096394,49.10708099565654],
    images: [
      "https://avatars.mds.yandex.net/i?id=277ff90e36b08046cabc1cbf97939beef7809642-5100139-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=3c56653795aa72eece6aa474cd58ecc8c84adf8e-9221695-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=ef5a09c1d50cc42862c31ad6e76b61a62fb3920a-5176811-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/get-altay/16323929/2a00000198e182037eb5061546f918a2adbf/L",
      "https://avatars.mds.yandex.net/i?id=3e68c97fb9234ee2af0f4c84a52f2d976b6d8469-12774514-images-thumbs&n=13",
    ],
  },
  {
    id: 9,
    title: "Преображенская башня",
    subtitle: "Северная башня Кремля",
    desc: "Преображенская башня — одна из башен Казанский Кремль, входящая в систему оборонительных укреплений крепости. Она была построена в XVI веке в период формирования современного облика Кремля после присоединения Казань к Русскому государству.Название башни связано с Преображенским монастырём, который ранее находился на территории Кремля и играл важную роль в духовной жизни города. Как и многие другие башни, Преображенская выполняла оборонительную функцию — контролировала участок крепостной стены и защищала подступы к Кремлю.Архитектура башни отличается сдержанностью и практичностью. Её внешний вид типичен для оборонительных сооружений того времени: массивные стены, простые формы и отсутствие излишнего декоративного оформления. Такая конструкция обеспечивала надёжную защиту и устойчивость сооружения.Сегодня Преображенская башня является частью историко-архитектурного ансамбля Казанского Кремля. Она дополняет общее представление о крепости как о мощном оборонительном комплексе и помогает лучше понять устройство города в прошлом, сохраняя память о его истории и культурном наследии.",
    coords: [55.7972722235473,49.1056854443621],
    images: [
      "https://avatars.mds.yandex.net/i?id=3cfd9d4b09b6a7915acf2cebccb46c1287f52bca-4714431-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=fc8a3ad3cda2dff8df5610c6651ec04297e00a7e-5854625-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=a30eb511b35543f71b05b31ff4dbc1c889bae90d-5452446-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/get-altay/15031174/2a00000198e17c6dc4adee48aea76e19ad8d/L",
      "https://avatars.mds.yandex.net/get-altay/6382111/2a00000184696308358c95fae39e7c9bb3a0/L",
    ],
  },
  {
    id: 10,
    title: "Спасо-Преображенский Казанский мужской монастырь",
    subtitle: "Православный монастырь XVI века",
    desc: "Спасо-Преображенский монастырь — один из древнейших православных монастырей Казань, расположенный на территории Казанский Кремль. Он был основан в XVI веке вскоре после присоединения города к Русскому государству по указу Иван IV Грозный и стал важным духовным и культурным центром региона.Монастырь играл значительную роль в распространении православия и развитии образования в Казани. Здесь велась просветительская деятельность, переписывались книги, формировалась религиозная и культурная среда города. В разные периоды на территории монастыря находились храмы, хозяйственные постройки и жилые корпуса для монахов, создавая полноценный монастырский комплекс.Архитектурный облик монастыря формировался на протяжении нескольких столетий. Со временем многие здания были перестроены или утрачены, однако сохранившиеся элементы позволяют представить масштаб и значение этого места. Несмотря на изменения, монастырь остаётся важной частью исторического наследия Казани.Спасо-Преображенский монастырь символизирует духовную жизнь города и отражает важный этап его истории. Он является неотъемлемой частью ансамбля Казанского Кремля и помогает понять, как формировалась культурная и религиозная традиция Татарстана.",
    coords: [55.79696096834518,49.10668322611564],
    images: [
      "https://avatars.mds.yandex.net/i?id=201a7078a3c2fa5ec4d370ec9a6faa4317254f99-4034137-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=460478572963b55600e62ba67141dd37ed57d89f-9838067-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=231de324ead09c65953d9c582f27129dea833ec8-8404489-images-thumbs&n=13",
      "https://i2023.otzovik.com/2023/02/16/14338949/img/828524_79802880.jpeg",
      "https://avatars.mds.yandex.net/get-altay/19082209/2a0000019b7e43e190e53fabde331c60b140/XXL_height",
    ],
  },
  {
    id: 11,
    title: "Манеж",
    subtitle: "Выставочное и культурное пространство",
    desc: "Манеж — это выставочное и культурное пространство, расположенное на территории Казанского кремля, одного из главных историко-архитектурных комплексов города. Здание манежа было создано как часть ансамбля кремля и сегодня используется для проведения временных выставок, культурных мероприятий, форумов и художественных экспозиций.Архитектура манежа выдержана в стиле, гармонирующем с окружающими постройками кремля: он не выбивается из общего исторического облика, но при этом является более современным по своей функциональной части. Благодаря этому он органично соединяет историческое наследие и современную культурную жизнь города.Внутри манежа регулярно проходят выставки живописи, фотографии, декоративно-прикладного искусства, а также крупные культурные проекты, связанные с историей Татарстана и России. Пространство часто используется для международных и региональных мероприятий, что делает его важной площадкой культурного обмена.Манеж находится рядом с другими ключевыми объектами Казанского кремля, включая мечеть Кул-Шариф и Благовещенский собор, поэтому его посещение часто входит в маршрут туристов, знакомящихся с историческим центром Казани.",
    coords: [55.797183144714914,49.10730386862434],
    images: [
      "https://avatars.mds.yandex.net/i?id=15f6e5c167d20dd3b104b1d038d4bd9f894df604-12168040-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=829c59316df27d74356ac287a64e404e98010740-10253687-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=abdfac06af987ad81aa9d4b10c3ad9e29a5c8dd1-16113796-images-thumbs&n=13",
      "https://avatars.mds.yandex.net/i?id=c758c73e0b4b7745ae2ab612977997a4_l-5734572-images-thumbs&n=13",
      "https://diary-culture.ru/upload/blogs/4b30bb342c6b21bd3d203dd7a290d2d6.jpg",
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

/* ─── Tour info item (id=0 pseudo-point) ─────────────── */
const TOUR_INFO = {
  title: "Информация о туре",
  subtitle: "Казанский кремль",
  desc: "Казанский Кремль — древнейшая часть Казани, комплекс архитектурных, исторических и археологических памятников, раскрывающих многовековую историю города. Объект Всемирного наследия ЮНЕСКО с 2000 года. Маршрут включает 10 ключевых объектов на территории кремля. Примерное время прохождения — 2 часа пешком. Рекомендуем удобную обувь и головной убор в тёплое время года.",
  images: [
    "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=900&q=85",
    "https://images.unsplash.com/photo-1580137197581-df2bb346a786?w=900&q=85",
    "https://images.unsplash.com/photo-1565373677928-80834e3c326c?w=900&q=85",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
    "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900&q=85",
  ],
};

/* ─── Hand-crafted route (walking path between points) ─── */
const KREMLIN_ROUTE_PATH: [number, number][] = [
  [55.796509, 49.108405],
  [55.796696, 49.108057],
  [55.796833, 49.107809 ],
  [55.796984, 49.107851],
  [55.797859, 49.106827],
  [55.797686, 49.106105],
  [55.798375, 49.105122],
  [55.79873181902479,49.105363285039715],
  [55.79893622678421,49.10495758886439],
  [55.79921724882857,49.10470009679897],
  [55.79942103985217,49.10553742020693],
  [55.799699036689034,49.10621870129672],
  [55.799696014995014,49.1067014989194],
  [55.80007017005078,49.10656194751855],
  [55.799940238238364,49.105290580445505],
  [55.80028352780154,49.10544141254747],
  [55.800416041513564,49.10637643639273],
  [55.80075144188522,49.1063496143026],
  [55.80083604692613,49.10604920689292],
  [55.80083604692613,49.10604920689292],
  [55.80042510642662,49.105341103713],
  [55.80035479236377,49.104873758663416],
  [55.800270186272726,49.104632359852076],
  [55.7985594122769,49.106395226066546],
  [55.7984445843632,49.105949979370074],
  [55.79863797854823,49.10641131932065],
  [55.800430062576766,49.104642850935505],
  [55.80115534184653,49.104240459494015],
  [55.801479619419574,49.104936547117646],
  [55.80164882613885,49.105934328871186],
  [55.80166091230483,49.107130594091835],
  [55.80069754483757,49.10746887350979],
  [55.80069754483757,49.10746887350979],
  [55.79901146995454,49.10802628244436],
  [55.79897218721715,49.10775806154285],
  [55.79917162224125,49.10760249341999],
  [55.798969165466474,49.10602535451924],
  [55.79808378237509,49.10698558534657],
  [55.79782390500197,49.1068997546581],
  [55.79749452303801,49.10592879499471],
  [55.79724672925767,49.10573567594563],
  [55.79724370737254,49.106572525158285],
  [55.796941517669026,49.10669054235494],
  [55.79705030623358,49.107296721592306],
  [55.79718629151009,49.10714115346944],
];

/* ─── Component ─────────────────────────────────────────── */
export default function KazanKremlin() {
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

  const selectedPoint = selectedId !== null && selectedId > 0 ? KREMLIN_POINTS.find((p) => p.id === selectedId) ?? null : null;
  const isTourInfo = selectedId === 0;
  const prevPoint = selectedId !== null && selectedId > 1 ? KREMLIN_POINTS.find((p) => p.id === selectedId - 1) : null;
  const nextPoint = selectedId !== null && selectedId >= 0 ? KREMLIN_POINTS.find((p) => p.id === (selectedId === 0 ? 1 : selectedId + 1)) : null;

  /* ── Copy URL ── */
  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  /* ── Placemark styles ── */
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

  /* ── Pan map ── */
  const panMapTo = useCallback((coords: [number, number]) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo(coords, { flying: true, duration: 600 });
    }
  }, []);

  /* ── Select point ── */
  const selectPoint = useCallback(
    (id: number) => {
      setSelectedId(id);
      setCurrentImageIndex(0);
      if (id > 0) {
        const point = KREMLIN_POINTS.find((p) => p.id === id);
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

  /* ── Close detail ── */
  const closeDetail = useCallback(() => {
    setSelectedId(null);
    setCurrentImageIndex(0);
    updatePlacemarkStyles(null);
  }, [updatePlacemarkStyles]);

  /* ── Close panorama ── */
  const closePanorama = useCallback(() => {
    if (panoramaPlayerRef.current) {
      panoramaPlayerRef.current.destroy();
      panoramaPlayerRef.current = null;
    }
    setShowPanorama(false);
  }, []);

  /* ── Open panorama at coords ── */
  const openPanoramaAt = useCallback((coords: [number, number]) => {
    if (!panoramaContainerRef.current || !window.ymaps) return;
    window.ymaps.panorama
      .locate(coords, { layer: "yandex#panorama" })
      .then((players: any[]) => {
        if (!players || players.length === 0) {
          return window.ymaps.panorama.locate([55.7984, 49.1053], {
            layer: "yandex#panorama",
          });
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
          {
            controls: [
              "arrowsControl",
              "exitControl",
              "fullscreenControl",
              "zoomControl",
            ],
          }
        );
        panoramaPlayerRef.current = player;
        setShowPanorama(true);
      })
      .catch(() => {});
  }, []);

  /* ── Toggle panorama mode ── */
  const togglePanoramaMode = useCallback(() => {
    setPanoramaMode((prev) => {
      const next = !prev;
      panoramaModeRef.current = next;
      if (!next) closePanorama();
      return next;
    });
  }, [closePanorama]);

  /* ── Init Yandex Map ── */
  const initMap = useCallback(() => {
    if (!mapContainerRef.current || !window.ymaps) return;

    window.ymaps.ready(() => {
      if (!mapContainerRef.current) return;

      const map = new window.ymaps.Map(
        mapContainerRef.current,
        {
          center: [55.7984, 49.1045],
          zoom: 17,
          controls: ["zoomControl", "fullscreenControl", "typeSelector"],
        },
        { suppressMapOpenBlock: true }
      );

      mapInstanceRef.current = map;
      placemarkRefs.current = [];

      const routeOutline = new window.ymaps.Polyline(
        KREMLIN_ROUTE_PATH,
        {
          hintContent: "Маршрут прохождения",
        },
        {
          strokeColor: "#FFFFFF",
          strokeWidth: 8,
          strokeOpacity: 0.95,
          geodesic: false,
        }
      );
      map.geoObjects.add(routeOutline);

      const routeLine = new window.ymaps.Polyline(
        KREMLIN_ROUTE_PATH,
        {
          hintContent: "Маршрут прохождения",
        },
        {
          strokeColor: "#2D6A4F",
          strokeWidth: 4,
          strokeOpacity: 0.9,
          geodesic: false,
        }
      );
      map.geoObjects.add(routeLine);

      KREMLIN_POINTS.forEach((point) => {
        const pm = new window.ymaps.Placemark(
          point.coords,
          {
            hintContent: `${point.id}. ${point.title}`,
            iconContent: String(point.id),
          },
          getPlacemarkOptions(false)
        );
        pm.events.add("click", () => selectPoint(point.id));
        map.geoObjects.add(pm);
        placemarkRefs.current.push(pm);
      });

      /* Click on map in panorama mode → open 360 */
      map.events.add("click", (e: any) => {
        if (panoramaModeRef.current) {
          const coords = e.get("coords");
          openPanoramaAt(coords);
        }
      });

      setMapReady(true);
    });
  }, [selectPoint, openPanoramaAt, getPlacemarkOptions]);

  /* ── Load Yandex Maps script ── */
  useEffect(() => {
    if (window.ymaps) {
      initMap();
      return;
    }

    const existing = document.querySelector(
      'script[src*="api-maps.yandex.ru"]'
    );
    if (existing) {
      existing.addEventListener("load", initMap);
      return () => existing.removeEventListener("load", initMap);
    }

    const script = document.createElement("script");
    script.src =
      "https://api-maps.yandex.ru/2.1/?lang=ru_RU&load=package.full";
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        try { mapInstanceRef.current.destroy(); } catch (_) {}
        mapInstanceRef.current = null;
      }
      if (panoramaPlayerRef.current) {
        try { panoramaPlayerRef.current.destroy(); } catch (_) {}
        panoramaPlayerRef.current = null;
      }
    };
  }, [initMap]);

  /* ── Sync placemarks on select ── */
  useEffect(() => {
    if (mapReady) updatePlacemarkStyles(selectedId);
  }, [selectedId, mapReady, updatePlacemarkStyles]);

  /* ── Active detail data (tour info or point) ── */
  const activeTitle = isTourInfo ? TOUR_INFO.title : selectedPoint?.title ?? "";
  const activeSubtitle = isTourInfo ? TOUR_INFO.subtitle : selectedPoint?.subtitle ?? "";
  const activeDesc = isTourInfo ? TOUR_INFO.desc : selectedPoint?.desc ?? "";
  const activeImages = isTourInfo ? TOUR_INFO.images : selectedPoint?.images ?? [];
  const hasActiveDetail = selectedId !== null;

  /* ─── Render ─────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#FAF7F0] font-body flex flex-col">
      {/* ═══ BLOCK 1: Header ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E8D9B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 group"
          >
            <img src="/logo.jpg" alt="Культура Татарстана" className="h-12 w-12 object-contain" />
            <span className="font-display text-lg font-semibold text-[#1B4332] hidden sm:block group-hover:text-[#2D6A4F] transition-colors">
              Культура Татарстана
            </span>
          </button>
          <div className="flex items-center gap-1">
            <button onClick={() => navigate("/")} className="hidden md:flex items-center px-4 py-2 rounded-xl font-body font-medium text-sm text-[#1B4332] hover:bg-[#F2EAD3] hover:text-[#2D6A4F] transition-colors">
              Главная
            </button>
            <button onClick={() => navigate("/kazan")} className="hidden md:flex items-center px-4 py-2 rounded-xl font-body font-medium text-sm text-[#1B4332] hover:bg-[#F2EAD3] hover:text-[#2D6A4F] transition-colors">
              Маршруты Казани
            </button>
          </div>
        </div>
      </nav>

      {/* ═══ PAGE CONTENT ═══ */}
      <div className="pt-20 pb-6 max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1">
        {/* ═══ BLOCK 2: Breadcrumb ═══ */}
        <div className="flex items-center gap-2 text-sm font-body text-[#9CA3AF] mb-5 flex-wrap">
          <button onClick={() => navigate("/")} className="hover:text-[#2D6A4F] transition-colors">Культура Татарстана</button>
          <Icon name="ChevronRight" size={14} className="text-[#D1D5DB]" />
          <button onClick={() => navigate("/kazan")} className="hover:text-[#2D6A4F] transition-colors">Казань</button>
          <Icon name="ChevronRight" size={14} className="text-[#D1D5DB]" />
          <span className="text-[#1B4332] font-semibold">Казанский кремль</span>
        </div>

        {/* ═══ BLOCK 3: Introduction (bigger) ═══ */}
        <div className="bg-white rounded-2xl border border-[#E8D9B8] p-5 sm:p-6 mb-6 flex flex-col sm:flex-row items-start gap-5">
          <img
            src={KREMLIN_POINTS[0].images[0]}
            alt="Казанский Кремль"
            className="w-full sm:w-56 h-40 sm:h-40 rounded-xl object-cover flex-shrink-0"
            onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/400x300/2D6A4F/FAF7F0?text=Кремль"; }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-body text-[#C9A84C] font-semibold mb-1">Введение</p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1B4332] leading-tight">
              Путешествие по Казанскому кремлю
            </h1>
            <p className="text-sm font-body text-[#6B7280] mt-2 leading-relaxed">
              Казань · 11 точек маршрута · Объект Всемирного наследия ЮНЕСКО
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

        {/* ═══ BLOCK 4: Map + List + Detail ═══ */}
        <div className="bg-white rounded-2xl border border-[#E8D9B8] overflow-hidden mb-6">
          <div className="flex flex-col lg:flex-row lg:h-[600px]" style={{ minHeight: "520px" }}>
            {/* ── Left: Object list with timeline ── */}
            <aside className="lg:w-72 xl:w-80 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-[#E8D9B8] overflow-y-auto lg:max-h-[600px]">
              <nav className="py-2 px-2">
                {/* Tour info item (not numbered) */}
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
                      11 объектов · ~2 часа
                    </p>
                  </div>
                </button>

                {/* Numbered points with connecting line */}
                {KREMLIN_POINTS.map((point, index) => (
                  <div key={point.id} className="relative flex">
                    {/* Vertical timeline line */}
                    <div className="flex flex-col items-center ml-[25px] mr-0 flex-shrink-0" style={{ width: "0px" }}>
                      {index < KREMLIN_POINTS.length - 1 && (
                        <div className="absolute top-[42px] w-[2px] bg-[#2D6A4F]/20" style={{ height: "calc(100% - 6px)", left: "25px" }} />
                      )}
                    </div>
                    <button
                      onClick={() => selectPoint(point.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group mb-0.5
                        ${selectedId === point.id ? "bg-[#2D6A4F] text-white shadow-md shadow-[#2D6A4F]/20" : "hover:bg-[#F2EAD3] text-[#374151]"}`}
                    >
                      {/* White circle with green border */}
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

            {/* ── Center/Right: Detail + Map ── */}
            <div className="flex-1 flex flex-col lg:flex-row min-h-0">
              {/* Detail panel (appears when something selected) */}
              {hasActiveDetail && (
                <div className="lg:w-[380px] xl:w-[420px] flex-shrink-0 flex flex-col min-h-0 border-b lg:border-b-0 lg:border-r border-[#E8D9B8] overflow-hidden" style={{ animation: "slideIn 0.3s ease-out" }}>
                  {/* Header: title + close */}
                  <div className="px-4 py-3 border-b border-[#E8D9B8] flex items-start justify-between gap-3 flex-shrink-0">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-[#C9A84C] font-semibold mb-1">
                        {isTourInfo ? "Казанский кремль" : `Точка ${selectedId} из ${KREMLIN_POINTS.length} · ${activeSubtitle}`}
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

                  {/* Image gallery */}
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

                  {/* Description (scrollable) */}
                  <div className="flex-1 min-h-0 overflow-y-auto p-4">
                    <p className="text-sm text-[#4B5563] leading-relaxed">
                      {activeDesc}
                    </p>
                  </div>

                  {/* Prev / Next */}
                  {!isTourInfo && (
                    <div className="flex-shrink-0 flex items-center border-t border-[#E8D9B8]">
                      <button
                        onClick={() => {
                          if (prevPoint) selectPoint(prevPoint.id);
                          else selectPoint(0);
                        }}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#F2EAD3] transition-colors"
                      >
                        <Icon name="ChevronLeft" size={16} />
                        Назад
                      </button>
                      <div className="w-px h-7 bg-[#E8D9B8]" />
                      <button
                        onClick={() => nextPoint && selectPoint(nextPoint.id)}
                        disabled={!nextPoint}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#F2EAD3] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        Вперед
                        <Icon name="ChevronRight" size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Map section */}
              <div className="flex-1 relative" style={{ minHeight: "400px" }}>
                {/* Panorama layer toggle */}
                <div className="absolute top-3 left-3 z-10">
                  <button
                    onClick={togglePanoramaMode}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-body font-semibold shadow-md transition-all
                      ${panoramaMode ? "bg-[#2D6A4F] text-white" : "bg-white text-[#1B4332] hover:bg-[#F2EAD3]"}`}
                  >
                    <Icon name="Layers" size={13} />
                    Панорамы
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
                    <Icon name="Map" size={13} />
                    Вернуться к карте
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

      {/* ═══ BLOCK 5: Competition disclaimer ═══ */}
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
