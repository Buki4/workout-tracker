import sys

with open("index.html", "r") as f:
    text = f.read()

start = text.find("<!-- HOME -->")
end = text.find("<!-- MONTH SCREEN -->")

new_html = """<!-- PROGRAMS LIST (NEW HOME) -->
<div id="home-screen" class="screen active">
  <div class="top-bar">
    <div class="tbi">
      <div class="tbi-title">Мои программы</div>
      <div class="tbi-sub">Ваши планы тренировок</div>
    </div>
  </div>
  <div style="padding:20px;padding-top:100px;display:flex;flex-direction:column;gap:15px;padding-bottom:100px" id="programs-list"></div>
</div>

<!-- PROGRAM SCREEN (OLD HOME) -->
<div id="program-screen" class="screen">
  <div class="top-bar">
    <div class="back-btn" onclick="navTo('home-screen')" style="margin-right:15px;color:var(--text);font-size:20px;background:none;border:none;">←</div>
    <div class="tbi">
      <div class="tbi-title" id="hs-title">Программа тренировок</div>
      <div class="tbi-sub" id="hs-subtitle"></div>
    </div>
  </div>
  <div class="section-label" style="margin-top:20px;padding:0 20px;">Месяцы / Блоки</div>
  <div class="months-list" id="months-list"></div>
  <div class="sp"></div>
</div>
"""

new_text = text[:start] + new_html + text[end:]
with open("index.html", "w") as f:
    f.write(new_text)

print("Updated HTML screens.")
