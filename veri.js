// veri.js: ilanları getirir. Sayfayla ilgili hiçbir şey bilmez.
export async function ilanlariGetir(adres) {
  const yanit = await fetch(adres);
  if (!yanit.ok) throw new Error(`HTTP ${yanit.status}`);
  return await yanit.json();
}
