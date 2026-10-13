// ===========================================================================
//  Saját hibaosztály: olyan hiba, amely MAGÁVAL HOZZA a státuszkódot.
//
//  Így a szolgáltatásréteg nem ismeri a HTTP-t, mégis tud üzenni a
//  hibakezelőnek, hogy milyen válasz jár a hibához.
// ===========================================================================

export class HttpHiba extends Error {
  constructor(status, message, code) {
    // A super() az Error konstruktorát hívja. Enélkül a message ÜRES lenne.
    super(message);

    this.name = "HttpHiba";

    // A státuszkód, amit a központi hibakezelő kiolvas.
    this.status = status;

    // Állandó, GÉPNEK szóló kód. A kliens erre írhat feltételt —
    // a szöveges üzenet változhat, ez nem.
    this.code = code;
  }
}
