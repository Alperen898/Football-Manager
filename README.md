# Discord Futbol Manager Botu 🏆⚽

Süper Lig takımlarını yönettiğiniz, oyuncu transfer ettiğiniz, puan durumunu takip ettiğiniz Discord botu!

## 🎯 Özellikler

- ✅ Süper Lig takımlarını seçme ve menajerlik yapma
- ✅ Oyuncu kadrosu görüntüleme (gerçek oyuncularla)
- ✅ Puan durumu takibi
- ✅ Oyuncu transferi sistemi
- ✅ Takım bütçesi yönetimi
- ✅ Formasyonu değiştirme
- ✅ İstifa sistemi

## 🚀 Kurulum

### 1. Gereksinimleri Yükleyin
```bash
npm install
```

### 2. .env Dosyasını Oluşturun
`.env.example` dosyasını `.env` olarak kopyalayın ve düzenleyin:

```
DISCORD_TOKEN=your_bot_token_here
DISCORD_CLIENT_ID=your_client_id_here
```

Bot token'ınızı [Discord Developer Portal](https://discord.com/developers/applications)'dan alın.

### 3. Komutları Yayınlayın
```bash
node deploy-commands.js
```

### 4. Botu Başlatın
```bash
npm start
```

## 📋 Komutlar

| Komut | Açıklama |
|-------|----------|
| `/takım-seç` | Bir Süper Lig takımı seçin |
| `/kadro` | Takımınızın oyuncu kadrosunu görüntüleyin |
| `/puan-durumu` | Ligin puan durumunu görüntüleyin |
| `/takım-bilgisi` | Takımınızın detaylı bilgilerini görüntüleyin |
| `/transfer` | Oyuncu transfer edin |
| `/formasyonu-değiştir` | Takım formasyonunu değiştirin |
| `/istifa-et` | Menajer pozisyonunuzdan istifa edin |

## 📊 Takımlar

Mevcut Süper Lig takımları:
1. **Fenerbahçe** - Bütçe: ₺500M
2. **Galatasaray** - Bütçe: ₺480M
3. **Beşiktaş** - Bütçe: ₺450M
4. **Trabzonspor** - Bütçe: ₺420M
5. **Konyaspor** - Bütçe: ₺380M

## 🎮 Oyun Mekanikleri

- Her takımda gerçek oyuncular vardır
- Oyuncu transfer ettikçe bütçeniz değişir
- Puan durumu dinamik olarak güncellenir
- Her oyuncunun farklı pazar değeri ve rating'i vardır

## 📁 Klasör Yapısı

```
Football-Manager/
├── index.js                 # Ana bot dosyası
├── deploy-commands.js       # Komut yayınlama
├── package.json             # Proje bağımlılıkları
├── .env.example             # Ortam değişkenleri şablonu
├── .gitignore              # Git ignore dosyası
└── data/
    ├── teams.json          # Takım ve oyuncu verileri
    ├── users.json          # Kullanıcı verileri
    └── fixture.json        # Maç fikstürü
```

## 🛠 Teknolojiler

- **Discord.js** - Discord API kütüphanesi
- **Node.js** - JavaScript runtime
- **JSON** - Veri depolama

## 📝 Lisans

Bu proje özgür olarak kullanılabilir.

## 🤝 Destek

Sorunlar ve öneriler için GitHub Issues'ı kullanın.

---

**Keyifli yönetim! 🎉⚽**
