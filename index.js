// ===========================================================================
//  A projekt belépési pontja: ez indítja el a szervert.
//
//  Futtatás:  npm start          (fejlesztés közben: npm run dev)
//
//  MIÉRT KÉT FÁJL (index.js + src/app.js)?
//    - az app.js FELÉPÍTI az alkalmazást → tesztelhető szerver indítása nélkül,
//    - az index.js ELINDÍTJA → ez az egyetlen dolga.
// ===========================================================================

import app from "./src/app.js";
import { config } from "./src/config.js";

const szerver = app.listen(config.port, () => {
  console.log(`A szerver fut (${config.kornyezet}): http://localhost:${config.port}`);
  console.log(`  Próbáld ki:  http://localhost:${config.port}/api/pelda`);
});

// TODO: innen indul az igazi munka — ezt a sort a Better Todo Tree kigyűjti.

// ---------------------------------------------------------------------------
//  Kecses leállás: a Ctrl + C előbb kiszolgálja a már futó kéréseket.
// ---------------------------------------------------------------------------
process.on("SIGINT", () => {
  console.log("\nLeállítás…");
  szerver.close(() => process.exit(0));
});
