import re

with open("index.html", "r") as f:
    html = f.read()

# Add button to library top-bar
lib_top_bar_target = """<div class="tbi-sub">Все упражнения из программы</div>
    </div>"""
lib_top_bar_replace = """<div class="tbi-sub">Все доступные упражнения</div>
    </div>
    <div class="back-btn" onclick="openAddExModal()" style="background:var(--primary-light);border-color:var(--primary);color:var(--primary);font-size:18px;line-height:22px;text-align:center;">+</div>"""

html = html.replace(lib_top_bar_target, lib_top_bar_replace)

# Add add-ex-modal
modal_html = """
<!-- ADD EXERCISE MODAL -->
<div id="add-ex-modal" class="modal-overlay">
  <div class="modal-content">
    <div style="font-size:18px;font-weight:600;margin-bottom:15px;text-align:center">Свое упражнение</div>
    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px">
      <div>
        <label style="font-size:13px;color:var(--text-sec);display:block;margin-bottom:5px">Название</label>
        <input type="text" id="add-ex-name" class="set-inp" style="width:100%;text-align:left;padding:10px" placeholder="Напр. Жим ногами">
      </div>
      <div>
        <label style="font-size:13px;color:var(--text-sec);display:block;margin-bottom:5px">Мышечная группа</label>
        <select id="add-ex-mg" class="set-inp" style="width:100%;padding:10px">
          <option value="chest">Грудь</option>
          <option value="back">Спина</option>
          <option value="legs">Ноги</option>
          <option value="shoulders">Плечи</option>
          <option value="arms">Руки</option>
          <option value="core">Пресс</option>
        </select>
      </div>
      <div>
        <label style="font-size:13px;color:var(--text-sec);display:block;margin-bottom:5px">Инвентарь</label>
        <select id="add-ex-eq" class="set-inp" style="width:100%;padding:10px">
          <option value="bw">Свой вес</option>
          <option value="barbell">Штанга</option>
          <option value="dumbbells">Гантели</option>
          <option value="pullup">Турник</option>
          <option value="dips">Брусья</option>
          <option value="bands">Резинки</option>
          <option value="rope">Канат/Сендбег</option>
          <option value="bench">Скамья</option>
          <option value="vest">Жилет</option>
          <option value="ez">EZ-гриф</option>
        </select>
      </div>
      <div>
        <label style="font-size:13px;color:var(--text-sec);display:block;margin-bottom:5px">Подсказка (необяз.)</label>
        <input type="text" id="add-ex-note" class="set-inp" style="width:100%;text-align:left;padding:10px" placeholder="Особенности техники...">
      </div>
    </div>
    <button class="btn btn-primary" onclick="saveAddEx()">Сохранить</button>
    <button class="btn btn-outline" style="margin-top:10px" onclick="document.getElementById('add-ex-modal').classList.remove('show')">Отмена</button>
  </div>
</div>
"""

# Insert modal before closing body
html = html.replace("</body>", modal_html + "\n</body>")

with open("index.html", "w") as f:
    f.write(html)
print("index.html updated")
