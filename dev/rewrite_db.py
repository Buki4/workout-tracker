import re

with open("app.js", "r") as f:
    text = f.read()

# We need to replace the entire generateProgram function.
# Let's find it.
match = re.search(r"function generateProgram\(\) \{.*?\nvar curLibFilter = 'Все';", text, re.DOTALL)
if not match:
    print("Could not find generateProgram block")
    exit(1)

old_block = match.group(0)

new_block = """function generateProgram() {
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

  userPrograms.push(newProg);
  localStorage.setItem('userPrograms', JSON.stringify(userPrograms));
  
  document.getElementById('create-prog-modal').classList.remove('show');
  
  setTimeout(function(){
    openProgram(newProg.instanceId);
  }, 100);
}

var curLibFilter = 'Все';"""

text = text.replace(old_block, new_block)

with open("app.js", "w") as f:
    f.write(text)

print("Replaced generateProgram successfully")
