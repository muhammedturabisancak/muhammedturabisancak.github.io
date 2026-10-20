# Plan ve durum

Her oturumun başında bu dosyayı oku; iş bitince **Durum** tablosunu ve "Son oturum" notunu güncelle.
Bir oturumda en fazla 1–2 aşama yap. Her aşama sonunda: ekran görüntüleriyle Figma karşılaştırması → kullanıcı onayı → commit (kullanıcı söyleyince).

## Durum
| Aşama | İş | Durum |
|---|---|---|
| 0 | Depoyu bu klasöre bağla, dal aç, eski dosyaları kaldır | bitti (PR #2, main'de) |
| 1 | Temel: `tokens.css`, yazı tipleri, `site.css` iskeleti, tema düğmesi | bitti (PR #3, main'de) |
| 2 | Ortak bileşenler — 2a: Nav, Footer, Button, Chip, Avatar, AppIcon, SectionHeader · 2b: Dock, Widget'lar, HomeScreen, Phone, Tile'lar | bitti (2a PR #4, menü PR #5; 2b commit bekliyor) |
| 3 | S01 Ana sayfa (TR) | bitti (commit bekliyor; `main`'e toplu çıkışta, K-26) |
| 4 | S02 Uygulamalar (TR) | bekliyor |
| 5 | S03 Levh (TR) | bekliyor |
| 6 | S04 Şu an (TR) + `now/data.json` | bekliyor |
| 7 | S05 Gizlilik, S06 Destek, S07 404 (TR) | bekliyor |
| 8 | İngilizce sayfalar `/en/…` | bekliyor |
| 9 | Hareketler (K-15) + canlı saat/vakit (adhan-js) | bekliyor |
| 10 | Son kontrol: erişilebilirlik, performans, meta/OG, `hreflang`, kırık bağlantı; kullanıcıyla canlıya çıkış | bekliyor |

Son oturum: 20 Ekim 2026 — Aşama 2 main'de (PR #6 + #7 düzeltme). Aşama 3 bitti, dal `feat/turabi/muhammedturabisancak.github.io/index-page`: yeni `index.html` (S01), site.css'e sayfa bölümü (`.site-header`, `.page-glow`, `.intro`, `.home-tiles`), site.js'e `[data-copy]` (Bana yaz → adresi kopyalar, pano yoksa mailto). tokens.css: `--space-gutter` akışkan clamp(20px…120px), `--blur-glow` 65px (Figma 130'un CSS karşılığı). Eski `style.css` ve kökteki `avatar.jpg` silindi. Ara genişlik kararı (Figma'da yok): 1240 altında giriş alt alta ve kutucuklar 2 sütun. Kontrol: 1440/1300/1240/1200/1000/800/721/600/390'da yatay taşma yok, konsol temiz, menü testi geçti. Canlıya çıkış toplu (K-26): sonraki aşamalar da bu dalda, her biri ayrı commit (kullanıcı atar). Sıradaki: Aşama 4 (S02 Uygulamalar).

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
Son güncelleme: 20 Ekim 2026. Levh'in kodu incelenerek yazıldı: ağ isteği yok; iOS'ta yalnız "kullanırken konum"; Android'de ACCESS_COARSE_LOCATION, RECEIVE_BOOT_COMPLETED, SCHEDULE_EXACT_ALARM; tüm kayıtlar cihazda (SharedPreferences). Hukuki görüş değildir; yayından önce kullanıcı okuyacak.
1. **Kısaca** — Levh hiçbir kişisel verini toplamaz ve bize ya da başka birine göndermez. Uygulamada hesap, reklam, analiz aracı ya da takip yoktur; internet bağlantısı kullanmaz.
2. **Konum** — İzin verirsen yaklaşık konumun yalnızca en yakın ilçeyi bulmak ve namaz vakitlerini hesaplamak için telefonunda kullanılır. Konum hiçbir yere gönderilmez; saklanan yalnızca seçtiğin il ve ilçenin adıdır. İzin vermek istemezsen il ve ilçeyi listeden seçebilirsin.
3. **Telefonunda saklananlar** — Tema, dil ve yazı boyutu tercihlerin; seçtiğin konum; bildirim tercihlerin; kaydettiğin ayet, hadis ve isimler; zikir sayıların ve hedeflerin; namaz ve oruç kazası kayıtların. Hepsi yalnızca telefonunda durur ve uygulamayı sildiğinde silinir.
4. **Bildirimler** — Vakit hatırlatmaları telefonunda planlanır; bildirim sunucusu yoktur. Android'de telefon yeniden başladığında hatırlatmaları kurmak ve tam vaktinde göstermek için sistem izinleri kullanılır. Bildirim iznini telefonunun ayarlarından istediğin zaman kapatabilirsin.
5. **Paylaşım** — Bir içeriği ya da tebrik kartını paylaştığında telefonunun paylaşım menüsü açılır. Ne paylaşılacağını ve kime gideceğini sen seçersin; Levh bu işleme aracılık etmez.
6. **Çocuklar** — Levh kimseden kişisel veri toplamadığı için çocuklardan da toplamaz.
7. **Değişiklikler ve iletişim** — Bu politika değişirse bu sayfa güncellenir ve üstteki tarih değişir. Soruların için muhammedturabisancak@gmail.com adresine yazabilirsin.

> Not: Levh'te sonradan "Verilerim" yedek dosyası (dışa/içe aktarma) eklendi. Yedek dosyası kullanıcının kendi seçtiği yere, kendi isteğiyle kaydedilir; gizlilik metnine bir cümle eklenmesi gerekebilir — yazmadan önce kullanıcıya sor.

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
- Hakkımda metninin son hâli (Figma'daki: "Bilgisayar mühendisiyim; kampüste GDG topluluğunu yönettim, DevFest Erzurum ekibindeydim.") — kullanıcı onaylasın.
- Gizlilik metnine "Verilerim" yedeği cümlesi (yukarıdaki not).
- Ana ekrandaki Tasarımlar (Figma profili?) ve Videolar (YouTube kanalı) ikonlarının adresleri.
- Levh ekranlarının 2x dışa aktarımı (Figma MCP ekran görüntüsü 1x veriyor; gerekirse kullanıcı Figma'dan 2x PNG verir).
