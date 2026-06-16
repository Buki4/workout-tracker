import re

with open("app.js", "r") as f:
    text = f.read()

# 1. Custom DB Initialization right after DB definition
db_end_marker = "    ]\n  };\n\n\nvar userPrograms = [];\ntry { userPrograms = JSON.parse(localStorage.getItem(\"userPrograms\")) || []; } catch(e){}"
if db_end_marker not in text:
    print("Warning: EXACT db_end_marker not found, trying fallback")
    # try another way:
    db_end_match = re.search(r"    \]\n  \};\n*(?=var userPrograms = \[\];)", text)
    if db_end_match:
        db_end_marker = db_end_match.group(0)
    else:
        print("Fallback also failed!")

custom_db_code = """
// --- Custom DB Logic ---
var customDBStr = localStorage.getItem('customDB');
var customDB = {chest:[], back:[], legs:[], shoulders:[], arms:[], core:[]};
if (customDBStr) {
  try { customDB = JSON.parse(customDBStr); } catch(e) {}
}
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
  try { localStorage.setItem('customDB', JSON.stringify(customDB)); } catch(e){}
  
  if (DB[mg]) DB[mg].push(newEx);
  
  document.getElementById('add-ex-modal').classList.remove('show');
  showToast('Упражнение добавлено!');
  
  if (document.getElementById('library-screen').classList.contains('active')) {
    renderLibrary();
  }
}
"""
text = text.replace(db_end_marker, db_end_marker + "\n" + custom_db_code + "\n")


# 2. Replace renderLibrary completely using a simpler regex.
old_render = re.search(r"function renderLibrary\(\) \{.*?\n\}\n(?=function exportData)", text, re.DOTALL)
new_render = """function renderLibrary() {
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
    var active = curLibFilter === f;
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
  var uw = getWeights();
  var visibleCount = 0;
  
  Object.keys(DB).forEach(function(mg) {
    var mgTitle = mgNames[mg];
    if (curLibFilter !== 'Все' && mgTitle !== curLibFilter) return;
    
    html += '<div style="font-size:16px;font-weight:700;color:var(--text);margin-top:10px;margin-bottom:5px;">' + mgTitle + '</div>';
    
    DB[mg].forEach(function(ex) {
      visibleCount++;
      var arr = uw[ex.name];
      var statText = 'Нет данных о тренировках';
      
      if (arr) {
        var lastSet = null;
        if (Array.isArray(arr) && arr.length > 0) {
          for(var i=arr.length-1; i>=0; i--) {
            if(arr[i] && (arr[i].w || arr[i].r)) { lastSet = arr[i]; break; }
          }
          if (!lastSet && arr[0]) lastSet = arr[0];
        } else if (!Array.isArray(arr)) {
          lastSet = typeof arr === 'object' ? arr : {w: arr};
        }
        
        if (lastSet && (lastSet.w || lastSet.r)) {
           statText = 'PR: ' + (lastSet.w ? lastSet.w + ' кг' : '') + (lastSet.w && lastSet.r ? ' × ' : '') + (lastSet.r ? lastSet.r + ' повт' : '');
        }
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
      html += '<div style="display:flex;justify-content:space-between;align-items:flex-start">';
      html += '<div style="flex:1"><div><span style="font-weight:600;font-size:15px;">' + ex.name + '</span>' + eqBadge + customBadge + '</div>' + noteText + '</div>';
      html += '</div>';
      html += '<div style="font-size:13px;color:var(--accent);font-weight:600;margin-top:8px">'+statText+'</div>';
      html += '</div>';
    });
  });

  if (!html) html = '<div style="text-align:center;color:var(--text-sec);padding:20px;font-size:14px">Упражнений не найдено</div>';
  itemsWrap.innerHTML = '<div style="color:var(--text3);font-size:12px;margin-bottom:-10px">Отображено упражнений: '+visibleCount+'</div>' + html;
}
"""

if old_render:
    text = text.replace(old_render.group(0), new_render)
    print("Replaced renderLibrary.")
else:
    print("Could not find renderLibrary.")

with open("app.js", "w") as f:
    f.write(text)

