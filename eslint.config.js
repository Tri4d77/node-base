// ===========================================================================
//  ESLint-konfiguráció (lapos, „flat” formátum — az ESLint 9 óta ez az egyetlen).
//
//  Ez a fájl nem futtatható önmagában: az ESLint olvassa be.
//  Futtatás:  npm run lint      (javítással: npm run lint:fix)
//
//  MIÉRT NINCS BENNE eslint-config-prettier?
//  Mert nem kell: az ESLint 9 óta a formázási szabályok kikerültek az
//  ajánlott csomagból, így nincs mit ütköztetni a Prettierrel.
// ===========================================================================

// Az ESLint saját ajánlott szabálycsomagja (no-undef, no-unreachable, …).
import js from "@eslint/js";

// Tudja, milyen globális nevek léteznek Node-ban, böngészőben stb.
import globals from "globals";

// A konfiguráció egy TÖMB: a blokkok sorban egymásra épülnek, a későbbi nyer.
export default [
  // 1) Amit az ESLint ajánl.
  js.configs.recommended,

  // 2) Amit ki sem kell nyitni: a generált és letöltött fájlok.
  {
    ignores: ["node_modules/**", "generated/**", "dist/**", "build/**", "coverage/**"],
  },

  // 3) A saját beállításaink.
  {
    files: ["**/*.js"],

    languageOptions: {
      // Mindig a legújabb nyelvváltozat.
      ecmaVersion: "latest",

      // ESM-et írunk (lásd package.json → "type": "module").
      // Enélkül az import utasítás szintaktikai hibának látszana.
      sourceType: "module",

      // A Node globális nevei (process, console, …) létező névnek számítsanak.
      globals: { ...globals.node },
    },

    rules: {
      // Létrehozott, de nem használt változó. "warn": munka közben normális,
      // ne piros hibaként villogjon.
      "no-unused-vars": "warn",

      // console.log a kódban. "off": tanuláshoz és hibakereséshez kell.
      // Ha egy projektben naplózó könyvtárat használsz, állítsd "warn"-ra.
      "no-console": "off",

      // == helyett ===. "error": valódi hibaforrás, mert "0" == 0 igaz,
      // de "0" === 0 hamis.
      eqeqeq: "error",
    },
  },
];
