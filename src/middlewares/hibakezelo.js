// ===========================================================================
//  A KÖZPONTI HIBAKEZELŐ.
//
//  ⚠ Az Express EGYETLEN dolog alapján ismeri fel: NÉGY PARAMÉTERE van,
//  és az első a hiba. A negyedik (next) akkor is KELL, ha nem használod —
//  különben az Express közönséges middleware-nek nézi, és a hiba sosem ér ide.
// ===========================================================================

import { config } from "../config.js";

export function hibakezelo(err, req, res, next) {
  // 1) NAPLÓZÁS — ez az egyetlen hely, ahol minden hiba átmegy.
  // A hiba KÓDJA is ide kerül: 5xx-nél a kliens csak SZERVERHIBA-t kap,
  // a pontos kód (pl. ENOENT) csak itt látszik.
  console.error(`[HIBA] ${req.method} ${req.originalUrl}`, err.code ?? "", err.message);

  // 2) Ha a válasz MÁR ELMENT, nincs mit tenni: a res.status() újabb hibát
  // okozna (ERR_HTTP_HEADERS_SENT). Az Express beépített kezelője lezárja.
  if (res.headersSent) {
    return next(err);
  }

  // 3) VÁLASZ A KLIENSNEK.
  // A ?? (és nem a ||) fejezi ki pontosan: „csak akkor, ha nincs megadva”.
  const statusz = err.status ?? 500;
  const fejlesztes = config.kornyezet !== "production";

  res.status(statusz).json({
    error: {
      // 4xx-nél a PONTOS üzenet megy ki (a kliens hibázott, tudnia kell, mit).
      // 5xx-nél ÁLTALÁNOS szöveg — a részletek csak a naplóba kerülnek.
      message: statusz < 500 ? err.message : "Váratlan szerverhiba történt.",

      // A kód 4xx-nél a hibáé, 5xx-nél MINDIG SZERVERHIBA: a Node és a
      // könyvtárak kódjai (ENOENT, P2003) a belső működésről árulkodnának.
      code: statusz < 500 ? (err.code ?? "SZERVERHIBA") : "SZERVERHIBA",

      // Feltételes mezők: csak fejlesztéskor, és csak 5xx-nél.
      // Élesben a hibaüzenet elárulhatná a fájlneveket és a belső szerkezetet.
      ...(fejlesztes && statusz >= 500 ? { reszletek: err.message, stack: err.stack } : {}),
    },
  });
}
