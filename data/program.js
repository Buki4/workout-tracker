const PROGRAM = {
  meta: {
    title: "Программа тренировок",
    subtitle: "4 месяца · 3 тренировки в неделю",
  },

  months: [
    {
      id: "month1",
      title: "Месяц 1",
      subtitle: "Фулбоди — Адаптация",
      description: "Плавная работа без отказов. Исключаем полное разгибание в локтях и коленях. Жилет не используется.",
      color: "#6C63FF",
      colorDark: "#4f47cc",
      weeks: "1–4",
      workouts: [
        {
          id: "m1_a",
          label: "Вторник — Фулбоди А",
          tag: "Вт",
          tagFull: "Гантели и статика",
          warmup: "Суставная гимнастика 5 мин: круги плечами, локтями, запястьями, коленями, тазом",
          exercises: [
            {
              id: "m1a_1", name: "Кубковые приседания с гантелей",
              note: "Без полного разгибания коленей",
              sets: [
                { reps: "12–15", weight: "" }, { reps: "12–15", weight: "" }, { reps: "12–15", weight: "" }
              ]
            },
            {
              id: "m1a_2", name: "Жим гантелей лёжа на полу (Floor Press)",
              note: "Пол ограничивает амплитуду, защищая локоть",
              sets: [
                { reps: "12–15", weight: "" }, { reps: "12–15", weight: "" }, { reps: "12–15", weight: "" }
              ]
            },
            {
              id: "m1a_3", name: "Тяга гантели в наклоне с опорой на скамью",
              note: "На каждую руку",
              sets: [
                { reps: "12–15/р", weight: "" }, { reps: "12–15/р", weight: "" }, { reps: "12–15/р", weight: "" }
              ]
            },
            {
              id: "m1a_4", name: "Ягодичный мостик",
              note: "Можно положить блин на таз",
              sets: [
                { reps: "15–20", weight: "" }, { reps: "15–20", weight: "" }, { reps: "15–20", weight: "" }
              ]
            },
            {
              id: "m1a_5", name: "Классическая планка",
              note: "Не прогибать поясницу",
              sets: [
                { reps: "45–60 сек", weight: "—" }, { reps: "45–60 сек", weight: "—" }, { reps: "45–60 сек", weight: "—" }
              ]
            }
          ],
          cooldown: "Растяжка 5 мин: квадрицепс, грудь, плечи"
        },
        {
          id: "m1_b",
          label: "Четверг — Фулбоди Б",
          tag: "Чт",
          tagFull: "Штанга и база",
          warmup: "Суставная гимнастика 5 мин + лёгкие выпады на месте",
          exercises: [
            {
              id: "m1b_1", name: "Румынская тяга",
              note: "С EZ-грифом или лёгкой штангой",
              sets: [
                { reps: "12–15", weight: "" }, { reps: "12–15", weight: "" }, { reps: "12–15", weight: "" }
              ]
            },
            {
              id: "m1b_2", name: "Отжимания от скамьи",
              note: "Девушке — от спинки скамьи или с колен",
              sets: [
                { reps: "10–12", weight: "—" }, { reps: "10–12", weight: "—" }, { reps: "10–12", weight: "—" }
              ]
            },
            {
              id: "m1b_3", name: "Подтягивания (с резинкой) или тяга штанги в наклоне",
              note: "",
              sets: [
                { reps: "10–12", weight: "" }, { reps: "10–12", weight: "" }, { reps: "10–12", weight: "" }
              ]
            },
            {
              id: "m1b_4", name: "Жим гантелей сидя (плечи)",
              note: "",
              sets: [
                { reps: "12–15", weight: "" }, { reps: "12–15", weight: "" }, { reps: "12–15", weight: "" }
              ]
            },
            {
              id: "m1b_5", name: "Выпады назад",
              note: "На каждую ногу",
              sets: [
                { reps: "10–12/н", weight: "" }, { reps: "10–12/н", weight: "" }, { reps: "10–12/н", weight: "" }
              ]
            }
          ],
          cooldown: "Растяжка 5 мин: задняя поверхность бедра, плечи, широчайшие"
        },
        {
          id: "m1_c",
          label: "Пятница — Фулбоди В",
          tag: "Пт",
          tagFull: "Лёгкая закачка и канат",
          warmup: "Суставная гимнастика + кошка-корова, ходьба на месте 5 мин",
          exercises: [
            {
              id: "m1c_1", name: "Скручивания на пресс",
              note: "На коврике",
              sets: [
                { reps: "15–20", weight: "—" }, { reps: "15–20", weight: "—" }, { reps: "15–20", weight: "—" }
              ]
            },
            {
              id: "m1c_2", name: "Подъём на носки стоя (с гантелями)",
              note: "",
              sets: [
                { reps: "15–20", weight: "" }, { reps: "15–20", weight: "" }, { reps: "15–20", weight: "" }
              ]
            },
            {
              id: "m1c_3", name: "Сгибания рук молотковым хватом",
              note: "Нейтральный хват бережёт локоть, укрепляет предплечья",
              sets: [
                { reps: "15", weight: "" }, { reps: "15", weight: "" }, { reps: "15", weight: "" }
              ]
            },
            {
              id: "m1c_4", name: "Разгибания рук из-за головы с одной гантелей",
              note: "",
              sets: [
                { reps: "15", weight: "" }, { reps: "15", weight: "" }, { reps: "15", weight: "" }
              ]
            },
            {
              id: "m1c_5", name: "Канат — попеременные волны",
              note: "Мягкий финишер для кровообращения в связках плечевого пояса",
              sets: [
                { reps: "30 сек / 30 отд", weight: "—" }, { reps: "30 сек / 30 отд", weight: "—" }, { reps: "30 сек / 30 отд", weight: "—" }
              ]
            }
          ],
          cooldown: "Полная растяжка 5 мин, акцент на бёдра и плечи"
        }
      ]
    },

    {
      id: "month2",
      title: "Месяц 2",
      subtitle: "Сплит — Базовая гипертрофия",
      description: "Переход к классической технике, увеличение рабочих весов, плавное подключение жилета для микропрогрессии.",
      color: "#F97316",
      colorDark: "#c75c0a",
      weeks: "5–8",
      workouts: [
        {
          id: "m2_a",
          label: "Вторник — Грудь / Трицепс",
          tag: "Вт",
          tagFull: "Грудь / Трицепс",
          warmup: "5 мин суставная гимнастика + 2 разминочных подхода к жиму",
          exercises: [
            {
              id: "m2a_1", name: "Жим штанги лёжа на скамье",
              note: "",
              sets: [
                { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }
              ]
            },
            {
              id: "m2a_2", name: "Жим гантелей лёжа под углом / Разводка",
              note: "",
              sets: [
                { reps: "10–12", weight: "" }, { reps: "10–12", weight: "" }, { reps: "10–12", weight: "" }
              ]
            },
            {
              id: "m2a_3", name: "Отжимания на брусьях в жилете",
              note: "Начать с 5 кг. Девушке — без жилета, с резинкой",
              sets: [
                { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }
              ]
            },
            {
              id: "m2a_4", name: "Французский жим с EZ-грифом лёжа",
              note: "",
              sets: [
                { reps: "10–12", weight: "" }, { reps: "10–12", weight: "" }, { reps: "10–12", weight: "" }
              ]
            },
            {
              id: "m2a_5", name: "Отжимания от пола узким хватом",
              note: "",
              sets: [
                { reps: "макс", weight: "—" }, { reps: "макс", weight: "—" }
              ]
            }
          ],
          cooldown: "Растяжка груди и трицепса 5 мин"
        },
        {
          id: "m2_b",
          label: "Четверг — Ноги / Плечи",
          tag: "Чт",
          tagFull: "Ноги / Плечи",
          warmup: "5 мин + активация ягодиц, мобилизация бёдер",
          exercises: [
            {
              id: "m2b_1", name: "Приседания со штангой",
              note: "",
              sets: [
                { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }
              ]
            },
            {
              id: "m2b_2", name: "Выпады в движении с гантелями",
              note: "На каждую ногу",
              sets: [
                { reps: "10–12/н", weight: "" }, { reps: "10–12/н", weight: "" }, { reps: "10–12/н", weight: "" }
              ]
            },
            {
              id: "m2b_3", name: "Армейский жим стоя",
              note: "",
              sets: [
                { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }
              ]
            },
            {
              id: "m2b_4", name: "Махи гантелями в стороны стоя",
              note: "",
              sets: [
                { reps: "12–15", weight: "" }, { reps: "12–15", weight: "" }, { reps: "12–15", weight: "" }
              ]
            },
            {
              id: "m2b_5", name: "Румынская тяга со штангой",
              note: "",
              sets: [
                { reps: "10", weight: "" }, { reps: "10", weight: "" }, { reps: "10", weight: "" }
              ]
            },
            {
              id: "m2b_6", name: "Канат — двойные волны",
              note: "Финальное добивание дельт",
              sets: [
                { reps: "20 сек / 40 отд", weight: "—" }, { reps: "20 сек / 40 отд", weight: "—" }, { reps: "20 сек / 40 отд", weight: "—" }, { reps: "20 сек / 40 отд", weight: "—" }
              ]
            }
          ],
          cooldown: "Растяжка ног и плеч 5 мин"
        },
        {
          id: "m2_c",
          label: "Пятница — Спина / Бицепс",
          tag: "Пт",
          tagFull: "Спина / Бицепс",
          warmup: "5 мин + активация верха спины, активация ротаторов плеча",
          exercises: [
            {
              id: "m2c_1", name: "Подтягивания на турнике в жилете (2–5 кг)",
              note: "Широкий хват. Девушке — с резинкой",
              sets: [
                { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }
              ]
            },
            {
              id: "m2c_2", name: "Тяга штанги в наклоне",
              note: "",
              sets: [
                { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }
              ]
            },
            {
              id: "m2c_3", name: "Пулловер с одной гантелей лёжа поперёк скамьи",
              note: "",
              sets: [
                { reps: "12", weight: "" }, { reps: "12", weight: "" }, { reps: "12", weight: "" }
              ]
            },
            {
              id: "m2c_4", name: "Подъём EZ-грифа на бицепс стоя",
              note: "",
              sets: [
                { reps: "10–12", weight: "" }, { reps: "10–12", weight: "" }, { reps: "10–12", weight: "" }
              ]
            },
            {
              id: "m2c_5", name: "Сгибание рук с гантелями с супинацией",
              note: "",
              sets: [
                { reps: "10–12", weight: "" }, { reps: "10–12", weight: "" }, { reps: "10–12", weight: "" }
              ]
            }
          ],
          cooldown: "Растяжка спины и бицепса 5 мин"
        }
      ]
    },

    {
      id: "month3",
      title: "Месяц 3",
      subtitle: "Интенсивность — Суперсеты",
      description: "Повышение плотности за счёт объединения упражнений в пары. Отдых 2 мин только после завершения обоих движений. Лёгкий жилет на протяжении всего суперсета.",
      color: "#10B981",
      colorDark: "#0a8c60",
      weeks: "9–12",
      workouts: [
        {
          id: "m3_a",
          label: "Вторник — Грудь / Трицепс",
          tag: "Вт",
          tagFull: "Грудь / Трицепс · Суперсеты",
          warmup: "5 мин + 2 разминочных подхода к жиму",
          exercises: [
            {
              id: "m3a_1", name: "🔗 Суперсет 1 — Жим штанги лёжа",
              note: "4 круга. Отдых только после пары.",
              sets: [
                { reps: "10", weight: "" }, { reps: "10", weight: "" }, { reps: "10", weight: "" }, { reps: "10", weight: "" }
              ]
            },
            {
              id: "m3a_2", name: "🔗 Суперсет 1 — Разводка гантелей",
              note: "Сразу после жима без отдыха",
              sets: [
                { reps: "12", weight: "" }, { reps: "12", weight: "" }, { reps: "12", weight: "" }, { reps: "12", weight: "" }
              ]
            },
            {
              id: "m3a_3", name: "🔗 Суперсет 2 — Отжимания на брусьях в жилете (5–7 кг)",
              note: "3 круга",
              sets: [
                { reps: "10", weight: "" }, { reps: "10", weight: "" }, { reps: "10", weight: "" }
              ]
            },
            {
              id: "m3a_4", name: "🔗 Суперсет 2 — Отжимания от пола",
              note: "Максимум. Сразу после брусьев",
              sets: [
                { reps: "макс", weight: "—" }, { reps: "макс", weight: "—" }, { reps: "макс", weight: "—" }
              ]
            },
            {
              id: "m3a_5", name: "🔗 Суперсет 3 — Французский жим",
              note: "3 круга",
              sets: [
                { reps: "10", weight: "" }, { reps: "10", weight: "" }, { reps: "10", weight: "" }
              ]
            },
            {
              id: "m3a_6", name: "🔗 Суперсет 3 — Разгибание руки с гантелей в наклоне",
              note: "",
              sets: [
                { reps: "12", weight: "" }, { reps: "12", weight: "" }, { reps: "12", weight: "" }
              ]
            }
          ],
          cooldown: "Растяжка 5 мин"
        },
        {
          id: "m3_b",
          label: "Четверг — Ноги / Плечи",
          tag: "Чт",
          tagFull: "Ноги / Плечи · Суперсеты",
          warmup: "5 мин + активация ягодиц и мобилизация бёдер",
          exercises: [
            {
              id: "m3b_1", name: "🔗 Суперсет 1 — Приседания со штангой",
              note: "4 круга",
              sets: [
                { reps: "10", weight: "" }, { reps: "10", weight: "" }, { reps: "10", weight: "" }, { reps: "10", weight: "" }
              ]
            },
            {
              id: "m3b_2", name: "🔗 Суперсет 1 — Кубковые приседания",
              note: "Сразу после штанги",
              sets: [
                { reps: "12", weight: "" }, { reps: "12", weight: "" }, { reps: "12", weight: "" }, { reps: "12", weight: "" }
              ]
            },
            {
              id: "m3b_3", name: "🔗 Суперсет 2 — Жим гантелей сидя",
              note: "4 круга",
              sets: [
                { reps: "10", weight: "" }, { reps: "10", weight: "" }, { reps: "10", weight: "" }, { reps: "10", weight: "" }
              ]
            },
            {
              id: "m3b_4", name: "🔗 Суперсет 2 — Махи гантелями в стороны",
              note: "",
              sets: [
                { reps: "12", weight: "" }, { reps: "12", weight: "" }, { reps: "12", weight: "" }, { reps: "12", weight: "" }
              ]
            },
            {
              id: "m3b_5", name: "🔗 Суперсет 3 — Выпады с гантелями в жилете (5–7 кг)",
              note: "3 круга",
              sets: [
                { reps: "10/н", weight: "" }, { reps: "10/н", weight: "" }, { reps: "10/н", weight: "" }
              ]
            },
            {
              id: "m3b_6", name: "🔗 Суперсет 3 — Подъём на носки",
              note: "",
              sets: [
                { reps: "20", weight: "" }, { reps: "20", weight: "" }, { reps: "20", weight: "" }
              ]
            }
          ],
          cooldown: "Растяжка ног и плеч 5 мин"
        },
        {
          id: "m3_c",
          label: "Пятница — Спина / Бицепс",
          tag: "Пт",
          tagFull: "Спина / Бицепс · Суперсеты",
          warmup: "5 мин + активация верха спины",
          exercises: [
            {
              id: "m3c_1", name: "🔗 Суперсет 1 — Подтягивания на турнике",
              note: "4 круга",
              sets: [
                { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }, { reps: "8–10", weight: "" }
              ]
            },
            {
              id: "m3c_2", name: "🔗 Суперсет 1 — Пулловер с гантелей",
              note: "",
              sets: [
                { reps: "12", weight: "" }, { reps: "12", weight: "" }, { reps: "12", weight: "" }, { reps: "12", weight: "" }
              ]
            },
            {
              id: "m3c_3", name: "🔗 Суперсет 2 — Тяга штанги в наклоне",
              note: "4 круга",
              sets: [
                { reps: "10", weight: "" }, { reps: "10", weight: "" }, { reps: "10", weight: "" }, { reps: "10", weight: "" }
              ]
            },
            {
              id: "m3c_4", name: "🔗 Суперсет 2 — Тяга гантели одной рукой",
              note: "",
              sets: [
                { reps: "10/р", weight: "" }, { reps: "10/р", weight: "" }, { reps: "10/р", weight: "" }, { reps: "10/р", weight: "" }
              ]
            },
            {
              id: "m3c_5", name: "🔗 Суперсет 3 — Подъём EZ-грифа",
              note: "3 круга",
              sets: [
                { reps: "10", weight: "" }, { reps: "10", weight: "" }, { reps: "10", weight: "" }
              ]
            },
            {
              id: "m3c_6", name: "🔗 Суперсет 3 — Молотки с гантелями",
              note: "",
              sets: [
                { reps: "10", weight: "" }, { reps: "10", weight: "" }, { reps: "10", weight: "" }
              ]
            },
            {
              id: "m3c_7", name: "Канат — Табата",
              note: "8 раундов x 20 сек работы / 10 сек отдыха = 4 минуты",
              sets: [
                { reps: "8 раундов", weight: "—" }
              ]
            }
          ],
          cooldown: "Растяжка 5 мин"
        }
      ]
    },

    {
      id: "month4",
      title: "Месяц 4",
      subtitle: "Силовой цикл — Мощь",
      description: "Максимальный рост силы в базовых упражнениях. Жилет грузится весом для тяжёлой низкоповторной работы. Отдых 2.5–3 минуты. Канат переносится в субботний HIIT.",
      color: "#EF4444",
      colorDark: "#b91c1c",
      weeks: "13–16",
      workouts: [
        {
          id: "m4_a",
          label: "Вторник — Грудь / Трицепс",
          tag: "Вт",
          tagFull: "Грудь / Трицепс · Сила",
          warmup: "5 мин + 2–3 разминочных подхода к жиму",
          exercises: [
            {
              id: "m4a_1", name: "Жим штанги лёжа",
              note: "Тяжёлый рабочий вес штанги",
              sets: [
                { reps: "5–6", weight: "" }, { reps: "5–6", weight: "" }, { reps: "5–6", weight: "" }, { reps: "5–6", weight: "" }, { reps: "5–6", weight: "" }
              ]
            },
            {
              id: "m4a_2", name: "Отжимания на брусьях в тяжёлом жилете",
              note: "Подбирайте значительный вес жилета под указанный диапазон",
              sets: [
                { reps: "6–8", weight: "" }, { reps: "6–8", weight: "" }, { reps: "6–8", weight: "" }, { reps: "6–8", weight: "" }
              ]
            },
            {
              id: "m4a_3", name: "Жим гантелей лёжа на полу",
              note: "",
              sets: [
                { reps: "8", weight: "" }, { reps: "8", weight: "" }, { reps: "8", weight: "" }
              ]
            },
            {
              id: "m4a_4", name: "Французский жим (EZ-гриф)",
              note: "",
              sets: [
                { reps: "8", weight: "" }, { reps: "8", weight: "" }, { reps: "8", weight: "" }, { reps: "8", weight: "" }
              ]
            }
          ],
          cooldown: "Растяжка груди и трицепса 5 мин"
        },
        {
          id: "m4_b",
          label: "Четверг — Ноги / Плечи",
          tag: "Чт",
          tagFull: "Ноги / Плечи · Сила",
          warmup: "5 мин + мобилизация бёдер + 2–3 разминочных приседа",
          exercises: [
            {
              id: "m4b_1", name: "Приседания со штангой",
              note: "Тяжёлый рабочий вес",
              sets: [
                { reps: "5–6", weight: "" }, { reps: "5–6", weight: "" }, { reps: "5–6", weight: "" }, { reps: "5–6", weight: "" }, { reps: "5–6", weight: "" }
              ]
            },
            {
              id: "m4b_2", name: "Армейский жим стоя",
              note: "",
              sets: [
                { reps: "5–6", weight: "" }, { reps: "5–6", weight: "" }, { reps: "5–6", weight: "" }, { reps: "5–6", weight: "" }, { reps: "5–6", weight: "" }
              ]
            },
            {
              id: "m4b_3", name: "Болгарские сплит-приседы с гантелями",
              note: "Задняя нога зафиксирована на скамье",
              sets: [
                { reps: "8", weight: "" }, { reps: "8", weight: "" }, { reps: "8", weight: "" }
              ]
            },
            {
              id: "m4b_4", name: "Махи гантелями в стороны",
              note: "Строго за счёт дельт, без раскачки корпуса",
              sets: [
                { reps: "10", weight: "" }, { reps: "10", weight: "" }, { reps: "10", weight: "" }, { reps: "10", weight: "" }
              ]
            }
          ],
          cooldown: "Растяжка ног и плеч 5 мин"
        },
        {
          id: "m4_c",
          label: "Пятница — Спина / Бицепс",
          tag: "Пт",
          tagFull: "Спина / Бицепс · Сила",
          warmup: "5 мин + активация верха спины и ротаторов",
          exercises: [
            {
              id: "m4c_1", name: "Подтягивания на турнике в тяжёлом жилете",
              note: "Широкий хват. Девушке — с минимальной резинкой",
              sets: [
                { reps: "5–6", weight: "" }, { reps: "5–6", weight: "" }, { reps: "5–6", weight: "" }, { reps: "5–6", weight: "" }, { reps: "5–6", weight: "" }
              ]
            },
            {
              id: "m4c_2", name: "Тяга штанги в наклоне",
              note: "",
              sets: [
                { reps: "6–8", weight: "" }, { reps: "6–8", weight: "" }, { reps: "6–8", weight: "" }, { reps: "6–8", weight: "" }
              ]
            },
            {
              id: "m4c_3", name: "Румынская тяга со штангой",
              note: "",
              sets: [
                { reps: "6–8", weight: "" }, { reps: "6–8", weight: "" }, { reps: "6–8", weight: "" }, { reps: "6–8", weight: "" }
              ]
            },
            {
              id: "m4c_4", name: "Подъём EZ-грифа на бицепс",
              note: "С акцентом на медленное негативное опускание",
              sets: [
                { reps: "6–8", weight: "" }, { reps: "6–8", weight: "" }, { reps: "6–8", weight: "" }, { reps: "6–8", weight: "" }
              ]
            }
          ],
          cooldown: "Растяжка спины и бицепса 5 мин"
        }
      ]
    }
  ]
};

export default PROGRAM;
