# muhammedturabisancak.dev

Muhammed Turabi Sancak'ın kişisel geliştirici sitesi ve uygulamalarının (ilki Levh) tanıtım, destek ve gizlilik sayfaları.
Kullanıcıyla Türkçe konuş. Kullanıcı HTML/CSS/JS kodunu okuyup denetlemez: ne yaptığını sade Türkçe anlat, sonucu ekran görüntüsüyle göster.

## Önce oku
- `docs/plan.md` — aşamalar ve durum; **nerede kaldığımızı buradan öğren**, iş bitince güncelle.
- `docs/decisions.md` — alınmış kararlar (K-01…). Bir kararı değiştirmeden önce kullanıcıya sor.
- `docs/design.md` — Figma haritası (düğüm kimlikleri), token'lar, bileşen → CSS sınıfı eşlemesi, hareket tanımları.

## Tasarımın tek kaynağı
- Figma dosyası `czHsywqWMyme7d5sNtZ7pK` (muhammedturabisancak.dev). Bir ekranı kodlamadan önce `docs/design.md`'deki düğüm kimliğiyle o çerçeveye Figma MCP ile bak (`get_design_context` / `get_screenshot`). Ölçü, renk, boşluk tahmin edilmez.
- Figma'ya yazma yapılmaz; tasarımda değişiklik gerekiyorsa önce kullanıcıya sor.
- Çelişki sırası: Figma > `docs/design.md` > kod.

## Teknoloji (bağlayıcı)
- Sade HTML + CSS + az JavaScript. **Derleme adımı, framework, npm bağımlılığı yok.** Yayın: GitHub Pages, `main` dalından, özel alan adı `CNAME` dosyasıyla.
- Tek dış kod: `assets/js/vendor/adhan.min.js` (adhan-js, MIT) — depoya kopyalanmış dosya, CDN yok.
- Yazı tipleri sitenin kendi sunucusunda: Inter (metin) ve Unbounded (başlık), `woff2`, `latin` + `latin-ext` (Türkçe harfler için şart). Google Fonts bağlantısı kullanılmaz.
- Yeni bir dış dosya/kütüphane eklemeden önce kullanıcıya sor: ne işe yarar, neden gerekli, alternatifi ne.

## Klasör yapısı
```text
index.html                 ana sayfa (TR)
apps/index.html            uygulamalar
levh/index.html            Levh
levh/privacy/index.html    Levh gizlilik politikası
levh/support/index.html    Levh destek
now/index.html             şu an
now/data.json              şu an verisi (durum + zaman çizelgesi); ana sayfa widget'ı da buradan okur
404.html                   GitHub Pages bulunamadı sayfası
en/…                       yukarıdakilerin İngilizce kopyaları (aynı yollar, /en/ önekiyle)
assets/css/tokens.css      Figma token'ları (CSS değişkenleri) — tek renk/ölçü/süre kaynağı
assets/css/site.css        bileşen ve sayfa stilleri
assets/js/site.js          tema, dil bağlantısı, menü, kopyala, canlı saat/vakit, hareketler, şu an verisi
assets/js/vendor/adhan.min.js
assets/fonts/              Inter, Unbounded
assets/img/                avatar, levh-icon, levh/*.jpg (ekranlar, koyu/açık, 2x)
CNAME                      muhammedturabisancak.dev (dokunma)
```

## Kod kuralları
- Renk, boşluk, köşe, gölge, süre ve eğri **yalnızca `tokens.css`'teki değişkenlerden** (`var(--color-bg)` vb.). Sayfa/bileşen CSS'ine hex, sabit px süre ya da elle eğri yazılmaz. Değişken adları Figma'daki "code syntax" ile aynıdır (`docs/design.md`). İstisna: Figma bileşeninde değişkene bağlı olmayan ölçüler (ör. iç boşluk 13/22, aralık 28) Figma'daki px değeriyle aynen yazılır; tahmin edilmez, yuvarlanmaz.
- Figma'da karşılığı olmayan bir şey (ör. bir bileşenin çizilmemiş hâli) koda yazılmadan önce Figma'da çizilir ve kullanıcı onaylar.
- Tema: `:root` koyu değerler (site koyu öncelikli), açık tema `@media (prefers-color-scheme: light)` + `[data-theme="light"]`, kullanıcı seçimi `[data-theme]` ile; seçim `localStorage`'da (`theme`). Tema düğmesi: Sistem → Koyu → Açık.
- Bileşen = bir CSS sınıfı ailesi (BEM benzeri, ör. `.app-icon`, `.app-icon--glyph`). Eşleme `docs/design.md`'de; yeni bileşen uydurma, önce Figma'da var mı bak.
- Erişilebilirlik: anlamlı HTML (`header/nav/main/section/footer`), her görselde `alt`, odak halkası görünür, kontrast AA, dokunma hedefi ≥ 44 px.
- `prefers-reduced-motion: reduce` açıksa tüm hareketler kapanır, yalnız kısa solma kalır (Motion › ReducedMotion modu).
- Mobil önce düşünülür ama iki ekran çizimi var: Masaüstü 1440, Mobil 390; aradaki genişlikler akışkan. Yatay kaydırma olmaz.
- Metinler: TR sayfa Türkçe, `/en/` sayfa İngilizce; aynı içerik. Her sayfada `<html lang>`, `hreflang` bağlantıları ve dil düğmesi karşı sayfaya gider.
- JS küçük ve okunur; global değişken yok (tek bir IIFE/modül), hata konsola düşmez.

## Çalıştırma ve kontrol
- Yerel sunucu: `python3 -m http.server 8080` (klasörün kökünde) → `http://localhost:8080`. `now/data.json` `fetch` ile okunduğu için dosyayı çift tıklayarak açmak çalışmaz.
- Her sayfa bitince: masaüstü (1440) ve mobil (390), koyu ve açık **ekran görüntüsü al** ve Figma'daki ilgili çerçeveyle yan yana kullanıcıya göster (Claude in Chrome ya da başsız Chrome). Konsolda hata olmamalı, kırık bağlantı olmamalı.
- "Bitti" sayılması için: Figma'yla görsel eşleşme kontrol edildi, iki tema + iki genişlik denendi, konsol temiz, `docs/plan.md` güncellendi.

## Git
- Dal: `feat/turabi/muhammedturabisancak.github.io/<konu>` (deponun adı `muhammedturabisancak.github.io`).
- Commit/push yalnız kullanıcı açıkça söyleyince. **`main`'e birleştirmek = siteyi canlıya çıkarmak**; bunu ayrıca onaylat.
- Her aşama ayrı commit; mesaj Türkçe `feat: …` + ne değişti, hangi sayfalar, nasıl kontrol edildi.
