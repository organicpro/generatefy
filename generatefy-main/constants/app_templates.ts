
export const APP_TEMPLATES: Record<string, string> = {
  fitness: `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FitFlow AI - Personal Trainer</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/lucide-static@0.321.0/font/lucide.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #050505; color: #fff; margin: 0; overflow-x: hidden; }
        .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.08); }
        .nav-item.active { color: #22c55e; }
        .nav-item.active i { transform: translateY(-4px); color: #22c55e; filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.5)); }
        .page { display: none; padding: 24px; padding-bottom: 100px; animation: slideIn 0.3s ease-out; }
        .page.active { display: block; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .workout-card { transition: all 0.3s ease; }
        .workout-card:active { transform: scale(0.95); }
    </style>
</head>
<body class="custom-scrollbar">
    
    <!-- HEADER FIXO -->
    <header class="p-6 pb-2 sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-50 flex justify-between items-center border-b border-white/5">
        <div>
            <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Neural Fitness</p>
            <h1 class="text-xl font-extrabold tracking-tight">FitFlow <span class="text-green-500">AI</span></h1>
        </div>
        <div class="flex gap-3">
             <div class="w-10 h-10 rounded-2xl glass flex items-center justify-center">
                <i class="lucide-bell text-zinc-400 w-5 h-5"></i>
            </div>
            <div class="w-10 h-10 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <i class="lucide-user text-green-500 w-5 h-5"></i>
            </div>
        </div>
    </header>

    <!-- DASHBOARD -->
    <div id="page-dashboard" class="page active">
        <div class="glass p-6 rounded-[2.5rem] relative overflow-hidden mb-8 border-green-500/20">
            <div class="absolute -right-10 -top-10 w-40 h-40 bg-green-500/20 blur-[60px] rounded-full"></div>
            <p class="text-[10px] font-black text-green-500 uppercase tracking-tighter mb-4 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Sugestão da IA para hoje
            </p>
            <h2 class="text-3xl font-black italic mb-2 tracking-tighter">FORÇA E EXPLOSÃO</h2>
            <div class="flex gap-4 mb-6">
                <span class="text-[10px] bg-white/5 px-3 py-1 rounded-full font-bold text-zinc-400">45 MIN</span>
                <span class="text-[10px] bg-white/5 px-3 py-1 rounded-full font-bold text-zinc-400">INTENSO</span>
            </div>
            <button onclick="alert('Iniciando treino...') " class="w-full py-4 bg-green-500 text-black rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl shadow-green-500/20 hover:brightness-110 active:scale-95 transition-all">
                Começar Treino
            </button>
        </div>

        <h3 class="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Seu Rendimento</h3>
        <div class="grid grid-cols-2 gap-4 mb-8">
            <div class="glass p-5 rounded-3xl">
                <div class="flex items-center gap-2 mb-3">
                    <i class="lucide-flame text-orange-500 w-4 h-4"></i>
                    <span class="text-[9px] font-bold text-zinc-500 uppercase">Gasto Calórico</span>
                </div>
                <p class="text-2xl font-black">1.842 <span class="text-[10px] font-normal text-zinc-600">kcal</span></p>
            </div>
            <div class="glass p-5 rounded-3xl">
                <div class="flex items-center gap-2 mb-3">
                    <i class="lucide-timer text-blue-500 w-4 h-4"></i>
                    <span class="text-[9px] font-bold text-zinc-500 uppercase">Tempo Ativo</span>
                </div>
                <p class="text-2xl font-black">12.4 <span class="text-[10px] font-normal text-zinc-600">hrs</span></p>
            </div>
        </div>

        <h3 class="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Fichas de Treino</h3>
        <div class="space-y-4">
            <div class="glass p-4 rounded-3xl flex items-center gap-4 border-l-4 border-l-green-500">
                <div class="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center font-black text-xl italic text-green-500">A</div>
                <div class="flex-1">
                    <p class="text-sm font-bold">Peito e Tríceps</p>
                    <p class="text-[10px] text-zinc-500 italic">8 Exercícios • 3 Séries</p>
                </div>
                <i class="lucide-chevron-right text-zinc-700"></i>
            </div>
            <div class="glass p-4 rounded-3xl flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center font-black text-xl italic text-zinc-700">B</div>
                <div class="flex-1">
                    <p class="text-sm font-bold">Costas e Bíceps</p>
                    <p class="text-[10px] text-zinc-500 italic">7 Exercícios • 4 Séries</p>
                </div>
                <i class="lucide-chevron-right text-zinc-700"></i>
            </div>
        </div>
    </div>

    <!-- EXERCÍCIOS -->
    <div id="page-exercises" class="page">
        <h2 class="text-2xl font-black mb-6">Biblioteca</h2>
        <div class="glass p-3 rounded-2xl mb-6 flex items-center gap-3">
            <i class="lucide-search text-zinc-600 w-4 h-4"></i>
            <input type="text" placeholder="Filtrar exercícios..." class="bg-transparent border-none outline-none text-sm w-full">
        </div>
        <div class="space-y-3">
            <div class="glass p-4 rounded-2xl flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center"><i class="lucide-dumbbell text-zinc-600 w-5 h-5"></i></div>
                    <span class="text-sm font-bold">Supino Reto</span>
                </div>
                <i class="lucide-plus-circle text-green-500"></i>
            </div>
            <div class="glass p-4 rounded-2xl flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center"><i class="lucide-dumbbell text-zinc-600 w-5 h-5"></i></div>
                    <span class="text-sm font-bold">Agachamento Livre</span>
                </div>
                <i class="lucide-plus-circle text-green-500"></i>
            </div>
        </div>
    </div>

    <!-- PERFIL -->
    <div id="page-profile" class="page">
        <h2 class="text-2xl font-black mb-8">Meu Perfil</h2>
        <div class="flex flex-col items-center mb-8">
            <div class="w-24 h-24 rounded-[2rem] bg-green-500/20 border-2 border-green-500 p-1 mb-4">
                <div class="w-full h-full rounded-[1.8rem] bg-zinc-900 flex items-center justify-center text-3xl font-black text-green-500">
                    A
                </div>
            </div>
            <p id="profile-name" class="text-xl font-bold">Atleta Ryze</p>
            <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Plano Pro Neural</p>
        </div>

        <div class="space-y-4">
            <div class="glass p-5 rounded-3xl space-y-4">
                 <div class="flex justify-between items-center">
                    <span class="text-xs font-bold text-zinc-400">Peso Atual</span>
                    <span class="text-sm font-black tracking-tight underline">84.5 KG</span>
                 </div>
                 <div class="flex justify-between items-center text-zinc-400">
                    <span class="text-xs font-bold text-zinc-400">Altura</span>
                    <span class="text-sm font-black tracking-tight underline">1.82 M</span>
                 </div>
            </div>

            <div class="p-6 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <i class="lucide-log-out text-red-500 w-5 h-5"></i>
                    <span class="text-xs font-bold text-red-500 uppercase tracking-widest">Sair da Conta</span>
                </div>
                <i class="lucide-chevron-right text-red-500/50"></i>
            </div>
        </div>
    </div>

    <!-- NAVBAR INFERIOR -->
    <nav class="fixed bottom-0 left-0 right-0 glass border-t border-white/5 h-20 px-8 flex justify-between items-center z-[100] backdrop-blur-3xl">
        <button onclick="switchTab('dashboard', this)" class="nav-item active flex flex-col items-center gap-1 transition-all duration-300">
            <i class="lucide-layout-grid w-6 h-6"></i>
            <span class="text-[9px] font-black uppercase tracking-tighter">Início</span>
        </button>
        <button onclick="switchTab('exercises', this)" class="nav-item flex flex-col items-center gap-1 text-zinc-500 transition-all duration-300">
            <i class="lucide-dumbbell w-6 h-6"></i>
            <span class="text-[9px] font-black uppercase tracking-tighter">Treinos</span>
        </button>
        <button onclick="switchTab('profile', this)" class="nav-item flex flex-col items-center gap-1 text-zinc-500 transition-all duration-300">
            <i class="lucide-user w-6 h-6"></i>
            <span class="text-[9px] font-black uppercase tracking-tighter">Perfil</span>
        </button>
    </nav>

    <script>
        function switchTab(id, el) {
            // Esconde todas as páginas
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            // Remove active dos icones
            document.querySelectorAll('.nav-item').forEach(n => {
                n.classList.remove('active');
                n.classList.add('text-zinc-500');
            });

            // Ativa a correta
            document.getElementById('page-' + id).classList.add('active');
            el.classList.add('active');
            el.classList.remove('text-zinc-500');

            // Feedback tátil simulado
            if(window.navigator.vibrate) window.navigator.vibrate(5);
        }

        // Lógica de persistência
        const user = JSON.parse(localStorage.getItem('ryze_fitness_user')) || { name: 'Atleta Ryze' };
        document.getElementById('profile-name').textContent = user.name;
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
    <title>MoneyMind AI - Finanças</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/lucide-static@0.321.0/font/lucide.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #000; color: #fff; margin: 0; }
        .glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.05); }
        .page { display: none; padding: 20px; animation: fadeIn 0.4s ease; }
        .page.active { display: block; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .btn-plus { box-shadow: 0 0 30px rgba(139, 92, 246, 0.4); }
    </style>
</head>
<body class="pb-32">

    <!-- DASHBOARD -->
    <div id="page-main" class="page active">
        <div class="flex justify-between items-center mb-8 pt-4">
            <div>
                <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Patrimônio Total</p>
                <h1 class="text-3xl font-black tracking-tighter" id="display-balance">R$ 12.450,00</h1>
            </div>
            <div class="w-10 h-10 rounded-2xl glass flex items-center justify-center">
                <i class="lucide-trending-up text-purple-500 w-5 h-5"></i>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-8">
            <div class="glass p-5 rounded-[2rem]">
                <div class="flex items-center gap-2 mb-2 text-green-500">
                    <i class="lucide-arrow-down-left w-4 h-4"></i>
                    <span class="text-[9px] font-bold uppercase">Entradas</span>
                </div>
                <p class="text-xl font-black">R$ 5.200</p>
            </div>
            <div class="glass p-5 rounded-[2rem]">
                <div class="flex items-center gap-2 mb-2 text-rose-500">
                    <i class="lucide-arrow-up-right w-4 h-4"></i>
                    <span class="text-[9px] font-bold uppercase">Saídas</span>
                </div>
                <p class="text-xl font-black">R$ 2.410</p>
            </div>
        </div>

        <h2 class="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Extrato Mensal</h2>
        <div class="space-y-4" id="transaction-list">
            <div class="glass p-4 rounded-3xl flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center"><i class="lucide-shopping-bag text-zinc-600"></i></div>
                    <div>
                        <p class="text-sm font-bold">Shopping Rio</p>
                        <p class="text-[10px] text-zinc-500 uppercase font-bold">Lazer • 12/Set</p>
                    </div>
                </div>
                <p class="text-sm font-black text-rose-500">- R$ 240,00</p>
            </div>
            <div class="glass p-4 rounded-3xl flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-green-500"><i class="lucide-dollar-sign"></i></div>
                    <div>
                        <p class="text-sm font-bold">Salário Mensal</p>
                        <p class="text-[10px] text-zinc-500 uppercase font-bold">Renda • 05/Set</p>
                    </div>
                </div>
                <p class="text-sm font-black text-green-500">+ R$ 5.000,00</p>
            </div>
        </div>
    </div>

    <!-- ADICIONAR -->
    <div id="page-add" class="page">
        <h2 class="text-2xl font-black mb-8 mt-4">Nova Transação</h2>
        <div class="space-y-4">
            <div>
                <label class="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter ml-2">Título do Gasto</label>
                <input type="text" id="in-title" placeholder="Ex: Supermercado" class="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-3xl outline-none focus:border-purple-500 mt-1">
            </div>
            <div>
                <label class="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter ml-2">Valor Total</label>
                <input type="number" id="in-value" placeholder="0,00" class="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-3xl outline-none focus:border-purple-500 mt-1 text-2xl font-black">
            </div>
            <div class="flex gap-4">
                <button onclick="this.parentElement.dataset.type='inc'" class="flex-1 py-4 rounded-3xl glass text-green-500 font-bold text-xs uppercase hover:bg-green-500/10 border-green-500/20 active:bg-green-500 active:text-black transition-all">Receita</button>
                <button onclick="this.parentElement.dataset.type='exp'" class="flex-1 py-4 rounded-3xl glass text-rose-500 font-bold text-xs uppercase hover:bg-rose-500/10 border-rose-500/20 active:bg-rose-500 active:text-black transition-all">Despesa</button>
            </div>
            <button onclick="saveTx()" class="w-full py-5 bg-purple-500 text-white rounded-3xl font-black uppercase text-[11px] tracking-[0.2rem] mt-4 shadow-xl shadow-purple-500/20 active:scale-95 transition-all">
                Salvar Registo
            </button>
        </div>
    </div>

    <!-- NAVBAR INFERIOR -->
    <nav class="fixed bottom-6 left-6 right-6 h-20 glass rounded-[2.5rem] flex justify-around items-center px-4 border-white/10 shadow-2xl z-[100]">
        <button onclick="showTab('main')" class="w-12 h-12 flex items-center justify-center text-purple-500"><i class="lucide-layout-grid"></i></button>
        <button onclick="showTab('add')" class="btn-plus w-14 h-14 bg-purple-500 text-white rounded-full flex items-center justify-center -translate-y-4"><i class="lucide-plus w-7 h-7"></i></button>
        <button onclick="showTab('main')" class="w-12 h-12 flex items-center justify-center text-zinc-500 opacity-50"><i class="lucide-pie-chart"></i></button>
    </nav>

    <script>
        function showTab(t) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById('page-' + t).classList.add('active');
        }

        function saveTx() {
            const title = document.getElementById('in-title').value;
            const val = document.getElementById('in-value').value;
            if(!title || !val) return alert('Preecha tudo!');
            
            alert('Transação salva no seu banco de dados local!');
            showTab('main');
        }
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
    <title>FocusForce AI - Produtividade</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/lucide-static@0.321.0/font/lucide.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;700&display=swap');
        body { font-family: 'JetBrains Mono', monospace; background-color: #080808; color: #fff; }
        .glass { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); }
        .btn-blue { background: #3b82f6; box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
        .page { display: none; padding: 20px; animation: enter 0.3s ease; }
        .page.active { display: block; }
        @keyframes enter { from { transform: translateX(10px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    </style>
</head>
<body class="pb-24">

    <!-- PAGE 1: TASK LIST -->
    <div id="page-list" class="page active pt-6">
        <div class="flex justify-between items-center mb-10">
            <h1 class="text-2xl font-black tracking-tighter">My Tasks <span class="text-blue-500">.</span></h1>
            <div class="w-8 h-8 rounded-lg glass flex items-center justify-center"><i class="lucide-filter text-zinc-500 w-4 h-4"></i></div>
        </div>

        <div class="space-y-4">
            <div class="glass p-5 rounded-2xl flex items-center gap-4">
                <input type="checkbox" checked class="w-5 h-5 rounded border-zinc-700 bg-transparent checked:bg-blue-500">
                <p class="text-sm font-bold line-through text-zinc-500">Configurar Generatefy Builder</p>
            </div>
            <div class="glass p-5 rounded-2xl flex items-center gap-4 border-l-4 border-blue-500">
                <input type="checkbox" class="w-5 h-5 rounded border-zinc-700 bg-transparent">
                <p class="text-sm font-bold">Lançar Oferta de Elite</p>
            </div>
            <div class="glass p-5 rounded-2xl flex items-center gap-4">
                <input type="checkbox" class="w-5 h-5 rounded border-zinc-700 bg-transparent">
                <p class="text-sm font-bold">Revisar Copy das Páginas</p>
            </div>
        </div>
    </div>

    <!-- PAGE 2: POMODORO -->
    <div id="page-pomodoro" class="page pt-10 text-center">
        <h2 class="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-12 italic">Current Focus Sprint</h2>
        <div class="w-64 h-64 glass rounded-full mx-auto flex flex-col items-center justify-center relative border-blue-500/20">
             <div class="absolute inset-4 border-2 border-dashed border-blue-500/10 rounded-full animate-spin"></div>
             <p class="text-6xl font-black tracking-tighter mb-1">25:00</p>
             <p class="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Focusing Now</p>
        </div>
        <div class="flex justify-center gap-4 mt-12">
            <button class="w-14 h-14 rounded-2xl glass flex items-center justify-center text-zinc-500"><i class="lucide-rotate-ccw"></i></button>
            <button class="w-20 h-20 rounded-[2rem] btn-blue flex items-center justify-center"><i class="lucide-play w-8 h-8 fill-white"></i></button>
            <button class="w-14 h-14 rounded-2xl glass flex items-center justify-center text-zinc-500"><i class="lucide-settings"></i></button>
        </div>
    </div>

    <!-- NAV -->
    <nav class="fixed bottom-0 left-0 right-0 h-20 glass flex border-t border-white/5 backdrop-blur-2xl px-12 justify-around items-center">
        <button onclick="nav('list')" class="p-3 text-blue-500"><i class="lucide-check-square"></i></button>
        <button onclick="nav('pomodoro')" class="p-3 text-zinc-700"><i class="lucide-timer"></i></button>
        <button onclick="nav('list')" class="p-3 text-zinc-700"><i class="lucide-bar-chart"></i></button>
    </nav>

    <script>
        function nav(p) {
            document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));
            document.getElementById('page-' + p).classList.add('active');
        }
    </script>
</body>
</html>
  `
};
