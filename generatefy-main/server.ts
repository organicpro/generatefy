import express from "express";
import type { Request, Response } from "express";
import { createServer as createViteServer } from "vite";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { spawn } from "child_process";
import { ServerResponse } from "http";
import fs from "fs";

const PORT = Number(process.env.PORT) || 3000;
const RYZESEND_PORT = Number(process.env.RYZESEND_PORT) || 3011;
const RYZESEND_DIR = process.env.RYZESEND_DIR
  ? path.resolve(process.env.RYZESEND_DIR)
  : path.resolve(process.cwd(), "..", "Ryzesend", "easyshoting");
const RYZESEND_SERVER_FILE = path.join(RYZESEND_DIR, "server.js");
const RYZESEND_URL = `http://127.0.0.1:${RYZESEND_PORT}`;

let ryzesendProcess: ReturnType<typeof spawn> | null = null;
let ryzesendStarting = false;
let shuttingDown = false;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getRyzeSendStatus() {
  try {
    const response = await fetch(`${RYZESEND_URL}/api/status`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch {
    return null;
  }
}

async function ensureRyzeSendRunning() {
  if (!fs.existsSync(RYZESEND_SERVER_FILE)) {
    return { ok: false, reason: "missing-files" as const };
  }

  const existingStatus = await getRyzeSendStatus();
  if (existingStatus) {
    return { ok: true, status: existingStatus };
  }

  if (ryzesendStarting) {
    return { ok: false, reason: "starting" as const };
  }

  ryzesendStarting = true;

  try {
    if (!ryzesendProcess || ryzesendProcess.exitCode !== null) {
      const child = spawn(process.execPath, ["server.js"], {
        cwd: RYZESEND_DIR,
        env: {
          ...process.env,
          PORT: String(RYZESEND_PORT),
        },
        stdio: ["ignore", "pipe", "pipe"],
        windowsHide: true,
      });

      ryzesendProcess = child;

      child.stdout.on("data", (data) => {
        console.log(`[RyzeSend] ${data.toString().trim()}`);
      });

      child.stderr.on("data", (data) => {
        console.error(`[RyzeSend:ERR] ${data.toString().trim()}`);
      });

      child.on("exit", (code) => {
        ryzesendProcess = null;
        ryzesendStarting = false;
        if (!shuttingDown) {
          console.warn(`[RyzeSend] process exited with code ${code ?? "unknown"}`);
        }
      });
    }

    for (let attempt = 0; attempt < 20; attempt++) {
      await wait(750);
      const status = await getRyzeSendStatus();
      if (status) {
        return { ok: true, status };
      }
    }

    return { ok: false, reason: "boot-timeout" as const };
  } finally {
    ryzesendStarting = false;
  }
}

function stopRyzeSend() {
  if (ryzesendProcess && ryzesendProcess.exitCode === null) {
    ryzesendProcess.kill();
  }
}

process.on("SIGINT", () => {
  shuttingDown = true;
  stopRyzeSend();
  process.exit(0);
});

process.on("SIGTERM", () => {
  shuttingDown = true;
  stopRyzeSend();
  process.exit(0);
});

async function startServer() {
  const app = express();

  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  app.get("/api/health", async (_req, res) => {
    const ryzesendStatus = await getRyzeSendStatus();
    res.json({
      status: "ok",
      time: new Date().toISOString(),
      ryzesend: {
        configured: fs.existsSync(RYZESEND_SERVER_FILE),
        running: Boolean(ryzesendStatus),
        port: RYZESEND_PORT,
      },
    });
  });

  app.get("/api/ryzesend-admin/status", async (_req, res) => {
    const status = await getRyzeSendStatus();
    res.json({
      configured: fs.existsSync(RYZESEND_SERVER_FILE),
      directory: RYZESEND_DIR,
      port: RYZESEND_PORT,
      running: Boolean(status),
      starting: ryzesendStarting,
      engine: status,
    });
  });

  app.post("/api/ryzesend-admin/start", async (_req, res) => {
    const result = await ensureRyzeSendRunning();
    if (!result.ok) {
      res.status(503).json({
        ok: false,
        reason: result.reason,
        configured: fs.existsSync(RYZESEND_SERVER_FILE),
        directory: RYZESEND_DIR,
      });
      return;
    }

    res.json({ ok: true, engine: result.status, port: RYZESEND_PORT });
  });

  app.get("/supabase-proxy/health", (_req, res) => {
    res.json({ status: "proxy-alive", target: "https://tjmacxansodaebpqfinb.supabase.co" });
  });

  app.use("/supabase-proxy", (req, res, next) => {
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, apikey, x-client-info");
      res.sendStatus(200);
      return;
    }
    next();
  });

  app.use(
    "/supabase-proxy",
    createProxyMiddleware({
      target: "https://tjmacxansodaebpqfinb.supabase.co",
      changeOrigin: true,
      timeout: 10000,
      proxyTimeout: 10000,
      pathRewrite: {
        "^/supabase-proxy": "",
      },
      on: {
        proxyReq: (proxyReq, req) => {
          console.log(`[Proxy Request] ${req.method} ${req.url} -> ${proxyReq.path}`);
          if (req.headers["apikey"]) {
            proxyReq.setHeader("apikey", req.headers["apikey"]);
          }
        },
        proxyRes: (proxyRes, req) => {
          console.log(`[Proxy Response] ${proxyRes.statusCode} for ${req.url}`);
          proxyRes.headers["access-control-allow-origin"] = "*";
          proxyRes.headers["access-control-allow-methods"] = "GET, POST, PUT, DELETE, OPTIONS";
          proxyRes.headers["access-control-allow-headers"] = "Content-Type, Authorization, apikey, x-client-info";
        },
        error: (err, _req, res) => {
          console.error("[Proxy Error]", err);
          if (res instanceof ServerResponse) {
            res.writeHead(500, {
              "Content-Type": "application/json",
            });
            res.end(JSON.stringify({ error: "Proxy Error", message: err.message }));
          }
        },
      },
    })
  );

  app.use(
    "/api/ryzesend",
    createProxyMiddleware({
      target: RYZESEND_URL,
      changeOrigin: true,
      timeout: 120000,
      proxyTimeout: 120000,
      pathRewrite: (pathReq) => `/api${pathReq}`,
      on: {
        error: (err, _req, res) => {
          console.error("[RyzeSend Proxy Error]", err);
          if (res instanceof ServerResponse) {
            res.writeHead(502, {
              "Content-Type": "application/json",
            });
            res.end(
              JSON.stringify({
                error: "RyzeSend Offline",
                message: "O motor de disparo ainda nao respondeu. Tente iniciar novamente em alguns segundos.",
              })
            );
          }
        },
      },
    })
  );

  app.use((req, res, next) => {
    if (req.url.startsWith("/supabase-proxy") || req.url.startsWith("/api")) {
      if (!res.headersSent) {
        res.status(404).json({ error: "Not Found", message: "Route not handled by proxy" });
        return;
      }
    }
    next();
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.use((_req: Request, res: Response) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("Supabase Proxy active at /supabase-proxy");
    console.log(`RyzeSend bridge available at /api/ryzesend (engine port ${RYZESEND_PORT})`);
    void ensureRyzeSendRunning();
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
