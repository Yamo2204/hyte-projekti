Hyte-projekti
Projektin kuvaus
Tämä on projektini. Tein siihen front-endin (HTML, CSS, JavaScript + Vite) ja back-endin (Node.js + Express).

###
Sovelluksessa käyttäjä voi:
hakea users ja items tietoja API:sta
kirjautua sisään
hakea päiväkirjamerkintöjä tokenilla
laskea BMI:n
Oma oppiminen

###
Tein projektin itse harjoituksena.
Suurin haaste oli yhdistää front-end ja back-end niin, että API-kutsut toimivat oikein.

###
Testasin endpointit yksi kerrallaan, esimerkiksi:

/api/users

/api/login

###

Tämän kautta opin paremmin API-kutsujen tekemistä ja virheiden korjaamista.

Käytetyt tekniikat

Front-end:

HTML

CSS

JavaScript

Vite

Back-end:

Node.js

Express

###
Projektin sivut

index.html – etusivu

items-page.html – users ja items API-toiminnot

login.html – kirjautuminen

diary.html – päiväkirjamerkinnät (token tarvitaan)

bmi.html – BMI-laskuri

###
Tärkeimmät toiminnot
Items / Users sivu

hae kaikki users

hae user ID:llä

poista user

hae kaikki items

lisää uusi item

poista item

Tulokset näytetään dynaamisessa taulukossa.

###
Login

Käyttäjä voi kirjautua sisään.
Jos login onnistuu:

token tallennetaan localStorageen

käyttäjä ohjataan diary-sivulle

Jos API ei toimi, sivu voi hakea tiedot paikallisesta JSON-tiedostosta.

###
BMI

Käyttäjä syöttää pituuden ja painon.
Sivu laskee BMI-arvon ja näyttää tuloksen.

### 

Back-end

Back-end on tehty Expressillä.

###
Tärkeimmät endpointit:

GET /api/health

POST /api/login

GET /api/users

GET /api/items

POST /api/items

DELETE /api/items/:id

GET /api/entries (vaatii tokenin)

Data tallennetaan tällä hetkellä muistiin, joten serverin restart nollaa datan.

Projektin käynnistys

###
Asenna paketit:
npm install
Käynnistä back-end:
npm run backend
Käynnistä front-end:
npm run dev

###
Jatkokehitys

Tulevaisuudessa haluan:
yhdistää projektin MySQL-tietokantaan
parantaa virheilmoituksia
julkaista projektin verkkoon