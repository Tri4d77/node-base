// ===========================================================================
//  VEZÉRLŐRÉTEG (controller) — a HTTP nyelve.
//
//  Feladata a FORDÍTÁS:
//    1) a kérésből kiveszi az adatot (params, query, body),
//    2) átadja a szolgáltatásnak,
//    3) az eredményt HTTP-válasszá alakítja — a helyes státuszkóddal.
// ===========================================================================

import * as szolgaltatas from "../services/pelda.service.js";
import { HttpHiba } from "../utils/HttpHiba.js";

export function listaz(req, res) {
  res.json(szolgaltatas.osszes());
}

export function egy(req, res) {
  // ⚠ Az útvonalparaméter MINDIG szöveg — számmá kell alakítani.
  const id = Number(req.params.id);

  // A bemenet formai ellenőrzése a vezérlő dolga: ez HTTP-kérdés.
  if (!Number.isInteger(id) || id < 1) {
    throw new HttpHiba(400, "Az azonosító csak pozitív egész szám lehet.", "ERVENYTELEN_ID");
  }

  // Ha nincs ilyen elem, a SZOLGÁLTATÁS dob 404-es hibát — itt nincs több if.
  res.json(szolgaltatas.azonositoval(id));
}
