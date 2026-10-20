# Kararlar

Tasarım oturumunda (19–20 Ekim 2026) kullanıcıyla alınan kararlar. Bir kararı değiştirmeden önce kullanıcıya sor; değişirse yeni satır ekle, eskisini silme ("K-xx yerine").

| No | Karar | Neden / not |
|---|---|---|
| K-01 | Tek geliştirici sitesi: `muhammedturabisancak.dev`; her uygulama alt yolda (`/levh`, `/levh/privacy`, `/levh/support`). Ayrı uygulama sitesi yok. | Mağazaların istediği gizlilik + destek adresi için yeterli; ileride uygulama sayısı artacak. Mağaza geliştirici adı zaten kullanıcının adı. |
| K-02 | Temel ilham: sindresorhus.com (kullanıcı çok beğendi); kullanıcıya özelleştirildi. Beğenilen diğer örnekler: Mercury Weather (10/10), Iconfactory, Sindre (8/10). | Zevk: renkli/parlak uygulama ikonları, cihaz görselleri, cilalı ama neon değil. |
| K-03 | Reddedilen his: "pavyon gibi" (koyu + parlayan altın yazı + yıldız + hâle + eğik 3B telefon). Abartılı parıltı, neon, kitsch süsleme yok. | Premium = sadelik + malzeme (cam, katmanlı gölge, ince ışık). |
| K-04 | Sayfa yapısı (Figma keşfi Y1–Y4'ün hepsi beğenildi, sayfalara dağıtıldı): **Ana sayfa** = Y3 iPhone ana ekranı girişi + Y4 kutucuk ızgarası + Y1 site haritası alt bilgisi; **Uygulamalar** = Y1 vitrin; **Levh** = Y4 girişi (havada ekranlar + mağaza düğmeleri); **Şu an** = Y2 "Bugün" ruhu. | Mobil geliştiriciye özel ana ekran metaforu; her yapı en uygun sayfada. |
| K-05 | Renk: ayrı renk seçimi yok — keşifte beğenilen ekranların paleti: mürekkep siyahı zemin, lacivert→zümrüt "duvar kâğıdı", mavi/mor/yeşil ışıklar, nane vurgu. Uygulamalar kendi renginde gelir (Levh zümrüt + altın). | Kullanıcı "beğendiğim ekranların renkleri" dedi. |
| K-06 | Tema: Koyu + Açık (+ sistem). Site koyu öncelikli; açık tema Figma'da çizildi ve beğenildi. | |
| K-07 | Ekran boyutları: Masaüstü 1440 + Mobil 390 (tablet akışkan). | |
| K-08 | Yazı tipleri: başlık Unbounded (geniş, kalın), metin Inter. SF Pro kullanılmaz (Apple dışı cihazlarda yok). Siteye yerel dosya olarak gömülür. | |
| K-09 | Levh sayfası gövdesi: **L4 Zikzak** — her özellik ayrı satır, telefon sırayla sol/sağ, her satırın kendi ışık tonu. L1–L3 arşivde. | |
| K-10 | Levh girişindeki sol telefon **Keşfet** ekranı (Kıble değil) — daha güçlü ekran. | Kullanıcı isteği. |
| K-11 | Levh mobil girişi: **M2 İçeride yelpaze** — ortada Bugün, arkada Keşfet ve Dini Günler; üç telefon da ekranın içinde, kenardan kesilmez. | Önceki dizilim "mobilde oturmamış". |
| K-12 | Mobil özellik satırlarında telefon **tam görünür** (kesilmez); her satır tek ekrana sığar (kart 350×740). | Kullanıcı isteği: "tek ekranda bir ekranı görebilsin, daha şık". |
| K-13 | Şu an sayfası: **N4 Pano** düzeni (solda sabit sütun: durum + yapılacaklar + saat) + **N2 zaman çizelgesi** (sağda, tarihe göre gruplu). | |
| K-14 | Gizlilik ve Destek: **D3 Tek sütun** (680 px, numaralı bölümler). | |
| K-15 | Hareketler (web laboratuvarında seçildi): **A1 Sahne** (açılış), **B1 Kalkış** (ikon üzerine gelme), **C3 İmleç hâlesi** (ışık), **D3 Sabit + üzerine gelince** (kutucuklar), **E2 Paralaks** (Levh satırları), **F1 Kutucuk büyür** (Levh kutucuğundan Levh sayfasına geçiş). Ayrıntı `docs/design.md`. | Laboratuvar: https://claude.ai/artifact/S4LwenUwQ2GGC9KhpuzfYE |
| K-16 | İngilizce: `/en/` altında ayrı sayfalar (SEO + mağazaya EN gizlilik adresi). | |
| K-17 | Canlı vakit sayacı: adhan-js (MIT), Diyanet/Turkey yöntemi, İstanbul (Fatih 41.0082, 28.9784). Depoya tek dosya olarak konur. | Levh'in kullandığı hesaplamanın JS karşılığı. |
| K-18 | Eski `resume.pdf` kaldırılır (telefon numarası içeriyor, 2025'ten kalma). Özgeçmiş bağlantısı yok; LinkedIn yeterli. Eski `/blog` bağlantısı (404) da kaldırılır. | |
| K-19 | Şu an içeriği tek dosyadan: `now/data.json` (durum, yapılacaklar, zaman çizelgesi). Ana sayfadaki "Şu an" widget'ı da buradan okur. | Güncellemesi kolay. |
| K-20 | İletişim: form yok; e-posta adresi seçilebilir metin + "Kopyala" düğmesi + sosyal bağlantılar (GitHub, LinkedIn, X, Medium). | |
| K-21 | Mağaza düğmeleri şimdilik "Yakında" yer tutucu; yayında Apple/Google resmî rozetleri ve marka kuralları kullanılır. | |
| K-22 | Video/yazı kayıtları şimdilik "örnek" yer tutucu; gerçek içerik bağlantıları kullanıcı verince `now/data.json`'a girer. | |
| K-23 | Çalışma şekli: açık tasarım kararları alternatifli sunulur, kullanıcı seçer; seçilmeyenler silinmez (Figma'da "Arşiv · …"). Kod tarafında da tasarım dışı bir karar çıkarsa sor. | |
| K-24 | Mobil menü: **A Sağdan panel** (4 akış laboratuvarından: A sağdan panel, B açılır cam kart, C alttan sayfa, D tam ekran sahne). Figma: Nav/MobileMenu 71:306; ilk tam ekran taslak ve not "Arşiv · Mobil menü" sayfasında. | Laboratuvar: https://claude.ai/artifact/DAEbtUyyY4EhYhs3AZsAGa |
| K-25 | Tema düğmesi Figma'daki gibi her durumda güneş ikonu; hangi modda olduğu yalnız erişilebilir etikette. | Kullanıcı: "Figma'da nasılsa öyle". |
