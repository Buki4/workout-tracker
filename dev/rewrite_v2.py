import sys
import re

with open("index.html", "r") as f:
    text = f.read()

# 1. Update renderProgramsList and add deleteProgram / getProgramProgress
old_render = """function renderProgramsList() {
  var html = '<button class="btn" style="width:100%;margin-bottom:15px;background:var(--accent);color:#fff;border:none;" onclick="document.getElementById(\\'create-prog-modal\\').classList.add(\\'show\\')">✨ Создать программу</button>';
  
  userPrograms.forEach(function(prog) {"""

new_render = """function getProgramProgress(p) {
  var tot=0, don=0;
  p.months.forEach(function(m){
    m.workouts.forEach(function(w){
      var wks=m.weeks.split("–");
      var st=parseInt(wks[0]), en=wks.length>1?parseInt(wks[1]):st;
      for(var wk=st;wk<=en;wk++) {
        tot++;
        var isDon = false;
        if (p.instanceId === "prog_default_1") {
          isDon = localStorage.getItem("finished_"+w.id+"_w"+wk) === "true";
        } else {
          isDon = localStorage.getItem("finished_"+p.instanceId+"_"+w.id+"_w"+wk) === "true";
        }
        if (isDon) don++;
      }
    });
  });
  return tot>0 ? Math.round((don/tot)*100) : 0;
}

function deleteProgram(e, id) {
  e.stopPropagation();
  if(!confirm("Удалить программу? История тренировок останется.")) return;
  userPrograms = userPrograms.filter(function(p){return p.instanceId !== id;});
  localStorage.setItem("userPrograms", JSON.stringify(userPrograms));
  if(activeProgId === id) {
    if(userPrograms.length > 0) activeProgId = userPrograms[0].instanceId;
    else activeProgId = null;
    localStorage.setItem("activeProgId", activeProgId);
  }
  renderProgramsList();
}

function renderProgramsList() {
  var html = '<button class="btn" style="width:100%;margin-bottom:15px;background:var(--accent);color:#fff;border:none;" onclick="document.getElementById(\\'create-prog-modal\\').classList.add(\\'show\\')">✨ Создать программу</button>';
  
  userPrograms.forEach(function(prog) {"""
if old_render in text: text = text.replace(old_render, new_render)
else: print("FAIL old_render")

# 2. Update the program card in renderProgramsList
old_card = """    html += '<div style="background:var(--card);border-radius:var(--radius);padding:15px;border:1px solid '+(isActive?'var(--accent)':'var(--border)')+';cursor:pointer;margin-bottom:12px" onclick="openProgram(\\''+prog.instanceId+'\\')">' +
      '<div style="font-weight:700;font-size:16px;margin-bottom:5px">'+prog.name+'</div>' +
      '<div style="font-size:13px;color:var(--text2);margin-bottom:10px">'+prog.desc.substring(0,80)+'...</div>' +
      '<div style="display:flex;gap:10px;font-size:12px;color:var(--text3);font-weight:600;">' +
        '<span style="background:var(--card2);padding:4px 8px;border-radius:10px">'+prog.days+' дня/нед</span>' +
        '<span style="background:var(--card2);padding:4px 8px;border-radius:10px">'+(prog.location==='gym'?'В зале':'Дома')+'</span>' +
      '</div></div>';"""

new_card = """    var pct = getProgramProgress(prog);
    html += '<div style="background:var(--card);border-radius:var(--radius);padding:15px;border:1px solid '+(isActive?'var(--accent)':'var(--border)')+';cursor:pointer;margin-bottom:12px" onclick="openProgram(\\''+prog.instanceId+'\\')">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:5px">' +
        '<div style="font-weight:700;font-size:16px">'+prog.name+'</div>' +
        (prog.instanceId !== 'prog_default_1' ? '<div style="color:#ef4444;font-size:24px;padding:0 5px;line-height:0.8;margin-top:-2px" onclick="deleteProgram(event, \\''+prog.instanceId+'\\')">×</div>' : '') +
      '</div>' +
      '<div style="font-size:13px;color:var(--text2);margin-bottom:10px">'+prog.desc.substring(0,80)+'...</div>' +
      '<div style="display:flex;gap:10px;font-size:12px;color:var(--text3);font-weight:600;margin-bottom:10px">' +
        '<span style="background:var(--card2);padding:4px 8px;border-radius:10px">'+prog.days+' дня/нед</span>' +
        '<span style="background:var(--card2);padding:4px 8px;border-radius:10px">'+(prog.location==='gym'?'В зале':'Дома')+'</span>' +
      '</div>' +
      '<div class="prog-row" style="margin:0;margin-top:10px">' +
        '<div class="prog-bar"><div class="prog-fill" style="width:'+pct+'%;background:var(--accent)"></div></div>' +
        '<div class="prog-pct">'+pct+'%</div>' +
      '</div></div>';"""
if old_card in text: text = text.replace(old_card, new_card)
else: print("FAIL old_card")

# 3. Update the modal HTML
old_modal_html = """    <div id="cp-eq-wrap" style="display:block;margin-bottom:15px">
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
    </div>"""

new_modal_html = """    <div id="cp-eq-wrap" style="display:block;margin-bottom:15px">
      <label style="display:block;font-size:13px;font-weight:600;margin-bottom:5px;color:var(--text2)">Инвентарь (Дома)</label>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px">
        <label style="display:flex;align-items:center;gap:6px"><input type="checkbox" id="cp-eq-dumbbells" checked> Гантели / Гири</label>
        <label style="display:flex;align-items:center;gap:6px"><input type="checkbox" id="cp-eq-pullup" checked> Турник</label>
        <label style="display:flex;align-items:center;gap:6px"><input type="checkbox" id="cp-eq-bands"> Фитнес-резинки</label>
        <label style="display:flex;align-items:center;gap:6px"><input type="checkbox" id="cp-eq-rope"> Канат</label>
        <label style="display:flex;align-items:center;gap:6px"><input type="checkbox" id="cp-eq-dips"> Брусья</label>
        <label style="display:flex;align-items:center;gap:6px"><input type="checkbox" id="cp-eq-bench"> Жимовая скамья</label>
        <label style="display:flex;align-items:center;gap:6px"><input type="checkbox" id="cp-eq-vest"> Жилет с весом</label>
        <label style="display:flex;align-items:center;gap:6px"><input type="checkbox" id="cp-eq-ez"> EZ-гриф</label>
        <label style="display:flex;align-items:center;gap:6px"><input type="checkbox" id="cp-eq-barbell"> Гриф 20кг</label>
      </div>
    </div>
    <div style="display:flex;gap:10px;margin-bottom:20px">
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
if old_modal_html in text: text = text.replace(old_modal_html, new_modal_html)
else: print("FAIL old_modal_html")


# 4. Update generateProgram
old_gen = """function generateProgram() {
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
  
  document.getElementById('create-prog-modal').classList.remove('show');
  openProgram(newProg.instanceId);
}"""

new_gen = """function generateProgram() {
  var loc = document.getElementById('cp-location').value;
  var days = parseInt(document.getElementById('cp-days').value);
  var dur = parseInt(document.getElementById('cp-duration').value);
  var focus = document.getElementById('cp-focus').value;
  var eq = [];
  if(loc==='home') {
    ['dumbbells','pullup','bands','rope','dips','bench','vest','ez','barbell'].forEach(function(k){
      var el = document.getElementById('cp-eq-'+k);
      if(el && el.checked) eq.push(k);
    });
  }
  
  var bestTpl = TEMPLATES.find(function(t) { return t.location === loc && t.days === days; });
  if (!bestTpl) bestTpl = TEMPLATES[0];
  
  var newProg = JSON.parse(JSON.stringify(bestTpl));
  newProg.instanceId = 'prog_' + Date.now();
  newProg.name += dur < 4 ? " (" + dur + " мес)" : "";
  
  // Adjust duration by slicing the months array
  // If the template has more months than requested, slice it.
  if (dur < newProg.months.length) {
    newProg.months = newProg.months.slice(0, dur);
  } else if (dur > newProg.months.length) {
    // If the template has fewer months, duplicate the last month
    var lastM = newProg.months[newProg.months.length - 1];
    var clen = newProg.months.length;
    for(var i=clen; i<dur; i++) {
      var dupe = JSON.parse(JSON.stringify(lastM));
      dupe.id = "m" + (i+1) + "_" + loc + "_d" + days;
      dupe.title = "Месяц " + (i+1);
      dupe.weeks = ((i*4)+1) + "–" + ((i*4)+4);
      newProg.months.push(dupe);
    }
  }

  // Handle Equipment Substitutions
  if (loc === 'home') {
    newProg.months.forEach(function(m) {
      m.workouts.forEach(function(w) {
        w.exs.forEach(function(ex) {
          // Add Vest to bodyweight exercises if selected
          if (eq.includes('vest') && (ex.name.toLowerCase().includes('отжимания') || ex.name.toLowerCase().includes('подтягивания') || ex.name.toLowerCase().includes('приседания'))) {
            ex.note = (ex.note ? ex.note + '. ' : '') + 'Можно использовать жилет.';
          }
          // Substitute dips
          if (eq.includes('dips') && ex.name.toLowerCase().includes('отжимания от пола')) {
            ex.name = 'Отжимания на брусьях';
          }
          if (eq.includes('dips') && ex.name.toLowerCase().includes('обратные отжимания')) {
            ex.name = 'Отжимания на брусьях (акцент на трицепс)';
          }
          // Barbell / Bench
          if (eq.includes('bench') && eq.includes('barbell') && ex.name.toLowerCase().includes('отжимания от пола')) {
            ex.name = 'Жим штанги лежа';
          }
          if (eq.includes('barbell') && ex.name.toLowerCase().includes('приседания')) {
            ex.name = 'Приседания со штангой';
          }
          // EZ Bar
          if (eq.includes('ez') && ex.name.toLowerCase().includes('сгибания рук')) {
            ex.name = 'Сгибания рук с EZ-грифом';
          }
        });
      });
    });
  }

  userPrograms.push(newProg);
  localStorage.setItem('userPrograms', JSON.stringify(userPrograms));
  
  document.getElementById('create-prog-modal').classList.remove('show');
  
  // Wait a tick for the modal to close and CSS to update, to prevent UI freeze
  setTimeout(function(){
    openProgram(newProg.instanceId);
  }, 100);
}"""
if old_gen in text: text = text.replace(old_gen, new_gen)
else: print("FAIL old_gen")

with open("index.html", "w") as f:
    f.write(text)

print("Done rewrite")
