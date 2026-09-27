// ─────────────────────────────────────────
// CHALLENGES LOGIC
// ─────────────────────────────────────────

var challenges = Storage.get('challenges_db', []);

// Helpers for Date
function getDayDiff(d1, d2) {
  var t1 = new Date(d1).setHours(0,0,0,0);
  var t2 = new Date(d2).setHours(0,0,0,0);
  return Math.round((t2 - t1) / (1000 * 60 * 60 * 24));
}
function formatDate(d) {
  var dt = new Date(d);
  return dt.toISOString().split('T')[0];
}

// ─── NAV TO CHALLENGES ───
window.renderChallengesList = function() {
  var html = '<button class="btn" style="width:100%;margin-bottom:20px;background:linear-gradient(135deg,var(--accent),#a78bfa);color:#fff;border:none;box-shadow:0 4px 15px rgba(108,99,255,0.3);" onclick="openCreateChallengeModal()">✨ Создать челлендж</button>';
  
  if (challenges.length === 0) {
    html += '<div style="text-align:center;padding:40px 20px;color:var(--text3)">Нет активных челленджей.<br>Брось себе вызов!</div>';
  } else {
    challenges.forEach(function(ch) {
      var daysElapsed = getDayDiff(ch.startDate, new Date());
      var dayNum = Math.min(Math.max(daysElapsed + 1, 1), ch.days); // 1-based day
      
      var totalReps = ch.exs.reduce((sum, ex) => sum + parseInt(ex.reps), 0) * ch.days;
      var currentReps = 0;
      var streak = 0;
      var maxStreak = 0;
      var currStreak = 0;
      
      // Calculate stats
      for (var i = 0; i < ch.days; i++) {
        var dayDate = new Date(ch.startDate);
        dayDate.setDate(dayDate.getDate() + i);
        var dateStr = formatDate(dayDate);
        var dData = ch.history[dateStr];
        
        if (dData && dData.done) {
          currentReps += ch.exs.reduce((sum, ex) => sum + parseInt(ex.reps), 0);
          currStreak++;
          if (currStreak > maxStreak) maxStreak = currStreak;
        } else {
          // If it's a past day and not done, streak resets
          if (getDayDiff(dayDate, new Date()) > 0) {
            currStreak = 0;
          }
        }
      }
      streak = currStreak;
      
      var pct = totalReps > 0 ? Math.round((currentReps / totalReps) * 100) : 0;
      var isCompleted = currentReps >= totalReps;
      var isActiveDay = (daysElapsed >= 0 && daysElapsed < ch.days);
      
      html += '<div style="background:var(--card);border-radius:16px;border:1px solid var(--border);padding:20px;margin-bottom:15px;position:relative;overflow:hidden;" onclick="openChallenge(\''+ch.id+'\')">';
      html += '  <div style="position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--accent),#a78bfa)"></div>';
      
      html += '  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px">';
      html += '    <div>';
      html += '      <div style="font-size:20px;font-weight:800;margin-bottom:4px">'+ch.name+'</div>';
      html += '      <div style="font-size:13px;color:var(--text2)">'+ch.days+' дней · день '+(isCompleted?ch.days:dayNum)+' из '+ch.days+'</div>';
      html += '    </div>';
      if (streak > 0) {
        html += '    <div style="background:rgba(249,115,22,0.15);color:var(--orange);padding:4px 8px;border-radius:8px;font-size:11px;font-weight:700">🔥 '+streak+' дней</div>';
      }
      html += '  </div>';
      
      // Circle Progress + Stats
      html += '  <div style="display:flex;align-items:center;gap:20px;margin-bottom:20px">';
      html += '    <div style="position:relative;width:80px;height:80px;flex-shrink:0">';
      html += '      <svg width="80" height="80" viewBox="0 0 100 100" style="transform:rotate(-90deg)">';
      html += '        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--card2)" stroke-width="8"></circle>';
      html += '        <circle cx="50" cy="50" r="40" fill="none" stroke="url(#ch-grad)" stroke-width="8" stroke-dasharray="251" stroke-dashoffset="'+(251-(251*pct/100))+'" stroke-linecap="round" style="transition:stroke-dashoffset 1s ease-out"></circle>';
      html += '        <defs><linearGradient id="ch-grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="var(--accent)"/><stop offset="100%" stop-color="#a78bfa"/></linearGradient></defs>';
      html += '      </svg>';
      html += '      <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">';
      html += '        <div style="font-size:16px;font-weight:800">'+pct+'%</div>';
      html += '      </div>';
      html += '    </div>';
      html += '    <div style="flex:1;display:flex;flex-direction:column;gap:8px">';
      ch.exs.forEach(function(ex) {
        html += '      <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text2)">';
        html += '        <span>'+ex.name+'</span><span style="font-weight:600">'+ex.reps+'/день</span>';
        html += '      </div>';
      });
      html += '    </div>';
      html += '  </div>';
      
      html += '  <button style="width:100%;padding:12px;border-radius:10px;background:'+(isCompleted?'var(--card2)':'rgba(16,185,129,0.15)')+';color:'+(isCompleted?'var(--text2)':'var(--green)')+';border:none;font-size:14px;font-weight:700;cursor:pointer;-webkit-tap-highlight-color:transparent" onclick="event.stopPropagation(); startChallengeDay(\''+ch.id+'\')">'+(isCompleted?'Завершено 🎉':(isActiveDay?'Сегодняшняя тренировка ▶':'Просмотр'))+'</button>';
      html += '</div>';
    });
  }
  document.getElementById('challenges-list').innerHTML = html;
};

// ─── CREATE CHALLENGE MODAL ───
var ccExs = [];
window.openCreateChallengeModal = function() {
  document.getElementById('cc-name').value = '';
  setCcDays(30);
  ccExs = [{id:Date.now(), name:'Приседания', reps:100}];
  renderCcExs();
  document.getElementById('create-challenge-modal').classList.add('show');
};

window.setCcDays = function(d) {
  document.getElementById('cc-days').value = d;
  document.querySelectorAll('#cc-days-btns button').forEach(function(btn) {
    if(parseInt(btn.dataset.days) === d) {
      btn.style.borderColor = 'var(--accent)';
      btn.style.background = 'rgba(108,99,255,0.15)';
      btn.style.color = 'var(--accent)';
    } else {
      btn.style.borderColor = 'var(--border)';
      btn.style.background = 'var(--card2)';
      btn.style.color = 'var(--text2)';
    }
  });
  updateCcSummary();
};

window.addCcEx = function() {
  ccExs.push({id:Date.now(), name:'', reps:100});
  renderCcExs();
};

window.removeCcEx = function(idx) {
  ccExs.splice(idx, 1);
  renderCcExs();
};

window.updateCcEx = function(idx, field, val) {
  if (ccExs[idx]) {
    ccExs[idx][field] = val;
    updateCcSummary();
  }
};

window.renderCcExs = function() {
  var html = '';
  ccExs.forEach(function(ex, i) {
    html += '<div style="display:flex;gap:8px;margin-bottom:8px;align-items:flex-end">';
    html += '  <div style="flex:2">';
    if(i===0) html += '<div style="font-size:10px;color:var(--text3);margin-bottom:4px">Упражнение</div>';
    html += '    <input type="text" value="'+ex.name+'" oninput="updateCcEx('+i+',\'name\',this.value)" placeholder="Напр. Отжимания" style="width:100%;background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:10px;color:var(--text);font-size:14px;outline:none">';
    html += '  </div>';
    html += '  <div style="flex:1">';
    if(i===0) html += '<div style="font-size:10px;color:var(--text3);margin-bottom:4px">Повторений</div>';
    html += '    <input type="number" value="'+ex.reps+'" oninput="updateCcEx('+i+',\'reps\',this.value)" style="width:100%;background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:10px;color:var(--text);font-size:14px;outline:none">';
    html += '  </div>';
    html += '  <button onclick="removeCcEx('+i+')" style="padding:10px;background:transparent;border:none;color:var(--text3);font-size:18px;cursor:pointer">×</button>';
    html += '</div>';
  });
  document.getElementById('cc-exs').innerHTML = html;
  updateCcSummary();
};

window.updateCcSummary = function() {
  var days = parseInt(document.getElementById('cc-days').value) || 0;
  var repsPerDay = ccExs.reduce((sum, ex) => sum + (parseInt(ex.reps) || 0), 0);
  var total = days * repsPerDay;
  document.getElementById('cc-summary').textContent = days + ' дней × ' + repsPerDay + ' повт/день = ' + total + ' всего';
};

window.saveChallengeCreate = function() {
  var name = document.getElementById('cc-name').value.trim();
  if(!name) return showToast('Введите название челленджа!');
  var validExs = ccExs.filter(e => e.name.trim() !== '' && parseInt(e.reps) > 0);
  if(validExs.length === 0) return showToast('Добавьте хотя бы одно упражнение!');
  
  var days = parseInt(document.getElementById('cc-days').value) || 30;
  
  var ch = {
    id: 'ch_' + Date.now(),
    name: name,
    days: days,
    startDate: formatDate(new Date()),
    exs: validExs.map(e => ({ name: e.name.trim(), reps: parseInt(e.reps) })),
    history: {} // { '2026-09-27': { done: true, repsDone: [100, 100] } }
  };
  
  challenges.unshift(ch);
  Storage.set('challenges_db', challenges);
  
  document.getElementById('create-challenge-modal').classList.remove('show');
  showToast('Челлендж создан! 🔥');
  renderChallengesList();
};

// ─── CHALLENGE DETAIL (CALENDAR) ───
var curCh = null;
window.openChallenge = function(id) {
  curCh = challenges.find(c => c.id === id);
  if(!curCh) return;
  
  document.getElementById('cd-title').textContent = curCh.name;
  document.getElementById('cd-sub').textContent = 'Прогресс по дням';
  
  var html = '';
  html += '<div style="background:var(--card);border-radius:16px;border:1px solid var(--border);padding:20px;margin-bottom:20px">';
  
  // Grid
  html += '<div style="display:grid;grid-template-columns:repeat(7, 1fr);gap:8px;margin-bottom:20px">';
  var maxStreak=0, currStreak=0, missed=0, completed=0;
  var daysElapsed = getDayDiff(curCh.startDate, new Date());
  
  for(var i=0; i<curCh.days; i++) {
    var dayDate = new Date(curCh.startDate);
    dayDate.setDate(dayDate.getDate() + i);
    var dateStr = formatDate(dayDate);
    var isPast = getDayDiff(dayDate, new Date()) > 0;
    var isToday = getDayDiff(dayDate, new Date()) === 0;
    var dData = curCh.history[dateStr];
    var isDone = dData && dData.done;
    
    if (isDone) {
      completed++;
      currStreak++;
      if(currStreak>maxStreak) maxStreak=currStreak;
    } else {
      if (isPast) {
        missed++;
        currStreak = 0;
      }
    }
    
    var bg = 'var(--card2)';
    var color = 'var(--text3)';
    var content = (i+1);
    
    if (isDone) {
      bg = 'var(--green)'; color = '#fff'; content = '✓';
    } else if (isToday) {
      bg = 'var(--accent)'; color = '#fff';
    } else if (isPast) {
      bg = 'rgba(239,68,68,0.15)'; color = '#ef4444'; content = '✕';
    }
    
    html += '<div style="aspect-ratio:1;border-radius:8px;background:'+bg+';color:'+color+';display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;cursor:pointer" onclick="editChallengeDay(\''+dateStr+'\')">'+content+'</div>';
  }
  html += '</div>';
  
  html += '<div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:8px"><span style="color:var(--text2)">Лучшая серия:</span><span style="font-weight:700">'+maxStreak+' дней</span></div>';
  html += '<div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:20px"><span style="color:var(--text2)">Пропуски:</span><span style="font-weight:700;color:'+(missed>0?'#ef4444':'var(--text)')+'">'+missed+'</span></div>';
  
  var pct = Math.round((completed / curCh.days) * 100) || 0;
  html += '<div style="font-size:12px;color:var(--text3);margin-bottom:6px">Тоталь прогресс ('+pct+'%)</div>';
  html += '<div class="prog-bar" style="height:8px;border-radius:4px"><div class="prog-fill" style="width:'+pct+'%;background:var(--accent);border-radius:4px"></div></div>';
  
  html += '</div>';
  
  html += '<button onclick="deleteChallenge(\''+curCh.id+'\')" style="width:100%;padding:15px;border-radius:12px;background:rgba(239,68,68,0.1);color:#ef4444;border:none;font-size:14px;font-weight:700;cursor:pointer">🗑 Удалить челлендж</button>';
  
  document.getElementById('cd-body').innerHTML = html;
  showScreen('challenge-detail-screen');
};

window.deleteChallenge = function(id) {
  if(!confirm('Точно удалить этот челлендж?')) return;
  challenges = challenges.filter(c => c.id !== id);
  Storage.set('challenges_db', challenges);
  navTo('challenges');
};

// ─── CHALLENGE DAY TRAINING ───
var curChDate = '';
window.startChallengeDay = function(id) {
  curCh = challenges.find(c => c.id === id);
  if(!curCh) return;
  curChDate = formatDate(new Date());
  openChallengeDay(curChDate);
};

window.editChallengeDay = function(dateStr) {
  curChDate = dateStr;
  openChallengeDay(dateStr);
};

window.openChallengeDay = function(dateStr) {
  var daysElapsed = getDayDiff(curCh.startDate, dateStr);
  var dayNum = daysElapsed + 1;
  document.getElementById('cday-title').textContent = 'День ' + dayNum + ' / ' + curCh.days;
  document.getElementById('cday-sub').textContent = curCh.name;
  
  var dData = curCh.history[dateStr] || { done: false, exsDone: [] };
  var html = '';
  
  curCh.exs.forEach(function(ex, i) {
    var isDone = dData.exsDone && dData.exsDone[i];
    
    html += '<div style="background:var(--card);border-radius:16px;border:1px solid '+(isDone?'var(--accent)':'var(--border)')+';padding:20px;display:flex;align-items:center;justify-content:space-between;transition:all 0.2s" onclick="toggleChEx(this, '+i+')" data-idx="'+i+'" data-done="'+(isDone?'true':'false')+'">';
    html += '  <div>';
    html += '    <div style="font-size:14px;color:var(--text2);margin-bottom:4px">'+ex.name+'</div>';
    html += '    <div style="font-size:32px;font-weight:800;line-height:1">'+ex.reps+'</div>';
    html += '  </div>';
    html += '  <div class="ch-chk" style="width:40px;height:40px;border-radius:20px;border:2px solid '+(isDone?'var(--accent)':'var(--border)')+';background:'+(isDone?'var(--accent)':'transparent')+';display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;transition:all 0.2s">'+(isDone?'✓':'')+'</div>';
    html += '</div>';
  });
  
  document.getElementById('cday-exs').innerHTML = html;
  showScreen('challenge-day-screen');
};

window.toggleChEx = function(el, idx) {
  var chk = el.querySelector('.ch-chk');
  var isDone = el.dataset.done === 'true';
  
  if (isDone) {
    el.dataset.done = 'false';
    el.style.borderColor = 'var(--border)';
    chk.style.background = 'transparent';
    chk.style.borderColor = 'var(--border)';
    chk.innerHTML = '';
  } else {
    el.dataset.done = 'true';
    el.style.borderColor = 'var(--accent)';
    chk.style.background = 'var(--accent)';
    chk.style.borderColor = 'var(--accent)';
    chk.innerHTML = '✓';
    playSound('ding');
  }
};

window.saveChallengeDay = function() {
  var dData = { done: true, exsDone: [] };
  var allDone = true;
  var rows = document.querySelectorAll('#cday-exs > div');
  
  rows.forEach(function(row, i) {
    var isDone = row.dataset.done === 'true';
    dData.exsDone[i] = isDone;
    if (!isDone) allDone = false;
  });
  
  dData.done = allDone;
  
  curCh.history[curChDate] = dData;
  Storage.set('challenges_db', challenges);
  
  if (allDone) {
    playSound('tada');
    showToast('День выполнен! Красавчик! 🏆');
  }
  
  navTo('challenges');
};
