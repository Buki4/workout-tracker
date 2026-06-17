
var Storage = {
  get: function(key, def) {
    try {
      var val = localStorage.getItem(key);
      return val ? JSON.parse(val) : def;
    } catch(e) { return def; }
  },
  set: function(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
  },
  getStr: function(key, def) {
    try { return localStorage.getItem(key) || def; } catch(e) { return def; }
  },
  setStr: function(key, val) {
    try { localStorage.setItem(key, val); } catch(e) {}
  },
  remove: function(key) {
    try { localStorage.removeItem(key); } catch(e) {}
  }
};

var AppState = {
  userPrograms: [],
  activeProgId: null,
  P: null,
  curMonth: null,
  curWorkout: null,
  curWeek: null,
  wState: {}
};

// ─────────────────────────────────────────
// PROGRAM DATA
// ─────────────────────────────────────────
const TEMPLATES = [
  {
    id: "prog_default",
    name: "Базовая программа (С гирями/гантелями)",
    days: 3,
    location: "home",
    equipment: ["dumbbells"],
    focus: "hypertrophy",
    desc: "Классическая программа на 4 месяца для плавного набора формы. Потребуются гантели или гири.",
    months: [
    {
      id:"m1", title:"Месяц 1", subtitle:"Фулбоди — Адаптация",
      desc:"Плавная работа без отказов. Исключаем полное разгибание в локтях и коленях. Жилет не используется — избегаем лишней осевой нагрузки на суставы.",
      color:"#6C63FF", dark:"#4f47cc", weeks:"1–4",
      workouts:[
        {
          id:"m1a", label:"Фулбоди А", tag:"А¹", sub:"Гантели и статика",
          warm:"Суставная гимнастика 5 мин: круги плечами, локтями, запястьями, коленями, тазом",
          cool:"Растяжка 5 мин: квадрицепс, грудь, плечи",
          exs:[
            {id:"m1a1",name:"Кубковые приседания с гантелей",note:"Без полного разгибания коленей",
              sets:[{r:"12–15"},{r:"12–15"},{r:"12–15"}]},
            {id:"m1a2",name:"Жим гантелей лёжа на полу (Floor Press)",note:"Пол ограничивает амплитуду, защищая локоть",
              sets:[{r:"12–15"},{r:"12–15"},{r:"12–15"}]},
            {id:"m1a3",name:"Тяга гантели в наклоне с опорой на скамью",note:"На каждую руку",
              sets:[{r:"12–15/р"},{r:"12–15/р"},{r:"12–15/р"}]},
            {id:"m1a4",name:"Ягодичный мостик",note:"Можно положить блин на таз",
              sets:[{r:"15–20"},{r:"15–20"},{r:"15–20"}]},
            {id:"m1a5",name:"Классическая планка",note:"Не прогибать поясницу",nw:1,
              sets:[{r:"45–60 сек"},{r:"45–60 сек"},{r:"45–60 сек"}]}
          ]
        },
        {
          id:"m1b", label:"Фулбоди Б", tag:"А²", sub:"Штанга и база",
          warm:"Суставная гимнастика 5 мин + лёгкие выпады на месте",
          cool:"Растяжка 5 мин: задняя поверхность бедра, плечи, широчайшие",
          exs:[
            {id:"m1b1",name:"Румынская тяга",note:"С EZ-грифом или лёгкой штангой",
              sets:[{r:"12–15"},{r:"12–15"},{r:"12–15"}]},
            {id:"m1b2",name:"Отжимания от скамьи",note:"Девушке — от спинки скамьи или с колен",nw:1,
              sets:[{r:"10–12"},{r:"10–12"},{r:"10–12"}]},
            {id:"m1b3",name:"Подтягивания (с резинкой) или тяга штанги в наклоне",note:"",
              sets:[{r:"10–12"},{r:"10–12"},{r:"10–12"}]},
            {id:"m1b4",name:"Жим гантелей сидя (плечи)",note:"",
              sets:[{r:"12–15"},{r:"12–15"},{r:"12–15"}]},
            {id:"m1b5",name:"Выпады назад",note:"На каждую ногу",
              sets:[{r:"10–12/н"},{r:"10–12/н"},{r:"10–12/н"}]}
          ]
        },
        {
          id:"m1c", label:"Фулбоди В", tag:"А³", sub:"Лёгкая закачка и канат",
          warm:"Суставная гимнастика + кошка-корова, ходьба на месте 5 мин",
          cool:"Полная растяжка 5 мин, акцент на бёдра и плечи",
          exs:[
            {id:"m1c1",name:"Скручивания на пресс",note:"На коврике",nw:1,
              sets:[{r:"15–20"},{r:"15–20"},{r:"15–20"}]},
            {id:"m1c2",name:"Подъём на носки стоя (с гантелями)",note:"",
              sets:[{r:"15–20"},{r:"15–20"},{r:"15–20"}]},
            {id:"m1c3",name:"Сгибания рук молотковым хватом",note:"Нейтральный хват бережёт локоть, укрепляет предплечья",
              sets:[{r:"15"},{r:"15"},{r:"15"}]},
            {id:"m1c4",name:"Разгибания рук из-за головы с одной гантелей",note:"",
              sets:[{r:"15"},{r:"15"},{r:"15"}]},
            {id:"m1c5",name:"Канат — попеременные волны",note:"Мягкий финишер для кровообращения в связках плечевого пояса",nw:1,
              sets:[{r:"30 сек / 30 отд"},{r:"30 сек / 30 отд"},{r:"30 сек / 30 отд"}]}
          ]
        }
      ]
    },
    {
      id:"m2", title:"Месяц 2", subtitle:"Сплит — Базовая гипертрофия",
      desc:"Переход к классической технике, увеличение рабочих весов, плавное подключение жилета для микропрогрессии.",
      color:"#F97316", dark:"#c75c0a", weeks:"5–8",
      workouts:[
        {
          id:"m2a", label:"Грудь / Трицепс", tag:"А¹", sub:"Грудь / Трицепс",
          warm:"5 мин суставная гимнастика + 2 разминочных подхода к жиму",
          cool:"Растяжка груди и трицепса 5 мин",
          exs:[
            {id:"m2a1",name:"Жим штанги лёжа на скамье",note:"",
              sets:[{r:"8–10"},{r:"8–10"},{r:"8–10"},{r:"8–10"}]},
            {id:"m2a2",name:"Жим гантелей лёжа под углом / Разводка",note:"",
              sets:[{r:"10–12"},{r:"10–12"},{r:"10–12"}]},
            {id:"m2a3",name:"Отжимания на брусьях в жилете",note:"Начать с 5 кг. Девушке — без жилета, с резинкой",
              sets:[{r:"8–10"},{r:"8–10"},{r:"8–10"}]},
            {id:"m2a4",name:"Французский жим с EZ-грифом лёжа",note:"",
              sets:[{r:"10–12"},{r:"10–12"},{r:"10–12"}]},
            {id:"m2a5",name:"Отжимания от пола узким хватом",note:"",nw:1,
              sets:[{r:"макс"},{r:"макс"}]}
          ]
        },
        {
          id:"m2b", label:"Ноги / Плечи", tag:"А²", sub:"Ноги / Плечи",
          warm:"5 мин + активация ягодиц, мобилизация бёдер",
          cool:"Растяжка ног и плеч 5 мин",
          exs:[
            {id:"m2b1",name:"Приседания со штангой",note:"",
              sets:[{r:"8–10"},{r:"8–10"},{r:"8–10"},{r:"8–10"}]},
            {id:"m2b2",name:"Выпады в движении с гантелями",note:"На каждую ногу",
              sets:[{r:"10–12/н"},{r:"10–12/н"},{r:"10–12/н"}]},
            {id:"m2b3",name:"Армейский жим стоя",note:"",
              sets:[{r:"8–10"},{r:"8–10"},{r:"8–10"},{r:"8–10"}]},
            {id:"m2b4",name:"Махи гантелями в стороны стоя",note:"",
              sets:[{r:"12–15"},{r:"12–15"},{r:"12–15"}]},
            {id:"m2b5",name:"Румынская тяга со штангой",note:"",
              sets:[{r:"10"},{r:"10"},{r:"10"}]},
            {id:"m2b6",name:"Канат — двойные волны",note:"Финальное добивание дельт",nw:1,
              sets:[{r:"20 сек / 40 отд"},{r:"20 сек / 40 отд"},{r:"20 сек / 40 отд"},{r:"20 сек / 40 отд"}]}
          ]
        },
        {
          id:"m2c", label:"Спина / Бицепс", tag:"А³", sub:"Спина / Бицепс",
          warm:"5 мин + активация верха спины, ротаторов плеча",
          cool:"Растяжка спины и бицепса 5 мин",
          exs:[
            {id:"m2c1",name:"Подтягивания на турнике в жилете (2–5 кг)",note:"Широкий хват. Девушке — с резинкой",
              sets:[{r:"8–10"},{r:"8–10"},{r:"8–10"},{r:"8–10"}]},
            {id:"m2c2",name:"Тяга штанги в наклоне",note:"",
              sets:[{r:"8–10"},{r:"8–10"},{r:"8–10"},{r:"8–10"}]},
            {id:"m2c3",name:"Пулловер с одной гантелей лёжа поперёк скамьи",note:"",
              sets:[{r:"12"},{r:"12"},{r:"12"}]},
            {id:"m2c4",name:"Подъём EZ-грифа на бицепс стоя",note:"",
              sets:[{r:"10–12"},{r:"10–12"},{r:"10–12"}]},
            {id:"m2c5",name:"Сгибание рук с гантелями с супинацией",note:"",
              sets:[{r:"10–12"},{r:"10–12"},{r:"10–12"}]}
          ]
        }
      ]
    },
    {
      id:"m3", title:"Месяц 3", subtitle:"Интенсивность — Суперсеты",
      desc:"Повышение плотности за счёт пар упражнений. Отдых 2 мин только после завершения обоих движений. Лёгкий жилет на протяжении всего суперсета.",
      color:"#10B981", dark:"#0a8c60", weeks:"9–12",
      workouts:[
        {
          id:"m3a", label:"Грудь / Трицепс", tag:"А¹", sub:"Грудь / Трицепс · Суперсеты",
          warm:"5 мин + 2 разминочных подхода к жиму",
          cool:"Растяжка 5 мин",
          exs:[
            {id:"m3a1",name:"Жим штанги лёжа",note:"Суперсет 1 (4 круга). Сразу после — разводка, без отдыха",ss:"Суперсет 1",
              sets:[{r:"10"},{r:"10"},{r:"10"},{r:"10"}]},
            {id:"m3a2",name:"Разводка гантелей",note:"Отдых 2 мин после пары",ss:"Суперсет 1",
              sets:[{r:"12"},{r:"12"},{r:"12"},{r:"12"}]},
            {id:"m3a3",name:"Отжимания на брусьях в жилете (5–7 кг)",note:"Суперсет 2 (3 круга)",ss:"Суперсет 2",
              sets:[{r:"10"},{r:"10"},{r:"10"}]},
            {id:"m3a4",name:"Отжимания от пола",note:"Максимум. Сразу после брусьев",ss:"Суперсет 2",nw:1,
              sets:[{r:"макс"},{r:"макс"},{r:"макс"}]},
            {id:"m3a5",name:"Французский жим",note:"Суперсет 3 (3 круга)",ss:"Суперсет 3",
              sets:[{r:"10"},{r:"10"},{r:"10"}]},
            {id:"m3a6",name:"Разгибание руки с гантелей в наклоне",note:"",ss:"Суперсет 3",
              sets:[{r:"12"},{r:"12"},{r:"12"}]}
          ]
        },
        {
          id:"m3b", label:"Ноги / Плечи", tag:"А²", sub:"Ноги / Плечи · Суперсеты",
          warm:"5 мин + активация ягодиц и мобилизация бёдер",
          cool:"Растяжка ног и плеч 5 мин",
          exs:[
            {id:"m3b1",name:"Приседания со штангой",note:"Суперсет 1 (4 круга)",ss:"Суперсет 1",
              sets:[{r:"10"},{r:"10"},{r:"10"},{r:"10"}]},
            {id:"m3b2",name:"Кубковые приседания",note:"Сразу после штанги",ss:"Суперсет 1",
              sets:[{r:"12"},{r:"12"},{r:"12"},{r:"12"}]},
            {id:"m3b3",name:"Жим гантелей сидя",note:"Суперсет 2 (4 круга)",ss:"Суперсет 2",
              sets:[{r:"10"},{r:"10"},{r:"10"},{r:"10"}]},
            {id:"m3b4",name:"Махи гантелями в стороны",note:"",ss:"Суперсет 2",
              sets:[{r:"12"},{r:"12"},{r:"12"},{r:"12"}]},
            {id:"m3b5",name:"Выпады с гантелями в жилете (5–7 кг)",note:"Суперсет 3 (3 круга)",ss:"Суперсет 3",
              sets:[{r:"10/н"},{r:"10/н"},{r:"10/н"}]},
            {id:"m3b6",name:"Подъём на носки",note:"",ss:"Суперсет 3",
              sets:[{r:"20"},{r:"20"},{r:"20"}]}
          ]
        },
        {
          id:"m3c", label:"Спина / Бицепс", tag:"А³", sub:"Спина / Бицепс · Суперсеты",
          warm:"5 мин + активация верха спины",
          cool:"Растяжка 5 мин",
          exs:[
            {id:"m3c1",name:"Подтягивания на турнике",note:"Суперсет 1 (4 круга)",ss:"Суперсет 1",
              sets:[{r:"8–10"},{r:"8–10"},{r:"8–10"},{r:"8–10"}]},
            {id:"m3c2",name:"Пулловер с гантелей",note:"",ss:"Суперсет 1",
              sets:[{r:"12"},{r:"12"},{r:"12"},{r:"12"}]},
            {id:"m3c3",name:"Тяга штанги в наклоне",note:"Суперсет 2 (4 круга)",ss:"Суперсет 2",
              sets:[{r:"10"},{r:"10"},{r:"10"},{r:"10"}]},
            {id:"m3c4",name:"Тяга гантели одной рукой",note:"",ss:"Суперсет 2",
              sets:[{r:"10/р"},{r:"10/р"},{r:"10/р"},{r:"10/р"}]},
            {id:"m3c5",name:"Подъём EZ-грифа на бицепс",note:"Суперсет 3 (3 круга)",ss:"Суперсет 3",
              sets:[{r:"10"},{r:"10"},{r:"10"}]},
            {id:"m3c6",name:"Молотки с гантелями",note:"",ss:"Суперсет 3",
              sets:[{r:"10"},{r:"10"},{r:"10"}]},
            {id:"m3c7",name:"Канат — Табата",note:"8 раундов x 20 сек работы / 10 сек отдыха = 4 минуты",nw:1,
              sets:[{r:"8 раундов"}]}
          ]
        }
      ]
    },
    {
      id:"m4", title:"Месяц 4", subtitle:"Силовой цикл — Мощь",
      desc:"Максимальный рост силы в базовых упражнениях. Жилет грузится весом для тяжёлой низкоповторной работы. Отдых 2.5–3 мин. Канат переносится в субботний HIIT.",
      color:"#EF4444", dark:"#b91c1c", weeks:"13–16",
      workouts:[
        {
          id:"m4a", label:"Грудь / Трицепс", tag:"А¹", sub:"Грудь / Трицепс · Сила",
          warm:"5 мин + 2–3 разминочных подхода к жиму",
          cool:"Растяжка груди и трицепса 5 мин",
          exs:[
            {id:"m4a1",name:"Жим штанги лёжа",note:"Тяжёлый рабочий вес штанги",
              sets:[{r:"5–6"},{r:"5–6"},{r:"5–6"},{r:"5–6"},{r:"5–6"}]},
            {id:"m4a2",name:"Отжимания на брусьях в тяжёлом жилете",note:"Подбирайте значительный вес жилета под диапазон",
              sets:[{r:"6–8"},{r:"6–8"},{r:"6–8"},{r:"6–8"}]},
            {id:"m4a3",name:"Жим гантелей лёжа на полу",note:"",
              sets:[{r:"8"},{r:"8"},{r:"8"}]},
            {id:"m4a4",name:"Французский жим (EZ-гриф)",note:"",
              sets:[{r:"8"},{r:"8"},{r:"8"},{r:"8"}]}
          ]
        },
        {
          id:"m4b", label:"Ноги / Плечи", tag:"А²", sub:"Ноги / Плечи · Сила",
          warm:"5 мин + мобилизация бёдер + 2–3 разминочных приседа",
          cool:"Растяжка ног и плеч 5 мин",
          exs:[
            {id:"m4b1",name:"Приседания со штангой",note:"Тяжёлый рабочий вес",
              sets:[{r:"5–6"},{r:"5–6"},{r:"5–6"},{r:"5–6"},{r:"5–6"}]},
            {id:"m4b2",name:"Армейский жим стоя",note:"",
              sets:[{r:"5–6"},{r:"5–6"},{r:"5–6"},{r:"5–6"},{r:"5–6"}]},
            {id:"m4b3",name:"Болгарские сплит-приседы с гантелями",note:"Задняя нога зафиксирована на скамье",
              sets:[{r:"8"},{r:"8"},{r:"8"}]},
            {id:"m4b4",name:"Махи гантелями в стороны",note:"Строго за счёт дельт, без раскачки корпуса",
              sets:[{r:"10"},{r:"10"},{r:"10"},{r:"10"}]}
          ]
        },
        {
          id:"m4c", label:"Спина / Бицепс", tag:"А³", sub:"Спина / Бицепс · Сила",
          warm:"5 мин + активация верха спины и ротаторов",
          cool:"Растяжка спины и бицепса 5 мин",
          exs:[
            {id:"m4c1",name:"Подтягивания на турнике в тяжёлом жилете",note:"Широкий хват. Девушке — с минимальной резинкой",
              sets:[{r:"5–6"},{r:"5–6"},{r:"5–6"},{r:"5–6"},{r:"5–6"}]},
            {id:"m4c2",name:"Тяга штанги в наклоне",note:"",
              sets:[{r:"6–8"},{r:"6–8"},{r:"6–8"},{r:"6–8"}]},
            {id:"m4c3",name:"Румынская тяга со штангой",note:"",
              sets:[{r:"6–8"},{r:"6–8"},{r:"6–8"},{r:"6–8"}]},
            {id:"m4c4",name:"Подъём EZ-грифа на бицепс",note:"С акцентом на медленное негативное опускание",
              sets:[{r:"6–8"},{r:"6–8"},{r:"6–8"},{r:"6–8"}]}
          ]
        }
      ]
    }
  ]
  },
  {
    id: "prog_gym_3d",
    name: "Тренажерный зал (Фулбоди)",
    days: 3,
    location: "gym",
    equipment: [],
    focus: "hypertrophy",
    desc: "Базовая программа для тренажерного зала, направленная на развитие всех мышечных групп за 3 дня в неделю.",
    months: [
      {
        id: 'm1_gym',
        title: 'Месяц 1',
        subtitle: 'Вводный блок',
        desc: 'Привыкаем к тренажерам и базовым движениям.',
        weeks: '1–4',
        color: '#ff3b30',
        dark: '#990000',
        workouts: [
          {
            id: 'm1_gym_w1', tag: 'День 1', label: 'Фулбоди А', sub: 'Базовые упражнения', warm: '5 мин кардио, суставная', cool: 'Растяжка',
            exs: [
              { id: 'gym1', name: 'Жим ногами в тренажере', sets: [{r:'12-15'},{r:'12-15'},{r:'12-15'}], note: 'Плавный темп' },
              { id: 'gym2', name: 'Жим штанги лежа', sets: [{r:'10-12'},{r:'10-12'},{r:'10-12'}] },
              { id: 'gym3', name: 'Тяга верхнего блока к груди', sets: [{r:'12'},{r:'12'},{r:'12'}] },
              { id: 'gym4', name: 'Скручивания на наклонной скамье', sets: [{r:'15-20'},{r:'15-20'}], noW: true }
            ]
          },
          {
            id: 'm1_gym_w2', tag: 'День 2', label: 'Фулбоди Б', sub: 'Акцент на другие углы', warm: '5 мин кардио', cool: 'Растяжка',
            exs: [
              { id: 'gym5', name: 'Болгарские выпады', sets: [{r:'12'},{r:'12'},{r:'12'}] },
              { id: 'gym6', name: 'Жим гантелей сидя', sets: [{r:'12'},{r:'12'},{r:'12'}] },
              { id: 'gym7', name: 'Тяга горизонтального блока', sets: [{r:'12'},{r:'12'},{r:'12'}] },
              { id: 'gym8', name: 'Гиперэкстензия', sets: [{r:'15'},{r:'15'},{r:'15'}], noW: true }
            ]
          },
          {
            id: 'm1_gym_w3', tag: 'День 3', label: 'Фулбоди В', sub: 'Изоляция', warm: '5 мин кардио', cool: 'Растяжка',
            exs: [
              { id: 'gym9', name: 'Разгибания ног в тренажере', sets: [{r:'15'},{r:'15'},{r:'15'}] },
              { id: 'gym10', name: 'Сгибания ног', sets: [{r:'15'},{r:'15'},{r:'15'}] },
              { id: 'gym11', name: 'Сведение рук в бабочке', sets: [{r:'15'},{r:'15'}] },
              { id: 'gym12', name: 'Подъем штанги на бицепс', sets: [{r:'12-15'},{r:'12-15'}] },
              { id: 'gym13', name: 'Разгибания на трицепс в кроссовере', sets: [{r:'12-15'},{r:'12-15'}] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "prog_home_4d",
    name: "Домашний сплит Верх/Низ",
    days: 4,
    location: "home",
    equipment: ["dumbbells"],
    focus: "hypertrophy",
    desc: "Продвинутая программа для дома. 4 тренировки в неделю с разделением на верх и низ тела.",
    months: [
      {
        id: 'm1_home_4d',
        title: 'Месяц 1',
        subtitle: 'База Верх/Низ',
        desc: 'Раздельные тренировки.',
        weeks: '1–4',
        color: '#0a84ff',
        dark: '#004080',
        workouts: [
          {
            id: 'h4_w1', tag: 'День 1', label: 'Низ', sub: 'Ноги и ягодицы', warm: 'Разминка', cool: 'Растяжка',
            exs: [
              { id: 'h4_1', name: 'Глубокие приседания с гантелей', sets: [{r:'12-15'},{r:'12-15'},{r:'12-15'},{r:'12-15'}] },
              { id: 'h4_2', name: 'Румынская тяга с гантелями', sets: [{r:'12-15'},{r:'12-15'},{r:'12-15'}] },
              { id: 'h4_3', name: 'Ягодичный мостик с весом', sets: [{r:'15'},{r:'15'},{r:'15'}] }
            ]
          },
          {
            id: 'h4_w2', tag: 'День 2', label: 'Верх', sub: 'Грудь, спина, руки', warm: 'Разминка', cool: 'Растяжка',
            exs: [
              { id: 'h4_4', name: 'Отжимания от пола', sets: [{r:'max'},{r:'max'},{r:'max'}], noW: true },
              { id: 'h4_5', name: 'Тяга гантелей в наклоне', sets: [{r:'12'},{r:'12'},{r:'12'}] },
              { id: 'h4_6', name: 'Махи гантелями в стороны', sets: [{r:'15'},{r:'15'},{r:'15'}] }
            ]
          },
          {
            id: 'h4_w3', tag: 'День 3', label: 'Низ', sub: 'Выпады и икры', warm: 'Разминка', cool: 'Растяжка',
            exs: [
              { id: 'h4_7', name: 'Выпады назад с гантелями', sets: [{r:'12'},{r:'12'},{r:'12'}] },
              { id: 'h4_8', name: 'Подъемы на носки стоя', sets: [{r:'20'},{r:'20'},{r:'20'}] },
              { id: 'h4_9', name: 'Скручивания', sets: [{r:'20'},{r:'20'},{r:'20'}], noW: true }
            ]
          },
          {
            id: 'h4_w4', tag: 'День 4', label: 'Верх', sub: 'Акцент на руки и плечи', warm: 'Разминка', cool: 'Растяжка',
            exs: [
              { id: 'h4_10', name: 'Армейский жим гантелей стоя', sets: [{r:'10-12'},{r:'10-12'},{r:'10-12'}] },
              { id: 'h4_11', name: 'Отжимания от скамьи на трицепс', sets: [{r:'15'},{r:'15'},{r:'15'}], noW: true },
              { id: 'h4_12', name: 'Попеременный подъем гантелей на бицепс', sets: [{r:'12'},{r:'12'},{r:'12'}] }
            ]
          }
        ]
      }
    ]
  }
];

// --- Exercise Database ---
var DB = {
    chest: [
      {name:"Отжимания от пола", eq:"bw", note:"Плавно, без рывков"},
      {name:"Отжимания с широкой постановкой рук", eq:"bw", note:"Акцент на грудь"},
      {name:"Жим штанги лежа", eq:"barbell", note:"Широким хватом"},
      {name:"Жим гантелей лежа", eq:"dumbbells", note:"Глубоко опускаем гантели"},
      {name:"Разводка гантелей", eq:"dumbbells", note:"Чувствуем растяжение"},
      {name:"Отжимания на брусьях", eq:"dips", note:"С акцентом на грудь (наклон вперед)"},
      {name:"Сведения рук с резиной", eq:"bands", note:"Изоляция на грудь"}
    ],
    back: [
      {name:"Лодочка (Супермен)", eq:"bw", note:"Задержка в верхней точке"},
      {name:"Подтягивания", eq:"pullup", note:"Широким хватом"},
      {name:"Тяга штанги в наклоне", eq:"barbell", note:"Спина прямая, тянем к поясу"},
      {name:"Тяга гантелей в наклоне", eq:"dumbbells", note:"Локти идут вдоль корпуса"},
      {name:"Тяга резины к поясу", eq:"bands", note:"Сводим лопатки"},
      {name:"Пуловер с гантелей", eq:"dumbbells", note:"Растягиваем широчайшие"}
    ],
    legs: [
      {name:"Приседания", eq:"bw", note:"Глубоко, колени по носкам"},
      {name:"Выпады", eq:"bw", note:"Шаг назад"},
      {name:"Ягодичный мост", eq:"bw", note:"Прожимаем ягодицы"},
      {name:"Приседания со штангой", eq:"barbell", note:"Держим спину прямо"},
      {name:"Румынская тяга", eq:"barbell", note:"На прямых ногах"},
      {name:"Болгарские сплит-приседания", eq:"dumbbells", note:"Задняя нога на скамье/диване"},
      {name:"Кубковые приседания", eq:"dumbbells", note:"Гантель перед грудью"},
      {name:"Мертвая тяга с гантелями", eq:"dumbbells", note:"Чувствуем бицепс бедра"}
    ],
    shoulders: [
      {name:"Отжимания домиком (Pike push-ups)", eq:"bw", note:"Акцент на дельты"},
      {name:"Армейский жим", eq:"barbell", note:"Жим штанги стоя"},
      {name:"Тяга штанги к подбородку", eq:"barbell", note:"Широким хватом"},
      {name:"Жим гантелей сидя", eq:"dumbbells", note:"Без полного выпрямления локтей"},
      {name:"Махи гантелями в стороны", eq:"dumbbells", note:"Мизинцы чуть выше больших пальцев"},
      {name:"Махи гантелями в наклоне", eq:"dumbbells", note:"На заднюю дельту"},
      {name:"Махи с резиной в стороны", eq:"bands", note:"Держим натяжение"}
    ],
    arms: [
      {name:"Обратные отжимания", eq:"bw", note:"Акцент на трицепс (от дивана/стула)"},
      {name:"Отжимания узким хватом", eq:"bw", note:"Локти вдоль корпуса"},
      {name:"Подъем штанги на бицепс", eq:"barbell", note:"Без раскачки"},
      {name:"Французский жим", eq:"barbell", note:"Локти зафиксированы"},
      {name:"Сгибания рук с EZ-грифом", eq:"ez", note:"Комфортно для запястий"},
      {name:"Сгибания рук на бицепс", eq:"dumbbells", note:"С супинацией"},
      {name:"Молотки", eq:"dumbbells", note:"Хват параллельный"},
      {name:"Разгибания рук с гантелью из-за головы", eq:"dumbbells", note:"На трицепс"}
    ],
    core: [
      {name:"Скручивания", eq:"bw", note:"Не тянем шею руками"},
      {name:"Планка", eq:"bw", note:"Держим поясницу ровно"},
      {name:"Велосипед", eq:"bw", note:"Тянем локоть к колену"},
      {name:"Подъем ног", eq:"bw", note:"Для нижнего пресса"},
      {name:"Скручивания с роликом/колесом", eq:"rope", note:"Если есть колесо/ролик"}
    ]
  };


// --- Custom DB Logic ---
var customDB = {chest:[], back:[], legs:[], shoulders:[], arms:[], core:[]};
var saved = Storage.get('customDB', null); if (saved) customDB = saved;
Object.keys(customDB).forEach(function(mg) {
  if (DB[mg]) {
    DB[mg] = DB[mg].concat(customDB[mg]);
  }
});

function openAddExModal() {
  document.getElementById('add-ex-name').value = '';
  document.getElementById('add-ex-note').value = '';
  document.getElementById('add-ex-modal').classList.add('show');
}

function saveAddEx() {
  var name = document.getElementById('add-ex-name').value.trim();
  var mg = document.getElementById('add-ex-mg').value;
  var eq = document.getElementById('add-ex-eq').value;
  var note = document.getElementById('add-ex-note').value.trim();

  if (!name) {
    showToast('Введите название!');
    return;
  }

  var newEx = { name: name, eq: eq, note: note };
  
  if (!customDB[mg]) customDB[mg] = [];
  customDB[mg].push(newEx);
  Storage.set('customDB', customDB);
  
  if (DB[mg]) DB[mg].push(newEx);
  
  document.getElementById('add-ex-modal').classList.remove('show');
  showToast('Упражнение добавлено!');
  
  if (document.getElementById('library-screen').classList.contains('active')) {
    renderLibrary();
  }
}




AppState.userPrograms = Storage.get("userPrograms", []);

if (AppState.userPrograms.length === 0) {
  var defaultProg = JSON.parse(JSON.stringify(TEMPLATES.find(function(t){return t.id === "prog_default";})));
  defaultProg.instanceId = "prog_default_1";
  AppState.userPrograms.push(defaultProg);
  Storage.set("userPrograms", AppState.userPrograms);
}

AppState.activeProgId = Storage.getStr("activeProgId", null);
if (!AppState.activeProgId && AppState.userPrograms.length > 0) AppState.activeProgId = AppState.userPrograms[0].instanceId;

AppState.P = AppState.userPrograms.find(function(p){return p.instanceId === AppState.activeProgId;}) || AppState.userPrograms[0];
var tInterval = null, tSecs = 0, tRunning = false;
var wakeLock = null;
async function reqWL() { if ('wakeLock' in navigator) { try { wakeLock = await navigator.wakeLock.request('screen'); } catch (e) {} } }
function relWL() { if (wakeLock !== null) { wakeLock.release().then(function(){wakeLock=null;}); } }
document.addEventListener('visibilitychange', function(){
  if(wakeLock!==null && document.visibilityState==='visible') reqWL();
});
document.addEventListener('touchstart', function(e){
  var t = e.target.tagName;
  if(t !== 'INPUT' && t !== 'TEXTAREA' && t !== 'BUTTON' && !e.target.closest('.chk-wrap') && !e.target.closest('.diff-wrap')) {
    if(document.activeElement && (document.activeElement.tagName==='INPUT' || document.activeElement.tagName==='TEXTAREA')) {
      document.activeElement.blur();
    }
  }
});
var audioCtx = null;
function playSound(type) {
  if (!audioCtx) {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    audioCtx = new AC();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  if (type === 'init') return;
  var t = audioCtx.currentTime;
  var osc = audioCtx.createOscillator();
  var gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  if (type === 'ding') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, t);
    osc.frequency.exponentialRampToValueAtTime(440, t + 0.5);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1);
    osc.start(t);
    osc.stop(t + 1);
  } else if (type === 'tada') {
    var freqs = [523.25, 659.25, 783.99, 1046.50];
    freqs.forEach(function(f, i) {
      var o = audioCtx.createOscillator();
      var g = audioCtx.createGain();
      o.connect(g);
      g.connect(audioCtx.destination);
      o.type = 'triangle';
      var startT = t + i*0.1;
      o.frequency.setValueAtTime(f, startT);
      g.gain.setValueAtTime(0, startT);
      g.gain.linearRampToValueAtTime(0.15, startT + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, startT + 1.5);
      o.start(startT);
      o.stop(startT + 1.5);
    });
  }
}
var restInt=null, restSecs=0;
function adjRest(s) {
  if(restSecs > 0) {
    restSecs += s;
    if(restSecs < 0) restSecs = 0;
    updRest();
  }
}
function startRest(diff) {
  stopRest();
  restSecs = diff === 'down' ? 120 : (diff === 'up' ? 60 : 90);
  var rb=document.getElementById('rest-badge');
  if(!rb) return;
  rb.style.display='flex';
  rb.classList.remove('done');
  updRest();
  restInt = setInterval(function(){
    restSecs--;
    if(restSecs<=0) {
      stopRest();
      rb.style.display='flex';
      rb.classList.add('done');
      document.getElementById('rest-val').textContent = 'Пора!';
      if('vibrate' in navigator) navigator.vibrate([200,100,200]);
      playSound('ding');
    } else { updRest(); }
  }, 1000);
}
function stopRest() {
  if(restInt) clearInterval(restInt);
  restInt=null;
  var rb=document.getElementById('rest-badge');
  if(rb) { rb.style.display='none'; rb.classList.remove('done'); }
}

var activeSetTimer = null;
function toggleSetTimer(k, minS, maxS, origTxt, exId, si) {
  var el = document.getElementById('rp_'+k);
  var txtEl = document.getElementById('rtxt_'+k);
  if(!el || !txtEl) return;
  
  if(activeSetTimer && activeSetTimer.k === k) {
    clearInterval(activeSetTimer.intId);
    el.classList.remove('active-timer');
    txtEl.textContent = origTxt;
    activeSetTimer = null;
    return;
  }
  if(activeSetTimer) {
    clearInterval(activeSetTimer.intId);
    var oldEl = document.getElementById('rp_'+activeSetTimer.k);
    var oldTxt = document.getElementById('rtxt_'+activeSetTimer.k);
    if(oldEl) oldEl.classList.remove('active-timer');
    if(oldTxt) oldTxt.textContent = activeSetTimer.orig;
  }
  
  playSound('init');
  el.classList.add('active-timer');
  var secs = 0;
  txtEl.textContent = '⏱ 0 / '+maxS+'с';
  
  var intId = setInterval(function() {
    secs++;
    txtEl.textContent = '⏱ '+secs+' / '+maxS+'с';
    if(secs === minS && minS !== maxS) {
      playSound('ding');
      if('vibrate' in navigator) navigator.vibrate(200);
    }
    if(secs >= maxS) {
      clearInterval(intId);
      activeSetTimer = null;
      el.classList.remove('active-timer');
      txtEl.textContent = origTxt;
      playSound('tada');
      if('vibrate' in navigator) navigator.vibrate([200,100,200]);
      if(!AppState.wState[k] || !AppState.wState[k].done) togD(exId, si, 'ok');
    }
  }, 1000);
  
  activeSetTimer = { k: k, intId: intId, orig: origTxt };
}
function updRest() {
  var m=Math.floor(restSecs/60), s=restSecs%60;
  var rv=document.getElementById('rest-val');
  if(rv) rv.textContent = m+':'+(s<10?'0':'')+s;
}
function onNotesInput(v) {
  AppState.wState.notes = v;
  saveWS();
}

// ─────────────────────────────────────────
// STORAGE
// ─────────────────────────────────────────
function getWsKey(id) {
  if (AppState.P.instanceId === 'prog_default_1') return 'ws_' + id;
  return 'ws_' + AppState.P.instanceId + '_' + id;
}

function saveWS() {
  if (!AppState.curWorkout || !AppState.curWeek) return;
  Storage.set(getWsKey(AppState.curWorkout.id+'_w'+AppState.curWeek), AppState.wState);
}
function loadWS(id) {
  return Storage.get(getWsKey(id), {});
}
function getWeights() {
  return Storage.get('uw', {});
}
function saveUW(exName, si, weight, diff, reps) {
  try {
    var w=getWeights();
    var arr = w[exName];
    if (!Array.isArray(arr)) {
       var oldW = '';
       if (typeof arr === 'string') oldW = arr;
       else if (arr && typeof arr === 'object') oldW = arr.w;
       arr = [];
       if (oldW) arr[0] = { w: oldW, d: '', r: '' };
    }
    var obj = arr[si] || { w: '', d: '', r: '' };
    if (weight !== undefined) obj.w = weight;
    if (diff !== undefined) obj.d = diff;
    if (reps !== undefined) obj.r = reps;
    arr[si] = obj;
    w[exName] = arr;
    Storage.set('uw', w);
  } catch(e){}
}
function getHistory() {
  return Storage.get('wh', []);
}
function saveHistory(e) {
  var h=getHistory(); h.unshift(e);
  Storage.set('wh', h.slice(0,100));
}
function getProgress(monthId) {
  var m=AppState.P.months.find(function(x){return x.id===monthId;});
  if(!m) return 0;
  var weeksArr=m.weeks.split('–');
  var startW=parseInt(weeksArr[0])||1, endW=parseInt(weeksArr[1])||4;
  var total=0, done=0;
  for(var wk=startW; wk<=endW; wk++){
    m.workouts.forEach(function(w){
      var s=loadWS(w.id+'_w'+wk);
      w.exs.forEach(function(ex){
        ex.sets.forEach(function(set,si){
          total++;
          var k=ex.id+'_'+si;
          if(s[k] && s[k].done) done++;
        });
      });
    });
  }
  return total===0?0:Math.round(done/total*100);
}

// ─────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────
function showScreen(id, fromPop) {
  document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active');});
  var el=document.getElementById(id);
  if(el) {
    el.classList.add('active','slide-in');
    setTimeout(function(){el.classList.remove('slide-in');},300);
  }
  document.getElementById('bnav').style.display=id==='workout-screen'?'none':'flex';
  if(!fromPop && history.pushState) {
    history.pushState({s: id}, '');
  }
}
function navTo(tab) {
  document.querySelectorAll('.nav-item').forEach(function(n){n.classList.remove('active');});
  if(tab==='home-screen' || tab==='home'){
    renderProgramsList();
    showScreen('home-screen');
    document.getElementById('nav-home').classList.add('active');
  }
  else if(tab==='program-screen'){
    renderProgram();
    showScreen('program-screen');
    document.getElementById('nav-home').classList.add('active');
  }
  else if(tab==='library'){renderLibrary();showScreen('library-screen');document.getElementById('nav-lib').classList.add('active');}
  else if(tab==='history'){renderHistory();showScreen('history-screen');document.getElementById('nav-hist').classList.add('active');}
  else if(tab==='profile'){showScreen('profile-screen');document.getElementById('nav-prof').classList.add('active');}
}

function getProgramProgress(p) {
  var tot=0, don=0;
  p.months.forEach(function(m){
    m.workouts.forEach(function(w){
      var wks=m.weeks.split("–");
      var st=parseInt(wks[0]), en=wks.length>1?parseInt(wks[1]):st;
      for(var wk=st;wk<=en;wk++) {
        tot++;
        var isDon = false;
        if (p.instanceId === "prog_default_1") {
          isDon = Storage.getStr("finished_"+w.id+"_w"+wk) === "true";
        } else {
          isDon = Storage.getStr("finished_"+p.instanceId+"_"+w.id+"_w"+wk) === "true";
        }
        if (isDon) don++;
      }
    });
  });
  return tot>0 ? Math.round((don/tot)*100) : 0;
}

function deleteProgram(e, id) {
  e.stopPropagation();
  if(!confirm("Удалить программу? История тренировок останется.")) return;
  AppState.userPrograms = AppState.userPrograms.filter(function(p){return p.instanceId !== id;});
  localStorage.setItem("userPrograms", JSON.stringify(AppState.userPrograms));
  if(AppState.activeProgId === id) {
    if(AppState.userPrograms.length > 0) AppState.activeProgId = AppState.userPrograms[0].instanceId;
    else AppState.activeProgId = null;
    localStorage.setItem("activeProgId", AppState.activeProgId);
  }
  renderProgramsList();
}

function renderProgramsList() {
  var html = '<button class="btn" style="width:100%;margin-bottom:15px;background:var(--accent);color:#fff;border:none;box-shadow:0 4px 15px rgba(108,99,255,0.3);" onclick="document.getElementById(\'create-prog-modal\').classList.add(\'show\')">✨ Создать программу</button>';
  
  AppState.userPrograms.forEach(function(prog) {
    var isActive = prog.instanceId === AppState.activeProgId;
    var pct = getProgramProgress(prog);
    html += '<div style="background:var(--card);border-radius:var(--radius);padding:15px;border:1px solid '+(isActive?'var(--accent)':'var(--border)')+';cursor:pointer;margin-bottom:12px" onclick="openProgram(\''+prog.instanceId+'\')">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:5px">' +
        '<div style="font-weight:700;font-size:16px">'+prog.name+'</div>' +
        (prog.instanceId !== 'prog_default_1' ? '<div style="color:#ef4444;font-size:24px;padding:0 5px;line-height:0.8;margin-top:-2px" onclick="deleteProgram(event, \''+prog.instanceId+'\')">×</div>' : '') +
      '</div>' +
      '<div style="font-size:13px;color:var(--text2);margin-bottom:10px">'+prog.desc.substring(0,80)+'...</div>' +
      '<div style="display:flex;gap:10px;font-size:12px;color:var(--text3);font-weight:600;margin-bottom:10px">' +
        '<span style="background:var(--card2);padding:4px 8px;border-radius:10px">'+prog.days+' дня/нед</span>' +
        '<span style="background:var(--card2);padding:4px 8px;border-radius:10px">'+(prog.location==='gym'?'В зале':'Дома')+'</span>' +
      '</div>' +
      '<div class="prog-row" style="margin:0;margin-top:10px">' +
        '<div class="prog-bar"><div class="prog-fill" style="width:'+pct+'%;background:var(--accent)"></div></div>' +
        '<div class="prog-pct">'+pct+'%</div>' +
      '</div></div>';
  });
  
  document.getElementById('programs-list').innerHTML = html;
}

function openProgram(id) {
  AppState.activeProgId = id;
  localStorage.setItem('activeProgId', id);
  AppState.P = AppState.userPrograms.find(function(p){return p.instanceId===id;});
  navTo('program-screen');
}

function toggleCpEq() {
  var loc = document.getElementById('cp-location').value;
  document.getElementById('cp-eq-wrap').style.display = loc === 'home' ? 'block' : 'none';
}

function generateProgram() {
  var loc = document.getElementById('cp-location').value;
  var days = parseInt(document.getElementById('cp-days').value);
  var dur = parseInt(document.getElementById('cp-duration').value);
  var split = document.getElementById('cp-split').value;
  var focus = document.getElementById('cp-focus').value;
  var eq = [];
  if(loc==='home') {
    ['dumbbells','pullup','bands','rope','dips','bench','vest','ez','barbell'].forEach(function(k){
      var el = document.getElementById('cp-eq-'+k);
      if(el && el.checked) eq.push(k);
    });
  }


  // Helper to get exercise filtered by equipment
  function getEx(group, idx) {
    var validExs = [];
    if (loc === 'home') {
      validExs = DB[group].filter(function(ex) {
        return ex.eq === 'bw' || eq.includes(ex.eq);
      });
    } else {
      validExs = DB[group]; // in gym, assume all eq available
    }

    if (validExs.length === 0) {
      // Fallback if absolutely no equipment matches (should rarely happen due to 'bw' fallbacks)
      return {name: "Упражнение на " + group, note: "Собственный вес"};
    }
    return Object.assign({}, validExs[idx % validExs.length]);
  }

  // Generate Workouts based on Split
  var workouts = [];
  if (split === 'fullbody') {
    for(var d=0; d<days; d++) {
      workouts.push({
        id: "w"+(d+1), label: "Фулбоди "+(d+1), tag: String.fromCharCode(1040+d), sub: "Всё тело",
        warm: "Суставная гимнастика 5 мин", cool: "Растяжка 5 мин",
        exs: [ getEx('legs',d), getEx('chest',d), getEx('back',d), getEx('shoulders',d), getEx('arms',d*2), getEx('core',d) ]
      });
    }
  } else if (split === 'upper_lower') {
    for(var d=0; d<days; d++) {
      if(d%2===0) {
        workouts.push({ id:"w"+(d+1), label:"Верх "+(d+1), tag:"В", sub:"Верхняя часть тела", warm:"Суставная гимнастика", cool:"Растяжка верха",
          exs: [ getEx('chest',d), getEx('back',d), getEx('shoulders',d), getEx('arms',d), getEx('arms',d+1), getEx('core',d) ] });
      } else {
        workouts.push({ id:"w"+(d+1), label:"Низ "+(d+1), tag:"Н", sub:"Ноги и пресс", warm:"Суставная гимнастика", cool:"Растяжка ног",
          exs: [ getEx('legs',0), getEx('legs',1), getEx('legs',2), getEx('legs',3), getEx('legs',4), getEx('core',d) ] });
      }
    }
  } else if (split === 'ppl') { // Push, Pull, Legs
    var t = ['Push', 'Pull', 'Legs'];
    for(var d=0; d<days; d++) {
      var type = t[d%3];
      if (type==='Push') {
        workouts.push({ id:"w"+(d+1), label:"Жимовой день", tag:"Ж", sub:"Грудь, Плечи, Трицепс", warm:"Разминка", cool:"Растяжка",
          exs: [ getEx('chest',0), getEx('chest',1), getEx('shoulders',0), getEx('shoulders',1), getEx('arms',2), getEx('arms',3) ] });
      } else if (type==='Pull') {
        workouts.push({ id:"w"+(d+1), label:"Тяговый день", tag:"Т", sub:"Спина, Бицепс, Задняя дельта", warm:"Разминка", cool:"Растяжка",
          exs: [ getEx('back',0), getEx('back',1), getEx('back',2), getEx('shoulders',2), getEx('arms',0), getEx('arms',1) ] });
      } else {
        workouts.push({ id:"w"+(d+1), label:"День ног", tag:"Н", sub:"Ноги и пресс", warm:"Разминка", cool:"Растяжка",
          exs: [ getEx('legs',0), getEx('legs',1), getEx('legs',2), getEx('legs',3), getEx('core',0), getEx('core',1) ] });
      }
    }
  } else if (split === 'brosplit') {
    var b = ['Грудь', 'Спина', 'Ноги', 'Плечи/Руки', 'Грудь/Спина', 'Ноги/Плечи'];
    for(var d=0; d<days; d++) {
      var type = b[d%6];
      var e = [];
      if(type==='Грудь') e = [getEx('chest',0), getEx('chest',1), getEx('chest',2), getEx('core',0)];
      if(type==='Спина') e = [getEx('back',0), getEx('back',1), getEx('back',2), getEx('core',1)];
      if(type==='Ноги') e = [getEx('legs',0), getEx('legs',1), getEx('legs',2), getEx('legs',3), getEx('legs',4)];
      if(type==='Плечи/Руки') e = [getEx('shoulders',0), getEx('shoulders',1), getEx('arms',0), getEx('arms',2), getEx('arms',1)];
      if(type==='Грудь/Спина') e = [getEx('chest',0), getEx('chest',1), getEx('back',0), getEx('back',1)];
      if(type==='Ноги/Плечи') e = [getEx('legs',0), getEx('legs',1), getEx('shoulders',0), getEx('shoulders',1)];
      workouts.push({ id:"w"+(d+1), label:type, tag:String.fromCharCode(1040+d), sub:"Бро-сплит", warm:"Разминка", cool:"Растяжка", exs: e });
    }
  }

  // Create progressive sets per month
  var months = [];
  var colors = [
    {c:"#6C63FF", d:"#4f47cc"},
    {c:"#F97316", d:"#c75c0a"},
    {c:"#10B981", d:"#0a8c60"},
    {c:"#EF4444", d:"#b91c1c"}
  ];
  for(var m=0; m<dur; m++) {
    var mWorkouts = JSON.parse(JSON.stringify(workouts));
    // Apply progressive overload (reps change)
    var reps = "12–15";
    if (focus === 'strength') reps = (8-m) + "–" + (10-m);
    else if (focus === 'hypertrophy') reps = (12-m) + "–" + (15-m);
    else reps = "15–20"; // endurance

    mWorkouts.forEach(function(w) {
      w.id = w.id + "_m" + (m+1);
      w.exs.forEach(function(ex, i) {
        ex.id = w.id + "_e" + (i+1);
        ex.sets = [{r:reps}, {r:reps}, {r:reps}];
      });
    });

    months.push({
      id: "m"+(m+1)+"_"+Date.now(),
      title: "Месяц " + (m+1),
      subtitle: split.toUpperCase() + " Фаза " + (m+1),
      desc: "Прогрессия: " + reps + " повторений. Старайтесь увеличивать вес или качество выполнения.",
      color: colors[m%4].c, dark: colors[m%4].d,
      weeks: ((m*4)+1) + "–" + ((m*4)+4),
      workouts: mWorkouts
    });
  }

  // Vest application if available
  if (loc === 'home' && eq.includes('vest')) {
    months.forEach(function(m) {
      m.workouts.forEach(function(w) {
        w.exs.forEach(function(ex) {
          if (ex.eq === 'bw') {
            ex.note = (ex.note ? ex.note + '. ' : '') + 'Можно надеть жилет-утяжелитель.';
          }
        });
      });
    });
  }

  var sNames = { 'fullbody': 'Фулбоди', 'upper_lower': 'Сплит Верх/Низ', 'ppl': 'Тяни-Толкай-Ноги', 'brosplit': 'Бро-сплит' };
  
  var newProg = {
    instanceId: 'prog_' + Date.now(),
    name: "Программа: " + sNames[split] + (dur < 4 ? " (" + dur + " мес)" : ""),
    days: days,
    location: loc,
    focus: focus,
    desc: "Динамически сгенерированная программа на " + dur + " мес. Принцип: " + sNames[split] + ". Инвентарь: " + (loc==='home' ? eq.join(', ') : 'Зал'),
    months: months
  };

  AppState.userPrograms.push(newProg);
  localStorage.setItem('userPrograms', JSON.stringify(AppState.userPrograms));
  
  document.getElementById('create-prog-modal').classList.remove('show');
  
  setTimeout(function(){
    openProgram(newProg.instanceId);
  }, 100);
}

var curLibFilter = 'Все';
function setLibFilter(f) {
  curLibFilter = f;
  renderLibrary();
}

function getMuscleGroup(name) {
  var n = name.toLowerCase();
  if (n.includes('приседан') || n.includes('выпады') || n.includes('мостик') || n.includes('носки') || n.includes('румынская')) return 'Ноги';
  if (n.includes('подтягиван') || n.includes('тяга') || n.includes('пулловер')) return 'Спина';
  if (n.includes('армейский') || n.includes('жим гантелей сидя') || n.includes('махи')) return 'Плечи';
  if (n.includes('жим штанги') || n.includes('отжимания от пола') || n.includes('разводка') || n.includes('жим гантелей лёжа') || n.includes('брусья')) return 'Грудь';
  if (n.includes('бицепс') || n.includes('сгибани') || n.includes('молот') || n.includes('французский') || n.includes('разгибани') || n.includes('отжимания от скамьи')) return 'Руки';
  if (n.includes('планка') || n.includes('скручиван') || n.includes('пресс')) return 'Пресс';
  if (n.includes('канат') || n.includes('бег') || n.includes('вело')) return 'Кардио';
  return 'Другое';
}

function renderLibrary() {
  var libList = document.getElementById('lib-list');
  var filtersWrap = document.getElementById('lib-filters-container');
  var itemsWrap = document.getElementById('lib-items-container');
  
  if (!filtersWrap || !itemsWrap) {
    libList.innerHTML = '<style>.no-scroll::-webkit-scrollbar{display:none}</style><div id="lib-filters-container" style="display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;margin-top:-20px;margin-bottom:5px;" class="no-scroll"></div><div id="lib-items-container" style="display:flex;flex-direction:column;gap:15px;"></div>';
    filtersWrap = document.getElementById('lib-filters-container');
    itemsWrap = document.getElementById('lib-items-container');
  }
  
  var mgNames = { 'chest': 'Грудь', 'back': 'Спина', 'legs': 'Ноги', 'shoulders': 'Плечи', 'arms': 'Руки', 'core': 'Пресс' };
  var eqNames = { 'bw': 'Свой вес', 'barbell': 'Штанга', 'dumbbells': 'Гантели', 'pullup': 'Турник', 'dips': 'Брусья', 'bands': 'Резинки', 'rope': 'Канат', 'bench': 'Скамья', 'vest': 'Жилет', 'ez': 'EZ-гриф' };
  
  var filters = ['Все'].concat(Object.values(mgNames));
  if (!filtersWrap.children.length) {
    var filtersHtml = '';
    filters.forEach(function(f){
      filtersHtml += '<div data-filter="'+f+'" onclick="setLibFilter(\''+f+'\')" style="padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap;transition:all 0.2s;-webkit-tap-highlight-color:transparent;">'+f+'</div>';
    });
    filtersWrap.innerHTML = filtersHtml;
  }
  
  Array.from(filtersWrap.children).forEach(function(child) {
    var f = child.getAttribute('data-filter');
    var active = curLibFilter === f;
    if (active) {
       child.style.background = 'var(--accent)';
       child.style.color = '#fff';
       child.style.border = '1px solid var(--accent)';
    } else {
       child.style.background = 'var(--card2)';
       child.style.color = 'var(--text2)';
       child.style.border = '1px solid var(--border)';
    }
  });

  var html = '<button class="btn btn-primary" style="margin-bottom:15px;width:100%" onclick="openAddExModal()">+ Свое упражнение</button>';
  var uw = getWeights();
  var visibleCount = 0;
  
  Object.keys(DB).forEach(function(mgKey) {
    var mgTitle = mgNames[mgKey];
    if (curLibFilter !== 'Все' && mgTitle !== curLibFilter) return;
    
    html += '<div style="font-size:16px;font-weight:700;color:var(--text);margin-top:10px;margin-bottom:5px;">' + mgTitle + '</div>';
    
    DB[mgKey].forEach(function(ex) {
      visibleCount++;
      var globalStats = uw[ex.name];
      var statText = 'Нет данных о тренировках';
      
      if (globalStats && globalStats.length > 0) {
        var lastSet = null;
        for(var i=globalStats.length-1; i>=0; i--) {
          if(globalStats[i] && (globalStats[i].w || globalStats[i].r)) { lastSet = globalStats[i]; break; }
        }
        if (!lastSet && globalStats[0]) lastSet = globalStats[0];
        
        if (lastSet && (lastSet.w || lastSet.r)) {
           statText = 'PR: ' + (lastSet.w ? lastSet.w + ' кг' : '') + (lastSet.w && lastSet.r ? ' × ' : '') + (lastSet.r ? lastSet.r + ' повт' : '');
        }
      }
      
      var eqText = eqNames[ex.eq] || ex.eq || '';
      var noteText = ex.note ? '<div style="font-size:12px;color:var(--text-sec);margin-top:4px;">' + ex.note + '</div>' : '';
      var eqBadge = eqText ? '<span style="font-size:10px;background:var(--bg);padding:2px 6px;border-radius:4px;color:var(--text-sec);margin-left:8px;vertical-align:middle">' + eqText + '</span>' : '';
      
      var isCustom = false;
      if (customDB[mgKey]) {
          isCustom = customDB[mgKey].some(function(cEx) { return cEx.name === ex.name; });
      }
      var customBadge = isCustom ? '<span style="font-size:10px;background:rgba(255,165,0,0.2);color:orange;padding:2px 6px;border-radius:4px;margin-left:4px;vertical-align:middle">Своё</span>' : '';
      
      html += '<div style="background:var(--card);border-radius:var(--radius-sm);border:1px solid var(--border);padding:15px;margin-bottom:10px;">';
      html += '<div style="display:flex;justify-content:space-between;align-items:flex-start">';
      html += '<div style="flex:1"><div><span style="font-weight:600;font-size:15px;">' + ex.name + '</span>' + eqBadge + customBadge + '</div>' + noteText + '</div>';
      html += '</div>';
      html += '<div style="font-size:13px;color:var(--accent);font-weight:600;margin-top:8px">'+statText+'</div>';
      html += '</div>';
    });
  });

  if (visibleCount === 0) html += '<div style="text-align:center;color:var(--text-sec);padding:20px;font-size:14px">Упражнений не найдено</div>';
  itemsWrap.innerHTML = '<div style="color:var(--text3);font-size:12px;margin-bottom:-10px">Отображено упражнений: '+visibleCount+'</div>' + html;
}

function exportData() {
  var data = { uw: localStorage.getItem('uw'), wh: localStorage.getItem('wh') };
  Object.keys(localStorage).forEach(function(k){ if(k.startsWith('ws_')) data[k] = localStorage.getItem(k); });
  var blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a'); a.href = url; a.download = 'workout-backup-' + new Date().toISOString().split('T')[0] + '.json'; a.click();
  URL.revokeObjectURL(url);
}

function importData(e) {
  var file = e.target.files[0]; if(!file) return;
  var reader = new FileReader();
  reader.onload = function(evt) {
    try {
      var data = JSON.parse(evt.target.result);
      if(data.uw) localStorage.setItem('uw', data.uw);
      if(data.wh) localStorage.setItem('wh', data.wh);
      Object.keys(data).forEach(function(k){ if(k.startsWith('ws_')) localStorage.setItem(k, data[k]); });
      showToast('Данные успешно восстановлены!');
      setTimeout(function(){ location.reload(); }, 1500);
    } catch(err) { showToast('Ошибка при чтении файла'); }
  };
  reader.readAsText(file);
}
function forceUpdate() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(regs) {
      if(regs.length===0) window.location.reload();
      regs.forEach(function(r){ r.update(); });
      showToast('Загружаем обновления...');
      setTimeout(function(){ window.location.reload(); }, 2000);
    });
  } else {
    window.location.reload();
  }
}
function goHome(){relWL();navTo('program-screen');}
function goMonth(){relWL();stopTimer();renderMonth(AppState.curMonth);showScreen('month-screen');}

// ─────────────────────────────────────────
// HOME
// ─────────────────────────────────────────
function renderProgram() {
  document.getElementById('hs-title').innerText = AppState.P.name || (AppState.P.meta && AppState.P.meta.title) || 'Программа тренировок';
  document.getElementById('hs-subtitle').innerText = (AppState.P.days ? AppState.P.days + ' тренировки в неделю' : (AppState.P.meta && AppState.P.meta.subtitle) || '');
  
  var html='';
  AppState.P.months.forEach(function(m){
    var pct=getProgress(m.id);
    html+='<div class="month-card" onclick="openMonth(\''+m.id+'\')">' +
      '<div class="mc-accent" style="background:linear-gradient(90deg,'+m.color+','+m.dark+')"></div>' +
      '<div class="mc-inner">' +
        '<div class="mc-header">' +
          '<div class="mc-badge" style="background:linear-gradient(135deg,'+m.color+','+m.dark+')">'+m.weeks.split('\u20131')[0]+'</div>' +
          '<div class="mc-meta"><div class="mc-title">'+m.title+'</div><div class="mc-sub">'+m.subtitle+'</div></div>' +
        '</div>' +
        '<div class="mc-desc">'+m.desc+'</div>' +
        '<div class="mc-footer">' +
          '<div class="weeks-badge">Недели '+m.weeks+'</div>' +
          '<div class="prog-row">' +
            '<div class="prog-bar"><div class="prog-fill" style="width:'+pct+'%;background:linear-gradient(90deg,'+m.color+','+m.dark+')"></div></div>' +
            '<div class="prog-pct">'+pct+'%</div>' +
          '</div>' +
          '<div class="arrow">›</div>' +
        '</div>' +
      '</div></div>';
  });
  document.getElementById('months-list').innerHTML=html;
}

// ─────────────────────────────────────────
// MONTH
// ─────────────────────────────────────────
function openMonth(mid) {
  AppState.curMonth=AppState.P.months.find(function(m){return m.id===mid;});
  if(!AppState.curMonth) return;
  renderMonth(AppState.curMonth);
  showScreen('month-screen');
}
function renderMonth(m) {
  document.getElementById('ms-title').textContent=m.title+' — '+m.subtitle;
  document.getElementById('ms-sub').textContent='Недели '+m.weeks+' · 3 тренировки';
  document.getElementById('ms-desc').textContent=m.desc;
  var weeksArr=m.weeks.split('–');
  var startW=parseInt(weeksArr[0])||1, endW=parseInt(weeksArr[1])||4;
  var html='';
  for(var wk=startW; wk<=endW; wk++){
    html+='<div class="section-label" style="margin-top:16px">Неделя '+wk+'</div>';
    m.workouts.forEach(function(w){
      var total=w.exs.reduce(function(s,e){return s+e.sets.length;},0);
      var st=loadWS(w.id+'_w'+wk);
      var done=w.exs.reduce(function(s,e){
        return s+e.sets.filter(function(x,si){var k=e.id+'_'+si;return st[k]&&st[k].done;}).length;
      },0);
      var pct=total?Math.round(done/total*100):0;
      var prev='';
      var shown=w.exs.slice(0,3);
      shown.forEach(function(e){
        prev+='<div class="ex-prev-item"><div class="ex-dot" style="background:'+m.color+'"></div><span>'+e.name+'</span></div>';
      });
      var more=w.exs.length-3;
      var isFinished = ((AppState.P.instanceId === 'prog_default_1' ? localStorage.getItem('finished_'+w.id+'_w'+wk) : null) || Storage.getStr('finished_'+AppState.P.instanceId+'_'+w.id+'_w'+wk)) === 'true';
      var btnText = isFinished ? '✓ Завершено' : (pct>0 ? '▶ Продолжить' : '▶ Начать');
      var btnStyle = isFinished ? 'background:var(--green)' : 'background:linear-gradient(135deg,'+m.color+','+m.dark+')';

      html+='<div class="wcard">' +
        '<div class="wcard-accent" style="background:linear-gradient(90deg,'+m.color+','+m.dark+')"></div>' +
        '<div class="wcard-body">' +
          '<div class="wcard-header">' +
            '<div class="wday-badge" style="background:linear-gradient(135deg,'+m.color+','+m.dark+')">'+w.tag+'</div>' +
            '<div><div class="wcard-title">'+w.label+'</div><div class="wcard-sub">'+w.sub+'</div></div>' +
          '</div>' +
          '<div class="ex-preview">'+prev+(more>0?'<div class="ex-more">+ ещё '+more+' упражнений</div>':'')+'</div>' +
          '<div class="wcard-footer">' +
            '<div class="sets-count">'+total+' подходов'+(isFinished?' · завершено':(pct?' · '+pct+'% выполнено':' · не начато'))+'</div>' +
            '<button class="start-btn" style="'+btnStyle+'" onclick="event.stopPropagation();openWorkout(\''+w.id+'\','+wk+')">'+btnText+'</button>' +
          '</div>' +
        '</div></div>';
    });
  }
  document.getElementById('workouts-list').innerHTML=html;
}

// ─────────────────────────────────────────
// WORKOUT
// ─────────────────────────────────────────
function openWorkout(wid, wk) {
  var m=null, w=null;
  AppState.P.months.forEach(function(mo){mo.workouts.forEach(function(wo){if(wo.id===wid){m=mo;w=wo;}});});
  if(!w) return;
  AppState.curMonth=m; AppState.curWorkout=w; AppState.curWeek=wk; AppState.wState=loadWS(wid+'_w'+wk);
  document.getElementById('ws-title').textContent=w.label;
  document.getElementById('ws-sub').textContent=m.title+' · Неделя '+wk;
  document.getElementById('warmup-text').textContent=w.warm;
  document.getElementById('cooldown-text').textContent=w.cool;
  document.getElementById('workout-notes').value = AppState.wState.notes || '';
  timerReset();
  stopRest();
  renderExs();
  updateFinBtn();
  showScreen('workout-screen');
  reqWL();
}

function renderExs() {
  var m=AppState.curMonth, w=AppState.curWorkout;
  var uw=getWeights();
  var html='';
  w.exs.forEach(function(ex,ei){
    var arr = uw[ex.name]; // Global by name
    var isArr = Array.isArray(arr);

    var gw0 = { w: '', d: '', r: '' };
    if (isArr && arr[0]) gw0 = arr[0];
    else if (!isArr && arr) {
       if (typeof arr === 'string') gw0.w = arr;
       else if (typeof arr === 'object') { gw0.w = arr.w; gw0.d = arr.d; }
    }

    var setsHtml='';
    ex.sets.forEach(function(set,si){
      var gw = { w: '', d: '', r: '' };
      if (isArr && arr[si]) {
         gw = arr[si];
      } else if (!isArr && arr) {
         if (typeof arr === 'string') gw.w = arr;
         else if (typeof arr === 'object') {
           gw.w = arr.w;
           if (si === 0) gw.d = arr.d;
         }
      }

      var markerHtml = '';
      if(gw.d==='up') markerHtml='<span style="color:#0a84ff;font-size:14px;margin-left:3px;margin-bottom:1px">↑</span>';
      else if(gw.d==='down') markerHtml='<span style="color:#ff453a;font-size:14px;margin-left:3px;margin-bottom:1px">↓</span>';
      else if(gw.d==='ok') markerHtml='<span style="color:#30d158;font-size:14px;margin-left:3px;margin-bottom:1px">✓</span>';

      var k=ex.id+'_'+si;
      var st=AppState.wState[k]||{};
      var done=!!st.done;
      var diff=st.diff||'';
      
      var wv=st.weight;
      if(wv===undefined) wv=gw.w;
      
      var rv=st.reps;
      if(rv===undefined) rv=gw.r;

      var noW=!!ex.nw;
      var rStr = set.r.toLowerCase();
      var isTime = rStr.includes('сек') || rStr.includes('sec') || rStr.includes('мин') || rStr.includes('min');

      var defaultRep = '';
      var mNum = set.r.match(/\d+/);
      if (mNum) defaultRep = mNum[0];
      if (!rv && !isTime) rv = defaultRep;

      var repsHtml = '';
      if(isTime) {
        var minT = parseInt(mNum[0]);
        var maxT = mNum.length > 1 ? parseInt(set.r.match(/\d+/g)[1]) : minT;
        if(rStr.includes('мин') || rStr.includes('min')) { minT *= 60; maxT *= 60; }
        repsHtml = '<div class="set-reps time-set'+(done?' done-t':'')+'" id="rp_'+k+'" onclick="toggleSetTimer(\''+k+'\','+minT+','+maxT+',\''+set.r+'\',\''+ex.id+'\','+si+')"><span>▶</span> <span id="rtxt_'+k+'">'+set.r+'</span></div>';
      } else {
        repsHtml = '<div style="display:flex;align-items:center;gap:4px;justify-content:center"><div style="font-size:10px;color:var(--text3);width:28px;text-align:right;line-height:1">'+set.r+'</div><input class="w-inp'+(rv?' hv':'')+'" style="width:40px;padding:0 4px;text-align:center" type="number" inputmode="decimal" placeholder="повт" value="'+(rv||'')+'" id="rinp_'+k+'" oninput="onRInp(\''+k+'\',\''+ex.id+'\',\''+ex.name+'\','+si+',this.value)" onchange="onRChange(\''+k+'\',\''+ex.id+'\',\''+ex.name+'\','+si+',this.value)" onfocus="scr(this)"></div>';
      }

      setsHtml+='<div class="set-row'+(done?' done':'')+'" id="row_'+k+'">' +
        '<div class="set-num"><span>'+(si+1)+'</span>'+markerHtml+'</div>' +
        repsHtml +
        '<div>'+(noW
          ? '<div style="text-align:center;font-size:12px;color:var(--text3)">—</div>'
          : '<input class="w-inp'+(wv?' hv':'')+'" type="number" inputmode="decimal" placeholder="кг" value="'+wv+'" id="inp_'+k+'" oninput="onWInp(\''+k+'\',\''+ex.id+'\',\''+ex.name+'\','+si+',this.value)" onchange="onWChange(\''+k+'\',\''+ex.id+'\',\''+ex.name+'\','+si+',this.value)" onfocus="scr(this)">'
        )+'</div>' +
        '<div class="diff-wrap">' +
          '<div class="d-btn down'+(diff==='down'?' active':'')+'" id="d_down_'+k+'" onclick="togD(\''+ex.id+'\',\''+ex.name+'\','+si+',\'down\')">↓</div>' +
          '<div class="d-btn ok'+(diff==='ok'?' active':'')+'" id="d_ok_'+k+'" onclick="togD(\''+ex.id+'\',\''+ex.name+'\','+si+',\'ok\')">✓</div>' +
          '<div class="d-btn up'+(diff==='up'?' active':'')+'" id="d_up_'+k+'" onclick="togD(\''+ex.id+'\',\''+ex.name+'\','+si+',\'up\')">↑</div>' +
        '</div>' +
      '</div>';
    });
    
    var prevStats = '';
    if (gw0.w || gw0.r) {
      prevStats = '<div style="font-size:12px;color:var(--text3);margin-top:-3px;margin-bottom:8px">Прошлый раз: '+(gw0.w?gw0.w+' кг':'')+(gw0.w&&gw0.r?' × ':'')+(gw0.r?gw0.r+' повт':'')+'</div>';
    }

    html+='<div class="ex-block">' +
      '<div class="ex-hdr">' +
        '<div style="display:flex;justify-content:space-between;align-items:center">' +
          '<div class="ex-num">Упражнение '+(ei+1)+' из '+w.exs.length+'</div>' +
          '<button onclick="openReplaceModal('+ei+')" style="background:none;border:none;color:var(--accent);font-size:12px;font-weight:600;cursor:pointer;padding:4px">🔄 Заменить</button>' +
        '</div>' +
        '<div class="ex-name">'+ex.name+'</div>' +
        (ex.ss?'<div class="superset-tag">'+ex.ss+'</div>':'') +
        (ex.note?'<div class="ex-note">💡 '+ex.note+'</div>':'') +
        prevStats +
      '</div>' +
      '<div class="sets-tbl">' +
        '<div class="sets-hdr"><div class="ch">#</div><div style="text-align:center">Повторения</div><div class="ch">Вес</div><div style="text-align:center">↓ ✓ ↑</div></div>' +
        setsHtml +
      '</div></div>';
  });
  document.getElementById('exs-wrap').innerHTML=html;
}

function togD(exId, exName, si, d) {
  var k=exId+'_'+si;
  var st=AppState.wState[k]||{};
  var isSame = st.diff === d;
  var nd = !isSame;
  var newD = nd ? d : null;
  AppState.wState[k]=Object.assign({},st,{done:nd, diff:newD});
  
  var row=document.getElementById('row_'+k);
  var rp=document.getElementById('rp_'+k);
  if(row) row.classList.toggle('done',nd);
  if(rp) rp.classList.toggle('done-t',nd);

  ['down','ok','up'].forEach(function(x){
    var btn=document.getElementById('d_'+x+'_'+k);
    if(btn) btn.classList.toggle('active', x===newD);
  });

  if(nd && !tRunning && tSecs===0) timerStart();
  saveWS();
  updateFinBtn();
  
  if(nd) {
    playSound('init');
    startRest(newD);
    var inp=document.getElementById('inp_'+k);
    var rinp=document.getElementById('rinp_'+k);
    var wv = inp ? inp.value : undefined;
    var rv = rinp ? rinp.value : undefined;
    if((wv || rv) && newD) saveUW(exName, si, wv, newD, rv);
  }
}

function getMaxW() {
  return Storage.get('max_w', {});
}
function onWInp(k, exId, exName, si, v) {
  var st=AppState.wState[k]||{};
  AppState.wState[k]=Object.assign({},st,{weight:v});
  var inp=document.getElementById('inp_'+k);
  if(inp) {
    inp.classList.toggle('hv',!!v);
    var mw = getMaxW()[exName] || 0;
    var numV = parseFloat(v);
    inp.classList.toggle('pr-glow', v && !isNaN(numV) && numV > mw && mw > 0);
  }
  saveWS();
}

function onWChange(k, exId, exName, si, v) {
  var st=AppState.wState[k]||{};
  if(v) {
    var rinp=document.getElementById('rinp_'+k);
    var rv = rinp ? rinp.value : undefined;
    saveUW(exName, si, v, st.diff, rv);
    var ex = AppState.curWorkout.exs.find(function(e){return e.id===exId;});
    if (ex) {
      for(var i=si+1; i<ex.sets.length; i++) {
        var nK = exId+'_'+i;
        var nSt = AppState.wState[nK] || {};
        if (!nSt.weight) {
           var nInp = document.getElementById('inp_'+nK);
           if (nInp && !nInp.value) {
              nInp.value = v;
              nInp.classList.add('hv');
              AppState.wState[nK] = Object.assign({}, nSt, {weight: v});
              var nrinp = document.getElementById('rinp_'+nK);
              var nrv = nrinp ? nrinp.value : undefined;
              saveUW(exName, i, v, nSt.diff, nrv);
           }
        }
      }
      saveWS();
    }
  }
}

function onRInp(k, exId, exName, si, v) {
  var st=AppState.wState[k]||{};
  AppState.wState[k]=Object.assign({},st,{reps:v});
  var inp=document.getElementById('rinp_'+k);
  if(inp) inp.classList.toggle('hv',!!v);
  saveWS();
}

function onRChange(k, exId, exName, si, v) {
  var st=AppState.wState[k]||{};
  if(v) {
    var winp=document.getElementById('inp_'+k);
    var wv = winp ? winp.value : undefined;
    saveUW(exName, si, wv, st.diff, v);
    var ex = AppState.curWorkout.exs.find(function(e){return e.id===exId;});
    if (ex) {
      for(var i=si+1; i<ex.sets.length; i++) {
        var nK = exId+'_'+i;
        var nSt = AppState.wState[nK] || {};
        if (!nSt.reps) {
           var nInp = document.getElementById('rinp_'+nK);
           if (nInp && !nInp.value) {
              nInp.value = v;
              nInp.classList.add('hv');
              AppState.wState[nK] = Object.assign({}, nSt, {reps: v});
              var nwinp = document.getElementById('inp_'+nK);
              var nwv = nwinp ? nwinp.value : undefined;
              saveUW(exName, i, nwv, nSt.diff, v);
           }
        }
      }
      saveWS();
    }
  }
}

function scr(el) {
  /* browser handles scroll automatically when keyboard opens */
}

function updateFinBtn() {
  var total=AppState.curWorkout.exs.reduce(function(s,e){return s+e.sets.length;},0);
  var done=0;
  Object.keys(AppState.wState).forEach(function(k){if(AppState.wState[k].done) done++;});
  var btn=document.getElementById('finish-btn');
  var allD = (done===total && total>0);
  btn.textContent=allD ? '🏆 Все подходы выполнены!' : 'Завершить тренировку ('+done+'/'+total+')';
  if(allD) btn.classList.add('all-done'); else btn.classList.remove('all-done');
}

function confirmReset() {
  if(confirm('Сбросить прогресс этой тренировки?')){
    AppState.wState={};saveWS();timerReset();renderExs();updateFinBtn();showToast('Прогресс сброшен');
  }
}

// ─────────────────────────────────────────
// TIMER
// ─────────────────────────────────────────
function timerStart() {
  if(tRunning) return;
  tRunning=true;
  tInterval=setInterval(function(){tSecs++;updTimer();},1000);
  var btn=document.getElementById('tplay');
  btn.textContent='⏸'; btn.className='tbtn pause';
  document.getElementById('timer-val').className='timer-val running';
}
function timerPause() {
  if(!tRunning) return;
  tRunning=false; clearInterval(tInterval); tInterval=null;
  var btn=document.getElementById('tplay');
  btn.textContent='▶'; btn.className='tbtn play';
  document.getElementById('timer-val').className='timer-val';
}
function timerToggle(){tRunning?timerPause():timerStart();}
function timerReset(){timerPause();tSecs=0;updTimer();document.getElementById('rest-fill').style.width='0%';}
function stopTimer(){timerPause();}
function updTimer(){
  var m=Math.floor(tSecs/60), s=tSecs%60;
  document.getElementById('timer-val').textContent=(m<10?'0':'')+m+':'+(s<10?'0':'')+s;
}

// ─────────────────────────────────────────
// FINISH
// ─────────────────────────────────────────
function finishWorkout() {
  timerPause();
  relWL();
  playSound('tada');
  var total=AppState.curWorkout.exs.reduce(function(s,e){return s+e.sets.length;},0);
  var done=0;
  Object.keys(AppState.wState).forEach(function(k){if(AppState.wState[k].done) done++;});
  var doneExs=AppState.curWorkout.exs.filter(function(ex){
    return ex.sets.every(function(s,si){var k=ex.id+'_'+si;return AppState.wState[k]&&AppState.wState[k].done;});
  }).length;
  var m=Math.floor(tSecs/60), s=tSecs%60;
  var totalTonnage = parseFloat(Storage.getStr('tonnage')) || 0;
  var mw = getMaxW();
  var newPRs = 0;
  var curTonnage = 0;

  AppState.curWorkout.exs.forEach(function(ex) {
    var exMax = mw[ex.id] || 0;
    var hitPR = false;
    ex.sets.forEach(function(s, si) {
      var k = ex.id + '_' + si;
      if (AppState.wState[k] && AppState.wState[k].done && AppState.wState[k].weight) {
        var w = parseFloat(AppState.wState[k].weight) || 0;
        var rStr = AppState.wState[k].reps || s.r || s;
        var reps = parseInt(rStr) || 0;
        if(isNaN(curTonnage)) curTonnage = 0; // fallback if already NaN
        curTonnage += w * reps;
        if (w > exMax) { exMax = w; hitPR = true; }
      }
    });
    if (hitPR && mw[ex.id] > 0) newPRs++;
    if (exMax > (mw[ex.id] || 0)) mw[ex.id] = exMax;
  });

  Storage.set('max_w', mw);
  Storage.setStr('tonnage', totalTonnage + curTonnage);
  updateGreeting();

  document.getElementById('c-sets').textContent=done;
  document.getElementById('c-time').textContent=m+':'+(s<10?'0':'')+s;
  document.getElementById('c-exs').textContent=doneExs;
  
  var prEl = document.getElementById('c-prs');
  if(prEl) {
    if(newPRs > 0) {
      prEl.innerHTML = '🏆 Новых рекордов: <span>'+newPRs+'</span>';
      prEl.style.display = 'block';
    } else {
      prEl.style.display = 'none';
    }
  }

  document.getElementById('c-sub').textContent=AppState.curWorkout.label+' · Неделя '+AppState.curWeek;
  Storage.setStr('finished_'+AppState.P.instanceId+'_'+AppState.curWorkout.id+'_w'+AppState.curWeek, 'true');
  saveHistory({wid:AppState.curWorkout.id+'_w'+AppState.curWeek,label:AppState.curWorkout.label+' (Неделя '+AppState.curWeek+')',month:AppState.curMonth.title,color:AppState.curMonth.color,date:new Date().toISOString(),done:done,total:total,mins:m,exs:doneExs,tonnage:curTonnage});
  var aiBtn = document.getElementById('c-ai-btn');
  if(aiBtn) aiBtn.style.display = Storage.getStr('gemini_key') ? 'block' : 'none';
  document.getElementById('c-overlay').classList.add('show');
}
function closeComplete(){document.getElementById('c-overlay').classList.remove('show');goMonth();}

// ─────────────────────────────────────────
// HISTORY
// ─────────────────────────────────────────
function renderHistory() {
  var h=getHistory();
  document.getElementById('hist-sub').textContent=h.length+' тренировок выполнено';
  if(h.length===0){
    document.getElementById('hist-list').innerHTML='<div class="empty-state"><div class="empty-icon">📋</div><div class="empty-title">История пуста</div><div class="empty-sub">Завершённые тренировки будут отображаться здесь</div></div>';
    return;
  }
  var html='';
  h.forEach(function(e){
    var d=new Date(e.date);
    var ds=d.toLocaleDateString('ru-RU',{weekday:'short',day:'numeric',month:'short'});
    var ts=d.toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'});
    html+='<div class="hist-card">' +
      '<div class="hist-dot" style="background:'+e.color+'"></div>' +
      '<div class="hist-info"><div class="hist-name">'+e.label+'</div><div class="hist-date">'+e.month+' · '+ds+', '+ts+'</div></div>' +
      '<div class="hist-badge">'+e.done+'/'+e.total+'</div>' +
    '</div>';
  });
  document.getElementById('hist-list').innerHTML=html;
}
function clearHistory(){
  if(confirm('Очистить всю историю?')){
    Storage.remove('wh');
    renderHistory(); showToast('История очищена');
  }
}

// ─────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────
var toastT;
function showToast(msg){
  var t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(toastT);
  toastT=setTimeout(function(){t.classList.remove('show');},2000);
}

// ─────────────────────────────────────────
// INIT
// ─────────────────────────────────────────
function updateGreeting() {
  var h = getHistory();
  var changed = false;
  var totalTon = 0;
  h.forEach(function(x) {
    if (isNaN(x.tonnage) || !x.tonnage) {
      // Recovery
      var wsStr = localStorage.getItem('ws_prog_default_1_' + x.wid) || localStorage.getItem('ws_' + x.wid);
      if(wsStr) {
        try {
          var ws = JSON.parse(wsStr);
          var curT = 0;
          Object.keys(ws).forEach(function(k) {
            if(ws[k].done && ws[k].weight) {
              var w = parseFloat(ws[k].weight) || 0;
              var reps = parseInt(ws[k].reps) || 10;
              curT += w * reps;
            }
          });
          if(curT > 0) { x.tonnage = curT; changed = true; }
        } catch(e){}
      }
    }
    totalTon += (x.tonnage || 0);
  });
  if(changed) {
    localStorage.setItem('wh', JSON.stringify(h));
    Storage.setStr('tonnage', totalTon);
  }

  var nm = Storage.getStr('profName') || '';
  var el = document.getElementById('greet-title');
  if(el) el.textContent = nm ? 'Привет, ' + nm + '! 👋' : 'Программа тренировок';
  var pn = document.getElementById('prof-name');
  if(pn && !pn.value && nm) pn.value = nm;
  var tonEl = document.getElementById('prof-tonnage');
  var wEl = document.getElementById('prof-workouts');
  if(tonEl) {
    var ton = parseFloat(Storage.getStr('tonnage')) || 0;
    tonEl.textContent = (ton/1000).toFixed(1);
  }
  if(wEl) wEl.textContent = h.length;
  var gkEl = document.getElementById('gemini-key');
  if(gkEl && !gkEl.value) { var gk = Storage.getStr('gemini_key'); if(gk) gkEl.value = gk; }
  var ch = document.getElementById('prof-chart');
  if(ch) {
    var chData = h.filter(function(x){return x.tonnage>0;}).slice(0,5).reverse();
    if(chData.length===0) {
      ch.innerHTML='<div style="color:var(--text3);font-size:12px">Пока нет данных для графика</div>';
    } else {
      var maxT = Math.max.apply(null, chData.map(function(x){return x.tonnage;}));
      ch.innerHTML = chData.map(function(x) {
        var hP = Math.max(10, Math.floor((x.tonnage / maxT) * 100));
        return '<div class="chart-bar" style="height:'+hP+'%"><div class="chart-lbl">'+(x.tonnage/1000).toFixed(1)+'</div></div>';
      }).join('');
    }
  }
}
function setTheme(c1, c2) {
  document.documentElement.style.setProperty('--accent', c1);
  document.documentElement.style.setProperty('--accent2', c2);
  Storage.setStr('theme_c1', c1);
  Storage.setStr('theme_c2', c2);
}
var sc1=Storage.getStr('theme_c1'), sc2=Storage.getStr('theme_c2');
if(sc1&&sc2){setTheme(sc1,sc2);}

function saveApiKey(v) {
  Storage.setStr('gemini_key', v.trim());
}
function toggleKeyVisibility() {
  var inp = document.getElementById('gemini-key');
  var eye = document.getElementById('key-eye');
  if(!inp) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
  eye.textContent = inp.type === 'password' ? '👁' : '🙈';
}
async function runAiAnalysis() {
  var key = Storage.getStr('gemini_key') || '';
  if(!key) {
    showToast('Добавь Gemini API ключ в Профиле!');
    return;
  }
  var h = getHistory().slice(0, 10);
  if(h.length === 0) {
    showToast('Пока нет истории тренировок для анализа.');
    return;
  }
  var totalTon = parseFloat(Storage.getStr('tonnage')) || 0;
  var mw = getMaxW();
  var nm = Storage.getStr('profName') || 'Атлет';
  var histStr = h.map(function(x, i) {
    return (i+1)+'. '+x.label+' ('+new Date(x.date).toLocaleDateString('ru')+') — '+
      x.done+'/'+x.total+' подходов, '+x.mins+' мин'+(x.tonnage?', тоннаж '+Math.round(x.tonnage)+'кг':'');
  }).join('\n');
  var prStr = Object.keys(mw).length > 0
    ? 'Рекорды: ' + Object.keys(mw).slice(0,5).map(function(k){ return k+' = '+mw[k]+'кг'; }).join(', ')
    : '';
  var prompt = 'Ты профессиональный тренер. Обращайся к пользователю по имени ' + nm + '.\n' +
    'Вот последние тренировки:\n' + histStr + '\n' +
    'Общий тоннаж: ' + (totalTon/1000).toFixed(1) + ' тонн. ' + prStr + '\n\n' +
    'Дай краткий, конкретный и мотивирующий анализ прогресса на русском языке (4-6 предложений): ' +
    'что хорошо, что можно улучшить, и один практический совет на следующую тренировку.';
  var modal = document.getElementById('ai-modal');
  var txt = document.getElementById('ai-text');
  txt.textContent = '⏳ Gemini думает...';
  modal.style.display = 'flex';
  try {
    var resp = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': key
        },
        body: JSON.stringify({contents:[{parts:[{text: prompt}]}]})
      }
    );
    var data = await resp.json();
    if(data.candidates && data.candidates[0] && data.candidates[0].content) {
      txt.textContent = data.candidates[0].content.parts[0].text;
    } else if(data.error) {
      txt.textContent = '❌ Ошибка: ' + data.error.message;
    } else {
      txt.textContent = '❌ Неожиданный ответ от API.';
    }
  } catch(e) {
    txt.textContent = '❌ Не удалось подключиться. Проверь интернет и ключ.';
  }
}
function saveName(v) {
  Storage.setStr('profName', v.trim());
  updateGreeting();
}
updateGreeting();
renderProgramsList();

if(history.replaceState) history.replaceState({s: 'home'}, '');
window.addEventListener('popstate', function(e) {
  var cov = document.getElementById('c-overlay');
  if(cov) cov.classList.remove('show');
  if(e.state && e.state.s) {
    var s = e.state.s;
    showScreen(s, true);
    document.querySelectorAll('.nav-item').forEach(function(n){n.classList.remove('active');});
    if(s==='home-screen' || s==='home') { renderProgramsList(); document.getElementById('nav-home').classList.add('active'); }
    else if(s==='library') { renderLibrary(); document.getElementById('nav-lib').classList.add('active'); }
    else if(s==='history-screen') { renderHistory(); document.getElementById('nav-hist').classList.add('active'); }
    else if(s==='profile-screen') { document.getElementById('nav-prof').classList.add('active'); }
  }
});

async function checkForUpdates() {
    try {
        const res = await fetch('./version.json?t=' + Date.now());
        if (!res.ok) return;
        const data = await res.json();
        
        const currentVersion = Storage.getStr('appVersion') || '0.0.1';
        
        const appVersionEl = document.getElementById('app-version');
        if(appVersionEl && data.version) {
            appVersionEl.textContent = 'v' + data.version;
        }

        if (data.version !== currentVersion) {
            Storage.setStr('pendingChangelog', data.changelog || '');
            Storage.setStr('pendingVersion', data.version);
            const span = document.getElementById('newVersionSpan');
            if (span) span.textContent = 'v' + data.version;
            document.getElementById('updatePromptModal').classList.add('show');
        }
    } catch(e) {
        console.error('Update check failed', e);
    }
}

function checkChangelog() {
    const pendingChangelog = Storage.getStr('pendingChangelog');
    const pendingVersion = Storage.getStr('pendingVersion');
    if (pendingChangelog && pendingVersion) {
        Storage.setStr('appVersion', pendingVersion);
        
        const versionSpan = document.getElementById('changelogVersionSpan');
        if(versionSpan) versionSpan.textContent = 'v' + pendingVersion;
        
        const textEl = document.getElementById('changelogText');
        if(textEl) textEl.textContent = pendingChangelog;
        
        document.getElementById('changelogModal').classList.add('show');
        
        Storage.remove('pendingChangelog');
        Storage.remove('pendingVersion');
    } else if (!Storage.getStr('appVersion')) {
        Storage.setStr('appVersion', '0.0.1');
    }
}

checkChangelog();
checkForUpdates();

// FEEDBACK LOGIC
function closeFeedback() {
    document.getElementById('feedbackModal').classList.remove('show');
    document.getElementById('feedbackTextarea').value = '';
    document.getElementById('feedbackImageInput').value = '';
    document.getElementById('feedbackImagePreview').src = '';
    document.getElementById('feedbackImagePreview').style.display = 'none';
}

document.getElementById('feedbackImageInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(evt) {
            document.getElementById('feedbackImagePreview').src = evt.target.result;
            document.getElementById('feedbackImagePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

async function sendFeedback() {
    var text = document.getElementById('feedbackTextarea').value.trim();
    var file = document.getElementById('feedbackImageInput').files[0];
    if (!text && !file) return;
    
    if (navigator.vibrate) navigator.vibrate(30);
    var btn = document.getElementById('sendFeedbackBtn');
    btn.textContent = 'Отправка...';
    btn.style.opacity = '0.5';

    var token = '8913559777:AAFdTyeWU91lq-kfGVVakTF66r50tfHGOpQ';
    var chatId = '660179360';
    var caption = '🚨 Фидбек из Workout Tracker:\n\n' + text;

    try {
        if (file) {
            var formData = new FormData();
            formData.append('chat_id', chatId);
            formData.append('caption', caption);
            formData.append('photo', file);
            
            await fetch('https://api.telegram.org/bot' + token + '/sendPhoto', {
                method: 'POST',
                body: formData
            });
        } else {
            var msg = encodeURIComponent(caption);
            await fetch('https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + chatId + '&text=' + msg);
        }
        showToast('Отправлено! Спасибо!');
        closeFeedback();
    } catch (e) {
        showToast('Ошибка отправки =(');
    } finally {
        btn.textContent = 'Отправить';
        btn.style.opacity = '1';
    }
}

// Register service worker for offline use
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(reg) {
      // SW registered
    }).catch(function(){});
  });
}
