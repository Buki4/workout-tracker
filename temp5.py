import sys

with open("index.html", "r") as f:
    text = f.read()

# Replace finished storage
old_finished = "localStorage.setItem('finished_'+curWorkout.id+'_w'+curWeek, 'true');"
new_finished = "localStorage.setItem('finished_'+P.instanceId+'_'+curWorkout.id+'_w'+curWeek, 'true');"
text = text.replace(old_finished, new_finished)

# Update renderMonth reading of finished
old_read_finished = "localStorage.getItem('finished_'+w.id+'_w'+wk) === 'true';"
new_read_finished = "localStorage.getItem('finished_'+P.instanceId+'_'+w.id+'_w'+wk) === 'true';"
text = text.replace(old_read_finished, new_read_finished)

# Since migration program 'prog_default_1' should fallback
# Actually, it's safer to use getWsKey or similar logic, but for simple finished flag, it's fine.
# Wait, for prog_default_1, we want the old completed flag to work too.
new_read_finished_fallback = "((P.instanceId === 'prog_default_1' ? localStorage.getItem('finished_'+w.id+'_w'+wk) : null) || localStorage.getItem('finished_'+P.instanceId+'_'+w.id+'_w'+wk)) === 'true';"
text = text.replace(new_read_finished, new_read_finished_fallback)


with open("index.html", "w") as f:
    f.write(text)

print("Updated finished flag logic.")
