// ===========================================================================
//  Az alkalmazás FELÉPÍTÉSE.
//
//  ⚠ EZ A FÁJL NEM INDÍT SZERVERT! Csak összerakja az alkalmazást, és
//  exportálja. Az indítás az index.js dolga — így az app tesztelhető
//  anélkül, hogy tényleg elindulna egy szerver a porton.
// ===========================================================================

import express from "express";

import peldaRouter from "./routes/pelda.routes.js";
import { nemTalalhato } from "./middlewares/nem-talalhato.js";
import { hibakezelo } from "./middlewares/hibakezelo.js";

const app = express();

// 1) Törzs-feldolgozás — az útvonalak ELŐTT kell állnia,
//    különben a req.body mindenhol undefined lenne.
app.use(express.json());

// 2) Az útvonalak. Az előtag EGY helyen van: ha "/api/v2/pelda" kellene,
//    ezt az egy sort kellene átírni.
app.use("/api/pelda", peldaRouter);

// 3) A lánc vége — a SORREND KÖTÖTT.
app.use(nemTalalhato); // előbb a 404
app.use(hibakezelo); // UTOLSÓNAK a hibakezelő

export default app;
