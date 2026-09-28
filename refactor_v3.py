"""
Adds compound/isolation type tags to DB exercises, updates getEx to sort compounds first,
adds getArmEx helper, and updates all split generators to use proper muscle selection.
"""

with open("app.js", "r", encoding="utf-8") as f:
    text = f.read()

# ─────────────────────────────────────────────────────────────────────────────
# STEP 1: Replace DB with annotated version
# ─────────────────────────────────────────────────────────────────────────────

OLD_DB = '''var DB = {
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
  };'''

NEW_DB = '''var DB = {
    chest: [
      // COMPOUND first (multi-joint, primary movers)
      {name:"Жим штанги лежа",                     eq:"barbell",  type:"compound", note:"Широким хватом"},
      {name:"Жим гантелей лежа",                   eq:"dumbbells",type:"compound", note:"Глубоко опускаем гантели"},
      {name:"Отжимания от пола",                   eq:"bw",       type:"compound", note:"Плавно, без рывков"},
      {name:"Отжимания с широкой постановкой рук", eq:"bw",       type:"compound", note:"Акцент на грудь"},
      {name:"Отжимания на брусьях",                eq:"dips",     type:"compound", note:"С акцентом на грудь (наклон вперед)"},
      // ISOLATION (single-joint, finishing work)
      {name:"Разводка гантелей",                   eq:"dumbbells",type:"isolation", note:"Чувствуем растяжение"},
      {name:"Сведения рук с резиной",              eq:"bands",    type:"isolation", note:"Изоляция на грудь"}
    ],
    back: [
      // COMPOUND first
      {name:"Подтягивания",                        eq:"pullup",   type:"compound", note:"Широким хватом"},
      {name:"Тяга штанги в наклоне",               eq:"barbell",  type:"compound", note:"Спина прямая, тянем к поясу"},
      {name:"Тяга гантелей в наклоне",             eq:"dumbbells",type:"compound", note:"Локти идут вдоль корпуса"},
      {name:"Тяга резины к поясу",                 eq:"bands",    type:"compound", note:"Сводим лопатки"},
      {name:"Лодочка (Супермен)",                  eq:"bw",       type:"compound", note:"Задержка в верхней точке"},
      // ISOLATION
      {name:"Пуловер с гантелей",                  eq:"dumbbells",type:"isolation", note:"Растягиваем широчайшие"}
    ],
    legs: [
      // COMPOUND first (largest muscles — always compound base)
      {name:"Приседания со штангой",               eq:"barbell",  type:"compound", note:"Держим спину прямо"},
      {name:"Приседания",                          eq:"bw",       type:"compound", note:"Глубоко, колени по носкам"},
      {name:"Кубковые приседания",                 eq:"dumbbells",type:"compound", note:"Гантель перед грудью"},
      {name:"Болгарские сплит-приседания",         eq:"dumbbells",type:"compound", note:"Задняя нога на скамье/диване"},
      {name:"Румынская тяга",                      eq:"barbell",  type:"compound", note:"На прямых ногах"},
      {name:"Мертвая тяга с гантелями",            eq:"dumbbells",type:"compound", note:"Чувствуем бицепс бедра"},
      {name:"Выпады",                              eq:"bw",       type:"compound", note:"Шаг назад"},
      {name:"Ягодичный мост",                      eq:"bw",       type:"isolation", note:"Прожимаем ягодицы"}
    ],
    shoulders: [
      // COMPOUND first (press movements)
      {name:"Армейский жим",                       eq:"barbell",  type:"compound", note:"Жим штанги стоя"},
      {name:"Жим гантелей сидя",                   eq:"dumbbells",type:"compound", note:"Без полного выпрямления локтей"},
      {name:"Отжимания домиком (Pike push-ups)",   eq:"bw",       type:"compound", note:"Акцент на дельты"},
      {name:"Тяга штанги к подбородку",            eq:"barbell",  type:"compound", note:"Широким хватом — задняя дельта"},
      // ISOLATION (lateral raises — single-joint)
      {name:"Махи гантелями в стороны",            eq:"dumbbells",type:"isolation", note:"Мизинцы чуть выше больших пальцев"},
      {name:"Махи гантелями в наклоне",            eq:"dumbbells",type:"isolation", note:"На заднюю дельту"},
      {name:"Махи с резиной в стороны",            eq:"bands",    type:"isolation", note:"Держим натяжение"}
    ],
    arms: [
      // BICEPS compound (elbow flexion + some shoulder involvement)
      {name:"Подъем штанги на бицепс",             eq:"barbell",  type:"compound", muscle:"biceps",  note:"Без раскачки"},
      {name:"Сгибания рук с EZ-грифом",            eq:"ez",       type:"compound", muscle:"biceps",  note:"Комфортно для запястий"},
      // TRICEPS compound (bodyweight — also engage chest/shoulders)
      {name:"Обратные отжимания",                  eq:"bw",       type:"compound", muscle:"triceps", note:"Акцент на трицепс (от дивана/стула)"},
      {name:"Отжимания узким хватом",              eq:"bw",       type:"compound", muscle:"triceps", note:"Локти вдоль корпуса"},
      // BICEPS isolation
      {name:"Сгибания рук на бицепс",              eq:"dumbbells",type:"isolation", muscle:"biceps",  note:"С супинацией"},
      {name:"Молотки",                             eq:"dumbbells",type:"isolation", muscle:"biceps",  note:"Хват параллельный"},
      // TRICEPS isolation
      {name:"Французский жим",                     eq:"barbell",  type:"isolation", muscle:"triceps", note:"Локти зафиксированы"},
      {name:"Разгибания рук с гантелью из-за головы", eq:"dumbbells",type:"isolation", muscle:"triceps", note:"На трицепс"}
    ],
    core: [
      // COMPOUND (multi-muscle trunk stability)
      {name:"Планка",                              eq:"bw",       type:"compound", note:"Держим поясницу ровно"},
      {name:"Велосипед",                           eq:"bw",       type:"compound", note:"Тянем локоть к колену"},
      {name:"Скручивания с роликом/колесом",       eq:"rope",     type:"compound", note:"Если есть колесо/ролик"},
      // ISOLATION
      {name:"Скручивания",                         eq:"bw",       type:"isolation", note:"Не тянем шею руками"},
      {name:"Подъем ног",                          eq:"bw",       type:"isolation", note:"Для нижнего пресса"}
    ]
  };'''

assert OLD_DB in text, "ERROR: OLD_DB not found exactly"
text = text.replace(OLD_DB, NEW_DB)
print("OK: DB replaced with typed version")

# ─────────────────────────────────────────────────────────────────────────────
# STEP 2: Update getEx to sort compounds before isolations
#         Add getArmEx(muscle, idx) helper
# ─────────────────────────────────────────────────────────────────────────────

OLD_GETEX = '''  // Helper to get exercise filtered by equipment
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
  }'''

NEW_GETEX = '''  // Helper to get exercise filtered by equipment.
  // Exercises are sorted: compound first, isolation last.
  function getValidExs(group) {
    var list;
    if (loc === 'home') {
      list = DB[group].filter(function(ex) { return ex.eq === 'bw' || eq.includes(ex.eq); });
    } else {
      list = DB[group].slice();
    }
    // Sort: compound before isolation (stable sort preserves relative order within each tier)
    list.sort(function(a, b) {
      var ta = a.type === 'compound' ? 0 : 1;
      var tb = b.type === 'compound' ? 0 : 1;
      return ta - tb;
    });
    return list;
  }

  function getEx(group, idx) {
    var validExs = getValidExs(group);
    if (validExs.length === 0) {
      return {name: "Упражнение на " + group, note: "Собственный вес", type:"compound"};
    }
    return Object.assign({}, validExs[idx % validExs.length]);
  }

  // Pick a specific biceps or triceps exercise by index within that sub-group
  function getArmEx(muscle, idx) {
    var list;
    if (loc === 'home') {
      list = DB.arms.filter(function(ex) {
        return ex.muscle === muscle && (ex.eq === 'bw' || eq.includes(ex.eq));
      });
    } else {
      list = DB.arms.filter(function(ex) { return ex.muscle === muscle; });
    }
    // Sort compound first
    list.sort(function(a, b) { return (a.type === 'compound' ? 0 : 1) - (b.type === 'compound' ? 0 : 1); });
    if (list.length === 0) return getEx('arms', idx); // fallback
    return Object.assign({}, list[idx % list.length]);
  }'''

assert OLD_GETEX in text, "ERROR: OLD_GETEX not found exactly"
text = text.replace(OLD_GETEX, NEW_GETEX)
print("OK: getEx updated + getArmEx added")

# ─────────────────────────────────────────────────────────────────────────────
# STEP 3: Update split generation to use getArmEx
# ─────────────────────────────────────────────────────────────────────────────

# FULLBODY: single arm exercise — alternate bi/tri each workout day
OLD_FULLBODY_EXS = "        exs: [ getEx('legs',d), getEx('chest',d), getEx('back',d), getEx('shoulders',d), getEx('arms',d*2), getEx('core',d) ]"
NEW_FULLBODY_EXS = "        exs: [ getEx('legs',d), getEx('chest',d), getEx('back',d), getEx('shoulders',d), getArmEx(d%2===0?'triceps':'biceps',d), getEx('core',d) ]"
assert OLD_FULLBODY_EXS in text, "ERROR: FULLBODY exs not found"
text = text.replace(OLD_FULLBODY_EXS, NEW_FULLBODY_EXS)
print("OK: Fullbody arm selection updated")

# UPPER/LOWER: tri before bi (tricep follows pushing work, bicep follows pulling)
OLD_UPPER_TRI = '''        upperExs.push(getEx('arms',1));  // трицепс
        upperExs.push(getEx('arms',0));  // бицепс'''
NEW_UPPER_TRI = '''        upperExs.push(getArmEx('triceps', d));  // трицепс после жимовой работы
        upperExs.push(getArmEx('biceps', d));   // бицепс после тяговой работы'''
assert OLD_UPPER_TRI in text, "ERROR: UPPER tri/bi not found"
text = text.replace(OLD_UPPER_TRI, NEW_UPPER_TRI)
print("OK: Upper tri/bi updated to getArmEx")

# PPL PUSH: triceps (2 exercises)
OLD_PUSH_TRI = '''        pushExs.push(getEx('arms',1));  // Французский жим (трицепс)
        pushExs.push(getEx('arms',5));  // Разгибания из-за головы (трицепс)'''
NEW_PUSH_TRI = '''        pushExs.push(getArmEx('triceps', 0));  // трицепс compound (после жимов)
        pushExs.push(getArmEx('triceps', 1));  // трицепс isolation (финиш)'''
assert OLD_PUSH_TRI in text, "ERROR: PUSH triceps not found"
text = text.replace(OLD_PUSH_TRI, NEW_PUSH_TRI)
print("OK: PPL Push triceps updated")

# PPL PULL: biceps (2 exercises)
OLD_PULL_BI = "          exs: [ getEx('back',0), getEx('back',1), getEx('back',2), getEx('shoulders',2), getEx('arms',0), getEx('arms',3) ] });"
NEW_PULL_BI = "          exs: [ getEx('back',0), getEx('back',1), getEx('back',2), getEx('shoulders',2), getArmEx('biceps',0), getArmEx('biceps',1) ] });"
assert OLD_PULL_BI in text, "ERROR: PULL biceps not found"
text = text.replace(OLD_PULL_BI, NEW_PULL_BI)
print("OK: PPL Pull biceps updated")

# BROSPLIT Плечи/Руки: tri + bi properly ordered
OLD_BROSPLIT_ARMS = "      if(type==='Плечи/Руки') e = [getEx('shoulders',0), getEx('shoulders',1), getEx('arms',1), getEx('arms',0), getEx('arms',2)];"
NEW_BROSPLIT_ARMS = "      if(type==='Плечи/Руки') e = [getEx('shoulders',0), getEx('shoulders',1), getArmEx('triceps',0), getArmEx('biceps',0), getArmEx('biceps',1)];"
assert OLD_BROSPLIT_ARMS in text, "ERROR: Brosplit arms not found"
text = text.replace(OLD_BROSPLIT_ARMS, NEW_BROSPLIT_ARMS)
print("OK: Brosplit arms updated")

# ─────────────────────────────────────────────────────────────────────────────
# STEP 4: Also fix the Storage key bug (still using "AppState.userPrograms")
# ─────────────────────────────────────────────────────────────────────────────

# Migrate: try new key first, if empty try old key for backward compat
OLD_INIT_KEY = '''AppState.userPrograms = Storage.get("AppState.userPrograms", []);

if (AppState.userPrograms.length === 0) {
  var defaultProg = JSON.parse(JSON.stringify(TEMPLATES.find(function(t){return t.id === "prog_default";})));
  defaultProg.instanceId = "prog_default_1";
  AppState.userPrograms.push(defaultProg);
  Storage.set("AppState.userPrograms", AppState.userPrograms);
}

AppState.activeProgId = Storage.getStr("AppState.activeProgId", null);
if (!AppState.activeProgId && AppState.userPrograms.length > 0) AppState.activeProgId = AppState.userPrograms[0].instanceId;

AppState.P = AppState.userPrograms.find(function(p){return p.instanceId === AppState.activeProgId;}) || AppState.userPrograms[0];'''

NEW_INIT_KEY = '''// Load userPrograms — migrate from old "AppState." prefixed keys if needed
AppState.userPrograms = Storage.get("userPrograms", null) ||
  Storage.get("AppState.userPrograms", []);

if (AppState.userPrograms.length === 0) {
  var defaultProg = JSON.parse(JSON.stringify(TEMPLATES.find(function(t){return t.id === "prog_default";})));
  defaultProg.instanceId = "prog_default_1";
  AppState.userPrograms.push(defaultProg);
  Storage.set("userPrograms", AppState.userPrograms);
} else {
  // Ensure data is under the canonical key
  Storage.set("userPrograms", AppState.userPrograms);
}

AppState.activeProgId = Storage.getStr("activeProgId", null) ||
  Storage.getStr("AppState.activeProgId", null);
if (!AppState.activeProgId && AppState.userPrograms.length > 0) AppState.activeProgId = AppState.userPrograms[0].instanceId;

AppState.P = AppState.userPrograms.find(function(p){return p.instanceId === AppState.activeProgId;}) || AppState.userPrograms[0];'''

if OLD_INIT_KEY in text:
    text = text.replace(OLD_INIT_KEY, NEW_INIT_KEY)
    print("OK: Storage key migration fixed")
else:
    print("WARNING: init key block not found — skipping Storage key fix")

with open("app.js", "w", encoding="utf-8") as f:
    f.write(text)

print("\nAll changes applied. Running syntax check...")
