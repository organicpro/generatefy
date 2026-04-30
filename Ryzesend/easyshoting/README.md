# RyzeSend v2.0
### Disparador de Mensagens WhatsApp com Dashboard

**(c) 2026 RyzeSend v2.0**

---

## Estrutura de Arquivos

```
ryzesend/
├── server.js           ← Backend (não editar)
├── package.json        ← Configurações do projeto
├── LICENSE.txt         ← Direitos autorais
├── README.md           ← Este arquivo
├── public/
│   └── index.html      ← Dashboard (interface web)
└── data/               ← Criado automaticamente ao rodar
    ├── profile.json    ← Perfil do operador
    ├── dispatches.json ← Histórico de disparos
    └── .wwebjs_auth/   ← Sessão do WhatsApp (não apagar)
```

---

## Requisitos da Máquina

| Requisito | Versão | Como verificar |
|-----------|--------|----------------|
| **Node.js** | 16 ou superior | `node -v` no terminal |
| **npm** | Qualquer (vem com o Node) | `npm -v` no terminal |
| **Google Chrome** | Qualquer versão recente | Verificar se está instalado |
| **WhatsApp** | Ativo no celular | — |

> **Onde baixar o Node.js:** https://nodejs.org/pt — baixe a versão **LTS**

---

## Instalação Passo a Passo

### Passo 1 — Extraia os arquivos

Extraia a pasta `ryzesend` em qualquer local da sua máquina.

Exemplo de destino:
- Windows: `C:\Users\SeuNome\Desktop\ryzesend`
- Mac/Linux: `~/Desktop/ryzesend`

---

### Passo 2 — Abra o terminal na pasta

**Windows:**
1. Abra a pasta `ryzesend` no Explorador de Arquivos
2. Clique na barra de endereço, digite `cmd` e pressione Enter

**Mac:**
1. Clique com o botão direito na pasta
2. Selecione "Abrir Terminal Aqui" (ou use `cd` para navegar)

**Linux:**
```bash
cd ~/Desktop/ryzesend
```

---

### Passo 3 — Instale as dependências

No terminal, dentro da pasta do projeto, execute:

```bash
npm install
```

Aguarde o processo terminar. Isso instalará:
- `express` — servidor web
- `socket.io` — comunicação em tempo real
- `whatsapp-web.js` — integração com WhatsApp
- `qrcode-terminal` — geração do QR Code

> A instalação pode demorar alguns minutos na primeira vez.

---

### Passo 4 — Inicie o servidor

```bash
npm start
```

Você verá no terminal:

```
  ╔═══════════════════════════════════════╗
  ║         RYZESEND — v2.0               ║
  ║  © 2025 NPRO Soluções Digitais        ║
  ║  Rodando em http://localhost:3000      ║
  ╚═══════════════════════════════════════╝
```

---

### Passo 5 — Acesse o Dashboard

Abra o navegador e acesse:

```
http://localhost:3000
```

---

### Passo 6 — Crie seu perfil

Na primeira vez, o sistema pedirá para criar um perfil com:
- Nome completo
- E-mail
- Nome do negócio
- Segmento
- Intervalo entre envios (recomendado: 20 segundos)
- Aceite dos termos de uso

---

### Passo 7 — Conecte o WhatsApp

1. Clique em **"Clique para conectar"** na barra lateral
2. Aparecerá um QR Code na tela
3. No seu celular, abra o WhatsApp
4. Vá em **Configurações > Dispositivos Conectados > Conectar dispositivo**
5. Escaneie o QR Code
6. Aguarde a confirmação — o badge ficará verde

---

### Passo 8 — Realize o primeiro disparo

1. Clique em **Disparar** no menu lateral
2. Preencha o nome da campanha
3. Escreva a mensagem
4. Cole os números (um por linha) ou carregue um arquivo `.txt`
5. Clique em **Iniciar Disparo**
6. Acompanhe o progresso em tempo real na tela

---

## Formato dos Números

Os números devem estar no formato **DDI + DDD + Número**, sem espaços, traços ou parênteses.

Exemplos:
```
5511987654321
5562998765432
5521912345678
```

---

## Dicas Importantes

- **Não feche o terminal** enquanto o servidor estiver rodando
- O WhatsApp permanece conectado enquanto o servidor estiver ativo
- O histórico de disparos fica salvo na pasta `data/`
- **Não apague a pasta `data/.wwebjs_auth`** — ela guarda a sessão do WhatsApp e evita novo escaneamento
- Intervalo mínimo recomendado: **15 segundos** entre envios para evitar bloqueio

---

## Parando o Servidor

No terminal, pressione `Ctrl + C` para encerrar o servidor.

---

## Suporte

(c) 2026 RyzeSend v2.0
