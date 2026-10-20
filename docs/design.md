# Tasarım haritası

Tek kaynak Figma: **muhammedturabisancak.dev** — dosya anahtarı `czHsywqWMyme7d5sNtZ7pK`
Bağlantı: https://www.figma.com/design/czHsywqWMyme7d5sNtZ7pK/muhammedturabisancak.dev
Figma MCP: `get_design_context` / `get_screenshot` ile `fileKey` + aşağıdaki düğüm kimliği. Ekranlar bileşen örnekleriyle kuruludur; değerler token'a bağlıdır.

## Figma sayfaları
| Sayfa | Kimlik | İçerik |
|---|---|---|
| 00_Readme | 16:2 | Kapsam, kararlar, aşamalar |
| 01_Foundations | 16:3 | Token belgeleri, tipografi, efektler, **Hareket (seçilen)** kartı (53:11) |
| 02_Components | 16:4 | Bütün bileşenler (koyu zemin üzerinde) |
| 03_Ekranlar | 16:5 | Sitedeki güncel ekranların tamamı |
| Arşiv · … | — | Seçilmeyen alternatifler; kodda kullanılmaz |

## Ekranlar (03_Ekranlar)
Her sayfa: Desktop (1440) ve Mobile (390) × Dark ve Light.

| Sayfa | Yol | Desktop-Dark | Desktop-Light | Mobile-Dark | Mobile-Light |
|---|---|---|---|---|---|
| S01 Ana sayfa | `/` | 26:3 | 26:371 | 27:553 | 27:896 |
| S02 Uygulamalar | `/apps/` | 30:1081 | 30:1219 | 31:1289 | 31:1416 |
| S03 Levh | `/levh/` | 37:1490 | 37:1653 | 38:1735 | 38:1892 |
| S04 Şu an | `/now/` | 46:1976 | 46:2162 | 47:2269 | 47:2436 |
| S05 Gizlilik | `/levh/privacy/` | 51:2538 | 51:2632 | 51:2724 | 51:2814 |
| S06 Destek | `/levh/support/` | 51:2905 | 51:3005 | 51:3103 | 51:3199 |
| S07 404 | `/404.html` | 52:3186 | 52:3233 | 52:3276 | 52:3315 |

### Sayfaların bölümleri (yukarıdan aşağı)
- **S01 Ana sayfa:** Üst menü → Giriş (solda avatar 84, ad "Muhammed / Turabi Sancak" isim gradyanı, tanıtım cümlesi, düğmeler "Uygulamaları gör" + "Bana yaz"; sağda **HomeScreen**) → Izgara: Tile/App (Levh) + [Tile/Principles, Tile/Clock] / [Tile/Process, Tile/Content, Tile/About] → Footer. Mobil: menü → tanıtım → HomeScreen (Mobile) → kutucuklar alt alta → Footer.
- **S02 Uygulamalar:** Giriş (etiket adın, "Uygulamalarım" isim gradyanı, cümle, 4 Stat, FilterChip'ler) → "Öne çıkan" (Tile/App + Tile/Upcoming) → "Tüm uygulamalar" (AppCard × 2) → Footer.
- **S03 Levh:** Giriş (Levh renginde ışıklar; ikon 96, "UYGULAMA · iOS VE ANDROID", "Levh" 84 px, cümle, StoreBadge × 2; sağda 3 telefon: Keşfet −9°, Bugün düz ve büyük, Dini Günler +9°; mobilde M2 yelpaze) → 5 × FeatureRow (Bugün, Kıble, Zikir, Kaza Takibi, Dini Günler; sol/sağ sırayla) → Gizlilik (başlık + 3 PrivacyCard + bağlantılar) → DownloadCTA → Footer.
- **S04 Şu an:** Masaüstü iki sütun: solda (380) avatar, tarih etiketi, "Şu an", cümle, NowStatus, Tile/Clock; sağda (780) FilterChip sekmeleri + tarih başlıklı TimelineItem listesi + "Daha eski kayıtlar →". Mobil: hepsi alt alta.
- **S05 Gizlilik / S06 Destek:** Tek sütun 680 (mobil 350): DocHeader → (Destek'te ContactCard + "Sık sorulanlar") → DocSection × n → Footer.
- **S07 404:** Işıklar + ay, "404" (isim gradyanı, 160/96 px), "Aradığın sayfa burada değil.", "Taşınmış ya da hiç var olmamış olabilir.", düğmeler "Ana sayfa" + "Uygulamalar".

## Token'lar → `assets/css/tokens.css`
Değişken adı = Figma code syntax. Koyu `:root`; açık tema bloğunda yalnız Semantic değerler değişir. Layout'ta Desktop varsayılan, Mobile değerleri `@media (max-width: 720px)` içinde.

### Semantic (renk)
| Token | CSS | Dark | Light |
|---|---|---|---|
| color/bg | `--color-bg` | #0A0B0F | #F5F6F8 |
| color/surface | `--color-surface` | #14151B | #FFFFFF |
| color/surfaceRaised | `--color-surface-raised` | #1B1C23 | #ECEEF2 |
| color/glass | `--color-glass` | #FFFFFF14 | #FFFFFFB8 |
| color/border | `--color-border` | #26272F | #E3E6EB |
| color/borderSubtle | `--color-border-subtle` | #FFFFFF14 | #0000000F |
| color/text | `--color-text` | #F4F5F7 | #0D0F14 |
| color/textSecondary | `--color-text-secondary` | #A4A7B0 | #596070 |
| color/textTertiary | `--color-text-tertiary` | #6E717B | #8A909C |
| color/accent | `--color-accent` | #7FE3BE | #178A63 |
| color/accentAlt | `--color-accent-alt` | #7FB5FF | #2F6BFF |
| color/buttonPrimary | `--color-button-primary` | #FFFFFF | #0D0F14 |
| color/onButtonPrimary | `--color-on-button-primary` | #0A0B0F | #FFFFFF |
| color/buttonSecondary | `--color-button-secondary` | #FFFFFF0F | #0000000F |
| color/nameFrom | `--color-name-from` | #FFFFFF | #0D0F14 |
| color/nameTo | `--color-name-to` | #DDE7FF | #2F6BFF |
| color/wallTop | `--color-wall-top` | #0D2A55 | #BFD6FF |
| color/wallMid | `--color-wall-mid` | #0A3A2C | #D6F2EA |
| color/wallBottom | `--color-wall-bottom` | #05140F | #F4F7FB |
| color/glowA | `--color-glow-a` | #1F4FA8 | #9CC0FF |
| color/glowB | `--color-glow-b` | #0E5A3C | #A8E8D4 |
| color/glowC | `--color-glow-c` | #5B3FA0 | #C7B8FF |
| color/clockTop | `--color-clock-top` | #1A1F3A | #DDE7FF |
| color/clockBottom | `--color-clock-bottom` | #0E1020 | #F3F6FF |
| color/celestial | `--color-celestial` | #F3EED8 (ay) | #FFD98A (güneş) |
| color/scrim | `--color-scrim` | #00000080 (black/a50) | #00000033 (black/a20) |

İsim gradyanı: `linear-gradient(90deg, var(--color-name-from), var(--color-name-to))` + `background-clip: text`.
Duvar kâğıdı (HomeScreen): `linear-gradient(135deg, var(--color-wall-top), var(--color-wall-mid) 55%, var(--color-wall-bottom))` + ışıklar.

### Apps (temadan bağımsız)
`--app-levh-primary #0E5A3C` · `--app-levh-deep #022D1A` · `--app-levh-gold #E5BA72` · `--app-levh-cream #FDFAEB`
Marka (ikon zeminleri): `--brand-github #24292F` · `--brand-linkedin #0A66C2` · `--brand-x #000000` · `--brand-youtube #E02020` · `--brand-mail #007AFF` · `--brand-figma #A259FF` · `--brand-flutter #4FC3F7` · `--brand-slate #4A5568`
Levh zemini: `linear-gradient(180deg, var(--app-levh-primary), var(--app-levh-deep))` + altın ışık.

### Layout (Desktop / Mobile)
space 4·8·12·16·20·24·32·40·56·80 (`--space-16` …) · `--space-section` 110 / 64 · `--space-gutter` 120 / 20
radius: sm 8 · md 14 · lg 22 · xl 30 · 2xl 40 · screen 56 · full 999 (`--radius-xl` …)
size: page 1440 / 390 · container 1200 / 350 · appIcon 96 / 64 · appIconLarge 72 / 56

### Tipografi (`type/*`)
| Stil | Yazı | Boyut / satır / harf aralığı |
|---|---|---|
| display/xl | Unbounded 700 | 64 / 104% / −4% (mobil 40 / 106%) |
| display/lg | Unbounded 700 | 46 / 108% / −4% (mobil 32 / 110%) |
| display/clock | Unbounded 700 | 58 / 100% / −4%, tabular rakam |
| display/md | Unbounded 600 | 24 / 120% / −3% |
| title | Inter 700 | 34 / 120% / −2% (mobil 26) |
| headline | Inter 600 | 19 / 130% |
| body/lg | Inter 400 | 20 / 150% (mobil 17) |
| body | Inter 400 | 16 / 150% |
| body/strong | Inter 500 | 16 / 140% |
| button | Inter 600 | 15 / 120% |
| nav · nav/active | Inter 400 · 500 | 14 / 120% |
| caption | Inter 400 | 13 / 140% |
| label | Inter 600 | 12 / 120% / +6%, BÜYÜK HARF |
| icon-label | Inter 500 | 14 (mobil 12) |
Metin sayfalarında gövde 17 / 165%.

### Efektler
- shadow/screen: 0 40 90 −20 rgba(0,0,0,.55) · açık temada .18 (shadow/screen-light)
- shadow/phone: 0 30 60 −12 rgba(0,0,0,.5)
- shadow/icon: 0 10 24 −6 rgba(0,0,0,.35)
- shadow/card-light: 0 8 30 −8 rgba(0,0,0,.06) — **yalnız açık tema**; koyuda gölge yok, 1 px çizgi var
- blur/glass: Figma radius 30 → `backdrop-filter: blur(15px)` (Figma'nın kendi CSS çıktısı yarıya böler; `--blur-glass`) (widget, dock, menü)
- blur/glow: ışık lekeleri `filter: blur(130px)` (mobilde daha küçük)

## Bileşenler (02_Components) → CSS
| Figma | Kimlik | CSS sınıfı (öneri) | Not |
|---|---|---|---|
| Icon/* | 20:12…20:71 | inline SVG (Lucide) | github, mail, play, moon, linkedin, pen, user, figma, plus, chevron, arrow, x, menu, globe, sun |
| Button | 20:104 | `.btn .btn--primary/.btn--secondary .btn--sm` | |
| Chip | 20:113 | `.chip .chip--glass .chip--on-app` | |
| Avatar | 20:119 | `.avatar .avatar--84/64/30` | |
| AppIcon | 21:34 | `.app-icon .app-icon--image/--glyph/--placeholder .app-icon--sm` | zemin = brand renk değişkeni |
| Dock | 21:37 | `.dock` | |
| Widget/Levh | 21:70 | `.widget .widget--levh` | canlı vakit sayacı |
| Widget/Şu an | 21:85 | `.widget .widget--now` | data.json'dan |
| HomeScreen | 25:260 (Device=Desktop/Mobile) | `.home-screen` | 600×840 / 350×620 |
| Phone | 22:110 | `.phone` | ekran görseli `img` |
| Tile/App | 25:156 (Device) | `.tile .tile--app` | 790×440 / 350×600 |
| Tile/Principles | 22:130 | `.tile .tile--principles` | 0 reklam · 0 veri toplama · 2 dil |
| Tile/Clock | 22:143 | `.tile .tile--clock` | canlı İstanbul saati + sıradaki vakit |
| Tile/Process | 22:150 | `.tile .tile--process` | Figma → Flutter → mağaza |
| Tile/Content | 22:164 | `.tile .tile--content` | |
| Tile/About | 22:180 | `.tile .tile--about` | |
| Tile/Upcoming | 29:251 (Device) | `.tile .tile--upcoming` | kesik çizgili |
| AppCard | 22:209 (Live/Upcoming) | `.app-card` | |
| SectionHeader | 22:212 | `.section-header` | |
| Stat | 29:227 | `.stat` | |
| FilterChip | 29:237 (Default/Selected) | `.filter` + `aria-pressed` | |
| StoreBadge | 36:233 | `.store-badge` | yer tutucu (K-21) |
| FeatureRow | 36:267 (Desktop-Left/Right, Mobile) | `.feature-row .feature-row--left/--right` | |
| PrivacyCard | 36:271 | `.privacy-card` | |
| DownloadCTA | 36:303 (Device) | `.download-cta` | |
| NowStatus | 45:241 | `.now-status` | data.json |
| TimelineItem | 45:298 (Update/Video/Post) | `.timeline-item` | data.json |
| DocHeader · DocSection · ContactCard | 50:241 · 50:257 · 50:264 | `.doc-header` `.doc-section` `.contact-card` | |
| Nav | 23:162 (Desktop/Mobile) | `.site-nav` | tema düğmesi her durumda güneş ikonu; mobilde menü düğmesi → Nav/MobileMenu |
| Nav/MobileMenu | 71:306 | `.site-menu` (`__scrim`, `__panel`) | sağdan panel (%82, en çok 320), arkası `color/scrim` + 6 px bulanık, sayfa 24 px sola; seçilmeyen akışlar: Arşiv · Mobil menü |
| Footer | 23:217 (Desktop/Mobile) | `.site-footer` | 4 sütun / 2×2 |

## Hareket (K-15) — Motion token'ları
`--duration-fast 300ms` · `--duration-base 700ms` · `--duration-slow 1100ms` · `--duration-stagger 45ms` · `--tilt-max 8deg`
`--ease-expo cubic-bezier(.16,1,.3,1)` · `--ease-spring cubic-bezier(.34,1.56,.64,1)` · `--ease-in-out cubic-bezier(.7,0,.2,1)`
`prefers-reduced-motion: reduce` → süreler 0, yalnız solma.

- **A1 Sahne (ana sayfa açılışı):** ad harf harf: opaklık 0→1, y 14→0, bulanıklık 8→0; 900 ms ease-expo, harf başına 22 ms gecikme (kelimeler bölünmez). Avatar/metin/düğmeler 200 ms'den 90 ms arayla yükselir. HomeScreen: ölçek .92→1 + bulanıklık 12→0, 1100 ms, 250 ms gecikme. Widget'lar 500 ms'den 90 ms arayla; ikonlar 650 ms'den ease-spring ile 45 ms arayla (ölçek .4→1); dock 1050 ms'de alttan. Işıklar 1.8 s'de solarak.
- **B1 Kalkış:** ikon üzerine gelince `translateY(-4px) scale(1.12)` ease-spring 380 ms; basınca `scale(.9)`. Dokunmatikte yalnız basma.
- **C3 İmleç hâlesi:** ana mavi ışık imleci her karede %5 yaklaşarak izler (requestAnimationFrame); diğer ışıklar sabit. Dokunmatik ve reduced-motion'da sabit.
- **D3 Sabit + üzerine gelince:** kutucuklarda giriş animasyonu yok; üzerine gelince `translateY(-4px)` + çerçeve belirginleşir, 300 ms.
- **E2 Paralaks (Levh satırları):** satırın ekrandaki konumu p (−1…1): telefon `translateY(p × −60px) rotate(±(4° + p × 6°))`; scroll'da requestAnimationFrame ile. Mobilde etki yarıya iner.
- **F1 Kutucuk büyür:** ana sayfa/uygulamalar Levh kutucuğundan `/levh/`'e geçişte View Transitions (çapraz belge): `@view-transition { navigation: auto; }`, kutucuk ve Levh girişi aynı `view-transition-name` (ör. `levh-hero`), 700 ms ease-in-out; ardından giriş metni ve telefonlar sırayla. Desteklemeyen tarayıcıda normal geçiş.
- Laboratuvar (canlı örnekler): https://claude.ai/artifact/S4LwenUwQ2GGC9KhpuzfYE

## Görseller
- Avatar: eski sitedeki `avatar.jpg` (1600 px) → 256 ve 512 px.
- Levh ikonu: Levh deposu `/Users/turabi/Desktop/İftar App/assets/brand/levh_app_icon_1024.png` → 192 / 384 px.
- Levh ekranları: Levh'in Figma dosyası `nhoV0SLcuhpqto7fTGGPMT`, sayfa 03_Ekranlar (79:2). **2x dışa aktar** (site Figma'sındaki kopyalar yalnız 1x):

| Ekran | Dark | Light | Kullanıldığı yer |
|---|---|---|---|
| Bugün (S01_Bugun) | 18:2195 | 14:186 | Levh girişi (orta), satır 1, mobil yelpaze |
| Keşfet (S03_Kesfet) | 18:2241 | 14:580 | Levh girişi (sol), mobil yelpaze |
| Kıble (S10_Kible) | 18:2341 | 15:347 | satır 2 |
| Zikir oturumu (S27_ZikirOturum) | 357:145 | 362:273 | satır 3 |
| Kaza Takibi (S18_KazaTakibi) | 281:8547 | 281:8453 | satır 4, Tile/App |
| Dini gün detay (S30 Kandil) | 474:11792 | 474:11716 | Levh girişi (sağ), satır 5 |

## Bilinen Figma notu
Değişkene bağlı boyaya verilen opaklık bazı katmanlarda kayboluyor; Figma'da ince izler `color/border` ile çizildi. Kodda sorun değil: saydam renkler token'da zaten alfa ile tanımlı.
