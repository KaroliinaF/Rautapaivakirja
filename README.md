# Rautapäiväkirja

Rautapäiväkirja on selainpohjainen verkkosovellus, jonka tarkoituksena on auttaa käyttäjää luomaan, tarkastelemaan ja hallitsemaan omia treenejään. Sovelluksessa käyttäjä voi kirjautua sisään, luoda uusia treenejä, muokata harjoitusten tietoja sekä tarkastella omia käyttäjätietojaan. Kaikki tieto tallennetaan selaimen localStorageen, eikä sovellus vaadi erillistä palvelinta.

## Projektin tarkoitus

Tämä projekti on toteutettu opiskelutarkoituksessa. Tavoitteena on ollut harjoitella ja osoittaa osaamista seuraavilla osa-alueilla:

- verkkosovelluksen rakenteen suunnittelu
- selkeä ja looginen navigaatio
- responsiivinen käyttöliittymä
- lomakkeiden käsittely JavaScriptillä
- localStoragen käyttö tiedon tallentamiseen ja hakemiseen
- yksinkertainen kirjautumislogiikka
- CRUD-toiminnot (Create, Read, Update, Delete)
- sovelluksen kehittäminen ja refaktorointi vaiheittain

## Sovelluksen ominaisuudet

### Kirjautuminen
- Käyttäjä kirjautuu sisään sähköpostilla ja salasanalla.
- Kirjautuminen toteutetaan localStoragen avulla (ei oikeaa autentikointia).
- Kirjautumisen jälkeen käyttäjä pääsee käsiksi kaikkiin suojattuihin sivuihin.
- Kirjautumattomalta käyttäjältä estetään pääsy suojatuille sivuille.

### Etusivu
- Lyhyt esittely sovelluksesta.
- Pikanapit omien treenien tarkasteluun ja uuden treenin luontiin.

### Uuden treenin luonti
- Käyttäjä voi luoda uuden treenin määrittelemällä:
  - treenin nimen
  - treenin tyypin
  - kehon osan
- Treeniin voidaan lisätä useita harjoituksia.
- Jokaiselle harjoitukselle määritellään:
  - liike
  - painot
  - sarjat
- Harjoitukset näkyvät luonnoksena ennen treenin tallentamista.
- Yksittäisiä harjoituksia voi poistaa ennen tallennusta.
- Tallennuksen jälkeen treeni siirtyy omien treenien listaan.

### Omat treenit
- Listaa kaikki käyttäjän tallentamat treenit.
- Jokaisesta treenistä näkyy nimi, tyyppi ja kehon osa.
- Käyttäjä voi:
  - avata treenin
  - poistaa treenin

### Yksittäisen treenin tarkastelu ja muokkaus
- Treenin tiedot näytetään omalla sivullaan.
- Jokaisen harjoituksen tietoja voidaan muokata:
  - painot
  - sarjat
  - toistot
- Muutokset tallennetaan erikseen painikkeella.
- Sovellus huolehtii siitä, että myös vanhat treenit päivitetään automaattisesti uuteen tietorakenteeseen.

### Omat sivut
- Näyttää kirjautuneen käyttäjän sähköpostiosoitteen.
- Näyttää tallennettujen treenien kokonaismäärän.
- Näyttää kolme viimeksi lisättyä treeniä.
- Mahdollisuus tyhjentää kaikki tallennetut treenit yhdellä painikkeella.

## Käytetyt teknologiat

- HTML5 – sivurakenne
- CSS3 – ulkoasu ja responsiivisuus
- JavaScript – sovelluksen toiminnallisuus
- localStorage – tietojen tallennus selaimessa

## Projektin kansiorakenne

Rautapaivakirja/
├── index.html              Etusivu  
├── kirjaudu.html           Kirjautumissivu  
├── omat_treenit.html       Omat treenit  
├── luo_uusi_treeni.html    Uuden treenin luonti  
├── treeni.html             Yksittäisen treenin tarkastelu  
├── omat_sivut.html         Omat sivut  
├── style.css               Ulkoasun tyylitiedosto  
├── script.js               Sivuston JavaScript-toiminnot  
└── rautapaivakirja.png     Sivuston logo  

## Asennus ja käyttö

1. Kloonaa tai lataa projekti:
git clone https://github.com/USER/Rautapaivakirja.git

2. Siirry projektikansioon:
cd Rautapaivakirja

3. Avaa sovellus selaimessa:
index.html

Sovellus toimii täysin selaimessa eikä vaadi palvelinta tai tietokantaa.

## Tunnetut rajoitukset

- Ei oikeaa käyttäjähallintaa tai tietoturvaa.
- localStorage tyhjenee, jos käyttäjä poistaa selaimen tiedot.
- Ei tue useita käyttäjiä samanaikaisesti.
- Ei sisällä harjoitushistoriaa tai tilastointia.

## Mahdolliset jatkokehitysideat

- Treenikertojen (historia) tallentaminen.
- Treenien kuormituksen ja kehityksen seuranta.
- Graafiset tilastot ja raportit.
- Dark mode -tuki.
- Oikea autentikointi ja tietokantayhteys.
- Parempi virheenkäsittely ja validointi.

## Tekijä

Karoliina Emilia Fernandes

Tämä projekti on toteutettu opiskelutarkoituksessa osana verkkosovellusten kehittämisen harjoitusta.
