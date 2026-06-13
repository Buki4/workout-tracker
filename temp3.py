import sys
import re

with open("index.html", "r") as f:
    text = f.read()

# Replace navTo
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
  document.getElementById('hs-title').innerText = P.name || P.meta.title || '';
  document.getElementById('hs-subtitle').innerText = (P.days ? P.days + ' тренировки в неделю' : P.meta.subtitle || '');
  
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

with open("index.html", "w") as f:
    f.write(text)

print("Updated JS functions.")
