const MOBILE_APP_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800;900&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; background: #050505; color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; }
  button, input, textarea, select { font: inherit; }
  button { cursor: pointer; }
  .app-shell { min-height: 100vh; padding: 18px 16px 96px; background: radial-gradient(circle at top right, rgba(34,197,94,.18), transparent 38%), #050505; }
  .topbar { position: sticky; top: 0; z-index: 30; margin: -18px -16px 18px; padding: 18px 16px 12px; background: rgba(5,5,5,.82); backdrop-filter: blur(18px); border-bottom: 1px solid rgba(255,255,255,.06); }
  .eyebrow { color: #71717a; font-size: 9px; font-weight: 900; letter-spacing: .18em; text-transform: uppercase; }
  .title { margin: 3px 0 0; font-size: 22px; line-height: 1; font-weight: 900; letter-spacing: -.04em; }
  .subtitle { color: #a1a1aa; font-size: 11px; line-height: 1.5; margin: 8px 0 0; }
  .page { display: none; animation: pageIn .22s ease-out; }
  .page.active { display: block; }
  @keyframes pageIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .glass { background: rgba(255,255,255,.045); border: 1px solid rgba(255,255,255,.08); box-shadow: 0 18px 50px rgba(0,0,0,.28); backdrop-filter: blur(16px); }
  .card { border-radius: 26px; padding: 18px; }
  .metric { border-radius: 22px; padding: 14px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); }
  .metric strong { display: block; font-size: 22px; font-weight: 900; letter-spacing: -.04em; }
  .metric span { display: block; margin-top: 3px; color: #71717a; font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: .1em; }
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .section-title { margin: 22px 0 10px; color: #71717a; font-size: 10px; font-weight: 900; letter-spacing: .16em; text-transform: uppercase; }
  .input { width: 100%; border: 1px solid rgba(255,255,255,.09); background: rgba(0,0,0,.35); color: #fff; outline: none; border-radius: 18px; padding: 13px 14px; font-size: 13px; }
  .input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
  .primary { width: 100%; border: 0; color: #07110b; background: var(--accent); border-radius: 20px; padding: 15px 16px; font-size: 10px; font-weight: 900; letter-spacing: .16em; text-transform: uppercase; box-shadow: 0 18px 42px var(--accent-glow); }
  .secondary { border: 1px solid rgba(255,255,255,.1); color: #fff; background: rgba(255,255,255,.045); border-radius: 18px; padding: 12px 14px; font-size: 10px; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
  .danger { color: #fecdd3; border-color: rgba(244,63,94,.25); background: rgba(244,63,94,.12); }
  .list { display: flex; flex-direction: column; gap: 10px; }
  .row { display: flex; align-items: center; justify-content: space-between; gap: 12px; border-radius: 20px; padding: 13px; background: rgba(255,255,255,.035); border: 1px solid rgba(255,255,255,.06); }
  .row-title { font-size: 13px; font-weight: 900; }
  .row-sub { margin-top: 3px; color: #71717a; font-size: 10px; font-weight: 700; line-height: 1.35; }
  .pill { display: inline-flex; align-items: center; gap: 6px; border-radius: 999px; padding: 6px 9px; background: var(--accent-soft); color: var(--accent); font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: .1em; }
  .tabbar { position: fixed; left: 14px; right: 14px; bottom: 14px; z-index: 60; height: 72px; display: grid; grid-template-columns: repeat(var(--tabs), 1fr); gap: 8px; padding: 8px; border-radius: 28px; background: rgba(10,10,10,.82); border: 1px solid rgba(255,255,255,.1); backdrop-filter: blur(24px); box-shadow: 0 24px 70px rgba(0,0,0,.6); }
  .tabbar button { border: 0; border-radius: 20px; color: #71717a; background: transparent; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; font-size: 8px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
  .tabbar button.active { color: var(--accent); background: var(--accent-soft); }
  .tabbar i { width: 19px; height: 19px; }
  .tiny { color: #71717a; font-size: 10px; line-height: 1.45; }
  .check { width: 21px; height: 21px; accent-color: var(--accent); }
  .progress { height: 9px; overflow: hidden; border-radius: 999px; background: rgba(255,255,255,.08); }
  .progress span { display: block; height: 100%; width: 0%; background: var(--accent); transition: width .25s ease; }
  .timer-display { font-size: 54px; line-height: .95; font-weight: 900; letter-spacing: -.08em; text-align: center; }
`;

export const APP_TEMPLATES: Record<string, string> = {
  fitness: `
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{APP_TITLE}} - Emagrecimento</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/lucide-static@0.321.0/font/lucide.min.css" rel="stylesheet">
  <style>
    :root { --accent: #22c55e; --accent-soft: rgba(34,197,94,.12); --accent-glow: rgba(34,197,94,.22); }
    ${MOBILE_APP_STYLE}
  </style>
</head>
<body>
  <main class="app-shell" style="--tabs:4">
    <header class="topbar">
      <div class="eyebrow">App salvo no seu navegador</div>
      <h1 class="title">{{APP_TITLE}}</h1>
      <p class="subtitle">{{APP_SUBTITLE}}</p>
    </header>

    <section id="page-home" class="page active">
      <div class="glass card">
        <span class="pill"><i class="lucide-flame"></i> Plano de hoje</span>
        <h2 class="text-3xl font-black tracking-tighter mt-4 mb-2">Emagrecimento Express</h2>
        <p class="tiny">Treino rapido, sem equipamentos e com timer integrado. Seus dados ficam salvos no localStorage.</p>
        <div class="grid2 mt-5">
          <div class="metric"><strong id="home-streak">0</strong><span>Dias treinando</span></div>
          <div class="metric"><strong id="home-calories">0</strong><span>Kcal estimadas</span></div>
        </div>
        <button class="primary mt-5" onclick="startWorkout('express')">Comecar treino</button>
      </div>

      <h3 class="section-title">Resumo de progresso</h3>
      <div class="grid2">
        <div class="metric"><strong id="home-weight">0kg</strong><span>Peso atual</span></div>
        <div class="metric"><strong id="home-goal">0kg</strong><span>Meta</span></div>
        <div class="metric"><strong id="home-water">0/8</strong><span>Copos de agua</span></div>
        <div class="metric"><strong id="home-done">0</strong><span>Treinos feitos</span></div>
      </div>

      <h3 class="section-title">Treinos prontos</h3>
      <div id="workout-list" class="list"></div>
    </section>

    <section id="page-workout" class="page">
      <div class="glass card">
        <span class="pill"><i class="lucide-timer"></i> Sessao ativa</span>
        <h2 id="active-title" class="text-2xl font-black tracking-tighter mt-4">Escolha um treino</h2>
        <p id="active-sub" class="tiny mt-2">Abra um treino na aba Inicio.</p>
        <div class="timer-display my-6" id="timer-display">00:00</div>
        <div class="grid grid-cols-3 gap-2">
          <button class="secondary" onclick="toggleTimer()">Play/Pause</button>
          <button class="secondary" onclick="resetTimer()">Resetar</button>
          <button class="secondary" onclick="completeWorkout()">Concluir</button>
        </div>
      </div>
      <h3 class="section-title">Exercicios</h3>
      <div id="exercise-list" class="list"></div>
    </section>

    <section id="page-plan" class="page">
      <div class="glass card">
        <span class="pill"><i class="lucide-droplets"></i> Habitos do dia</span>
        <h2 class="text-2xl font-black tracking-tighter mt-4">Agua e alimentacao</h2>
        <div class="grid grid-cols-3 gap-2 mt-5">
          <button class="secondary" onclick="addWater(-1)">- Agua</button>
          <button class="primary" onclick="addWater(1)">+ Agua</button>
          <button class="secondary" onclick="resetToday()">Reset</button>
        </div>
      </div>
      <h3 class="section-title">Checklist alimentar</h3>
      <div id="meal-list" class="list"></div>
    </section>

    <section id="page-profile" class="page">
      <div class="glass card">
        <span class="pill"><i class="lucide-user"></i> Perfil</span>
        <div class="mt-5 space-y-3">
          <input id="profile-name" class="input" placeholder="Seu nome">
          <input id="profile-weight" class="input" type="number" step="0.1" placeholder="Peso atual">
          <input id="profile-target" class="input" type="number" step="0.1" placeholder="Meta de peso">
          <button class="primary" onclick="saveProfile()">Salvar perfil</button>
        </div>
      </div>
      <h3 class="section-title">Historico recente</h3>
      <div id="history-list" class="list"></div>
    </section>
  </main>

  <nav class="tabbar">
    <button class="active" onclick="switchTab('home', this)"><i class="lucide-layout-grid"></i>Inicio</button>
    <button onclick="switchTab('workout', this)"><i class="lucide-dumbbell"></i>Treino</button>
    <button onclick="switchTab('plan', this)"><i class="lucide-salad"></i>Plano</button>
    <button onclick="switchTab('profile', this)"><i class="lucide-user"></i>Perfil</button>
  </nav>

  <script>
    const KEY = 'generatefy_fitness_v3';
    const todayKey = function(){ return new Date().toISOString().slice(0, 10); };
    const workouts = [
      { id:'express', name:'Emagrecimento Express', min:22, kcal:240, level:'Iniciante', exercises:['Polichinelo 45s','Agachamento 15 reps','Corrida parada 45s','Prancha 30s','Afundo alternado 12 reps','Abdominal curto 20 reps'] },
      { id:'inferior', name:'Pernas e Gluteos', min:32, kcal:310, level:'Intermediario', exercises:['Agachamento sumo 15 reps','Ponte de gluteo 20 reps','Afundo reverso 12 reps','Elevacao lateral 15 reps','Panturrilha 25 reps'] },
      { id:'core', name:'Barriga Chapada', min:18, kcal:160, level:'Rapido', exercises:['Prancha 40s','Mountain climber 40s','Abdominal bicicleta 20 reps','Prancha lateral 25s','Dead bug 12 reps'] }
    ];
    const meals = ['Cafe da manha com proteina','Almoco com legumes','Lanche planejado','Jantar leve','Sem refrigerante hoje'];
    const initial = { profile:{ name:'{{USER_NAME}}', weight:82, target:74 }, water:{}, history:[], current:null, timerSeconds:0, checked:{}, meals:{} };
    let state = load();
    let timerId = null;

    function load(){ try { return Object.assign({}, initial, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch(e){ return initial; } }
    function save(){ localStorage.setItem(KEY, JSON.stringify(state)); }
    function getWorkout(id){ return workouts.find(function(w){ return w.id === id; }) || workouts[0]; }
    function switchTab(id, el){
      document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
      document.getElementById('page-' + id).classList.add('active');
      document.querySelectorAll('.tabbar button').forEach(function(b){ b.classList.remove('active'); });
      if(el) el.classList.add('active');
      render();
    }
    function startWorkout(id){
      const w = getWorkout(id);
      state.current = id;
      state.timerSeconds = w.min * 60;
      state.checked = {};
      save();
      switchTab('workout', document.querySelectorAll('.tabbar button')[1]);
      render();
    }
    function toggleTimer(){
      if(!state.current){ alert('Escolha um treino primeiro.'); return; }
      if(timerId){ clearInterval(timerId); timerId = null; save(); return; }
      timerId = setInterval(function(){
        if(state.timerSeconds > 0){ state.timerSeconds -= 1; updateTimer(); }
        if(state.timerSeconds <= 0){ clearInterval(timerId); timerId = null; save(); }
      }, 1000);
    }
    function resetTimer(){ if(state.current){ state.timerSeconds = getWorkout(state.current).min * 60; save(); updateTimer(); } }
    function updateTimer(){
      const m = Math.floor((state.timerSeconds || 0) / 60);
      const s = (state.timerSeconds || 0) % 60;
      document.getElementById('timer-display').textContent = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
    }
    function toggleExercise(i){ state.checked[i] = !state.checked[i]; save(); render(); }
    function completeWorkout(){
      if(!state.current){ alert('Nenhum treino ativo.'); return; }
      const w = getWorkout(state.current);
      state.history.unshift({ date: todayKey(), name: w.name, kcal: w.kcal });
      state.history = state.history.slice(0, 20);
      state.current = null;
      state.timerSeconds = 0;
      state.checked = {};
      if(timerId){ clearInterval(timerId); timerId = null; }
      save();
      switchTab('home', document.querySelectorAll('.tabbar button')[0]);
    }
    function addWater(n){ const d = todayKey(); state.water[d] = Math.max(0, Math.min(12, (state.water[d] || 0) + n)); save(); render(); }
    function resetToday(){ const d = todayKey(); state.water[d] = 0; state.meals[d] = {}; save(); render(); }
    function toggleMeal(i){ const d = todayKey(); state.meals[d] = state.meals[d] || {}; state.meals[d][i] = !state.meals[d][i]; save(); render(); }
    function saveProfile(){
      state.profile.name = document.getElementById('profile-name').value || 'Usuario';
      state.profile.weight = Number(document.getElementById('profile-weight').value || state.profile.weight);
      state.profile.target = Number(document.getElementById('profile-target').value || state.profile.target);
      save(); render(); alert('Perfil salvo no localStorage.');
    }
    function render(){
      const d = todayKey();
      document.getElementById('home-streak').textContent = new Set(state.history.map(function(h){ return h.date; })).size;
      document.getElementById('home-calories').textContent = state.history.reduce(function(sum,h){ return sum + h.kcal; }, 0);
      document.getElementById('home-weight').textContent = state.profile.weight + 'kg';
      document.getElementById('home-goal').textContent = state.profile.target + 'kg';
      document.getElementById('home-water').textContent = (state.water[d] || 0) + '/8';
      document.getElementById('home-done').textContent = state.history.length;
      document.getElementById('workout-list').innerHTML = workouts.map(function(w){
        return '<div class="row"><div><div class="row-title">' + w.name + '</div><div class="row-sub">' + w.min + ' min • ' + w.kcal + ' kcal • ' + w.level + '</div></div><button class="secondary" onclick="startWorkout(&quot;' + w.id + '&quot;)">Abrir</button></div>';
      }).join('');
      const current = state.current ? getWorkout(state.current) : null;
      document.getElementById('active-title').textContent = current ? current.name : 'Escolha um treino';
      document.getElementById('active-sub').textContent = current ? current.exercises.length + ' exercicios • ' + current.kcal + ' kcal estimadas' : 'Abra um treino na aba Inicio.';
      document.getElementById('exercise-list').innerHTML = current ? current.exercises.map(function(ex, i){
        return '<label class="row"><div><div class="row-title">' + ex + '</div><div class="row-sub">Marque ao finalizar</div></div><input class="check" type="checkbox" onchange="toggleExercise(' + i + ')" ' + (state.checked[i] ? 'checked' : '') + '></label>';
      }).join('') : '<div class="tiny">Nenhum treino ativo.</div>';
      updateTimer();
      document.getElementById('meal-list').innerHTML = meals.map(function(m, i){
        const checked = state.meals[d] && state.meals[d][i];
        return '<label class="row"><div class="row-title">' + m + '</div><input class="check" type="checkbox" onchange="toggleMeal(' + i + ')" ' + (checked ? 'checked' : '') + '></label>';
      }).join('');
      document.getElementById('profile-name').value = state.profile.name;
      document.getElementById('profile-weight').value = state.profile.weight;
      document.getElementById('profile-target').value = state.profile.target;
      document.getElementById('history-list').innerHTML = state.history.length ? state.history.map(function(h){
        return '<div class="row"><div><div class="row-title">' + h.name + '</div><div class="row-sub">' + h.date + ' • ' + h.kcal + ' kcal</div></div></div>';
      }).join('') : '<div class="tiny">Seu historico aparece aqui.</div>';
    }
    render();
  </script>
</body>
</html>
  `,

  finance: `
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{APP_TITLE}} - Financas</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/lucide-static@0.321.0/font/lucide.min.css" rel="stylesheet">
  <style>
    :root { --accent: #8b5cf6; --accent-soft: rgba(139,92,246,.14); --accent-glow: rgba(139,92,246,.24); }
    ${MOBILE_APP_STYLE}
  </style>
</head>
<body>
  <main class="app-shell" style="--tabs:3; background: radial-gradient(circle at top right, rgba(139,92,246,.2), transparent 38%), #050505;">
    <header class="topbar">
      <div class="eyebrow">Controle financeiro local</div>
      <h1 class="title">{{APP_TITLE}}</h1>
      <p class="subtitle">Transacoes, metas e resumo mensal salvos no localStorage.</p>
    </header>

    <section id="page-home" class="page active">
      <div class="glass card">
        <span class="pill"><i class="lucide-wallet"></i> Patrimonio atual</span>
        <h2 id="balance" class="text-4xl font-black tracking-tighter mt-4">R$ 0,00</h2>
        <div class="grid2 mt-5">
          <div class="metric"><strong id="income">R$ 0</strong><span>Entradas</span></div>
          <div class="metric"><strong id="expense">R$ 0</strong><span>Saidas</span></div>
        </div>
      </div>
      <h3 class="section-title">Extrato</h3>
      <div id="tx-list" class="list"></div>
    </section>

    <section id="page-add" class="page">
      <div class="glass card">
        <span class="pill"><i class="lucide-plus"></i> Nova transacao</span>
        <div class="mt-5 space-y-3">
          <input id="tx-title" class="input" placeholder="Descricao">
          <input id="tx-value" class="input" type="number" step="0.01" placeholder="Valor">
          <select id="tx-type" class="input">
            <option value="income">Receita</option>
            <option value="expense">Despesa</option>
          </select>
          <button class="primary" onclick="addTx()">Salvar no localStorage</button>
        </div>
      </div>
    </section>

    <section id="page-goals" class="page">
      <div class="glass card">
        <span class="pill"><i class="lucide-target"></i> Meta mensal</span>
        <input id="goal-input" class="input mt-5" type="number" placeholder="Meta de economia">
        <button class="primary mt-3" onclick="saveGoal()">Salvar meta</button>
      </div>
      <h3 class="section-title">Progresso da meta</h3>
      <div class="metric"><strong id="goal-status">R$ 0</strong><span>Economia prevista</span></div>
      <div class="progress mt-3"><span id="goal-bar"></span></div>
    </section>
  </main>

  <nav class="tabbar">
    <button class="active" onclick="showPage('home', this)"><i class="lucide-layout-grid"></i>Resumo</button>
    <button onclick="showPage('add', this)"><i class="lucide-plus-circle"></i>Adicionar</button>
    <button onclick="showPage('goals', this)"><i class="lucide-target"></i>Metas</button>
  </nav>

  <script>
    const KEY = 'generatefy_finance_v3';
    const initial = { goal: 1000, txs:[{id:1,title:'Salario',value:5000,type:'income',date:'Hoje'},{id:2,title:'Mercado',value:280,type:'expense',date:'Hoje'}] };
    let state = load();
    function load(){ try { return Object.assign({}, initial, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch(e){ return initial; } }
    function save(){ localStorage.setItem(KEY, JSON.stringify(state)); }
    function money(v){ return Number(v || 0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }
    function showPage(id, el){ document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); }); document.getElementById('page-' + id).classList.add('active'); document.querySelectorAll('.tabbar button').forEach(function(b){ b.classList.remove('active'); }); if(el) el.classList.add('active'); render(); }
    function addTx(){
      const title = document.getElementById('tx-title').value.trim();
      const value = Number(document.getElementById('tx-value').value);
      const type = document.getElementById('tx-type').value;
      if(!title || !value){ alert('Preencha descricao e valor.'); return; }
      state.txs.unshift({ id: Date.now(), title:title, value:value, type:type, date:new Date().toLocaleDateString('pt-BR') });
      document.getElementById('tx-title').value = '';
      document.getElementById('tx-value').value = '';
      save(); showPage('home', document.querySelectorAll('.tabbar button')[0]);
    }
    function delTx(id){ state.txs = state.txs.filter(function(t){ return t.id !== id; }); save(); render(); }
    function saveGoal(){ state.goal = Number(document.getElementById('goal-input').value || state.goal); save(); render(); alert('Meta salva.'); }
    function render(){
      const income = state.txs.filter(function(t){ return t.type === 'income'; }).reduce(function(s,t){ return s + t.value; }, 0);
      const expense = state.txs.filter(function(t){ return t.type === 'expense'; }).reduce(function(s,t){ return s + t.value; }, 0);
      const balance = income - expense;
      document.getElementById('balance').textContent = money(balance);
      document.getElementById('income').textContent = money(income);
      document.getElementById('expense').textContent = money(expense);
      document.getElementById('tx-list').innerHTML = state.txs.length ? state.txs.map(function(t){
        const sign = t.type === 'income' ? '+' : '-';
        const color = t.type === 'income' ? '#22c55e' : '#fb7185';
        return '<div class="row"><div><div class="row-title">' + t.title + '</div><div class="row-sub">' + t.date + '</div></div><div style="text-align:right"><div style="color:' + color + ';font-weight:900;font-size:13px">' + sign + ' ' + money(t.value) + '</div><button class="tiny" onclick="delTx(' + t.id + ')">Excluir</button></div></div>';
      }).join('') : '<div class="tiny">Nenhuma transacao ainda.</div>';
      document.getElementById('goal-input').value = state.goal;
      document.getElementById('goal-status').textContent = money(balance) + ' de ' + money(state.goal);
      document.getElementById('goal-bar').style.width = Math.max(0, Math.min(100, (balance / state.goal) * 100)) + '%';
    }
    render();
  </script>
</body>
</html>
  `,

  productivity: `
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{APP_TITLE}} - Produtividade</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/lucide-static@0.321.0/font/lucide.min.css" rel="stylesheet">
  <style>
    :root { --accent: #3b82f6; --accent-soft: rgba(59,130,246,.14); --accent-glow: rgba(59,130,246,.24); }
    ${MOBILE_APP_STYLE}
  </style>
</head>
<body>
  <main class="app-shell" style="--tabs:3; background: radial-gradient(circle at top right, rgba(59,130,246,.2), transparent 38%), #050505;">
    <header class="topbar">
      <div class="eyebrow">Rotina salva localmente</div>
      <h1 class="title">{{APP_TITLE}}</h1>
      <p class="subtitle">Tarefas, pomodoro e sessoes concluidas persistem no localStorage.</p>
    </header>

    <section id="page-tasks" class="page active">
      <div class="glass card">
        <span class="pill"><i class="lucide-check-square"></i> Nova tarefa</span>
        <div class="flex gap-2 mt-5">
          <input id="task-input" class="input" placeholder="Digite uma tarefa">
          <button class="secondary" onclick="addTask()">Add</button>
        </div>
      </div>
      <h3 class="section-title">Lista</h3>
      <div id="task-list" class="list"></div>
    </section>

    <section id="page-focus" class="page">
      <div class="glass card text-center">
        <span class="pill"><i class="lucide-timer"></i> Sprint de foco</span>
        <div id="focus-time" class="timer-display my-8">25:00</div>
        <div class="grid grid-cols-3 gap-2">
          <button class="secondary" onclick="startFocus()">Iniciar</button>
          <button class="secondary" onclick="pauseFocus()">Pausar</button>
          <button class="secondary" onclick="resetFocus()">Reset</button>
        </div>
      </div>
    </section>

    <section id="page-stats" class="page">
      <div class="grid2">
        <div class="metric"><strong id="done-count">0</strong><span>Tarefas feitas</span></div>
        <div class="metric"><strong id="session-count">0</strong><span>Sprints</span></div>
      </div>
      <h3 class="section-title">Historico</h3>
      <div id="session-list" class="list"></div>
    </section>
  </main>

  <nav class="tabbar">
    <button class="active" onclick="nav('tasks', this)"><i class="lucide-check-square"></i>Tarefas</button>
    <button onclick="nav('focus', this)"><i class="lucide-timer"></i>Foco</button>
    <button onclick="nav('stats', this)"><i class="lucide-bar-chart"></i>Stats</button>
  </nav>

  <script>
    const KEY = 'generatefy_productivity_v3';
    const initial = { tasks:[{id:1,text:'Planejar oferta',done:true},{id:2,text:'Separar leads',done:false}], sessions:[], seconds:1500 };
    let state = load();
    let interval = null;
    function load(){ try { return Object.assign({}, initial, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch(e){ return initial; } }
    function save(){ localStorage.setItem(KEY, JSON.stringify(state)); }
    function nav(id, el){ document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); }); document.getElementById('page-' + id).classList.add('active'); document.querySelectorAll('.tabbar button').forEach(function(b){ b.classList.remove('active'); }); if(el) el.classList.add('active'); render(); }
    function addTask(){ const input = document.getElementById('task-input'); const text = input.value.trim(); if(!text) return; state.tasks.unshift({id:Date.now(),text:text,done:false}); input.value = ''; save(); render(); }
    function toggleTask(id){ state.tasks = state.tasks.map(function(t){ if(t.id === id) t.done = !t.done; return t; }); save(); render(); }
    function delTask(id){ state.tasks = state.tasks.filter(function(t){ return t.id !== id; }); save(); render(); }
    function format(s){ const m = Math.floor(s / 60); const sec = s % 60; return String(m).padStart(2,'0') + ':' + String(sec).padStart(2,'0'); }
    function startFocus(){ if(interval) return; interval = setInterval(function(){ state.seconds -= 1; if(state.seconds <= 0){ state.sessions.unshift({date:new Date().toLocaleString('pt-BR'), min:25}); state.seconds = 1500; clearInterval(interval); interval = null; } save(); render(); }, 1000); }
    function pauseFocus(){ if(interval){ clearInterval(interval); interval = null; save(); } }
    function resetFocus(){ pauseFocus(); state.seconds = 1500; save(); render(); }
    function render(){
      document.getElementById('task-list').innerHTML = state.tasks.length ? state.tasks.map(function(t){
        return '<div class="row"><label style="display:flex;align-items:center;gap:10px;flex:1"><input class="check" type="checkbox" onchange="toggleTask(' + t.id + ')" ' + (t.done ? 'checked' : '') + '><span class="row-title" style="' + (t.done ? 'text-decoration:line-through;color:#71717a' : '') + '">' + t.text + '</span></label><button class="tiny" onclick="delTask(' + t.id + ')">Excluir</button></div>';
      }).join('') : '<div class="tiny">Nenhuma tarefa.</div>';
      document.getElementById('focus-time').textContent = format(state.seconds);
      document.getElementById('done-count').textContent = state.tasks.filter(function(t){ return t.done; }).length;
      document.getElementById('session-count').textContent = state.sessions.length;
      document.getElementById('session-list').innerHTML = state.sessions.length ? state.sessions.map(function(s){ return '<div class="row"><div><div class="row-title">Sprint concluido</div><div class="row-sub">' + s.date + ' • ' + s.min + ' min</div></div></div>'; }).join('') : '<div class="tiny">Seus sprints aparecem aqui.</div>';
    }
    render();
  </script>
</body>
</html>
  `,

  zen: `
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{APP_TITLE}} - Bem-estar</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/lucide-static@0.321.0/font/lucide.min.css" rel="stylesheet">
  <style>
    :root { --accent: #14b8a6; --accent-soft: rgba(20,184,166,.14); --accent-glow: rgba(20,184,166,.24); }
    ${MOBILE_APP_STYLE}
  </style>
</head>
<body>
  <main class="app-shell" style="--tabs:3; background: radial-gradient(circle at top right, rgba(20,184,166,.2), transparent 38%), #050505;">
    <header class="topbar">
      <div class="eyebrow">Saude mental local</div>
      <h1 class="title">{{APP_TITLE}}</h1>
      <p class="subtitle">Humor, gratidao e meditacao salvos somente neste navegador.</p>
    </header>

    <section id="page-home" class="page active">
      <div class="glass card">
        <span class="pill"><i class="lucide-heart"></i> Check-in de humor</span>
        <div class="grid grid-cols-5 gap-2 mt-5">
          <button class="secondary" onclick="saveMood('Otimo')">Otimo</button>
          <button class="secondary" onclick="saveMood('Bem')">Bem</button>
          <button class="secondary" onclick="saveMood('Ok')">Ok</button>
          <button class="secondary" onclick="saveMood('Tenso')">Tenso</button>
          <button class="secondary" onclick="saveMood('Baixo')">Baixo</button>
        </div>
      </div>
      <h3 class="section-title">Historico emocional</h3>
      <div id="mood-list" class="list"></div>
    </section>

    <section id="page-meditate" class="page">
      <div class="glass card text-center">
        <span class="pill"><i class="lucide-waves"></i> Respiracao 4-4</span>
        <div id="med-time" class="timer-display my-8">05:00</div>
        <p id="breath-label" class="text-xl font-black text-teal-300">Inspire</p>
        <div class="grid grid-cols-3 gap-2 mt-6">
          <button class="secondary" onclick="startMeditation()">Iniciar</button>
          <button class="secondary" onclick="pauseMeditation()">Pausar</button>
          <button class="secondary" onclick="finishMeditation()">Concluir</button>
        </div>
      </div>
    </section>

    <section id="page-journal" class="page">
      <div class="glass card">
        <span class="pill"><i class="lucide-book-open"></i> Diario de gratidao</span>
        <textarea id="journal" class="input mt-5" rows="8" placeholder="Escreva 3 coisas boas de hoje..."></textarea>
        <button class="primary mt-3" onclick="saveJournal()">Salvar diario</button>
      </div>
    </section>
  </main>

  <nav class="tabbar">
    <button class="active" onclick="nav('home', this)"><i class="lucide-heart"></i>Humor</button>
    <button onclick="nav('meditate', this)"><i class="lucide-waves"></i>Respirar</button>
    <button onclick="nav('journal', this)"><i class="lucide-book-open"></i>Diario</button>
  </nav>

  <script>
    const KEY = 'generatefy_zen_v3';
    const initial = { moods:[], journal:'', seconds:300, sessions:0 };
    let state = load();
    let interval = null;
    function load(){ try { return Object.assign({}, initial, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch(e){ return initial; } }
    function save(){ localStorage.setItem(KEY, JSON.stringify(state)); }
    function nav(id, el){ document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); }); document.getElementById('page-' + id).classList.add('active'); document.querySelectorAll('.tabbar button').forEach(function(b){ b.classList.remove('active'); }); if(el) el.classList.add('active'); render(); }
    function saveMood(mood){ state.moods.unshift({mood:mood,date:new Date().toLocaleString('pt-BR')}); state.moods = state.moods.slice(0,20); save(); render(); }
    function format(s){ const m = Math.floor(s / 60); const sec = s % 60; return String(m).padStart(2,'0') + ':' + String(sec).padStart(2,'0'); }
    function startMeditation(){ if(interval) return; interval = setInterval(function(){ state.seconds -= 1; document.getElementById('breath-label').textContent = state.seconds % 8 >= 4 ? 'Solte o ar' : 'Inspire'; if(state.seconds <= 0){ finishMeditation(); } save(); render(); },1000); }
    function pauseMeditation(){ if(interval){ clearInterval(interval); interval = null; save(); } }
    function finishMeditation(){ pauseMeditation(); state.sessions += 1; state.seconds = 300; save(); render(); alert('Sessao salva.'); }
    function saveJournal(){ state.journal = document.getElementById('journal').value; save(); alert('Diario salvo no localStorage.'); }
    function render(){ document.getElementById('med-time').textContent = format(state.seconds); document.getElementById('journal').value = state.journal || ''; document.getElementById('mood-list').innerHTML = state.moods.length ? state.moods.map(function(m){ return '<div class="row"><div><div class="row-title">' + m.mood + '</div><div class="row-sub">' + m.date + '</div></div></div>'; }).join('') : '<div class="tiny">Registre seu primeiro humor.</div>'; }
    render();
  </script>
</body>
</html>
  `,

  beauty: `
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{APP_TITLE}} - Skincare</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/lucide-static@0.321.0/font/lucide.min.css" rel="stylesheet">
  <style>
    :root { --accent: #f472b6; --accent-soft: rgba(244,114,182,.14); --accent-glow: rgba(244,114,182,.24); }
    ${MOBILE_APP_STYLE}
  </style>
</head>
<body>
  <main class="app-shell" style="--tabs:3; background: radial-gradient(circle at top right, rgba(244,114,182,.2), transparent 38%), #050505;">
    <header class="topbar">
      <div class="eyebrow">Rotina de beleza local</div>
      <h1 class="title">{{APP_TITLE}}</h1>
      <p class="subtitle">Checklist AM/PM, hidratacao e diario salvos no localStorage.</p>
    </header>

    <section id="page-routine" class="page active">
      <div class="glass card">
        <span class="pill"><i class="lucide-sparkles"></i> Rotina de hoje</span>
        <div class="grid2 mt-5">
          <div class="metric"><strong id="routine-score">0%</strong><span>Concluido</span></div>
          <div class="metric"><strong id="water-score">0/6</strong><span>Agua</span></div>
        </div>
      </div>
      <h3 class="section-title">Manha</h3>
      <div id="am-list" class="list"></div>
      <h3 class="section-title">Noite</h3>
      <div id="pm-list" class="list"></div>
    </section>

    <section id="page-hydration" class="page">
      <div class="glass card">
        <span class="pill"><i class="lucide-droplets"></i> Hidratacao</span>
        <div class="grid grid-cols-3 gap-2 mt-5">
          <button class="secondary" onclick="addWater(-1)">- Agua</button>
          <button class="primary" onclick="addWater(1)">+ Agua</button>
          <button class="secondary" onclick="resetDay()">Reset</button>
        </div>
      </div>
    </section>

    <section id="page-diary" class="page">
      <div class="glass card">
        <span class="pill"><i class="lucide-camera"></i> Diario da pele</span>
        <textarea id="skin-note" class="input mt-5" rows="8" placeholder="Como sua pele esta hoje?"></textarea>
        <button class="primary mt-3" onclick="saveNote()">Salvar anotacao</button>
      </div>
      <h3 class="section-title">Ultimas anotacoes</h3>
      <div id="note-list" class="list"></div>
    </section>
  </main>

  <nav class="tabbar">
    <button class="active" onclick="nav('routine', this)"><i class="lucide-sparkles"></i>Rotina</button>
    <button onclick="nav('hydration', this)"><i class="lucide-droplets"></i>Agua</button>
    <button onclick="nav('diary', this)"><i class="lucide-camera"></i>Diario</button>
  </nav>

  <script>
    const KEY = 'generatefy_beauty_v3';
    const am = ['Limpeza suave','Vitamina C','Hidratante','Protetor solar'];
    const pm = ['Demaquilante','Limpeza profunda','Tratamento noturno','Hidratante reparador'];
    const initial = { checks:{}, water:{}, notes:[] };
    let state = load();
    function day(){ return new Date().toISOString().slice(0,10); }
    function load(){ try { return Object.assign({}, initial, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch(e){ return initial; } }
    function save(){ localStorage.setItem(KEY, JSON.stringify(state)); }
    function nav(id, el){ document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); }); document.getElementById('page-' + id).classList.add('active'); document.querySelectorAll('.tabbar button').forEach(function(b){ b.classList.remove('active'); }); if(el) el.classList.add('active'); render(); }
    function key(type, i){ return day() + '_' + type + '_' + i; }
    function toggle(type, i){ state.checks[key(type,i)] = !state.checks[key(type,i)]; save(); render(); }
    function addWater(n){ const d = day(); state.water[d] = Math.max(0, Math.min(10, (state.water[d] || 0) + n)); save(); render(); }
    function resetDay(){ const d = day(); state.water[d] = 0; am.forEach(function(_,i){ state.checks[key('am',i)] = false; }); pm.forEach(function(_,i){ state.checks[key('pm',i)] = false; }); save(); render(); }
    function saveNote(){ const text = document.getElementById('skin-note').value.trim(); if(!text) return; state.notes.unshift({text:text,date:new Date().toLocaleString('pt-BR')}); state.notes = state.notes.slice(0,20); document.getElementById('skin-note').value = ''; save(); render(); }
    function renderList(id, items, type){ document.getElementById(id).innerHTML = items.map(function(item,i){ return '<label class="row"><div class="row-title">' + item + '</div><input class="check" type="checkbox" onchange="toggle(&quot;' + type + '&quot;,' + i + ')" ' + (state.checks[key(type,i)] ? 'checked' : '') + '></label>'; }).join(''); }
    function render(){
      const total = am.length + pm.length;
      let done = 0;
      am.forEach(function(_,i){ if(state.checks[key('am',i)]) done++; });
      pm.forEach(function(_,i){ if(state.checks[key('pm',i)]) done++; });
      document.getElementById('routine-score').textContent = Math.round((done / total) * 100) + '%';
      document.getElementById('water-score').textContent = (state.water[day()] || 0) + '/6';
      renderList('am-list', am, 'am');
      renderList('pm-list', pm, 'pm');
      document.getElementById('note-list').innerHTML = state.notes.length ? state.notes.map(function(n){ return '<div class="row"><div><div class="row-title">' + n.text + '</div><div class="row-sub">' + n.date + '</div></div></div>'; }).join('') : '<div class="tiny">Suas anotacoes aparecem aqui.</div>';
    }
    render();
  </script>
</body>
</html>
  `
};
