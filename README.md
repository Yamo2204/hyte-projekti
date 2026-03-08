# Hyte-projekti

Tämä on minun projektini, jossa on front-end (Vite + HTML/CSS/JS) ja oma back-end (Node.js + Express).
Sovelluksessa voi hakea users/items-dataa, kirjautua sisään tokenilla ja hakea päiväkirjamerkintöjä API:sta.

## Oma työ ja oppiminen
Tein tämän projektin itse kurssiharjoituksena.
Suurin haaste oli yhdistää front-end ja back-end niin, että kaikki endpointit toimivat varmasti.
Testasin kutsut yksi kerrallaan (esim. `/api/users` ja `/api/login`) ja opin samalla virheiden selvitystä.

## Julkaisu (Bonus)
- Front-end linkki: Ei julkaistu vielä
- Back-end/API linkki: Ei julkaistu vielä
- API-dokumentaatio (apidoc): Ei julkaistu vielä

## Testikäyttäjä (kirjautuminen)
Back-endin nykyisessä versiossa `/api/login` hyväksyy käyttäjätunnuksen ja salasanan, kun molemmat kentät on täytetty.

Esimerkki:
- username: `opiskelija`
- password: `1234`

## Käytetyt tekniikat
- Front-end: HTML, CSS, JavaScript, Vite
- Back-end: Node.js, Express, CORS
- Paketinhallinta: npm

## Projektin rakenne (pääkohdat)
- `index.html` = etusivu
- `items-page.html` = users/items API -toiminnot
- `login.html` = kirjautuminen
- `diary.html` = päiväkirjamerkinnät (tokenilla)
- `bmi.html` = BMI-laskuri
- `backend/server.js` = API-palvelin
- `db/init-mysql.sql` = SQL-skeema (harjoitustiedosto)

## Tietokannan kuvaus
Tässä projektissa data ajetaan tällä hetkellä muistista (`backend/server.js`):
- `users` (user_id, username, email)
- `items` (item_id, name, weight)
- `diaryEntries` (entry_id, user_id, entry_date, mood, weight, sleep_hours, notes, created_at)

Lisäksi mukana on `db/init-mysql.sql`, jossa on MySQL-alustus harjoitusta varten. Sitä voi käyttää, jos projektin haluaa laajentaa oikeaan tietokantaan.

## Toteutetut toiminnallisuudet

### Mitä toteutin itse
- Rakensin front-end sivut (Home, Items, Login, Diary, BMI) ja navigaation.
- Tein API-kutsut JavaScriptillä (GET, POST, DELETE).
- Tein loginin ja tokenin tallennuksen localStorageen.
- Tein päiväkirjan haun suojatusta endpointista Bearer-tokenilla.
- Tein back-end endpointit Expressillä ja testasin ne PowerShellillä.

### 1) Items/Users-sivu (`items-page.html`)
- Hae kaikki users (`GET /api/users`)
- Hae user ID:llä (`GET /api/users/:id`)
- Poista user ID:llä (`DELETE /api/users/:id`)
- Hae kaikki items (`GET /api/items`)
- Lisää uusi item (`POST /api/items`)
- Poista item (`DELETE /api/items/:id`)
- Dynaaminen taulukko + nappitoiminnot (Info/Delete)

### 2) Login (`login.html`)
- Kirjautuminen (`POST /api/login`)
- Token tallennus `localStorage`en
- Onnistuneen loginin jälkeen ohjaus päiväkirjasivulle

### 3) Diary (`diary.html`)
- Päiväkirjamerkintöjen haku (`GET /api/entries`) Bearer-tokenilla
- Uloskirjautuminen (token poistetaan localStoragesta)
- Fallback paikalliseen `public/diary.json` tiedostoon, jos API-haku epäonnistuu

### 4) BMI (`bmi.html`)
- BMI-laskenta käyttäjän syötteillä
- Tuloksen näyttö käyttöliittymässä

### 5) Back-end (`backend/server.js`)
- Health check: `GET /api/health`
- Login: `POST /api/login`
- Users: `GET /api/users`, `GET /api/users/:id`, `DELETE /api/users/:id`
- Items: `GET /api/items`, `GET /api/items/:id`, `POST /api/items`, `DELETE /api/items/:id`
- Entries: `GET /api/entries` (vaatii Bearer tokenin)

## API-endpointit (tiivis listaus)
- `GET /api/health`
- `POST /api/login`
- `GET /api/users`
- `GET /api/users/:id`
- `DELETE /api/users/:id`
- `GET /api/items`
- `GET /api/items/:id`
- `POST /api/items`
- `DELETE /api/items/:id`
- `GET /api/entries` (Authorization: Bearer <token>)


## Tunnetut bugit / ongelmat
- Data on nyt muistissa, eli serverin restart nollaa muutokset.
- Jos back-end ei ole käynnissä, API-kutsut eivät toimi.
- Buildissä voi näkyä varoitus taustakuvasta (`bg.jpg`), jos tiedosto puuttuu tai polku on väärä.
- Selain voi näyttää vanhaa välimuistia kehityksessä (ratkaisu: hard refresh Ctrl+F5).

## Asennus ja käynnistys paikallisesti
1. Asenna riippuvuudet:
   - `npm install`
2. Käynnistä back-end:
   - `npm run backend`
3. Käynnistä front-end:
   - `npm run dev`

Vaihtoehtoisesti (yhdellä komennolla):
- `npm run dev:all`

## Demoa varten (opettajan esittely)
- Varmista ennen esittelyä:
  - back-end käynnissä
  - front-end käynnissä
  - selain auki oikeassa osoitteessa
  - devtools auki (Network + Console)

## Referenssit
- https://developer.mozilla.org/
- https://expressjs.com/
- https://vitejs.dev/
- Kurssimateriaalit ja luentoesimerkit

## Jatkokehitys
- Yhdistän projektin oikeaan MySQL-tietokantaan (ei vain in-memory data).
- Teen selkeämmät virheilmoitukset käyttäjälle.
- Julkaisen front-endin ja back-endin verkkoon ja lisään linkit tähän README:hen.
