"""
Full, safe refactor of app.js:
1. Add Storage class and AppState object
2. Replace all global var usage with AppState.*
3. Replace all raw localStorage calls with Storage.*
4. Add replace-exercise feature using data-attrs + event delegation (no messy escaping)
"""

with open("app_old.js", "r", encoding="utf-8") as f:
    text = f.read()

# ──────────────────────────────────────────────────────
# STEP 1: Inject Storage + AppState before PROGRAM DATA
# ──────────────────────────────────────────────────────

INJECT = """var Storage = {
  get: function(key, def) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch(e) { return def; }
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
// ─────────────────────────────────────────"""

PROG_MARKER = """// ─────────────────────────────────────────
// PROGRAM DATA
// ─────────────────────────────────────────"""

assert PROG_MARKER in text, "PROGRAM DATA marker not found"
text = text.replace(PROG_MARKER, INJECT)

# ──────────────────────────────────────────────────────
# STEP 2: customDB
# ──────────────────────────────────────────────────────
text = text.replace(
    "try { var saved = JSON.parse(localStorage.getItem('customDB')); if (saved) customDB = saved; } catch(e){}",
    "var saved = Storage.get('customDB', null); if (saved) customDB = saved;"
)
text = text.replace(
    "try { localStorage.setItem('customDB', JSON.stringify(customDB)); } catch(e){}",
    "Storage.set('customDB', customDB);"
)

# ──────────────────────────────────────────────────────
# STEP 3: Replace global init block
# ──────────────────────────────────────────────────────
OLD_INIT = """var userPrograms = [];
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


// ─────────────────────────────────────────
// STATE
// ─────────────────────────────────────────
var curMonth = null, curWorkout = null, curWeek = null, wState = {};"""

NEW_INIT = """AppState.userPrograms = Storage.get("userPrograms", []);

if (AppState.userPrograms.length === 0) {
  var defaultProg = JSON.parse(JSON.stringify(TEMPLATES.find(function(t){return t.id === "prog_default";})));
  defaultProg.instanceId = "prog_default_1";
  AppState.userPrograms.push(defaultProg);
  Storage.set("userPrograms", AppState.userPrograms);
}

AppState.activeProgId = Storage.getStr("activeProgId", null);
if (!AppState.activeProgId && AppState.userPrograms.length > 0) AppState.activeProgId = AppState.userPrograms[0].instanceId;

AppState.P = AppState.userPrograms.find(function(p){return p.instanceId === AppState.activeProgId;}) || AppState.userPrograms[0];"""

assert OLD_INIT in text, "OLD_INIT block not found! Check spacing exactly."
text = text.replace(OLD_INIT, NEW_INIT)

# ──────────────────────────────────────────────────────
# STEP 4: Replace simple global variable references
# These are ONLY the standalone globals – done in priority order
# ──────────────────────────────────────────────────────

# userPrograms
text = text.replace("userPrograms", "AppState.userPrograms")

# activeProgId
text = text.replace("activeProgId", "AppState.activeProgId")

# wState  
text = text.replace("wState", "AppState.wState")

# curWeek (before curWorkout to avoid partial match issues)
text = text.replace("curWeek", "AppState.curWeek")

# curWorkout
text = text.replace("curWorkout", "AppState.curWorkout")

# curMonth
text = text.replace("curMonth", "AppState.curMonth")

# P. references (only P.xxx patterns, not standalone 'P')
import re
text = re.sub(r'\bP\.instanceId\b', 'AppState.P.instanceId', text)
text = re.sub(r'\bP\.name\b', 'AppState.P.name', text)
text = re.sub(r'\bP\.desc\b', 'AppState.P.desc', text)
text = re.sub(r'\bP\.days\b', 'AppState.P.days', text)
text = re.sub(r'\bP\.location\b', 'AppState.P.location', text)
text = re.sub(r'\bP\.meta\b', 'AppState.P.meta', text)
text = re.sub(r'\bP\.months\b', 'AppState.P.months', text)

# var P = ... assignment
text = re.sub(r'\bP = AppState\.userPrograms', 'AppState.P = AppState.userPrograms', text)

# Fix double-prefixed AppState.AppState
text = text.replace("AppState.AppState.", "AppState.")

# ──────────────────────────────────────────────────────
# STEP 5: localStorage → Storage calls
# ──────────────────────────────────────────────────────

# saveWS / loadWS / getWeights / saveWeights
text = text.replace(
    'try { localStorage.setItem(getWsKey(AppState.curWorkout.id+\'_w\'+AppState.curWeek), JSON.stringify(AppState.wState)); } catch(e){}',
    'Storage.set(getWsKey(AppState.curWorkout.id+\'_w\'+AppState.curWeek), AppState.wState);'
)
text = text.replace(
    'try { var r=localStorage.getItem(getWsKey(id)); return r?JSON.parse(r):{}; } catch(e){ return {}; }',
    'return Storage.get(getWsKey(id), {});'
)
text = text.replace(
    "try { var r=localStorage.getItem('uw'); return r?JSON.parse(r):{}; } catch(e){ return {}; }",
    "return Storage.get('uw', {});"
)
text = text.replace(
    "localStorage.setItem('uw', JSON.stringify(w));",
    "Storage.set('uw', w);"
)

# History
OLD_HIST = """function getHistory() {
  try { var r=localStorage.getItem('wh'); return r?JSON.parse(r):[]; } catch(e){ return []; }
}
function saveHistory(e) {
  try {
    var h=getHistory(); h.unshift(e);
    localStorage.setItem('wh', JSON.stringify(h.slice(0,100)));
  } catch(ex){}
}"""
NEW_HIST = """function getHistory() {
  return Storage.get('wh', []);
}
function saveHistory(e) {
  var h=getHistory(); h.unshift(e);
  Storage.set('wh', h.slice(0,100));
}"""
if OLD_HIST in text:
    text = text.replace(OLD_HIST, NEW_HIST)
else:
    print("WARNING: getHistory block not found exactly")

# finished_ flags (localStorage.getItem and setItem)
text = text.replace('localStorage.getItem("finished_"+', 'Storage.getStr("finished_"+')
text = text.replace("localStorage.getItem('finished_'+", "Storage.getStr('finished_'+")
text = text.replace("localStorage.setItem('finished_'+AppState.P.instanceId", "Storage.setStr('finished_'+AppState.P.instanceId")
text = text.replace('localStorage.setItem("finished_"+', 'Storage.setStr("finished_"+')

# userPrograms save
text = text.replace('localStorage.setItem("userPrograms", JSON.stringify(AppState.userPrograms))', 'Storage.set("userPrograms", AppState.userPrograms)')
text = text.replace("localStorage.setItem('userPrograms', JSON.stringify(AppState.userPrograms))", "Storage.set('userPrograms', AppState.userPrograms)")
text = text.replace("localStorage.setItem('userPrograms', JSON.stringify(userPrograms))", "Storage.set('userPrograms', AppState.userPrograms)")

# activeProgId
text = text.replace('localStorage.setItem("activeProgId", AppState.activeProgId)', 'Storage.setStr("activeProgId", AppState.activeProgId)')
text = text.replace("localStorage.setItem('activeProgId', id)", "Storage.setStr('activeProgId', id)")
text = text.replace("localStorage.setItem('AppState.activeProgId', id)", "Storage.setStr('activeProgId', id)")
text = text.replace('localStorage.setItem("AppState.activeProgId",', 'Storage.setStr("activeProgId",')
text = text.replace("localStorage.setItem('AppState.userPrograms',", "Storage.set('userPrograms',")
text = text.replace('localStorage.setItem("AppState.userPrograms",', 'Storage.set("userPrograms",')

# max_w  
text = text.replace("try { return JSON.parse(localStorage.getItem('max_w')) || {}; } catch(e){ return {}; }", "return Storage.get('max_w', {});")
text = text.replace("localStorage.setItem('max_w', JSON.stringify(mw));", "Storage.set('max_w', mw);")

# tonnage
text = text.replace("parseFloat(localStorage.getItem('tonnage'))", "parseFloat(Storage.getStr('tonnage'))")
text = text.replace("localStorage.setItem('tonnage',", "Storage.setStr('tonnage',")

# gemini_key
text = text.replace("localStorage.getItem('gemini_key')", "Storage.getStr('gemini_key')")
text = text.replace("localStorage.setItem('gemini_key',", "Storage.setStr('gemini_key',")

# wh (history)
text = text.replace("try{localStorage.removeItem('wh');}catch(e){}", "Storage.remove('wh');")
text = text.replace("localStorage.setItem('wh', JSON.stringify(h));", "Storage.set('wh', h);")

# theme
text = text.replace("localStorage.setItem('theme_c1', c1)", "Storage.setStr('theme_c1', c1)")
text = text.replace("localStorage.setItem('theme_c2', c2)", "Storage.setStr('theme_c2', c2)")
text = text.replace("localStorage.getItem('theme_c1')", "Storage.getStr('theme_c1')")
text = text.replace("localStorage.getItem('theme_c2')", "Storage.getStr('theme_c2')")

# profName
text = text.replace("localStorage.getItem('profName')", "Storage.getStr('profName')")
text = text.replace("localStorage.setItem('profName',", "Storage.setStr('profName',")

# appVersion / pendingChangelog / pendingVersion
text = text.replace("localStorage.getItem('appVersion')", "Storage.getStr('appVersion')")
text = text.replace("localStorage.setItem('appVersion',", "Storage.setStr('appVersion',")
text = text.replace("localStorage.getItem('pendingChangelog')", "Storage.getStr('pendingChangelog')")
text = text.replace("localStorage.setItem('pendingChangelog',", "Storage.setStr('pendingChangelog',")
text = text.replace("localStorage.getItem('pendingVersion')", "Storage.getStr('pendingVersion')")
text = text.replace("localStorage.setItem('pendingVersion',", "Storage.setStr('pendingVersion',")
text = text.replace("localStorage.removeItem('pendingVersion')", "Storage.remove('pendingVersion')")
text = text.replace("localStorage.removeItem('pendingChangelog')", "Storage.remove('pendingChangelog')")

# Fix any lingering AppState.AppState
text = text.replace("AppState.AppState.", "AppState.")

# ──────────────────────────────────────────────────────
# STEP 6: Add "Replace" button to renderExs
# We find the ex-num div line and add the button after the ex-name block
# ──────────────────────────────────────────────────────
OLD_EX_HDR = """    html+='<div class="ex-block">' +
      '<div class="ex-hdr">' +
        '<div class="ex-num">Упражнение '+(ei+1)+' из '+w.exs.length+'</div>' +"""
NEW_EX_HDR = """    html+='<div class="ex-block">' +
      '<div class="ex-hdr">' +
        '<div style="display:flex;justify-content:space-between;align-items:center">' +
          '<div class="ex-num">Упражнение '+(ei+1)+' из '+w.exs.length+'</div>' +
          '<button class="replace-ex-btn" data-ei="'+ei+'" style="background:none;border:none;color:var(--accent);font-size:12px;font-weight:600;cursor:pointer;padding:4px 0">🔄 Заменить</button>' +
        '</div>' +"""

if OLD_EX_HDR in text:
    text = text.replace(OLD_EX_HDR, NEW_EX_HDR)
    print("OK: replace button injected")
else:
    print("WARNING: ex-hdr block not found")

# ──────────────────────────────────────────────────────
# STEP 7: Append replace feature using event delegation (NO inline onclick escaping!)
# ──────────────────────────────────────────────────────
REPLACE_FEATURE = """

// ─────────────────────────────────────────
// REPLACE EXERCISE FEATURE
// ─────────────────────────────────────────
(function() {
  var replaceExIndex = null;
  var curFilter = 'Все';
  var mgNames = {chest:'Грудь', back:'Спина', legs:'Ноги', shoulders:'Плечи', arms:'Руки', core:'Пресс'};
  var eqNames = {bw:'Свой вес', barbell:'Штанга', dumbbells:'Гантели', pullup:'Турник', dips:'Брусья', bands:'Резинки', rope:'Канат', bench:'Скамья', vest:'Жилет', ez:'EZ-гриф'};

  // Open modal — called from event delegation on .replace-ex-btn
  window.openReplaceModal = function(ei) {
    replaceExIndex = ei;
    curFilter = 'Все';
    document.getElementById('replace-ex-modal').classList.add('show');
    render();
  };

  function render() {
    var filtersWrap = document.getElementById('replace-filters');
    var listWrap = document.getElementById('replace-list');

    // Render filter pills
    var fhtml = '';
    ['Все'].concat(Object.values(mgNames)).forEach(function(f) {
      var act = curFilter === f;
      var pill = document.createElement('div');
      pill.textContent = f;
      pill.dataset.filter = f;
      pill.style.cssText = 'padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap;transition:all 0.2s;border:1px solid ' + (act ? 'var(--accent)' : 'var(--border)') + ';background:' + (act ? 'var(--accent)' : 'var(--card2)') + ';color:' + (act ? '#fff' : 'var(--text2)') + ';-webkit-tap-highlight-color:transparent;';
      fhtml += pill.outerHTML;
    });
    filtersWrap.innerHTML = fhtml;

    // Render list
    var items = [];
    Object.keys(DB).forEach(function(mgKey) {
      var mgTitle = mgNames[mgKey];
      if (curFilter !== 'Все' && mgTitle !== curFilter) return;
      items.push({type:'header', label: mgTitle});
      DB[mgKey].forEach(function(ex) {
        items.push({type:'ex', ex: ex, mg: mgKey});
      });
    });

    listWrap.innerHTML = '';
    items.forEach(function(item) {
      if (item.type === 'header') {
        var hdr = document.createElement('div');
        hdr.textContent = item.label;
        hdr.style.cssText = 'font-size:14px;font-weight:700;color:var(--text);margin-top:8px;margin-bottom:4px;';
        listWrap.appendChild(hdr);
      } else {
        var ex = item.ex;
        var row = document.createElement('div');
        row.dataset.name = ex.name;
        row.dataset.eq = ex.eq;
        row.dataset.note = ex.note || '';
        row.style.cssText = 'background:var(--card2);border-radius:var(--radius-sm,8px);border:1px solid var(--border);padding:12px;cursor:pointer;margin-bottom:6px;';

        var nameEl = document.createElement('div');
        nameEl.style.cssText = 'font-weight:600;font-size:14px;';
        nameEl.textContent = ex.name;

        var eqBadge = document.createElement('span');
        eqBadge.textContent = eqNames[ex.eq] || ex.eq || '';
        eqBadge.style.cssText = 'font-size:10px;background:var(--bg);padding:2px 6px;border-radius:4px;color:var(--text-sec);margin-left:8px;vertical-align:middle;';
        nameEl.appendChild(eqBadge);

        var isCustom = customDB[item.mg] && customDB[item.mg].some(function(c){ return c.name === ex.name; });
        if (isCustom) {
          var cb = document.createElement('span');
          cb.textContent = 'Своё';
          cb.style.cssText = 'font-size:10px;background:rgba(255,165,0,0.2);color:orange;padding:2px 6px;border-radius:4px;margin-left:4px;vertical-align:middle;';
          nameEl.appendChild(cb);
        }
        row.appendChild(nameEl);

        if (ex.note) {
          var noteEl = document.createElement('div');
          noteEl.textContent = ex.note;
          noteEl.style.cssText = 'font-size:12px;color:var(--text-sec);margin-top:4px;';
          row.appendChild(noteEl);
        }
        listWrap.appendChild(row);
      }
    });
  }

  // Event delegation for filter pills
  document.getElementById('replace-filters').addEventListener('click', function(e) {
    var pill = e.target.closest('[data-filter]');
    if (!pill) return;
    curFilter = pill.dataset.filter;
    render();
  });

  // Event delegation for exercise rows in list
  document.getElementById('replace-list').addEventListener('click', function(e) {
    var row = e.target.closest('[data-name]');
    if (!row) return;
    applyReplace(row.dataset.name, row.dataset.eq, row.dataset.note);
  });

  // Event delegation for .replace-ex-btn (set after renderExs builds the DOM)
  document.getElementById('workout-screen').addEventListener('click', function(e) {
    var btn = e.target.closest('.replace-ex-btn');
    if (!btn) return;
    window.openReplaceModal(parseInt(btn.dataset.ei, 10));
  });

  function applyReplace(exName, exEq, exNote) {
    if (replaceExIndex === null || !AppState.curWorkout) return;
    var oldEx = AppState.curWorkout.exs[replaceExIndex];

    AppState.curWorkout.exs[replaceExIndex] = {
      id: oldEx.id,
      name: exName,
      eq: exEq,
      note: exNote,
      nw: oldEx.nw,
      ss: oldEx.ss,
      sets: oldEx.sets
    };

    // Clear wState for this exercise
    for (var si = 0; si < oldEx.sets.length; si++) {
      delete AppState.wState[oldEx.id + '_' + si];
    }

    Storage.set('userPrograms', AppState.userPrograms);
    saveWS();

    document.getElementById('replace-ex-modal').classList.remove('show');
    showToast('Упражнение заменено!');
    renderExs();
    updateFinBtn();
  }
})();
"""

text = text.rstrip() + "\n" + REPLACE_FEATURE

with open("app.js", "w", encoding="utf-8") as f:
    f.write(text)

print("Done. Now checking remaining raw localStorage calls...")
import re
lines = text.split("\n")
for i, line in enumerate(lines, 1):
    if "localStorage." in line and "Storage." not in line and "// " not in line.lstrip():
        print(f"  Line {i}: {line.strip()}")
