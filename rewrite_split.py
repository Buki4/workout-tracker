import sys
import re

with open("index.html", "r") as f:
    text = f.read()

# 1. Add CSS for .btn and .ai-btn-close
css_to_add = """
.btn { padding: 14px 20px; border-radius: var(--radius); font-size: 16px; font-weight: 700; cursor: pointer; transition: transform 0.15s, opacity 0.15s, box-shadow 0.15s; -webkit-tap-highlight-color: transparent; }
.btn:active { transform: scale(0.96); opacity: 0.9; }

.ai-btn-close { padding: 14px 20px; border-radius: var(--radius); font-size: 16px; font-weight: 700; background: var(--card2); color: var(--text); border: 1px solid var(--border); cursor: pointer; transition: transform 0.15s, opacity 0.15s; -webkit-tap-highlight-color: transparent; display:flex; align-items:center; justify-content:center; }
.ai-btn-close:active { transform: scale(0.96); opacity: 0.9; }
"""
text = text.replace("</style>", css_to_add + "\n</style>")

# 2. Update renderProgramsList button to add shadow
old_btn_render = "var html = '<button class=\"btn\" style=\"width:100%;margin-bottom:15px;background:var(--accent);color:#fff;border:none;\" onclick=\"document.getElementById(\\'create-prog-modal\\').classList.add(\\'show\\')\">✨ Создать программу</button>';"
new_btn_render = "var html = '<button class=\"btn\" style=\"width:100%;margin-bottom:15px;background:var(--accent);color:#fff;border:none;box-shadow:0 4px 15px rgba(108,99,255,0.3);\" onclick=\"document.getElementById(\\'create-prog-modal\\').classList.add(\\'show\\')\">✨ Создать программу</button>';"
if old_btn_render in text: text = text.replace(old_btn_render, new_btn_render)

# 3. Update Modal HTML to include cp-split
old_modal_html = """    <div style="display:flex;gap:10px;margin-bottom:20px">
      <div style="flex:1">
        <label style="display:block;font-size:13px;font-weight:600;margin-bottom:5px;color:var(--text2)">Тренировок</label>
        <select id="cp-days" style="width:100%;padding:10px;border-radius:10px;background:var(--bg);color:var(--text);border:1px solid var(--border)">
          <option value="2">2 дня</option>
          <option value="3" selected>3 дня</option>
          <option value="4">4 дня</option>
        </select>
      </div>
      <div style="flex:1">
        <label style="display:block;font-size:13px;font-weight:600;margin-bottom:5px;color:var(--text2)">Период</label>
        <select id="cp-duration" style="width:100%;padding:10px;border-radius:10px;background:var(--bg);color:var(--text);border:1px solid var(--border)">
          <option value="1">1 месяц</option>
          <option value="2">2 месяца</option>
          <option value="3">3 месяца</option>
          <option value="4" selected>4 месяца</option>
        </select>
      </div>
    </div>"""

new_modal_html = """    <div style="margin-bottom:15px">
      <label style="display:block;font-size:13px;font-weight:600;margin-bottom:5px;color:var(--text2)">Принцип тренировок</label>
      <select id="cp-split" style="width:100%;padding:10px;border-radius:10px;background:var(--bg);color:var(--text);border:1px solid var(--border)">
        <option value="fullbody">Фулбоди (Всё тело за раз)</option>
        <option value="upper_lower">Сплит (Верх / Низ)</option>
        <option value="ppl">Тяни / Толкай / Ноги (PPL)</option>
        <option value="brosplit">Бро-сплит (По группам мышц)</option>
      </select>
    </div>
    <div style="display:flex;gap:10px;margin-bottom:20px">
      <div style="flex:1">
        <label style="display:block;font-size:13px;font-weight:600;margin-bottom:5px;color:var(--text2)">Дней в нед.</label>
        <select id="cp-days" style="width:100%;padding:10px;border-radius:10px;background:var(--bg);color:var(--text);border:1px solid var(--border)">
          <option value="2">2 дня</option>
          <option value="3" selected>3 дня</option>
          <option value="4">4 дня</option>
          <option value="5">5 дней</option>
          <option value="6">6 дней</option>
        </select>
      </div>
      <div style="flex:1">
        <label style="display:block;font-size:13px;font-weight:600;margin-bottom:5px;color:var(--text2)">Период</label>
        <select id="cp-duration" style="width:100%;padding:10px;border-radius:10px;background:var(--bg);color:var(--text);border:1px solid var(--border)">
          <option value="1">1 месяц</option>
          <option value="2">2 месяца</option>
          <option value="3">3 месяца</option>
          <option value="4" selected>4 месяца</option>
        </select>
      </div>
    </div>"""
if old_modal_html in text: text = text.replace(old_modal_html, new_modal_html)

# 4. Replace generateProgram with dynamic generator
match = re.search(r"function generateProgram\(\) \{.*?\n\}", text, re.DOTALL)
if match:
    old_gen = match.group(0)
    new_gen = """function generateProgram() {
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

  // --- Exercise Database ---
  var DB = {
    chest: [
      {name:"Отжимания от пола", note:"Плавно, без рывков"},
      {name:"Отжимания с широкой постановкой рук", note:"Акцент на грудь"},
      {name:"Сведения рук перед собой", note:"С резинками или гантелями лежа"}
    ],
    back: [
      {name:"Подтягивания", note:"Или тяга в наклоне, если турника нет"},
      {name:"Тяга в наклоне", note:"Спина прямая, тянем к поясу"},
      {name:"Пуловер", note:"Растягиваем широчайшие"}
    ],
    legs: [
      {name:"Приседания", note:"Глубоко, колени по носкам"},
      {name:"Выпады", note:"Шаг назад"},
      {name:"Мертвая тяга", note:"Чувствуем бицепс бедра"},
      {name:"Ягодичный мост", note:"Прожимаем ягодицы"},
      {name:"Подъем на носки", note:"Пауза вверху"}
    ],
    shoulders: [
      {name:"Жим вверх", note:"Без полного выпрямления локтей"},
      {name:"Махи в стороны", note:"Мизинцы чуть выше больших пальцев"},
      {name:"Махи в наклоне", note:"На заднюю дельту"}
    ],
    arms: [
      {name:"Сгибания рук на бицепс", note:"Без раскачки"},
      {name:"Молотки", note:"Хват параллельный"},
      {name:"Обратные отжимания", note:"Акцент на трицепс"},
      {name:"Французский жим", note:"Локти зафиксированы"},
      {name:"Разгибания рук", note:"С резинкой или из-за головы"}
    ],
    core: [
      {name:"Скручивания", note:"Не тянем шею руками"},
      {name:"Планка", note:"Держим поясницу ровно"},
      {name:"Подъем ног", note:"Для пресса"}
    ]
  };

  // Helper to get random/rotated exercise
  function getEx(group, idx) {
    return Object.assign({}, DB[group][idx % DB[group].length]);
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

  // Handle Equipment Substitutions
  if (loc === 'home') {
    months.forEach(function(m) {
      m.workouts.forEach(function(w) {
        w.exs.forEach(function(ex) {
          if (eq.includes('vest') && (ex.name.toLowerCase().includes('отжимания') || ex.name.toLowerCase().includes('подтягивания') || ex.name.toLowerCase().includes('приседания'))) {
            ex.note = (ex.note ? ex.note + '. ' : '') + 'Можно использовать жилет.';
          }
          if (eq.includes('dips') && ex.name.toLowerCase().includes('отжимания от пола')) { ex.name = 'Отжимания на брусьях'; }
          if (eq.includes('bench') && eq.includes('barbell') && ex.name.toLowerCase().includes('отжимания от пола')) { ex.name = 'Жим штанги лежа'; }
          if (eq.includes('barbell') && ex.name.toLowerCase().includes('приседания')) { ex.name = 'Приседания со штангой'; }
          if (eq.includes('ez') && ex.name.toLowerCase().includes('сгибания рук')) { ex.name = 'Сгибания рук с EZ-грифом'; }
          // If no pullup, substitute Pullups with Dumbbell Rows
          if (!eq.includes('pullup') && ex.name.toLowerCase().includes('подтягивания')) {
             ex.name = 'Тяга гантелей в наклоне';
             ex.note = 'Альтернатива подтягиваниям';
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

  userPrograms.push(newProg);
  localStorage.setItem('userPrograms', JSON.stringify(userPrograms));
  
  document.getElementById('create-prog-modal').classList.remove('show');
  
  setTimeout(function(){
    openProgram(newProg.instanceId);
  }, 100);
}"""
    text = text.replace(old_gen, new_gen)

with open("index.html", "w") as f:
    f.write(text)

print("Done rewrite split")
