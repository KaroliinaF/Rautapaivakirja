// -------------------------------------
// Rautapäiväkirja - Sivuston toiminnot
// -------------------------------------

console.log("Skripti ladattu onnistuneesti!");

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
    const loginLink = document.querySelector("a[href='./kirjaudu.html']");

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
    const suojatut = ["omat_treenit.html", "luo_uusi_treeni.html", "omat_sivut.html"];
    const sivu = window.location.pathname.split("/").pop();

    if (suojatut.includes(sivu) && !onKirjautunut()) {
        alert("Sinun täytyy kirjautua ensin!");
        window.location.href = "./kirjaudu.html";
    }
}

// -------------------------------
//  TREENIT
// -------------------------------

if (!localStorage.getItem("treenit")) {
    localStorage.setItem("treenit", JSON.stringify([]));
}

function haeTreenit() {
    return JSON.parse(localStorage.getItem("treenit"));
}

function tallennaTreenit(lista) {
    localStorage.setItem("treenit", JSON.stringify(lista));
}

function lisaaTreeni(liike, painot, sarjat) {
    const treenit = haeTreenit();
    treenit.push({
        id: Date.now(),
        liike, painot, sarjat
    });
    tallennaTreenit(treenit);
}

function poistaTreeni(id) {
    let treenit = haeTreenit();
    treenit = treenit.filter(t => t.id !== id);
    tallennaTreenit(treenit);

    naytaLuodutTreenit();
    naytaTreenit();
    naytaOmatSivut();
}

function tyhjennaKaikkiTreenit() {
    const vahvistus = confirm("Haluatko varmasti poistaa kaikki treenit?");

    if (!vahvistus) return;

    localStorage.setItem("treenit", JSON.stringify([]));

    naytaLuodutTreenit();
    naytaTreenit();
    naytaOmatSivut();
}

// -------------------------------
//  TREENIEN NÄYTÖT
// -------------------------------

function naytaLuodutTreenit() {
    const div = document.getElementById("luodut_treenit");
    if (!div) return;

    div.innerHTML = "";
    const treenit = haeTreenit();

    treenit.forEach(t => {
        const kortti = document.createElement("div");
        kortti.classList.add("treeni");

        kortti.innerHTML = `
            <p><strong>${t.liike}</strong> — ${t.painot} kg — ${t.sarjat} sarjaa</p>
            <button class="poista" onclick="poistaTreeni(${t.id})">Poista</button>
        `;

        div.appendChild(kortti);
    });
}

function naytaTreenit() {
    const div = document.getElementById("inputtia_painot");
    if (!div) return;

    div.innerHTML = "";
    const treenit = haeTreenit();

    treenit.forEach(t => {
        const kortti = document.createElement("div");
        kortti.classList.add("treeni");

        kortti.innerHTML = `
            <p><strong>${t.liike}</strong> — ${t.painot} kg — ${t.sarjat} sarjaa</p>
            <button class="poista" onclick="poistaTreeni(${t.id})">Poista</button>
        `;

        div.appendChild(kortti);
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

    if (!emailSpan) return;

    emailSpan.textContent = localStorage.getItem("kayttaja_email") || "Tuntematon käyttäjä";

    const treenit = haeTreenit();
    maaraSpan.textContent = treenit.length;

    viimeisetDiv.innerHTML = "";
    treenit.slice(-3).reverse().forEach(t => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${t.liike}</strong> — ${t.painot} kg — ${t.sarjat} sarjaa`;
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

    naytaLuodutTreenit();
    naytaTreenit();
    naytaOmatSivut();

    const kirjLomake = document.getElementById("kirjautumislomake");
    const virhe = document.getElementById("virheilmoitus");

    if (kirjLomake) {
        kirjLomake.addEventListener("submit", e => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const salasana = document.getElementById("password").value;

            if (email.length < 5 || salasana.length < 8) {
                virhe.textContent = "Tarkista sähköposti ja salasana (vähintään 8 merkkiä).";
                return;
            }

            kirjauduSisaaan(email);
            window.location.href = "./index.html";
        });
    }

    const treeniLomake = document.getElementById("treenilomake");

    if (treeniLomake) {
        treeniLomake.addEventListener("submit", (e) => {
            e.preventDefault();

            lisaaTreeni(
                document.getElementById("liike").value,
                document.getElementById("painot").value,
                document.getElementById("sarjat").value
            );

            treeniLomake.reset();
            naytaLuodutTreenit();
        });
    }
});
