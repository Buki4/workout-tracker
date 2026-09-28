import sys

with open("app.js", "r", encoding="utf-8") as f:
    text = f.read()

# 1. Add Storage and AppState definition at the top, just before PROGRAM DATA
storage_code = """var Storage = {
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
// ─────────────────────────────────────────"""

text = text.replace("// ─────────────────────────────────────────\n// PROGRAM DATA\n// ─────────────────────────────────────────", storage_code)

# 2. Custom DB Logic
text = text.replace(
    "try { var saved = JSON.parse(localStorage.getItem('customDB')); if (saved) customDB = saved; } catch(e){}",
    "var saved = Storage.get('customDB', null); if (saved) customDB = saved;"
)
text = text.replace(
    "try { localStorage.setItem('customDB', JSON.stringify(customDB)); } catch(e){}",
    "Storage.set('customDB', customDB);"
)

# 3. userPrograms and globals initialization
old_init = """var userPrograms = [];
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

new_init = """AppState.userPrograms = Storage.get("userPrograms", []);

if (AppState.userPrograms.length === 0) {
  var defaultProg = JSON.parse(JSON.stringify(TEMPLATES.find(function(t){return t.id === "prog_default";})));
  defaultProg.instanceId = "prog_default_1";
  AppState.userPrograms.push(defaultProg);
  Storage.set("userPrograms", AppState.userPrograms);
}

AppState.activeProgId = Storage.getStr("activeProgId", null);
if (!AppState.activeProgId && AppState.userPrograms.length > 0) AppState.activeProgId = AppState.userPrograms[0].instanceId;

AppState.P = AppState.userPrograms.find(function(p){return p.instanceId === AppState.activeProgId;}) || AppState.userPrograms[0];"""

text = text.replace(old_init, new_init)

# Replace identifiers
replacements = [
    ("userPrograms", "AppState.userPrograms"),
    ("activeProgId", "AppState.activeProgId"),
    ("P.instanceId", "AppState.P.instanceId"),
    ("P.name", "AppState.P.name"),
    ("P.desc", "AppState.P.desc"),
    ("P.days", "AppState.P.days"),
    ("P.location", "AppState.P.location"),
    ("P.meta", "AppState.P.meta"),
    ("P.months", "AppState.P.months"),
    ("curMonth", "AppState.curMonth"),
    ("curWorkout", "AppState.curWorkout"),
    ("curWeek", "AppState.curWeek"),
    ("wState", "AppState.wState"),
]

for old, new in replacements:
    text = text.replace(old, new)

text = text.replace("AppState.AppState.", "AppState.")

# 4. Storage operations in getWsKey, saveWS, loadWS, etc.
old_storage = """function getWsKey(id) {
  if (AppState.P.instanceId === 'prog_default_1') return 'ws_' + id;
  return 'ws_' + AppState.P.instanceId + '_' + id;
}

function saveWS() {
  if (!AppState.curWorkout || !AppState.curWeek) return;
  try { localStorage.setItem(getWsKey(AppState.curWorkout.id+'_w'+AppState.curWeek), JSON.stringify(AppState.wState)); } catch(e){}
}
function loadWS(id) {
  try { var r=localStorage.getItem(getWsKey(id)); return r?JSON.parse(r):{}; } catch(e){ return {}; }
}
function getWeights() {
  try { var r=localStorage.getItem('uw'); return r?JSON.parse(r):{}; } catch(e){ return {}; }
}"""

new_storage = """function getWsKey(id) {
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
}"""
text = text.replace(old_storage, new_storage)

text = text.replace("localStorage.setItem('uw', JSON.stringify(w));", "Storage.set('uw', w);")

old_hist = """function getHistory() {
  try { var r=localStorage.getItem('wh'); return r?JSON.parse(r):[]; } catch(e){ return []; }
}
function saveHistory(e) {
  try {
    var h=getHistory(); h.unshift(e);
    localStorage.setItem('wh', JSON.stringify(h.slice(0,100)));
  } catch(ex){}
}"""
new_hist = """function getHistory() {
  return Storage.get('wh', []);
}
function saveHistory(e) {
  var h=getHistory(); h.unshift(e);
  Storage.set('wh', h.slice(0,100));
}"""
text = text.replace(old_hist, new_hist)

# 5. Other localStorage usages
text = text.replace("localStorage.getItem(\"finished_\"+", "Storage.getStr(\"finished_\"+")
text = text.replace("localStorage.setItem(\"userPrograms\", JSON.stringify(AppState.userPrograms))", "Storage.set(\"userPrograms\", AppState.userPrograms)")
text = text.replace("localStorage.setItem(\"activeProgId\", AppState.activeProgId)", "Storage.setStr(\"activeProgId\", AppState.activeProgId)")
text = text.replace("localStorage.setItem('activeProgId', id)", "Storage.setStr('activeProgId', id)")
text = text.replace("localStorage.setItem('userPrograms', JSON.stringify(AppState.userPrograms))", "Storage.set('userPrograms', AppState.userPrograms)")

text = text.replace("localStorage.getItem('finished_'+AppState.P.instanceId", "Storage.getStr('finished_'+AppState.P.instanceId")

# max_w
text = text.replace("try { return JSON.parse(localStorage.getItem('max_w')) || {}; } catch(e){ return {}; }", "return Storage.get('max_w', {});")
text = text.replace("localStorage.setItem('max_w', JSON.stringify(mw));", "Storage.set('max_w', mw);")

# tonnage
text = text.replace("parseFloat(localStorage.getItem('tonnage'))", "parseFloat(Storage.getStr('tonnage'))")
text = text.replace("localStorage.setItem('tonnage',", "Storage.setStr('tonnage',")

text = text.replace("localStorage.setItem('finished_'+AppState.P.instanceId", "Storage.setStr('finished_'+AppState.P.instanceId")
text = text.replace("localStorage.getItem('gemini_key')", "Storage.getStr('gemini_key')")
text = text.replace("try{localStorage.removeItem('wh');}catch(e){}", "Storage.remove('wh');")

# theme
text = text.replace("localStorage.setItem('theme_c1', c1)", "Storage.setStr('theme_c1', c1)")
text = text.replace("localStorage.setItem('theme_c2', c2)", "Storage.setStr('theme_c2', c2)")
text = text.replace("localStorage.getItem('theme_c1')", "Storage.getStr('theme_c1')")
text = text.replace("localStorage.getItem('theme_c2')", "Storage.getStr('theme_c2')")

# API key
text = text.replace("localStorage.setItem('gemini_key',", "Storage.setStr('gemini_key',")

# profName
text = text.replace("localStorage.getItem('profName')", "Storage.getStr('profName')")
text = text.replace("localStorage.setItem('profName',", "Storage.setStr('profName',")

# appVersion
text = text.replace("localStorage.getItem('appVersion')", "Storage.getStr('appVersion')")
text = text.replace("localStorage.setItem('appVersion',", "Storage.setStr('appVersion',")
text = text.replace("localStorage.getItem('pendingChangelog')", "Storage.getStr('pendingChangelog')")
text = text.replace("localStorage.setItem('pendingChangelog',", "Storage.setStr('pendingChangelog',")
text = text.replace("localStorage.getItem('pendingVersion')", "Storage.getStr('pendingVersion')")
text = text.replace("localStorage.setItem('pendingVersion',", "Storage.setStr('pendingVersion',")
text = text.replace("localStorage.removeItem('pendingVersion')", "Storage.remove('pendingVersion')")
text = text.replace("localStorage.removeItem('pendingChangelog')", "Storage.remove('pendingChangelog')")

with open("app.js", "w", encoding="utf-8") as f:
    f.write(text)

print("Refactoring done.")
