import express from "express";
import cors from "cors";

import fs from "fs";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello camera api");
});

app.get("/secure-local/setup-registration", (req, res) => {
  res.json({
    status: {
      details: "Registration config saved",
      succeeded: true,
    },
  });
});

app.get("/secure-local/registration-ready", (req, res) => {
  res.json({
    status: {
      details: "Registration is ready",
      succeeded: true,
    },
  });
});

app.get("/secure-local/kill-server", (req, res) => {
  res.json({
    status: {
      details: "Stopping Web Server…",
      succeeded: true,
    },
  });
});

app.get("/secure-local/registration-done", (req, res) => {
  res.json({
    status: {
      details: "Camera is not registered yet",
      succeeded: false,
    },
  });
});

app.get("/local-status", (req, res) => {
  res.json({
    status: {
      fusus: {
        appManager: true,
        hlsMainProxy: true,
        hlsRecProxy: true,
        hlsSubProxy: true,
        mqttClient: true,
        nginx: true,
        zeroTierOne: false,
      },
      internal: {
        encoder: true,
        gsensor: true,
        internalHttp: true,
        onvif: true,
        recorder: true,
        rtspServer: true,
        trackerApp: true,
        wsServer: false,
      },
    },
  });
});

app.get("/logs/application/:file", (req, res) => {
  const { file } = req.params;

  if (file.includes(".json")) {
    const data = fs.readFileSync("./json-data.json", "utf8");
    return res.json(data);
  }

  const data = fs.readFileSync("./logs.txt", "utf8");

  return res.json(data);
});

app.listen(44080, () => {
  console.log("Servers is running on port 3000");
});
