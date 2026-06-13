import sys

with open("index.html", "r") as f:
    text = f.read()

start = text.find("<script>\nif ('serviceWorker' in navigator)")

new_html = """<!-- CREATE PROGRAM MODAL -->
<div id="create-prog-modal" class="modal">
  <div class="modal-content" style="max-height:80vh;overflow-y:auto;">
    <h3 style="margin-bottom:15px;font-weight:700">Новая программа</h3>
    <div style="margin-bottom:15px">
      <label style="display:block;font-size:13px;font-weight:600;margin-bottom:5px;color:var(--text2)">Цель</label>
      <select id="cp-focus" style="width:100%;padding:10px;border-radius:10px;background:var(--bg);color:var(--text);border:1px solid var(--border)">
        <option value="hypertrophy">Набор массы / Рельеф</option>
        <option value="strength">Сила</option>
      </select>
    </div>
    <div style="margin-bottom:15px">
      <label style="display:block;font-size:13px;font-weight:600;margin-bottom:5px;color:var(--text2)">Локация</label>
      <select id="cp-location" onchange="toggleCpEq()" style="width:100%;padding:10px;border-radius:10px;background:var(--bg);color:var(--text);border:1px solid var(--border)">
        <option value="home">Дома</option>
        <option value="gym">Тренажерный зал (всё доступно)</option>
      </select>
    </div>
    <div id="cp-eq-wrap" style="display:block;margin-bottom:15px">
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
    </div>
    <div style="display:flex;gap:10px">
      <button class="btn" style="flex:1" onclick="generateProgram()">Создать</button>
      <button class="btn btn-secondary" style="flex:1" onclick="hideModal('create-prog-modal')">Отмена</button>
    </div>
  </div>
</div>

"""

new_text = text[:start] + new_html + text[start:]
with open("index.html", "w") as f:
    f.write(new_text)

print("Added modal.")
