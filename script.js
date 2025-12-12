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

    logoutBtn.style.display = onKirjautunut() ? "inline-block" : "none";
    loginLink.style.display = onKirjautunut() ? "none" : "inline-block";
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
//  TREENIT
// -------------------------------

function varmistaTreenit() {
    if (!localStorage.getItem("treenit")) {
        localStorage.setItem("treenit", JSON.stringify([]));
    }
}

function haeTreenit() {
    varmistaTreenit();
    return JSON.parse(localStorage.getItem("treenit"));
}

function tallennaTreenit(lista) {
    localStorage.setItem("treenit", JSON.stringify(lista));
}

function tyhjennaKaikkiTreenit() {
    const ok = confirm("Haluatko varmasti poistaa kaikki treenit?");
    if (!ok) return;
    tallennaTreenit([]);
    naytaTreenilista();
    naytaOmatSivut();
}

function luoTreeni(nimi, tyyppi, kehonOsa, harjoitukset) {
    const treenit = haeTreenit();
    treenit.push({
        id: Date.now(),
        nimi,
        tyyppi,
        kehonOsa,
        luotu: Date.now(),
        harjoitukset: harjoitukset.map(h => ({
            liike: h.liike,
            painot: h.painot || "",
            sarjat: h.sarjat || "",
            toistot: ""
        }))
    });
    tallennaTreenit(treenit);
}

function poistaTreeni(id) {
    const uudet = haeTreenit().filter(t => t.id !== id);
    tallennaTreenit(uudet);
    naytaTreenilista();
    naytaOmatSivut();
}

// -------------------------------
//  LUO UUSI TRENI – LUONNOS
// -------------------------------

let luonnosHarjoitukset = [];

function lisaaHarjoitusLuontiin() {
    const liike = document.getElementById("liike").value.trim();
    const painot = document.getElementById("painot").value;
    const sarjat = document.getElementById("sarjat").value;

    if (!liike) {
        alert("Lisää liikkeen nimi.");
        return;
    }

    luonnosHarjoitukset.push({ liike, painot, sarjat });

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
        div.innerHTML += `
            <div class="treeni">
                <p><strong>${h.liike}</strong><br>
                Painot: ${h.painot || "-"} kg — Sarjat: ${h.sarjat || "-"}</p>
                <button class="poista" onclick="poistaLuonnosHarjoitus(${i})">Poista</button>
            </div>
        `;
    });
}

function poistaLuonnosHarjoitus(i) {
    luonnosHarjoitukset.splice(i, 1);
    naytaLuonnosTreeni();
}

// -------------------------------
//  OMAT TREENIT
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
        div.innerHTML += `
            <div class="treeni">
                <p><strong>${t.nimi}</strong><br>${t.tyyppi} — ${t.kehonOsa}</p>
                <div>
                    <button onclick="avaaTreeni(${t.id})">Avaa</button>
                    <button class="poista" onclick="poistaTreeni(${t.id})">Poista</button>
                </div>
            </div>
        `;
    });
}

function avaaTreeni(id) {
    window.location.href = `treeni.html?id=${id}`;
}

// -------------------------------
//  YKSITTÄINEN TREENI
// -------------------------------

function naytaYksittainenTreeni() {
    const div = document.getElementById("treeniHarjoitukset");
    if (!div) return;

    const id = Number(new URLSearchParams(window.location.search).get("id"));
    const treenit = haeTreenit();
    const treeni = treenit.find(t => t.id === id);
    if (!treeni) return;

    document.getElementById("treeniOtsikko").textContent = treeni.nimi;
    document.getElementById("treeniTyyppi").textContent = treeni.tyyppi;
    document.getElementById("treeniKehonOsa").textContent = treeni.kehonOsa;

    treeni.harjoitukset.forEach(h => {
        if (h.painot === undefined) h.painot = "";
        if (h.sarjat === undefined) h.sarjat = "";
        if (h.toistot === undefined) h.toistot = "";
    });
    tallennaTreenit(treenit);

    div.innerHTML = "";

    treeni.harjoitukset.forEach((h, i) => {
        div.innerHTML += `
            <div style="margin-bottom:25px;">
                <h3>${h.liike}</h3>

                <label>Painot (kg)</label><br>
                <input type="number" id="painot_${i}" value="${h.painot}"><br><br>

                <label>Sarjat</label><br>
                <input type="number" id="sarjat_${i}" value="${h.sarjat}"><br><br>

                <label>Toistot</label><br>
                <input type="text" id="toistot_${i}" value="${h.toistot}"><br><br>

                <button onclick="tallennaHarjoitus(${treeni.id}, ${i})">Tallenna muutokset</button>
                <hr>
            </div>
        `;
    });
}

function tallennaHarjoitus(treeniId, index) {
    const treenit = haeTreenit();
    const treeni = treenit.find(t => t.id === treeniId);
    if (!treeni) return;

    treeni.harjoitukset[index].painot = document.getElementById(`painot_${index}`).value;
    treeni.harjoitukset[index].sarjat = document.getElementById(`sarjat_${index}`).value;
    treeni.harjoitukset[index].toistot = document.getElementById(`toistot_${index}`).value;

    tallennaTreenit(treenit);
    alert("Muutokset tallennettu!");
}

// -------------------------------
//  OMAT SIVUT
// -------------------------------

function naytaOmatSivut() {
    const email = document.getElementById("kayttajaEmail");
    const maara = document.getElementById("treeniMaara");
    const lista = document.getElementById("viimeisetTreenit");
    const tyhjennaBtn = document.getElementById("tyhjennaKaikki");

    if (!email || !maara || !lista || !tyhjennaBtn) return;

    email.textContent = localStorage.getItem("kayttaja_email") || "-";

    const treenit = haeTreenit();
    maara.textContent = treenit.length;

    lista.innerHTML = "";
    treenit.slice(-3).reverse().forEach(t => {
        lista.innerHTML += `<p>${t.nimi}</p>`;
    });

    tyhjennaBtn.onclick = tyhjennaKaikkiTreenit;
}

// -------------------------------
//  DOM READY
// -------------------------------

document.addEventListener("DOMContentLoaded", () => {
    paivitaNavigaatio();
    tarkistaKirjautuminen();
    naytaTreenilista();
    naytaYksittainenTreeni();
    naytaOmatSivut();

    // LOGIN
    const kirjLomake = document.getElementById("kirjautumislomake");
    if (kirjLomake) {
        kirjLomake.addEventListener("submit", e => {
            e.preventDefault();
            const email = document.getElementById("email").value.trim();
            const pass = document.getElementById("password").value;
            if (email && pass.length >= 8) {
                kirjauduSisaaan(email);
                window.location.href = "./index.html";
            }
        });
    }

    // UUSI TRENI
    const uusiTreeniLomake = document.getElementById("uusiTreeniLomake");
    if (uusiTreeniLomake) {
        naytaLuonnosTreeni();
        uusiTreeniLomake.addEventListener("submit", e => {
            e.preventDefault();

            const nimi = document.getElementById("treeninNimi").value.trim();
            const tyyppi = document.getElementById("treeninTyyppi").value;
            const kehonOsa = document.getElementById("kehonOsa").value;
            const viesti = document.getElementById("uusiTreeniViesti");

            if (!nimi || !tyyppi || !kehonOsa || luonnosHarjoitukset.length === 0) {
                viesti.textContent = "Täytä kaikki tiedot ja lisää vähintään yksi liike.";
                return;
            }

            luoTreeni(nimi, tyyppi, kehonOsa, luonnosHarjoitukset);
            luonnosHarjoitukset = [];
            uusiTreeniLomake.reset();
            naytaLuonnosTreeni();
            viesti.textContent = "Treeni tallennettu onnistuneesti.";
        });
    }
});
