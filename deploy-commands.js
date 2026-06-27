const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [
  {
    name: 'takım-seç',
    description: 'Bir Süper Lig takımı seçin ve menajer olun',
    options: [
      {
        name: 'takım',
        description: 'Yönetmek istediğiniz takımı seçin',
        type: 3,
        required: true,
        choices: [
          { name: 'Fenerbahçe', value: 'Fenerbahçe' },
          { name: 'Galatasaray', value: 'Galatasaray' },
          { name: 'Beşiktaş', value: 'Beşiktaş' },
          { name: 'Trabzonspor', value: 'Trabzonspor' },
          { name: 'Konyaspor', value: 'Konyaspor' }
        ]
      }
    ]
  },
  {
    name: 'kadro',
    description: 'Seçtiğiniz takımın oyuncu kadrosunu görüntüleyin'
  },
  {
    name: 'puan-durumu',
    description: 'Süper Lig puan durumunu görüntüleyin'
  },
  {
    name: 'takım-bilgisi',
    description: 'Takımınızın detaylı bilgilerini görüntüleyin'
  },
  {
    name: 'transfer',
    description: 'Oyuncu transfer edin',
    options: [
      {
        name: 'oyuncu',
        description: 'Transfer etmek istediğiniz oyuncunun adı',
        type: 3,
        required: true
      },
      {
        name: 'hedef-takım',
        description: 'Oyuncuyu transfer etmek istediğiniz takım',
        type: 3,
        required: true,
        choices: [
          { name: 'Fenerbahçe', value: 'Fenerbahçe' },
          { name: 'Galatasaray', value: 'Galatasaray' },
          { name: 'Beşiktaş', value: 'Beşiktaş' },
          { name: 'Trabzonspor', value: 'Trabzonspor' },
          { name: 'Konyaspor', value: 'Konyaspor' }
        ]
      }
    ]
  },
  {
    name: 'formasyonu-değiştir',
    description: 'Takımın formasyonunu değiştirin',
    options: [
      {
        name: 'formayson',
        description: 'Yeni formasyonu seçin',
        type: 3,
        required: true,
        choices: [
          { name: '4-3-3', value: '4-3-3' },
          { name: '4-2-3-1', value: '4-2-3-1' },
          { name: '3-5-2', value: '3-5-2' },
          { name: '5-3-2', value: '5-3-2' },
          { name: '4-4-2', value: '4-4-2' }
        ]
      }
    ]
  },
  {
    name: 'istifa-et',
    description: 'Menajer olduğunuz takımdan istifa edin'
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('🔄 Slash komutları yükleniyor...');

    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
      { body: commands }
    );

    console.log('✅ Slash komutları başarılı şekilde yüklendi!');
  } catch (error) {
    console.error(error);
  }
})();
