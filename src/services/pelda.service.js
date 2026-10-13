// ===========================================================================
//  SZOLGÁLTATÁSRÉTEG (service) — az üzleti logika.
//
//  ⚠ FIGYELD MEG, MI NINCS ITT: se req, se res, se státuszkód.
//  Ez a réteg akkor is működne, ha holnap parancssori programot írnánk belőle.
//  Ha hibát kell jeleznie, HttpHiba-t dob — abban benne van a státuszkód is.
//
//  A valódi projektben ezt cseréld le: adatbázis, külső API, számítás.
// ===========================================================================

import { HttpHiba } from "../utils/HttpHiba.js";

// Minta-adat a memóriában. Igazi projektben ez adatbázisból jön.
const elemek = [
  { id: 1, nev: "Első elem" },
  { id: 2, nev: "Második elem" },
];

/** Az összes elem. */
export function osszes() {
  return elemek;
}

/** Egy elem azonosító alapján. Ha nincs, HIBÁT DOB. */
export function azonositoval(id) {
  const elem = elemek.find((e) => e.id === id);

  if (!elem) {
    // A throw AZONNAL megszakítja a függvényt — nincs mit elfelejteni.
    throw new HttpHiba(404, "Nincs ilyen elem.", "NEM_TALALHATO");
  }

  return elem;
}
