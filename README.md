# Node.js backend — projektsablon

Fejlesztői környezet **és** minimális rétegelt váz Node.js backend projektekhez.

- **Eszközök:** ESLint, Prettier, EditorConfig, DotENV, Better Todo Tree
- **Váz:** Express-alkalmazás `route → controller → service` rétegekkel, központi hibakezeléssel

---

## Indulás

```bash
git clone https://github.com/Tri4d77/node-base.git uj-projekt
```

```bash
cd uj-projekt && npm install
```

Nyisd meg a mappát a VS Code-ban (**File → Open Folder**). A szerkesztő felajánlja
az ajánlott kiegészítőket — telepítsd mindet. Ha nem ajánlja fel: `Ctrl` + `Shift` + `X`
→ a keresőbe `@recommended`.

Indítsd el:

```bash
npm run dev
```

Ezt kell látnod (a `.env` hiányára figyelmeztet — ez így rendben van):

```
.env not found. Continuing without it.
A szerver fut (development): http://localhost:3000
  Próbáld ki:  http://localhost:3000/api/pelda
```

Végül állítsd be a sajátodra a `package.json` `name`, `description` és `license` mezőit,
nevezd át a `pelda` erőforrást, és írd át ezt a README-t.

---

## Parancsok

| Parancs                | Mit csinál?                                                    |
| ---------------------- | -------------------------------------------------------------- |
| `npm start`            | A szerver indítása                                             |
| `npm run dev`          | Ugyanaz, de mentés után **magától újraindul** (`node --watch`) |
| `npm run lint`         | Hibakeresés a kódban                                           |
| `npm run lint:fix`     | Ami biztonságosan javítható, azt kijavítja                     |
| `npm run format`       | Minden fájl formázása                                          |
| `npm run format:check` | Csak jelzi, mi nem formázott (automatikus ellenőrzéshez)       |

A `start` és a `dev` a `--env-file-if-exists=.env` kapcsolót használja: a `.env`
értékei betöltődnek, de **`.env` nélkül is elindul** a program.

---

## A három réteg

Minden kérés ugyanazon az úton halad végig. Ez a szerkezet a projekt
növekedésével sem borul fel, és a rétegek külön-külön tesztelhetők.

```
index.js              a szervert INDÍTJA — ez az egyetlen dolga
src/
  app.js              az alkalmazást FELÉPÍTI (nem indít szervert → tesztelhető)
  config.js           a beállítások egy helyen
  routes/             csak összekötés: melyik útvonal melyik vezérlőhöz megy
  controllers/        a HTTP nyelve: params/query/body kiolvasása, státuszkód
  services/           az üzleti logika — se req, se res, se státuszkód
  middlewares/        404-kezelő és a központi hibakezelő
  utils/HttpHiba.js   hibaosztály, amely magával hozza a státuszkódot
```

**Miért jó ez?** Ha holnap adatbázisra váltasz, csak a `services/` változik;
a vezérlő és az útvonal érintetlen marad.

A mintaerőforrás (`pelda`) két végpontja kipróbálható:

| Kérés                 | Válasz                                             |
| --------------------- | -------------------------------------------------- |
| `GET /api/pelda`      | `200` — a lista                                    |
| `GET /api/pelda/1`    | `200` — egy elem                                   |
| `GET /api/pelda/999`  | `404` · `NEM_TALALHATO` (a **szolgáltatás** dobja) |
| `GET /api/pelda/alma` | `400` · `ERVENYTELEN_ID` (a **vezérlő** dobja)     |
| `GET /nincs-ilyen`    | `404` · `NINCS_VEGPONT` (a 404-kezelő)             |

A hibaválasz alakja **egy helyen**, a `hibakezelo.js`-ben van leírva:

```json
{ "error": { "message": "Nincs ilyen elem.", "code": "NEM_TALALHATO" } }
```

`5xx`-nél a kliens általános üzenetet és `SZERVERHIBA` kódot kap — a pontos
hiba csak a naplóba kerül, mert elárulná a belső szerkezetet.

---

## Mi van a mappában?

| Fájl                              | Mire való?                                                     |
| --------------------------------- | -------------------------------------------------------------- |
| `.vscode/settings.json`           | Projektszintű szerkesztőbeállítások                            |
| `.vscode/extensions.json`         | Az ajánlott kiegészítők listája                                |
| `.vscode/launch.json`             | Hibakeresés (`F5`) — három konfiguráció                        |
| `.editorconfig`                   | Behúzás, sorvég, fájlvégi üres sor — **szerkesztőfüggetlenül** |
| `.prettierrc` · `.prettierignore` | A formázó beállításai                                          |
| `eslint.config.js`                | A kódellenőrző szabályai                                       |
| `jsconfig.json`                   | A VS Code így érti meg a projektet (jobb kódkiegészítés)       |
| `.gitignore`                      | Amit a Git ne kövessen                                         |
| `.env.minta`                      | A szükséges környezeti változók — értékek nélkül               |
| `index.js` · `src/`               | A belépési pont és a rétegelt váz                              |

---

## Az öt kiegészítő

| Kiegészítő       | Azonosító                          | Miért kell?                                              |
| ---------------- | ---------------------------------- | -------------------------------------------------------- |
| ESLint           | `dbaeumer.vscode-eslint`           | Enélkül a mentéskori automatikus javítás nem működik     |
| Prettier         | `esbenp.prettier-vscode`           | Enélkül a mentéskori formázás nem tudná, mivel formázzon |
| EditorConfig     | `EditorConfig.EditorConfig`        | Ez érvényesíti az `.editorconfig`-ot                     |
| DotENV           | `mikestead.dotenv`                 | Szintaxiskiemelés a `.env` fájlokhoz                     |
| Better Todo Tree | `FanaticPythoner.better-todo-tree` | A `TODO`/`FIXME`/`BUG` jelölések fában                   |

> A **Better Todo Tree** a régi _Todo Tree_ (Gruntfuggly) önálló továbbfejlesztése,
> GPL-3.0 licenccel. Beállításai `better-todo-tree.*` előtaggal mennek — a régi
> `todo-tree.*` kulcsokat is elfogadja, de mi az újakat használjuk.
> [GitHub](https://github.com/FanaticPythoner/better-todo-tree)

Telepítés parancssorból, ha kézzel szeretnéd:

```bash
code --install-extension dbaeumer.vscode-eslint --force
```

```bash
code --install-extension esbenp.prettier-vscode --force
```

```bash
code --install-extension EditorConfig.EditorConfig --force
```

```bash
code --install-extension mikestead.dotenv --force
```

```bash
code --install-extension FanaticPythoner.better-todo-tree --force
```

---

## Jelölések a kódban

Négy címke van beállítva. Írd őket megjegyzésbe — a bal oldali sávban megjelenő
fában egy kattintással a helyükre ugorhatsz.

```javascript
// TODO: ezt még meg kell írni
// FIXME: működik, de rossz — javítani kell
// BUG: megerősített hiba
// NOTE: magyarázat a munkatársnak (a fában NEM jelenik meg, csak színes)
```

A címkék a `.vscode/settings.json` végén, saját szakaszban vannak — ott lehet
őket átírni. Ha **új** címkét veszel fel, **két helyen** kell megtenni:
a `better-todo-tree.general.tags` listában **és** a
`better-todo-tree.highlights.customHighlight` objektumban. Az egyik a másikat nem pótolja.

---

## Mit nem tettünk bele, és miért?

A cél nem a teljesség, hanem a **célszerűség**.

| Kihagyva                                                                         | Miért?                                                                                                  |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `editor.tabSize`, `insertSpaces`, `trimTrailingWhitespace`, `insertFinalNewline` | Az `.editorconfig` már intézi — és azt más szerkesztő is érti                                           |
| `editor.bracketPairColorization`, `javascript.suggest.autoImports`               | A VS Code-ban már **alapból** be van kapcsolva                                                          |
| `files.exclude` a `node_modules`-ra                                              | Szándékosan látható marad; keresni úgysem keres benne                                                   |
| `workbench.startupEditor`, `terminal.integrated.defaultProfile`                  | Személyes ízlés — a saját felhasználói beállításaidba való, nem a projektbe                             |
| `editor.linkedEditing`                                                           | HTML-címkékhez való, backend-projektben alig van haszna                                                 |
| `eslint-config-prettier`                                                         | Nem kell: az ESLint 9 óta nincsenek formázási szabályok az ajánlott csomagban, így nincs mit ütköztetni |
| REST Client, Error Lens, Path IntelliSense                                       | Hasznosak, de egyik beállítás sem támaszkodik rájuk — tedd fel őket a saját profilodba                  |

A `jsconfig.json`-ben a **`checkJs` alapból `false`**. Ha már magabiztosan írod a kódot,
állítsd `true`-ra: a JSDoc-kommentjeid alapján valódi típushibákat fog találni.

---
