// ─────────────────────────────────────────
// PROGRAM DATA
// ─────────────────────────────────────────
var P = {
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
};

// ─────────────────────────────────────────
// STATE
// ─────────────────────────────────────────
var curMonth = null, curWorkout = null, curWeek = null, wState = {};
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
      if(!wState[k] || !wState[k].done) togD(exId, si, 'ok');
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
  wState.notes = v;
  saveWS();
}

// ─────────────────────────────────────────
// STORAGE
// ─────────────────────────────────────────
function saveWS() {
  if (!curWorkout || !curWeek) return;
  try { localStorage.setItem('ws_'+curWorkout.id+'_w'+curWeek, JSON.stringify(wState)); } catch(e){}
}
function loadWS(id) {
  try { var r=localStorage.getItem('ws_'+id); return r?JSON.parse(r):{}; } catch(e){ return {}; }
}
function getWeights() {
  try { var r=localStorage.getItem('uw'); return r?JSON.parse(r):{}; } catch(e){ return {}; }
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
    localStorage.setItem('uw', JSON.stringify(w));
  } catch(e){}
}
function getHistory() {
  try { var r=localStorage.getItem('wh'); return r?JSON.parse(r):[]; } catch(e){ return []; }
}
function saveHistory(e) {
  try {
    var h=getHistory(); h.unshift(e);
    localStorage.setItem('wh', JSON.stringify(h.slice(0,100)));
  } catch(ex){}
}
function getProgress(monthId) {
  var m=P.months.find(function(x){return x.id===monthId;});
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
  if(tab==='home'){renderHome();showScreen('home');document.getElementById('nav-home').classList.add('active');}
  else if(tab==='library'){renderLibrary();showScreen('library-screen');document.getElementById('nav-lib').classList.add('active');}
  else if(tab==='history'){renderHistory();showScreen('history-screen');document.getElementById('nav-hist').classList.add('active');}
  else if(tab==='profile'){showScreen('profile-screen');document.getElementById('nav-prof').classList.add('active');}
}

function renderLibrary() {
  var exsMap = {};
  P.months.forEach(function(m){
    m.workouts.forEach(function(w){
      w.exs.forEach(function(ex){
        if (!exsMap[ex.name]) {
          exsMap[ex.name] = { count: 0, note: ex.note };
        }
        exsMap[ex.name].count++;
      });
    });
  });
  
  var sortedExs = Object.keys(exsMap).sort();
  var uw = getWeights();
  var html = '<div style="color:var(--text2);font-size:14px;margin-top:-20px;margin-bottom:5px">Всего уникальных упражнений: '+sortedExs.length+'</div>';
  
  sortedExs.forEach(function(name) {
    var ex = exsMap[name];
    var globalStats = uw[name];
    var statText = 'Нет данных о тренировках';
    
    if (globalStats && globalStats.length > 0) {
      var lastSet = null;
      for(var i=globalStats.length-1; i>=0; i--) {
        if(globalStats[i] && (globalStats[i].w || globalStats[i].r)) { lastSet = globalStats[i]; break; }
      }
      if (!lastSet && globalStats[0]) lastSet = globalStats[0];
      
      if (lastSet && (lastSet.w || lastSet.r)) {
         statText = 'Последний результат: ' + (lastSet.w ? lastSet.w + ' кг' : '') + (lastSet.w && lastSet.r ? ' × ' : '') + (lastSet.r ? lastSet.r + ' повт' : '');
      }
    }
    
    html += '<div style="background:var(--card);border-radius:var(--radius-sm);border:1px solid var(--border);padding:15px">' +
      '<div style="font-weight:700;font-size:16px;margin-bottom:6px">'+name+'</div>' +
      (ex.note ? '<div style="font-size:13px;color:var(--text2);margin-bottom:8px">💡 '+ex.note+'</div>' : '') +
      '<div style="font-size:13px;color:var(--accent);font-weight:600">'+statText+'</div>' +
    '</div>';
  });
  
  document.getElementById('lib-list').innerHTML = html;
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
function goHome(){relWL();navTo('home');}
function goMonth(){relWL();stopTimer();renderMonth(curMonth);showScreen('month-screen');}

// ─────────────────────────────────────────
// HOME
// ─────────────────────────────────────────
function renderHome() {
  var html='';
  P.months.forEach(function(m){
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
  curMonth=P.months.find(function(m){return m.id===mid;});
  if(!curMonth) return;
  renderMonth(curMonth);
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
      var isFinished = localStorage.getItem('finished_'+w.id+'_w'+wk) === 'true';
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
  P.months.forEach(function(mo){mo.workouts.forEach(function(wo){if(wo.id===wid){m=mo;w=wo;}});});
  if(!w) return;
  curMonth=m; curWorkout=w; curWeek=wk; wState=loadWS(wid+'_w'+wk);
  document.getElementById('ws-title').textContent=w.label;
  document.getElementById('ws-sub').textContent=m.title+' · Неделя '+wk;
  document.getElementById('warmup-text').textContent=w.warm;
  document.getElementById('cooldown-text').textContent=w.cool;
  document.getElementById('workout-notes').value = wState.notes || '';
  timerReset();
  stopRest();
  renderExs();
  updateFinBtn();
  showScreen('workout-screen');
  reqWL();
}

function renderExs() {
  var m=curMonth, w=curWorkout;
  var uw=getWeights();
  var html='';
  w.exs.forEach(function(ex,ei){
    var arr = uw[ex.name]; // Global by name
    var isArr = Array.isArray(arr);

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
      var st=wState[k]||{};
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
    if (gw && (gw.w || gw.r)) {
      prevStats = '<div style="font-size:12px;color:var(--text3);margin-top:-3px;margin-bottom:8px">Прошлый раз: '+(gw.w?gw.w+' кг':'')+(gw.w&&gw.r?' × ':'')+(gw.r?gw.r+' повт':'')+'</div>';
    }

    html+='<div class="ex-block">' +
      '<div class="ex-hdr">' +
        '<div class="ex-num">Упражнение '+(ei+1)+' из '+w.exs.length+'</div>' +
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
  var st=wState[k]||{};
  var isSame = st.diff === d;
  var nd = !isSame;
  var newD = nd ? d : null;
  wState[k]=Object.assign({},st,{done:nd, diff:newD});
  
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
  try { return JSON.parse(localStorage.getItem('max_w')) || {}; } catch(e){ return {}; }
}
function onWInp(k, exId, exName, si, v) {
  var st=wState[k]||{};
  wState[k]=Object.assign({},st,{weight:v});
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
  var st=wState[k]||{};
  if(v) {
    var rinp=document.getElementById('rinp_'+k);
    var rv = rinp ? rinp.value : undefined;
    saveUW(exName, si, v, st.diff, rv);
    var ex = curWorkout.exs.find(function(e){return e.id===exId;});
    if (ex) {
      for(var i=si+1; i<ex.sets.length; i++) {
        var nK = exId+'_'+i;
        var nSt = wState[nK] || {};
        if (!nSt.weight) {
           var nInp = document.getElementById('inp_'+nK);
           if (nInp && !nInp.value) {
              nInp.value = v;
              nInp.classList.add('hv');
              wState[nK] = Object.assign({}, nSt, {weight: v});
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
  var st=wState[k]||{};
  wState[k]=Object.assign({},st,{reps:v});
  var inp=document.getElementById('rinp_'+k);
  if(inp) inp.classList.toggle('hv',!!v);
  saveWS();
}

function onRChange(k, exId, exName, si, v) {
  var st=wState[k]||{};
  if(v) {
    var winp=document.getElementById('inp_'+k);
    var wv = winp ? winp.value : undefined;
    saveUW(exName, si, wv, st.diff, v);
    var ex = curWorkout.exs.find(function(e){return e.id===exId;});
    if (ex) {
      for(var i=si+1; i<ex.sets.length; i++) {
        var nK = exId+'_'+i;
        var nSt = wState[nK] || {};
        if (!nSt.reps) {
           var nInp = document.getElementById('rinp_'+nK);
           if (nInp && !nInp.value) {
              nInp.value = v;
              nInp.classList.add('hv');
              wState[nK] = Object.assign({}, nSt, {reps: v});
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
  var total=curWorkout.exs.reduce(function(s,e){return s+e.sets.length;},0);
  var done=0;
  Object.keys(wState).forEach(function(k){if(wState[k].done) done++;});
  var btn=document.getElementById('finish-btn');
  var allD = (done===total && total>0);
  btn.textContent=allD ? '🏆 Все подходы выполнены!' : 'Завершить тренировку ('+done+'/'+total+')';
  if(allD) btn.classList.add('all-done'); else btn.classList.remove('all-done');
}

function confirmReset() {
  if(confirm('Сбросить прогресс этой тренировки?')){
    wState={};saveWS();timerReset();renderExs();updateFinBtn();showToast('Прогресс сброшен');
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
  var total=curWorkout.exs.reduce(function(s,e){return s+e.sets.length;},0);
  var done=0;
  Object.keys(wState).forEach(function(k){if(wState[k].done) done++;});
  var doneExs=curWorkout.exs.filter(function(ex){
    return ex.sets.every(function(s,si){var k=ex.id+'_'+si;return wState[k]&&wState[k].done;});
  }).length;
  var m=Math.floor(tSecs/60), s=tSecs%60;
  var totalTonnage = parseFloat(localStorage.getItem('tonnage')) || 0;
  var mw = getMaxW();
  var newPRs = 0;
  var curTonnage = 0;

  curWorkout.exs.forEach(function(ex) {
    var exMax = mw[ex.id] || 0;
    var hitPR = false;
    ex.sets.forEach(function(s, si) {
      var k = ex.id + '_' + si;
      if (wState[k] && wState[k].done && wState[k].weight) {
        var w = parseFloat(wState[k].weight) || 0;
        var reps = parseInt(s) || 0;
        curTonnage += w * reps;
        if (w > exMax) { exMax = w; hitPR = true; }
      }
    });
    if (hitPR && mw[ex.id] > 0) newPRs++;
    if (exMax > (mw[ex.id] || 0)) mw[ex.id] = exMax;
  });

  localStorage.setItem('max_w', JSON.stringify(mw));
  localStorage.setItem('tonnage', totalTonnage + curTonnage);
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

  document.getElementById('c-sub').textContent=curWorkout.label+' · Неделя '+curWeek;
  localStorage.setItem('finished_'+curWorkout.id+'_w'+curWeek, 'true');
  saveHistory({wid:curWorkout.id+'_w'+curWeek,label:curWorkout.label+' (Неделя '+curWeek+')',month:curMonth.title,color:curMonth.color,date:new Date().toISOString(),done:done,total:total,mins:m,exs:doneExs,tonnage:curTonnage});
  var aiBtn = document.getElementById('c-ai-btn');
  if(aiBtn) aiBtn.style.display = localStorage.getItem('gemini_key') ? 'block' : 'none';
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
    try{localStorage.removeItem('wh');}catch(e){}
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
  var nm = localStorage.getItem('profName') || '';
  var el = document.getElementById('greet-title');
  if(el) el.textContent = nm ? 'Привет, ' + nm + '! 👋' : 'Программа тренировок';
  var pn = document.getElementById('prof-name');
  if(pn && !pn.value && nm) pn.value = nm;
  var tonEl = document.getElementById('prof-tonnage');
  var wEl = document.getElementById('prof-workouts');
  if(tonEl) {
    var ton = parseFloat(localStorage.getItem('tonnage')) || 0;
    tonEl.textContent = (ton/1000).toFixed(1);
  }
  var h = getHistory();
  if(wEl) wEl.textContent = h.length;
  var gkEl = document.getElementById('gemini-key');
  if(gkEl && !gkEl.value) { var gk = localStorage.getItem('gemini_key'); if(gk) gkEl.value = gk; }
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
  localStorage.setItem('theme_c1', c1);
  localStorage.setItem('theme_c2', c2);
}
var sc1=localStorage.getItem('theme_c1'), sc2=localStorage.getItem('theme_c2');
if(sc1&&sc2){setTheme(sc1,sc2);}

function saveApiKey(v) {
  localStorage.setItem('gemini_key', v.trim());
}
function toggleKeyVisibility() {
  var inp = document.getElementById('gemini-key');
  var eye = document.getElementById('key-eye');
  if(!inp) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
  eye.textContent = inp.type === 'password' ? '👁' : '🙈';
}
async function runAiAnalysis() {
  var key = localStorage.getItem('gemini_key') || '';
  if(!key) {
    showToast('Добавь Gemini API ключ в Профиле!');
    return;
  }
  var h = getHistory().slice(0, 10);
  if(h.length === 0) {
    showToast('Пока нет истории тренировок для анализа.');
    return;
  }
  var totalTon = parseFloat(localStorage.getItem('tonnage')) || 0;
  var mw = getMaxW();
  var nm = localStorage.getItem('profName') || 'Атлет';
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
  localStorage.setItem('profName', v.trim());
  updateGreeting();
}
updateGreeting();
renderHome();

if(history.replaceState) history.replaceState({s: 'home'}, '');
window.addEventListener('popstate', function(e) {
  var cov = document.getElementById('c-overlay');
  if(cov) cov.classList.remove('show');
  if(e.state && e.state.s) {
    var s = e.state.s;
    showScreen(s, true);
    document.querySelectorAll('.nav-item').forEach(function(n){n.classList.remove('active');});
    if(s==='home') { renderHome(); document.getElementById('nav-home').classList.add('active'); }
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
        
        const currentVersion = localStorage.getItem('appVersion') || '0.0.1';
        
        const appVersionEl = document.getElementById('app-version');
        if(appVersionEl && data.version) {
            appVersionEl.textContent = 'v' + data.version;
        }

        if (data.version !== currentVersion) {
            localStorage.setItem('pendingChangelog', data.changelog || '');
            localStorage.setItem('pendingVersion', data.version);
            const span = document.getElementById('newVersionSpan');
            if (span) span.textContent = 'v' + data.version;
            document.getElementById('updatePromptModal').classList.add('show');
        }
    } catch(e) {
        console.error('Update check failed', e);
    }
}

function checkChangelog() {
    const pendingChangelog = localStorage.getItem('pendingChangelog');
    const pendingVersion = localStorage.getItem('pendingVersion');
    if (pendingChangelog && pendingVersion) {
        localStorage.setItem('appVersion', pendingVersion);
        
        const versionSpan = document.getElementById('changelogVersionSpan');
        if(versionSpan) versionSpan.textContent = 'v' + pendingVersion;
        
        const textEl = document.getElementById('changelogText');
        if(textEl) textEl.textContent = pendingChangelog;
        
        document.getElementById('changelogModal').classList.add('show');
        
        localStorage.removeItem('pendingChangelog');
        localStorage.removeItem('pendingVersion');
    } else if (!localStorage.getItem('appVersion')) {
        localStorage.setItem('appVersion', '0.0.1');
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
