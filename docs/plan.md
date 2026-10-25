# Plan ve durum

Her oturumun başında bu dosyayı oku; iş bitince **Durum** tablosunu ve "Son oturum" notunu güncelle.
Bir oturumda en fazla 1–2 aşama yap. Her aşama sonunda: ekran görüntüleriyle Figma karşılaştırması → kullanıcı onayı → commit (kullanıcı söyleyince).

## Durum
| Aşama | İş | Durum |
|---|---|---|
| 0 | Depoyu bu klasöre bağla, dal aç, eski dosyaları kaldır | bitti (PR #2, main'de) |
| 1 | Temel: `tokens.css`, yazı tipleri, `site.css` iskeleti, tema düğmesi | bitti (PR #3, main'de) |
| 2 | Ortak bileşenler — 2a: Nav, Footer, Button, Chip, Avatar, AppIcon, SectionHeader · 2b: Dock, Widget'lar, HomeScreen, Phone, Tile'lar | bitti (PR #4, #5, #6, #7; main'de) |
| 3 | S01 Ana sayfa (TR) | bitti (commit atıldı; `main`'e toplu çıkışta, K-26) |
| 4 | S02 Uygulamalar (TR) | bitti (commit atıldı) |
| 5 | S03 Levh (TR) | bitti (commit atıldı; ekranlar 1x, 2x bekleniyor) |
| 6 | S04 Şu an (TR) + `now/data.json` | bitti (commit atıldı) |
| 7 | S05 Gizlilik, S06 Destek, S07 404 (TR) | bitti (commit atıldı; gizlilik metni kullanıcı onayı bekliyor) |
| 8 | İngilizce sayfalar `/en/…` | bitti (commit atıldı) |
| 9 | Hareketler (K-15) + canlı saat/vakit (adhan-js) | bitti (commit atıldı, c9b9ce3) |
| 10 | Son kontrol: erişilebilirlik, performans, meta/OG, `hreflang`, kırık bağlantı; kullanıcıyla canlıya çıkış | kontroller bitti (c9b9ce3); 25 Ekim düzeltmeleri ve favicon commit bekliyor; kalan: canlıya çıkış |

Son oturum: 25 Ekim 2026 — kullanıcı onaylarıyla düzeltmeler (commit bekliyor):
- Gizlilik (TR + EN) 03. bölüme "Verilerim" yedeği cümlesi; tarih 25 Ekim 2026. EN'de bölüm adı "My Data" yazıldı (uygulamadaki İngilizce adla aynı olmalı, kontrol edilecek).
- Kontrast AA (K-35): `tokens.css` + Figma değişkenleri.
- "Bana yaz" → `/contact/` (K-36).
- 390 px altı (K-37): 320/360/390'da 13 sayfa yatay taşmasız; 390'da görünüm öncekiyle aynı (ekran görüntüsüyle karşılaştırıldı).
- Alt bilgi dokunma alanı (K-38).
- Figma: S08 İletişim 03_Ekranlar'a dört ekran olarak eklendi (bölüm 129:4479; açık ekranlarda kartın sabit Koyu kipi kaldırıldı, kart gölgesi S06'dakiyle aynı). Favicon: üç tur öneriden (132:369, 133:740, 135:2315) **Hayalet** seçildi (K-39); favicon.svg/ico, apple-touch-icon.png ve og.jpg Figma 113:2'den yenilendi.
- FormSubmit onayı kullanıcı tarafından yapıldı.

Önceki oturum: 24 Ekim 2026 — Aşama 9 + 10 (c9b9ce3).
- **Canlı vakit:** `assets/js/vendor/adhan.min.js` (adhan-js 4.4.6, MIT, npm `lib/bundles/adhan.umd.min.js`, kaynak haritası satırı çıkarıldı). `site.js` İstanbul saatini Intl ile, sıradaki vakti adhan (Diyanet/Turkey, 41.0082 / 28.9784) ile hesaplar; her saniye günceller. HTML'de `data-clock`, `data-prayer-name`, `data-prayer-countdown`, `data-prayer-meta`; betik yalnız `/` ve `/en/`'de yüklü. Betik çalışmazsa değerler "--:--" kalır (örnek değer yazmıyoruz). Saat kutusu (Tile/Clock) K-27 ile kaldırıldı; canlı değerler yalnız Levh widget'ında (geri sayım, vakit adı, vakit saati) ve HomeScreen durum çubuğunda (saat) kalır.
- **Hareketler (K-15):** hepsi `site.css` sonundaki "Hareket" bölümünde. Süre ve eğri token'lardan; Figma kartında yalnız metinle verilen zamanlar `--motion-*` değişkenlerinde (900/22/800/200/90/250/500/650/1050/1800/380/900/120/200 ms). A1 açılış (ad harf harf: gradyan her harfin kendisinde, `--x` em olarak ölçüldü; çünkü Chrome animasyonlu çocukları üst öğenin `background-clip:text`'inde çizmiyor), B1 ikon kalkışı, C3 imleç hâlesi (`[data-follow]`, `site.js`), D3 kutucuk üzerine gelince, E2 paralaks (`--p`, `site.js`; ≤1239 px'te etki yarım), F1 kutucuk büyür (`@view-transition`, `view-transition-name: levh-hero`, kutucuğa tıklanınca `site.js` adı verir, Levh girişi geçişten sonra `html.vt` ile gecikmeli gelir). `prefers-reduced-motion: reduce`: hepsi kapalı, yalnız 200 ms solma; `@view-transition` da kapalı. Ad harfleri artık satır içi blok olduğundan ad ~%0,9 genişledi (kerning kaybı, 551,9 px).
- **Simge ve paylaşım görseli:** Figma'da yoktu, 01_Foundations'a çizildi (düğüm 113:2: Favicon 113:6, Apple touch 113:7, OG 113:27). Dosyalar: `favicon.svg` (Figma SVG dışa aktarımı), `favicon.ico` (16/32/48 PNG), `apple-touch-icon.png` (180), `assets/img/og.jpg` (1200×630, 125 KB; PNG 586 KB idi, WhatsApp 300 KB üstünü almıyor). Tüm sayfalarda `og:*`, `twitter:card`, simge bağlantıları; 404'te yalnız simge.
- **Kontrol:** 13 sayfa × (1440 koyu, 390 açık): konsol temiz, yatay taşma yok, kırık görsel/bağlantı yok, `alt`, `lang`, tek `h1`, `canonical`, `hreflang` karşılıklı. Saat kutusu (K-27) ve İlkeler kutusu (K-28) kaldırıldı; ana sayfada Hakkımda uzun metinle 390×440 sütunda (≥1240 px), 721–1239 px'te tam genişlikte, mobilde 480 px+ (metne göre büyür); Süreç ve İçerik yarım yarıma. Dokunma hedefi: Figma ölçüleri (38 px düğme, 33 px filtre) değişmeden tıklanabilir alan 44 px'e büyütüldü (`site.css` sonu); alt bilgi liste bağlantıları ve satır içi bağlantılar 17–22 px kaldı (Figma yerleşimi).


## Aşama ayrıntıları

### 0 · Kurulum
- Bu klasör boş değil (CLAUDE.md, docs/). Var olan GitHub deposunu buraya bağla:
  `git init -b main && git remote add origin https://github.com/muhammedturabisancak/muhammedturabisancak.github.io.git && git fetch origin && git checkout -t origin/main`
  (Çakışma olmaz; depo `index.html, style.css, avatar.jpg, resume.pdf, CNAME` içerir.) Giriş/kimlik doğrulama gerekirse kullanıcıya bırak.
- Dal: `feat/turabi/muhammedturabisancak.github.io/site-yenileme`.
- Kaldır: `resume.pdf`, eski `style.css` (yenisi gelince), eski `index.html` içeriği. **`CNAME` kalır.** `avatar.jpg` görsellere dönüştürülüp `assets/img/` altına taşınır (kökteki `avatar.jpg`, eski `index.html` ile birlikte Aşama 3'te silinir).

### 1 · Temel
- `assets/css/tokens.css`: `docs/design.md` tablolarından (ya da Figma değişkenlerinden okuyarak) Semantic Dark/Light, Apps, Layout Desktop/Mobile, Motion + reduced motion, tipografi yardımcıları.
- Yazı tipleri: Inter (400–700, variable) ve Unbounded (600–700) `woff2`, latin + latin-ext → `assets/fonts/`, `@font-face` + `font-display: swap`. Lisans: OFL (dosya yanına OFL metni).
- Tema: `site.js` içinde Sistem → Koyu → Açık; `localStorage` anahtarı `theme`; ilk boyamada yanıp sönme olmasın diye `<head>` içinde küçük satır içi betik.
- Doğrulama: boş bir deneme sayfasında renk ve yazı örnekleri iki temada.

### 2 · Bileşenler
- `docs/design.md` › Bileşenler tablosundaki her birini Figma'daki bileşenle karşılaştırarak `site.css`'e yaz. HomeScreen ve Tile/App'in Mobile varyantları var.
- İkonlar: Lucide SVG'leri satır içi (stroke 1.8–1.9, `currentColor`).
- Doğrulama: geçici `/_bilesenler.html` sayfasında hepsi, iki tema; aşama bitince bu sayfa silinir.

### 3–7 · Sayfalar (TR)
- Her sayfa için önce Figma çerçevesine bak (kimlikler `docs/design.md`), sonra yaz, sonra 4 ekran görüntüsü (Desktop/Mobile × Dark/Light) al ve Figma'yla karşılaştırarak kullanıcıya göster.
- Bağlantılar: menü "Uygulamalar /apps/ · Şu an /now/ · Hakkımda /#hakkimda"; alt bilgi site haritası; Levh kutucuğu → /levh/; "Bana yaz" → e-posta (kopyala).
- Görseller `loading="lazy"`, `width/height` verilir, `alt` Türkçe.

### 6 · `now/data.json` biçimi
```json
{
  "status": {
    "title": "Levh 1.0'ı App Store'a hazırlıyorum",
    "progress": 80,
    "updated": "2026-10-19",
    "todo": [
      { "text": "Uygulama App Store Connect'e yüklendi", "done": true },
      { "text": "Geliştirici sözleşmesi kabul edildi", "done": true },
      { "text": "Gizlilik ve destek sayfaları", "done": false },
      { "text": "Mağaza ekran görüntüleri ve açıklama", "done": false }
    ]
  },
  "timeline": [
    { "date": "2026-10-19", "kind": "update", "app": "levh", "title": "Levh 1.0.0 App Store Connect'e yüklendi", "text": "İnceleme öncesi son adımlar: gizlilik sayfası ve ekran görüntüleri." },
    { "date": "2026-10-19", "kind": "update", "app": "levh", "title": "Alt menüde canlı kıble halkası", "text": "Kıble'ye ne kadar yakın olduğunu alt menüden gösteren halka." },
    { "date": "2026-10-19", "kind": "update", "app": "site", "title": "muhammedturabisancak.dev baştan tasarlanıyor", "text": "Bu sayfa da onun bir parçası." },
    { "date": "2026-10-18", "kind": "update", "app": "levh", "title": "Dini günlerde tebrik kartı", "text": "Kandil ve bayramlarda tek dokunuşla paylaşılan kart." }
  ]
}
```
- `kind`: `update` | `video` | `post`; video/yazıda `url` ve `meta` ("12 dk") alanı. EN için `title_en`, `text_en` (yoksa TR gösterilir).
- Örnek video/yazılar (K-22) gerçek bağlantı gelene kadar **eklenmez**; Figma'daki "örnek" kartlar yalnız düzeni gösterir.

### 8 · İngilizce
- `/en/` altında aynı yapı; metinler Türkçeden birebir çeviri değil, doğal İngilizce. Gizlilik metni aynı gerçeklere dayanır (aşağıdaki maddeler).

### 9 · Hareket ve canlı veriler
- `docs/design.md` › Hareket bölümündeki A1, B1, C3, D3, E2, F1. Laboratuvarı referans al.
- adhan-js: npm `adhan` paketinin UMD derlemesini (`adhan.umd.min.js` ya da benzeri) indirip `assets/js/vendor/adhan.min.js` olarak koy; sürümü ve lisansı dosyanın başına yaz. `CalculationMethod.Turkey()`, koordinat İstanbul (41.0082, 28.9784), saat dilimi Europe/Istanbul. Widget: "<Vakit>'a hh:mm" geri sayım; saat kutucuğu: İstanbul saati + "<Vakit>'a hh:mm" + gece/gündüz (ay/güneş).

### 10 · Son kontrol
- Lighthouse benzeri kontrol (performans, erişilebilirlik), meta açıklamaları, Open Graph görseli, favicon, `hreflang`, 404, mobilde yatay kaydırma yok.
- Canlıya çıkış: kullanıcı onayıyla `main`'e birleştirme → GitHub Pages yayını → `https://muhammedturabisancak.dev/levh/privacy/` açılıyor mu kontrol.

## İçerik: Levh gizlilik politikası (TR, Figma S05)
Son güncelleme: 25 Ekim 2026 (ilk sürüm 20 Ekim). Levh'in kodu incelenerek yazıldı: ağ isteği yok; iOS'ta yalnız "kullanırken konum"; Android'de ACCESS_COARSE_LOCATION, RECEIVE_BOOT_COMPLETED, SCHEDULE_EXACT_ALARM; tüm kayıtlar cihazda (SharedPreferences). Hukuki görüş değildir; yayından önce kullanıcı okuyacak.
1. **Kısaca** — Levh hiçbir kişisel verini toplamaz ve bize ya da başka birine göndermez. Uygulamada hesap, reklam, analiz aracı ya da takip yoktur; internet bağlantısı kullanmaz.
2. **Konum** — İzin verirsen yaklaşık konumun yalnızca en yakın ilçeyi bulmak ve namaz vakitlerini hesaplamak için telefonunda kullanılır. Konum hiçbir yere gönderilmez; saklanan yalnızca seçtiğin il ve ilçenin adıdır. İzin vermek istemezsen il ve ilçeyi listeden seçebilirsin.
3. **Telefonunda saklananlar** — Tema, dil ve yazı boyutu tercihlerin; seçtiğin konum; bildirim tercihlerin; kaydettiğin ayet, hadis ve isimler; zikir sayıların ve hedeflerin; namaz ve oruç kazası kayıtların. Hepsi yalnızca telefonunda durur ve uygulamayı sildiğinde silinir. İstersen bu kayıtları Verilerim bölümünden bir yedek dosyası olarak dışa aktarıp sonra geri yükleyebilirsin. Dosya senin seçtiğin yere kaydedilir; Levh onu hiçbir yere göndermez.
4. **Bildirimler** — Vakit hatırlatmaları telefonunda planlanır; bildirim sunucusu yoktur. Android'de telefon yeniden başladığında hatırlatmaları kurmak ve tam vaktinde göstermek için sistem izinleri kullanılır. Bildirim iznini telefonunun ayarlarından istediğin zaman kapatabilirsin.
5. **Paylaşım** — Bir içeriği ya da tebrik kartını paylaştığında telefonunun paylaşım menüsü açılır. Ne paylaşılacağını ve kime gideceğini sen seçersin; Levh bu işleme aracılık etmez.
6. **Çocuklar** — Levh kimseden kişisel veri toplamadığı için çocuklardan da toplamaz.
7. **Değişiklikler ve iletişim** — Bu politika değişirse bu sayfa güncellenir ve üstteki tarih değişir. Soruların için muhammedturabisancak@gmail.com adresine yazabilirsin.

> Not: "Verilerim" yedeği cümlesi 25 Ekim 2026'da eklendi (kullanıcı onayı).

## İçerik: Levh destek (TR, Figma S06)
İletişim kartı: "BANA YAZ · Bir sorun mu var, bir fikrin mi? · Hatayı, cihaz modelini ve iOS ya da Android sürümünü yazarsan daha hızlı yardımcı olabilirim." + muhammedturabisancak@gmail.com + Kopyala.
Sık sorulanlar:
1. **Vakitler nasıl hesaplanıyor?** — Vakitler Diyanet'in yöntemiyle, seçtiğin ilçenin konumuna göre telefonunda hesaplanır; internet gerekmez. Diyanet'in yayımladığı vakitle bir fark görürsen ilçeyi ve tarihi yazman yeterli.
2. **Konumumu nasıl değiştiririm?** — Ayarlar'da Konum satırına dokun; konumunu yeniden bulabilir ya da il ve ilçeyi listeden seçebilirsin.
3. **Bildirimler gelmiyor.** — Telefonunun ayarlarında Levh için bildirim izninin açık olduğundan emin ol. Android'de ayrıca "Alarmlar ve hatırlatıcılar" iznini aç ve pil tasarrufunda Levh'i kısıtlama dışında bırak.
4. **Kıble pusulası doğru göstermiyor.** — Telefonu düz tut; mıknatıslı kılıf ve metal eşyalar pusulayı şaşırtabilir. Telefonu havada birkaç kez sekiz çizer gibi döndürmek pusulayı kalibre eder.
5. **Verilerim nerede, nasıl silerim?** — Tüm kayıtların yalnızca telefonunda durur; Levh hiçbir şeyi bize göndermez. Uygulamayı sildiğinde hepsi silinir. Ayrıntılar için gizlilik politikasına bakabilirsin.
6. **Levh ücretli mi, reklam var mı?** — Levh ücretsizdir ve reklam içermez.

## Açık işler (karar/girdi bekleyen)
- Mağaza bağlantıları ve resmî rozetler (Levh yayınlanınca).
- Gerçek video/yazı bağlantıları (K-22).
- Ana ekrandaki Tasarımlar (Figma profili?) ve Videolar (YouTube kanalı) ikonlarının adresleri.
- Levh ekranlarının 2x dışa aktarımı (Figma MCP ekran görüntüsü 1x veriyor; gerekirse kullanıcı Figma'dan 2x PNG verir).
- **Saat ve İlkeler kutularının Figma'dan silinmesi (K-27, K-28):** S01 ve S04 ekranlarında, 22:143 ve 22:130 bileşenlerinde duruyor. Önerilen ana sayfa satırları 01_Foundations › 117:3397'de; kullanıcı onayı bekleniyor.
- Figma'da Icon/github, Icon/linkedin (K-30) eski çizgi hâlinde; S06 ekranları mail formundan önceki hâlde (K-31/K-32).
- Hakkımda metni kesin (K-28); "çalıştım" kipi kullanıcının yazdığı gibi (istenirse "çalışıyorum").
- **Canlıya çıkış:** `index-page` dalı → `main` (kullanıcı ayrıca onaylar) → GitHub Pages → `https://muhammedturabisancak.dev/levh/privacy/` ve `/contact/` formu canlıda denenir.
