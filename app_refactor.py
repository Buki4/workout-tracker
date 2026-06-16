import re

with open("app.js", "r") as f:
    text = f.read()

# 1. Inject customDB logic after DB definition
custom_db_logic = """
// Load custom DB and merge
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
  
  // Refresh library if we are on it
  if (document.getElementById('library-screen').classList.contains('active')) {
    renderLibrary();
  }
}
"""

text = text.replace("var userPrograms = AppState.programs;", custom_db_logic + "\nvar userPrograms = AppState.programs;")

# 2. Rewrite renderLibrary()
old_render_library = re.search(r"function renderLibrary\(\) \{.*?\n\s*\}\n(?=function onLibClick)", text, re.DOTALL)
if not old_render_library:
    print("Could not find renderLibrary")
else:
    new_render_library = """function renderLibrary() {
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
  
  Array.from(filtersWrap.children).forEach(function(el){
    if (el.getAttribute('data-filter') === AppState.libFilter) {
      el.style.background = 'var(--primary)';
      el.style.color = '#fff';
      el.style.border = '1px solid var(--primary)';
    } else {
      el.style.background = 'transparent';
      el.style.color = 'var(--text-sec)';
      el.style.border = '1px solid var(--border)';
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
      
      html += '<div class="workout-card" style="padding:15px;display:flex;justify-content:space-between;align-items:center">';
      html += '<div style="flex:1"><div><span style="font-weight:600;font-size:15px;">' + ex.name + '</span>' + eqBadge + '</div>' + noteText + '</div>';
      if (prText) {
        html += '<div style="background:rgba(108,99,255,0.1);color:var(--primary);padding:4px 8px;border-radius:6px;font-size:13px;font-weight:600;white-space:nowrap;margin-left:10px">PR: ' + prText + '</div>';
      }
      html += '</div>';
    });
  });

  if (!html) html = '<div style="text-align:center;color:var(--text-sec);padding:20px;font-size:14px">Упражнений не найдено</div>';
  itemsWrap.innerHTML = html;
}
"""
    text = text.replace(old_render_library.group(0), new_render_library)

# 3. Update getMuscleGroup logic if it was relying on something old
# Actually getMuscleGroup function was relying on P.months! But now we don't need it for renderLibrary.
# Let's write the file.
with open("app.js", "w") as f:
    f.write(text)
print("app.js refactored")
