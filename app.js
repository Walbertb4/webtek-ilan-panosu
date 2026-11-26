// app.js: ilanlar.json dosyasını okur ve ilanları kart olarak sayfaya basar.
// Sayfayı Live Server ile açın. file:// ile açılan sayfada fetch çalışmaz.

const ADRES = "ilanlar.json";
const LISTE_ANAHTAR = "basvuracaklarim";
const $ = (secici) => document.querySelector(secici);

const ALAN_ADI = { "on-yuz": "Ön yüz", "arka-uc": "Arka uç", veri: "Veri", sistem: "Sistem" };

let ilanlar = [];
let basvuracaklarim = listeOku();

function listeOku() {
  try {
    const kayit = JSON.parse(localStorage.getItem(LISTE_ANAHTAR));
    return Array.isArray(kayit) ? kayit.map(Number).filter(Number.isFinite) : [];
  } catch {
    return [];
  }
}

function listeKaydet() {
  localStorage.setItem(LISTE_ANAHTAR, JSON.stringify(basvuracaklarim));
}

function sayaciGuncelle() {
  $("#liste-sayisi").textContent = `Başvuracaklarım: ${basvuracaklarim.length}`;
}

// Dört durum tek yerden yönetilir: yukleniyor, bos, hata, veri.
function durum(tur, mesaj) {
  $("#durum").dataset.durum = tur;
  $("#durum").textContent = mesaj;
}

// Bir ilan nesnesinden bir kart (<li>) üretir.
function kart(ilan) {
  const li = document.createElement("li");
  li.className = "kart";
  li.dataset.id = ilan.id;

  const baslik = document.createElement("h3");
  baslik.textContent = ilan.pozisyon;

  const firma = document.createElement("p");
  firma.textContent = `${ilan.firma} · ${ilan.sehir}`;

  const bilgi = document.createElement("p");
  bilgi.textContent = `${ALAN_ADI[ilan.alan] ?? ilan.alan} · ` +
    `${ilan.tur === "staj" ? "Staj" : "İş"} · son başvuru ${ilan.sonBasvuru}`;

  const aciklama = document.createElement("p");
  aciklama.textContent = ilan.aciklama;

  const listede = basvuracaklarim.includes(ilan.id);
  const dugme = document.createElement("button");
  dugme.type = "button";
  dugme.className = "basvur";
  dugme.textContent = listede ? "Listemden çıkar" : "Listeme ekle";
  dugme.setAttribute("aria-pressed", String(listede));

  li.append(baslik, firma, bilgi, aciklama, dugme);
  return li;
}

// Verilen listeyi #ilanlar içine çizer ve durumu günceller.
function ciz(liste) {
  $("#ilanlar").replaceChildren(...liste.map(kart));
  if (liste.length === 0) durum("bos", "Gösterilecek ilan yok.");
  else durum("veri", `${liste.length} ilan`);
}

// Seçili alan ve arama metnine göre ilanları süzer.
function suz() {
  const seciliAlan = $("#alan").value;
  const aranan = $("#arama").value.trim().toLocaleLowerCase("tr");

  const sonuc = ilanlar.filter((ilan) => {
    const alanUygun = !seciliAlan || ilan.alan === seciliAlan;
    const metinUygun =
      !aranan ||
      ilan.pozisyon.toLocaleLowerCase("tr").includes(aranan) ||
      ilan.firma.toLocaleLowerCase("tr").includes(aranan);
    return alanUygun && metinUygun;
  });

  ciz(sonuc);
}

async function baslat() {
  durum("yukleniyor", "İlanlar yükleniyor…");
  try {
    const yanit = await fetch(ADRES);

    if (!yanit.ok) throw new Error(`HTTP ${yanit.status}`);

    ilanlar = await yanit.json();

    suz();
  } catch (hata) {
    durum("hata", "İlanlar yüklenemedi: " + hata.message);
  }
}

$("#alan").addEventListener("change", suz);
$("#arama").addEventListener("input", suz);

// Olay delegasyonu: tek dinleyiciyle tüm .basvur düğmelerini yönetir.
$("#ilanlar").addEventListener("click", (olay) => {
  const dugme = olay.target.closest(".basvur");
  if (!dugme) return;

  const id = Number(dugme.closest(".kart").dataset.id);
  if (basvuracaklarim.includes(id)) {
    basvuracaklarim = basvuracaklarim.filter((kayitId) => kayitId !== id);
  } else {
    basvuracaklarim.push(id);
  }

  listeKaydet();
  sayaciGuncelle();
  suz();
});

sayaciGuncelle();
baslat();
