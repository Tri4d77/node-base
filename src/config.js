// ===========================================================================
//  Beállítások EGY helyen.
//
//  Így nem kell process.env-et vadászni tíz fájlban, és az átalakítás
//  (Number, alapérték) is egyszer, itt történik meg.
// ===========================================================================

export const config = {
  // A port. A Number() azért kell, mert a környezeti változó SZÖVEG.
  // A || 3000 lép életbe, ha nincs megadva, vagy nem szám (akkor NaN lenne).
  port: Number(process.env.PORT) || 3000,

  // A futtatási mód: "development", "test" vagy "production".
  // Ettől függ, mennyit árulunk el a hibaüzenetben.
  kornyezet: process.env.NODE_ENV || "development",
};
