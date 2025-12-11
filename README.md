# Rautapäiväkirja

Rautapäiväkirja on yksinkertainen verkkosovellus, jonka tarkoituksena on auttaa käyttäjää seuraamaan ja hallitsemaan omia treenejään. Sovelluksella voi luoda uusia treenejä, tarkastella jo tallennettuja treenejä, poistaa treenejä sekä selata käyttäjään liittyviä tietoja. Sovellus käyttää HTML-, CSS- ja JavaScript-teknologioita, ja kaikki tieto tallennetaan selaimen localStorageen.

## Projektin tarkoitus

Tämä projekti on toteutettu opiskelutarkoituksessa. Tavoitteena on harjoitella verkkosovelluksen suunnittelua ja toteutusta, mukaan lukien:
- sivurakenteen luominen
- navigaation suunnittelu
- responsiivisen ulkoasun tekeminen
- lomakkeiden käsittely JavaScriptillä
- localStoragen hyödyntäminen datan tallentamiseen
- yksinkertainen kirjautumislogiikka
- sovelluksen kokonaisuuden hallinta

## Ominaisuudet

### Kirjautuminen
- Käyttäjä voi kirjautua sisään sähköpostilla ja salasanalla.
- Kirjautuminen on toteutettu localStoragen avulla (ei oikeaa autentikointia).
- Kirjautumisen jälkeen käyttäjä voi käyttää kaikkia sivuja.

### Etusivu
- Esittelyteksti sovelluksesta.
- Pikanapit omiin treeneihin ja uuden treenin luontiin.

### Uuden treenin luonti
- Käyttäjä voi lisätä treenin nimen, painot ja sarjat.
- Treeni tallennetaan localStorageen.
- Tallennetut treenit näkyvät samalla sivulla listassa.

### Omat treenit
- Listaus kaikista treeneistä.
- Mahdollisuus poistaa yksittäisiä treenejä.

### Omat sivut
- Näyttää kirjautuneen käyttäjän sähköpostin.
- Näyttää tallennettujen treenien kokonaismäärän.
- Näyttää kolme viimeksi lisättyä treeniä.
- Mahdollisuus tyhjentää kaikki tallennetut treenit.

## Käytetyt teknologiat

- HTML5 sivurakenteeseen
- CSS3 ulkoasun ja responsiivisuuden toteutukseen
- JavaScript toiminnallisuuteen
- localStorage datan tallentamiseen selaimessa

## Projektin kansiorakenne

Rautapaivakirja/
├── index.html              Etusivu
├── kirjaudu.html           Kirjautumissivu
├── omat_treenit.html       Omat treenit
├── luo_uusi_treeni.html    Uuden treenin luonti
├── omat_sivut.html         Omat sivut
├── style.css               Ulkoasun tyylitiedosto
├── script.js               Sivuston JavaScript-toiminnot
└── rautapaivakirja.png     Sivuston logo

## Asennus ja käyttö

1. Lataa tai kloonaa projekti GitHubista:
   git clone https://github.com/USER/Rautapaivakirja.git

2. Siirry projektikansioon:
   cd Rautapaivakirja

3. Avaa sovellus selaimessa:
   index.html

Sovellus toimii täysin ilman palvelinta, koska kaikki tieto tallennetaan selaimen localStorageen.

## Tunnetut rajoitukset

- Ei oikeaa käyttäjähallintaa tai tietoturvaa.
- localStorage tyhjenee, jos käyttäjä poistaa selainhistorian.
- Ei sisällä backend-palvelua tai tietokantaa.
- Ei tue monen käyttäjän käyttöä samassa selaimessa.

## Jatkokehitysideoita

- Oikea kirjautuminen ja tietokantatuki.
- Treenien muokkaus.
- Treenien tilastointi ja graafiset esitykset.
- Dark mode -tuki.
- Parempi virheenkäsittely ja validointi.

## Tekijä
- Karoliina Emilia Fernandes
- Tämä projekti on tehty opiskelutarkoituksessa harjoituksena verkkosovellusten kehittämiseen.
