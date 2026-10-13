// ===========================================================================
//  ÚTVONALRÉTEG (route) — csak összekötés.
//
//  Ez a fájl EGY PILLANTÁSSAL ÁTTEKINTHETŐ: azonnal látod, milyen végpontjai
//  vannak az erőforrásnak. Logika nem kerül ide.
// ===========================================================================

import express from "express";
import * as vezerlo from "../controllers/pelda.controller.js";

const router = express.Router();

// Az útvonalak a router SAJÁT gyökeréhez képest értelmezendők:
// a "/" a felakasztás után "/api/pelda" lesz (lásd src/app.js).
router.get("/", vezerlo.listaz);
router.get("/:id", vezerlo.egy);

export default router;
