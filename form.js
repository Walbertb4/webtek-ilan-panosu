// form.js: Başvuru formunun gönderimini yakalar, sayfa yenilenmeden bildirim verir.
const basvuruFormu = document.querySelector("#basvuru");
const basvuruIleti = document.querySelector("#basvuru-ileti");

basvuruFormu.addEventListener("submit", (olay) => {
  olay.preventDefault();
  basvuruIleti.textContent = "Başvurunuz alındı.";
  basvuruFormu.reset();
});
