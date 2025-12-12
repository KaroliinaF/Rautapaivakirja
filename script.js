// -------------------------------------
// Rautapäiväkirja - Sivuston toiminnot
// -------------------------------------

// -------------------------------
//  KIRJAUTUMINEN
// -------------------------------

function onKirjautunut() {
    return localStorage.getItem("kirjautunut") === "true";
}

function kirjauduSisaaan(email) {
    localStorage.setItem("kirjautunut", "true");
    localStorage.setItem("kayttaja_email", email);
}

function kirjauduUlos() {
    localStorage.removeItem("kirjautunut");
    localStorage.removeItem("kayttaja_email");
    window.location.href = "./kirjaudu.html";
}

function paivitaNavigaatio() {
    const logoutBtn = document.getElementById("logoutBtn");
    const loginLink = document.getElementById("loginLink");

    if (!logoutBtn || !loginLink) return;

    if (onKirjautunut()) {
        logoutBtn.style.display = "inline-block";
        loginLink.style.display = "none";
    } else {
        logoutBtn.style.display = "none";
        loginLink.style.display = "inline-block";
    }
}

function tarkistaKirjautuminen() {
    const suojatut = ["omat_treenit.html", "luo_uusi_treeni.html", "omat_sivut.html", "treeni.html"];
    const sivu = window.location.pathname.split("/").pop();

    if (suojatut.includes(sivu) && !onKirjautunut()) {
        alert("Sinun täytyy kirjautua ensin!");
        window.location.href = "./kirjaudu.html";
    }
}

// -------------------------------
//  TREENIT (UUSI RAKENNE)
// -------------------------------

function varmistaTreenit() {
    if (!localStorage.getItem("treenit")) {
        localStorage.setItem("treenit", JSON.stringify([]));
    }
}

function haeTreenit() {
    varmistaTreenit();
    return JSON.parse(localStorage.getItem("treenit")) || [];
}

function tallennaTreenit(lista) {
    localStorage.setItem("treenit", JSON.stringify(lista));
}

// MIGRAATIO: vanha muoto {liike,painot,sarjat} -> uusi muoto treeni + harjoitukset[]
function migroiVanhatTreenitJosTarpeen() {
    const lista = haeTreenit();
    if (lista.length === 0) return;

    // Jos listan ensimmäinen alkio sisältää "harjoitukset", oletetaan uusi malli
    if (typeof lista[0] === "object" && Array.isArray(lista[0].harjoitukset)) return;

    // Muuten oletetaan vanha malli (lista harjoituksia) -> muutetaan jokainen omaksi treeniksi
    const uudet = lista.map(vanha => {
        return {
            id: vanha.id || Date.now() + Math.floor(Math.random() * 1000),
            nimi: vanha.liike ? vanha.liike : "Vanha treeni",
            tyyppi: "Määrittämätön",
            kehonOsa: "Määrittämätön",
            luotu: Date.now(),
            harjoitukset: [{
                liike: vanha.liike || "Liike",
                painot: vanha.painot || "",
                sarjat: vanha.sarjat || ""
            }]
        };
    });

    tallennaTreenit(uudet);
}

function luoTreeni(nimi, tyyppi, kehonOsa, harjoitukset) {
    const treenit = haeTreenit();
    treenit.push({
        id: Date.now(),
        nimi,
        tyyppi,
        kehonOsa,
        luotu: Date.now(),
        harjoitukset
    });
    tallennaTreenit(treenit);
}

function poistaTreeni(id) {
    let treenit = haeTreenit();
    treenit = treenit.filter(t => t.id !== id);
    tallennaTreenit(treenit);

    naytaTreenilista();
    naytaOmatSivut();
}

function tyhjennaKaikkiTreenit() {
    const vahvistus = confirm("Haluatko varmasti poistaa kaikki treenit?");
    if (!vahvistus) return;

    tallennaTreenit([]);
    naytaTreenilista();
    naytaOmatSivut();
}

// -------------------------------
//  LUO UUSI TRENI - LUONNOS
// -------------------------------

let luonnosHarjoitukset = [];

function lisaaHarjoitusLuontiin() {
    const liike = document.getElementById("liike")?.value?.trim();
    const painot = document.getElementById("painot")?.value;
    const sarjat = document.getElementById("sarjat")?.value;

    if (!liike) {
        alert("Lisää liikkeen nimi.");
        return;
    }

    luonnosHarjoitukset.push({
        liike,
        painot: painot ? String(painot) : "",
        sarjat: sarjat ? String(sarjat) : ""
    });

    document.getElementById("liike").value = "";
    document.getElementById("painot").value = "";
    document.getElementById("sarjat").value = "";

    naytaLuonnosTreeni();
}

function naytaLuonnosTreeni() {
    const div = document.getElementById("luonnosTreenista");
    if (!div) return;

    div.innerHTML = "";
    if (luonnosHarjoitukset.length === 0) {
        div.innerHTML = "<p>Et ole lisännyt vielä yhtään liikettä.</p>";
        return;
    }

    luonnosHarjoitukset.forEach((h, i) => {
        const kortti = document.createElement("div");
        kortti.className = "treeni";
        kortti.innerHTML = `
            <p><strong>${h.liike}</strong> — ${h.painot ? h.painot + " kg" : "ei painoja"} — ${h.sarjat ? h.sarjat + " sarjaa" : "ei sarjoja"}</p>
            <button class="poista" type="button" onclick="poistaLuonnosHarjoitus(${i})">Poista</button>
        `;
        div.appendChild(kortti);
    });
}

function poistaLuonnosHarjoitus(indeksi) {
    luonnosHarjoitukset.splice(indeksi, 1);
    naytaLuonnosTreeni();
}

// -------------------------------
//  OMAT TREENIT - LISTAUS
// -------------------------------

function naytaTreenilista() {
    const div = document.getElementById("treeniLista");
    if (!div) return;

    const treenit = haeTreenit();
    div.innerHTML = "";

    if (treenit.length === 0) {
        div.innerHTML = "<p>Ei vielä tallennettuja treenejä.</p>";
        return;
    }

    treenit.forEach(t => {
        const kortti = document.createElement("div");
        kortti.className = "treeni";
        kortti.innerHTML = `
            <p>
                <strong>${t.nimi}</strong><br>
                <span>${t.tyyppi} — ${t.kehonOsa}</span>
            </p>
            <div>
                <button type="button" onclick="avaaTreeni(${t.id})">Avaa</button>
                <button class="poista" type="button" onclick="poistaTreeni(${t.id})">Poista</button>
            </div>
        `;
        div.appendChild(kortti);
    });
}

function avaaTreeni(id) {
    window.location.href = `./treeni.html?id=${id}`;
}

// -------------------------------
//  TREENI-SIVU (yksittäinen treeni)
// -------------------------------

function naytaYksittainenTreeni() {
    const otsikko = document.getElementById("treeniOtsikko");
    const tyyppiSpan = document.getElementById("treeniTyyppi");
    const kehonSpan = document.getElementById("treeniKehonOsa");
    const harjoitusDiv = document.getElementById("treeniHarjoitukset");

    if (!otsikko || !tyyppiSpan || !kehonSpan || !harjoitusDiv) return;

    const url = new URL(window.location.href);
    const id = Number(url.searchParams.get("id"));

    const treenit = haeTreenit();
    const treeni = treenit.find(t => t.id === id);

    if (!treeni) {
        otsikko.textContent = "Treeniä ei löytynyt";
        return;
    }

    otsikko.textContent = treeni.nimi;
    tyyppiSpan.textContent = treeni.tyyppi;
    kehonSpan.textContent = treeni.kehonOsa;

    harjoitusDiv.innerHTML = "";
    treeni.harjoitukset.forEach((h, idx) => {
        const rivi = document.createElement("div");
        rivi.style.marginBottom = "18px";
        rivi.innerHTML = `
            <p><strong>${h.liike}</strong>: Painot ${h.painot ? h.painot : "-"} kg, Sarjat ${h.sarjat ? h.sarjat : "-"}</p>
            <label for="toistot_${idx}">Toistot treenin aikana:</label>
            <input type="text" id="toistot_${idx}" placeholder="Toistot per sarja..." />
        `;
        harjoitusDiv.appendChild(rivi);
    });
}

// -------------------------------
//  OMAT SIVUT
// -------------------------------

function naytaOmatSivut() {
    const emailSpan = document.getElementById("kayttajaEmail");
    const maaraSpan = document.getElementById("treeniMaara");
    const viimeisetDiv = document.getElementById("viimeisetTreenit");
    const tyhjennaBtn = document.getElementById("tyhjennaKaikki");

    if (!emailSpan || !maaraSpan || !viimeisetDiv || !tyhjennaBtn) return;

    emailSpan.textContent = localStorage.getItem("kayttaja_email") || "Tuntematon käyttäjä";

    const treenit = haeTreenit();
    maaraSpan.textContent = treenit.length;

    viimeisetDiv.innerHTML = "";
    treenit.slice(-3).reverse().forEach(t => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${t.nimi}</strong> — ${t.tyyppi} — ${t.kehonOsa}`;
        viimeisetDiv.appendChild(p);
    });

    tyhjennaBtn.onclick = tyhjennaKaikkiTreenit;
}

// -------------------------------
//  DOM READY
// -------------------------------

document.addEventListener("DOMContentLoaded", () => {
    paivitaNavigaatio();
    tarkistaKirjautuminen();

    migroiVanhatTreenitJosTarpeen();

    // Kirjautumislomake
    const kirjLomake = document.getElementById("kirjautumislomake");
    const virhe = document.getElementById("virheilmoitus");

    if (kirjLomake) {
        kirjLomake.addEventListener("submit", e => {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const salasana = document.getElementById("password").value;

            if (email.length < 5 || salasana.length < 8) {
                if (virhe) virhe.textContent = "Tarkista sähköposti ja salasana (vähintään 8 merkkiä).";
                return;
            }

            kirjauduSisaaan(email);
            window.location.href = "./index.html";
        });
    }

    // Uusi treeni - lomake
    const uusiTreeniLomake = document.getElementById("uusiTreeniLomake");
    if (uusiTreeniLomake) {
        naytaLuonnosTreeni();

        uusiTreeniLomake.addEventListener("submit", (e) => {
            e.preventDefault();

            const nimi = document.getElementById("treeninNimi").value.trim();
            const tyyppi = document.getElementById("treeninTyyppi").value;
            const kehonOsa = document.getElementById("kehonOsa").value;
            const viesti = document.getElementById("uusiTreeniViesti");

            if (!nimi || !tyyppi || !kehonOsa) {
                if (viesti) viesti.textContent = "Täytä treenin nimi, tyyppi ja kehon osa.";
                return;
            }
            if (luonnosHarjoitukset.length === 0) {
                if (viesti) viesti.textContent = "Lisää vähintään yksi liike.";
                return;
            }

            luoTreeni(nimi, tyyppi, kehonOsa, luonnosHarjoitukset);

            luonnosHarjoitukset = [];
            naytaLuonnosTreeni();

            uusiTreeniLomake.reset();
            if (viesti) viesti.textContent = "Treeni tallennettu onnistuneesti.";
        });
    }

    // Lista ja sivut
    naytaTreenilista();
    naytaOmatSivut();
    naytaYksittainenTreeni();
});
