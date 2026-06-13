import sys
import re

with open("index.html", "r") as f:
    text = f.read()

# 1. Extract `var P = { ... };`
match = re.search(r"var P = \{(.*?)\n\};", text, re.DOTALL)
if not match:
    print("FATAL: Could not find P block")
    sys.exit(1)

p_content = match.group(1)

# The default months array is inside `months: [`
months_match = re.search(r"months: \[(.*)", p_content, re.DOTALL)
months_array = "[" + months_match.group(1)

# Build the TEMPLATES string
templates_js = """const TEMPLATES = [
  {
    id: "prog_default",
    name: "Базовая программа (С гирями/гантелями)",
    days: 3,
    location: "home",
    equipment: ["dumbbells"],
    focus: "hypertrophy",
    desc: "Классическая программа на 4 месяца для плавного набора формы. Потребуются гантели или гири.",
    months: """ + months_array + """
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

var userPrograms = [];
try { userPrograms = JSON.parse(localStorage.getItem("userPrograms")) || []; } catch(e){}

if (userPrograms.length === 0) {
  var defaultProg = JSON.parse(JSON.stringify(TEMPLATES.find(function(t){return t.id === "prog_default";})));
  defaultProg.instanceId = "prog_default_1";
  userPrograms.push(defaultProg);
  localStorage.setItem("userPrograms", JSON.stringify(userPrograms));
}

var activeProgId = localStorage.getItem("activeProgId");
if (!activeProgId && userPrograms.length > 0) activeProgId = userPrograms[0].instanceId;

var P = userPrograms.find(function(p){return p.instanceId === activeProgId;}) || userPrograms[0];
"""

text = re.sub(r"var P = \{.*?\n\};", templates_js, text, flags=re.DOTALL)

# 2. Update loadWS and saveWS
text = text.replace(
    "function saveWS() {\n  if (!curWorkout || !curWeek) return;\n  try { localStorage.setItem('ws_'+curWorkout.id+'_w'+curWeek, JSON.stringify(wState)); } catch(e){}\n}",
    "function getWsKey(id) {\n  if (P.instanceId === 'prog_default_1') return 'ws_' + id;\n  return 'ws_' + P.instanceId + '_' + id;\n}\n\nfunction saveWS() {\n  if (!curWorkout || !curWeek) return;\n  try { localStorage.setItem(getWsKey(curWorkout.id+'_w'+curWeek), JSON.stringify(wState)); } catch(e){}\n}"
)

text = text.replace(
    "function loadWS(id) {\n  try { var r=localStorage.getItem('ws_'+id); return r?JSON.parse(r):{}; } catch(e){ return {}; }\n}",
    "function loadWS(id) {\n  try { var r=localStorage.getItem(getWsKey(id)); return r?JSON.parse(r):{}; } catch(e){ return {}; }\n}"
)

# 3. HTML modifications for screens
old_home_html_match = re.search(r"<!-- HOME -->(.*?)<!-- MONTH SCREEN -->", text, re.DOTALL)
if not old_home_html_match:
    print("FATAL: Could not find HOME screen")
    sys.exit(1)

old_home_html = old_home_html_match.group(1)
new_home_html = """
<!-- PROGRAMS LIST (NEW HOME) -->
<div id="home-screen" class="screen active">
  <div class="top-bar">
    <div class="tbi">
      <div class="tbi-title">Мои программы</div>
      <div class="tbi-sub">Ваши планы тренировок</div>
    </div>
  </div>
  <div style="padding:20px;padding-top:100px;display:flex;flex-direction:column;gap:15px;padding-bottom:100px" id="programs-list"></div>
</div>

<!-- PROGRAM SCREEN (OLD HOME) -->
<div id="program-screen" class="screen">
  <div class="top-bar">
    <div class="back-btn" onclick="navTo('home-screen')" style="margin-right:15px;color:var(--text);font-size:20px;background:none;border:none;">←</div>
    <div class="tbi">
      <div class="tbi-title" id="hs-title">Программа тренировок</div>
      <div class="tbi-sub" id="hs-subtitle"></div>
    </div>
  </div>
  <div class="section-label" style="margin-top:20px;padding:0 20px;">Месяцы / Блоки</div>
  <div class="months-list" id="months-list"></div>
  <div class="sp"></div>
</div>
"""
text = text.replace(old_home_html, new_home_html)

# 4. Inject Modal OUTSIDE of script tag, right before </body>
modal_html = """
<!-- CREATE PROGRAM MODAL -->
<div id="create-prog-modal" class="modal">
  <div class="modal-content" style="max-height:80vh;overflow-y:auto;">
    <h3 style="margin-bottom:15px;font-weight:700">Новая программа</h3>
    <div style="margin-bottom:15px">
      <label style="display:block;font-size:13px;font-weight:600;margin-bottom:5px;color:var(--text2)">Цель</label>
      <select id="cp-focus" style="width:100%;padding:10px;border-radius:10px;background:var(--bg);color:var(--text);border:1px solid var(--border)">
        <option value="hypertrophy">Набор массы / Рельеф</option>
        <option value="strength">Сила</option>
      </select>
    </div>
    <div style="margin-bottom:15px">
      <label style="display:block;font-size:13px;font-weight:600;margin-bottom:5px;color:var(--text2)">Локация</label>
      <select id="cp-location" onchange="toggleCpEq()" style="width:100%;padding:10px;border-radius:10px;background:var(--bg);color:var(--text);border:1px solid var(--border)">
        <option value="home">Дома</option>
        <option value="gym">Тренажерный зал (всё доступно)</option>
      </select>
    </div>
    <div id="cp-eq-wrap" style="display:block;margin-bottom:15px">
      <label style="display:block;font-size:13px;font-weight:600;margin-bottom:5px;color:var(--text2)">Инвентарь (Дома)</label>
      <div style="display:flex;flex-direction:column;gap:8px">
        <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" id="cp-eq-dumbbells" checked> Гантели / Гири</label>
        <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" id="cp-eq-pullup" checked> Турник</label>
        <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" id="cp-eq-bands"> Фитнес-резинки</label>
      </div>
    </div>
    <div style="margin-bottom:20px">
      <label style="display:block;font-size:13px;font-weight:600;margin-bottom:5px;color:var(--text2)">Тренировок в неделю</label>
      <select id="cp-days" style="width:100%;padding:10px;border-radius:10px;background:var(--bg);color:var(--text);border:1px solid var(--border)">
        <option value="2">2 дня (Фулбоди)</option>
        <option value="3" selected>3 дня (Фулбоди или Сплит)</option>
        <option value="4">4 дня (Верх/Низ)</option>
      </select>
    </div>
    <div style="display:flex;gap:10px">
      <button class="btn" style="flex:1" onclick="generateProgram()">Создать</button>
      <button class="btn btn-secondary" style="flex:1" onclick="hideModal('create-prog-modal')">Отмена</button>
    </div>
  </div>
</div>
"""
text = text.replace("</body>", modal_html + "\n</body>")

# 5. Replace JS functions
old_navto = """function navTo(tab) {
  document.querySelectorAll('.nav-item').forEach(function(n){n.classList.remove('active');});
  if(tab==='home'){renderHome();showScreen('home');document.getElementById('nav-home').classList.add('active');}
  else if(tab==='library'){renderLibrary();showScreen('library-screen');document.getElementById('nav-lib').classList.add('active');}
  else if(tab==='history'){renderHistory();showScreen('history-screen');document.getElementById('nav-hist').classList.add('active');}
  else if(tab==='profile'){showScreen('profile-screen');document.getElementById('nav-prof').classList.add('active');}
}"""
new_navto = """function navTo(tab) {
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

function renderProgramsList() {
  var html = '<button class="btn" style="width:100%;margin-bottom:15px;background:var(--accent);color:#fff;border:none;" onclick="document.getElementById(\\'create-prog-modal\\').classList.add(\\'show\\');document.getElementById(\\'create-prog-modal\\').style.display=\\'flex\\';">✨ Создать программу</button>';
  
  userPrograms.forEach(function(prog) {
    var isActive = prog.instanceId === activeProgId;
    html += '<div style="background:var(--card);border-radius:var(--radius);padding:15px;border:1px solid '+(isActive?'var(--accent)':'var(--border)')+';cursor:pointer;" onclick="openProgram(\\''+prog.instanceId+'\\')">' +
      '<div style="font-weight:700;font-size:16px;margin-bottom:5px">'+prog.name+'</div>' +
      '<div style="font-size:13px;color:var(--text2);margin-bottom:10px">'+prog.desc.substring(0,80)+'...</div>' +
      '<div style="display:flex;gap:10px;font-size:12px;color:var(--text3);font-weight:600;">' +
        '<span style="background:var(--card2);padding:4px 8px;border-radius:10px">'+prog.days+' дня/нед</span>' +
        '<span style="background:var(--card2);padding:4px 8px;border-radius:10px">'+(prog.location==='gym'?'В зале':'Дома')+'</span>' +
      '</div>' +
    '</div>';
  });
  
  document.getElementById('programs-list').innerHTML = html;
}

function openProgram(id) {
  activeProgId = id;
  localStorage.setItem('activeProgId', id);
  P = userPrograms.find(function(p){return p.instanceId===id;});
  navTo('program-screen');
}

function toggleCpEq() {
  var loc = document.getElementById('cp-location').value;
  document.getElementById('cp-eq-wrap').style.display = loc === 'home' ? 'block' : 'none';
}

function generateProgram() {
  var loc = document.getElementById('cp-location').value;
  var days = parseInt(document.getElementById('cp-days').value);
  var focus = document.getElementById('cp-focus').value;
  var eq = [];
  if(loc==='home') {
    if(document.getElementById('cp-eq-dumbbells').checked) eq.push('dumbbells');
    if(document.getElementById('cp-eq-pullup').checked) eq.push('pullup');
    if(document.getElementById('cp-eq-bands').checked) eq.push('bands');
  }
  
  var bestTpl = TEMPLATES.find(function(t) {
     return t.location === loc && t.days === days;
  });
  if (!bestTpl) bestTpl = TEMPLATES[0];
  
  var newProg = JSON.parse(JSON.stringify(bestTpl));
  newProg.instanceId = 'prog_' + Date.now();
  userPrograms.push(newProg);
  localStorage.setItem('userPrograms', JSON.stringify(userPrograms));
  
  hideModal('create-prog-modal');
  openProgram(newProg.instanceId);
}
"""
text = text.replace(old_navto, new_navto)

old_renderHome = """function renderHome() {
  var html='';
  P.months.forEach(function(m){
    var pct=getProgress(m.id);
    html+='<div class="month-card" onclick="openMonth(\\''+m.id+'\\')">' +
      '<div class="mc-accent" style="background:linear-gradient(90deg,'+m.color+','+m.dark+')"></div>' +
      '<div class="mc-inner">' +
        '<div class="mc-header">' +
          '<div class="mc-badge" style="background:linear-gradient(135deg,'+m.color+','+m.dark+')">'+m.weeks.split('\\u20131')[0]+'</div>' +
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
}"""
new_renderHome = """function renderProgram() {
  document.getElementById('hs-title').innerText = P.name || P.meta?.title || 'Программа тренировок';
  document.getElementById('hs-subtitle').innerText = (P.days ? P.days + ' тренировки в неделю' : P.meta?.subtitle || '');
  
  var html='';
  P.months.forEach(function(m){
    var pct=getProgress(m.id);
    html+='<div class="month-card" onclick="openMonth(\\''+m.id+'\\')">' +
      '<div class="mc-accent" style="background:linear-gradient(90deg,'+m.color+','+m.dark+')"></div>' +
      '<div class="mc-inner">' +
        '<div class="mc-header">' +
          '<div class="mc-badge" style="background:linear-gradient(135deg,'+m.color+','+m.dark+')">'+m.weeks.split('\\u20131')[0]+'</div>' +
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
}"""
text = text.replace(old_renderHome, new_renderHome)
text = text.replace("renderHome();", "renderProgram();")
text = text.replace("goHome(){relWL();navTo('home');}", "goHome(){relWL();navTo('program-screen');}")

# Fix finished flag
text = text.replace(
    "localStorage.setItem('finished_'+curWorkout.id+'_w'+curWeek, 'true');",
    "localStorage.setItem('finished_'+P.instanceId+'_'+curWorkout.id+'_w'+curWeek, 'true');"
)
text = text.replace(
    "localStorage.getItem('finished_'+w.id+'_w'+wk) === 'true'",
    "((P.instanceId === 'prog_default_1' ? localStorage.getItem('finished_'+w.id+'_w'+wk) : null) || localStorage.getItem('finished_'+P.instanceId+'_'+w.id+'_w'+wk)) === 'true'"
)

# Replace 'home' routing popstate logic
text = text.replace(
    "if(s==='home') { renderProgram(); document.getElementById('nav-home').classList.add('active'); }",
    "if(s==='home-screen' || s==='home') { renderProgramsList(); document.getElementById('nav-home').classList.add('active'); }"
)

# Fix any unhandled string literals causing optional chaining issues in old environments, just in case
text = text.replace("P.meta?.title", "(P.meta && P.meta.title)")
text = text.replace("P.meta?.subtitle", "(P.meta && P.meta.subtitle)")


with open("index.html", "w") as f:
    f.write(text)

print("Applied robust injection.")
