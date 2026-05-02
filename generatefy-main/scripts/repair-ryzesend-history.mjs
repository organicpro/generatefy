import fs from "node:fs";
import path from "node:path";

const dataDir = process.env.RYZESEND_DATA_DIR
  ? path.resolve(process.env.RYZESEND_DATA_DIR)
  : path.join(process.cwd(), "data", "ryzesend");

const dispatchesPath = path.join(dataDir, "dispatches.json");

if (!fs.existsSync(dispatchesPath)) {
  process.exit(0);
}

const dispatches = JSON.parse(fs.readFileSync(dispatchesPath, "utf-8"));

for (const dispatch of dispatches) {
  if (!Array.isArray(dispatch.logs)) {
    continue;
  }

  for (const log of dispatch.logs) {
    const error = typeof log.error === "string" ? log.error : "";
    if (error.includes("getMessageModel") && error.includes("serialize")) {
      log.status = "success";
      delete log.error;
    }
  }

  const sent = dispatch.logs.filter((log) => log.status === "success").length;
  const failed = dispatch.logs.filter((log) => log.status === "error").length;

  dispatch.sent = sent;
  dispatch.failed = failed;
  dispatch.pending = Math.max(0, Number(dispatch.total || 0) - sent - failed);
}

fs.writeFileSync(dispatchesPath, JSON.stringify(dispatches, null, 2), "utf-8");
