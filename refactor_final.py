import re

with open("app.js", "r") as f:
    text = f.read()

# 1. Find DB in generateProgram
db_regex = r"  // --- Exercise Database ---\n  var DB = \{.*?\n  \};\n"
db_match = re.search(db_regex, text, re.DOTALL)
if db_match:
    db_text = db_match.group(0)
    text = text.replace(db_text, "") # Remove it from inside generateProgram

    # Clean indent
    db_text = db_text.replace("  // ---", "// ---")
    db_text = db_text.replace("  var DB", "var DB")
    db_text = re.sub(r"\n  ", "\n", db_text)
    
    # 2. Define Custom DB logic
    custom_db_logic = """
// --- Custom DB Logic ---
const customDB = Storage.get('customDB', {chest:[], back:[], legs:[], shoulders:[], arms:[], core:[]});
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
"""
    # Insert DB and custom logic right after TEMPLATES
    tpl_end = re.search(r"const TEMPLATES = \[.*?\];\n", text, re.DOTALL)
    if tpl_end:
        text = text[:tpl_end.end()] + "\n" + db_text + custom_db_logic + "\n" + text[tpl_end.end():]
        print("Extracted DB successfully.")
    else:
        print("TEMPLATES not found!")
else:
    print("DB block not found!")


# 3. Rewrite renderLibrary() entirely
old_render_lib = re.search(r"function renderLibrary\(\) \{.*?\n\}\n(?=function onLibClick)", text, re.DOTALL)

new_render_lib = """function renderLibrary() {
  var uw = Storage.get('uw', {});
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
      filtersHtml += '<div data-filter="'+f+'" onclick="setLibFilter(\\''+f+'\\')" style="padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap;transition:all 0.2s;-webkit-tap-highlight-color:transparent;">'+f+'</div>';
    });
    filtersWrap.innerHTML = filtersHtml;
  }
  
  Array.from(filtersWrap.children).forEach(function(child) {
    var f = child.getAttribute('data-filter');
    var active = AppState.libFilter === f;
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

  var html = '';
  
  Object.keys(DB).forEach(function(mg) {
    var mgTitle = mgNames[mg];
    if (AppState.libFilter !== 'Все' && AppState.libFilter !== mgTitle) return;
    
    html += '<div style="font-size:16px;font-weight:700;color:var(--text);margin-top:10px;margin-bottom:5px;">' + mgTitle + '</div>';
    
    DB[mg].forEach(function(ex) {
      var arr = uw[ex.name];
      var prText = '';
      if (arr) {
        if (Array.isArray(arr) && arr[0]) prText = arr[0].w ? arr[0].w + ' ' : '';
        else if (!Array.isArray(arr)) prText = (typeof arr === 'object' ? arr.w : arr) + ' ';
      }
      
      var eqText = eqNames[ex.eq] || ex.eq || '';
      var noteText = ex.note ? '<div style="font-size:12px;color:var(--text-sec);margin-top:4px;">' + ex.note + '</div>' : '';
      var eqBadge = eqText ? '<span style="font-size:10px;background:var(--bg);padding:2px 6px;border-radius:4px;color:var(--text-sec);margin-left:8px;vertical-align:middle">' + eqText + '</span>' : '';
      
      var isCustom = false;
      if (customDB[mg]) {
          isCustom = customDB[mg].some(function(cEx) { return cEx.name === ex.name; });
      }
      var customBadge = isCustom ? '<span style="font-size:10px;background:rgba(255,165,0,0.2);color:orange;padding:2px 6px;border-radius:4px;margin-left:4px;vertical-align:middle">Своё</span>' : '';
      
      html += '<div style="background:var(--card);border-radius:var(--radius-sm);border:1px solid var(--border);padding:15px;margin-bottom:10px;">';
      html += '<div style="display:flex;justify-content:space-between;align-items:center">';
      html += '<div style="flex:1"><div><span style="font-weight:600;font-size:15px;">' + ex.name + '</span>' + eqBadge + customBadge + '</div>' + noteText + '</div>';
      if (prText) {
        html += '<div style="background:rgba(108,99,255,0.1);color:var(--primary);padding:4px 8px;border-radius:6px;font-size:13px;font-weight:600;white-space:nowrap;margin-left:10px">PR: ' + prText + '</div>';
      }
      html += '</div></div>';
    });
  });

  if (!html) html = '<div style="text-align:center;color:var(--text-sec);padding:20px;font-size:14px">Упражнений не найдено</div>';
  itemsWrap.innerHTML = html;
}
"""

if old_render_lib:
    text = text.replace(old_render_lib.group(0), new_render_lib)
    print("Replaced renderLibrary successfully.")
else:
    print("WARNING: renderLibrary regex match failed! Dumping match target...")

# Clean up previously erroneously injected customDB logic (from my first failed run today)
bad_injection = re.search(r"// --- Custom DB Logic ---.*?\}\n\n  userPrograms\.push", text, re.DOTALL)
if bad_injection:
    text = text.replace(bad_injection.group(0), "  userPrograms.push")
    print("Cleaned up old bad injection.")

with open("app.js", "w") as f:
    f.write(text)

