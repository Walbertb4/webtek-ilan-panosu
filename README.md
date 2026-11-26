# Staj ve İş İlanı Panosu

- **Geliştirici:** Batu Ergül
- **Canlı Site (GitHub Pages):** https://walbertb4.github.io/webtek-ilan-panosu/

ISE-201 Web Teknolojileri dönem ödevi kapsamında geliştirilen, sunucu tarafı olmadan yalnızca HTML, CSS ve JavaScript (ES modülleri) ile çalışan staj ve iş ilanı panosudur.

## Adımlar

- **Adım 0 — Depo ve yayın:** `webtek-ilan-panosu` adlı herkese açık GitHub deposunu oluşturup yalnızca başlık içeren ilk `index.html` dosyasıyla GitHub Pages üzerinde yayına aldım.
- **Adım 1 — Anlamsal iskelet:** `header`, `nav`, `main`, iki `section` ve `footer` öğeleriyle anlamsal HTML5 yapısını kurdum; ilanlar bölümüne `#durum` ve `#ilanlar` öğelerini ekledim.
- **Adım 2 — Başvuru formu:** `#basvuru` formunu HTML5 doğrulama öznitelikleriyle (`required`, `type="email"`, `type="url"`, `pattern` ve `title`) hazırladım; `form.js` ile gönderimde sayfa yenilenmeden `#basvuru-ileti` üzerinden bildirim gösterip formu sıfırladım.
- **Adım 3 — Tema:** `stil.css` içinde `:root` üzerinde özel ton değerimi (`--ton: 11`) tanımlayıp ana renk ve yardımcı değişkenleri bu tondan ürettim.
- **Adım 4 — Duyarlı ilan ızgarası:** `#ilanlar` için `repeat(auto-fit, minmax(min(100%, 280px), 1fr))` kuralıyla dar ekranda tek sütun, geniş ekranda çok sütunlu kırılan ızgara yapısı ekledim.
- **Adım 5 — İlanları veriden üretmek:** `ilanlar.json` dosyasına 9 ve 10 numaralı iki hayali ilan ekledim; `app.js` içinde HTTP hata kontrolünü (`!yanit.ok`) ve `await yanit.json()` okumasını tamamladım.
- **Adım 6 — Süzgeç ve arama:** `#alan` seçim kutusu ve `#arama` metin kutusunu ekleyip pozisyon ve firma adında Türkçe büyük/küçük harf duyarsız, birlikte çalışan süzme mantığını yazdım.
- **Adım 7 — Başvuracaklarım:** Her karta `.basvur` düğmesi, başlık yanına `#liste-sayisi` sayacı ekledim; olay delegasyonu ve `localStorage` (`basvuracaklarim` anahtarı) ile kalıcı liste oluşturdum. Sonrasında düğme tıklamasında odak kaybını önlemek için yalnızca tıklanan düğmeyi güncelleyecek şekilde iyileştirdim ve geçersiz kayıtlı id'leri veri yüklendikten sonra temizledim.
- **Adım 8 — Modüllere bölmek:** Veri çekme işini `veri.js` içine (`export async function ilanlariGetir`) taşıdım, `app.js` içinde `import` ettim ve `index.html`'de `<script type="module" src="app.js"></script>` kullandım.

## Yapay Zekâ Kullanımı

Geliştirme sürecinde kod yazımı, erişilebilirlik/odak iyileştirmeleri ve adım adım kontrol aşamalarında yapay zekâ asistanından destek aldım; üretilen her adımı ve kuralı gözden geçirip canlı sitede doğruladım.
