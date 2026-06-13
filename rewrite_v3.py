import sys
import re

with open("index.html", "r") as f:
    text = f.read()

# 1. Replace renderProgramsList and add deleteProgram / getProgramProgress
match = re.search(r"function renderProgramsList\(\) \{.*?\n\}", text, re.DOTALL)
if match:
    old_render = match.group(0)
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
  
  userPrograms.forEach(function(prog) {
    var isActive = prog.instanceId === activeProgId;
    var pct = getProgramProgress(prog);
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
      '</div></div>';
  });
  
  document.getElementById('programs-list').innerHTML = html;
}"""
    text = text.replace(old_render, new_render)
    print("SUCCESS renderProgramsList")
else:
    print("FAIL regex renderProgramsList")

with open("index.html", "w") as f:
    f.write(text)

print("Done rewrite")
