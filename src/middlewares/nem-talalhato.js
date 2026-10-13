// ===========================================================================
//  404-es kezelő.
//
//  ⚠ A HELYE: MINDEN útvonal UTÁN, de a HIBAKEZELŐ ELŐTT.
//  Nem válaszol közvetlenül, hanem hibát ad tovább — így a válasz alakja
//  EGY helyen, a központi hibakezelőben van leírva.
// ===========================================================================

import { HttpHiba } from "../utils/HttpHiba.js";

export function nemTalalhato(req, res, next) {
  next(new HttpHiba(404, "Nincs ilyen végpont.", "NINCS_VEGPONT"));
}
