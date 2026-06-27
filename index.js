const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Veri dosyalarının yolları
const teamsPath = path.join(__dirname, 'data', 'teams.json');
const usersPath = path.join(__dirname, 'data', 'users.json');
const fixturePath = path.join(__dirname, 'data', 'fixture.json');

// Veri yükleme fonksiyonları
function loadTeams() {
  return JSON.parse(fs.readFileSync(teamsPath, 'utf8'));
}

function loadUsers() {
  return JSON.parse(fs.readFileSync(usersPath, 'utf8'));
}

function loadFixture() {
  return JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
}

function saveTeams(data) {
  fs.writeFileSync(teamsPath, JSON.stringify(data, null, 2));
}

function saveUsers(data) {
  fs.writeFileSync(usersPath, JSON.stringify(data, null, 2));
}

function saveFixture(data) {
  fs.writeFileSync(fixturePath, JSON.stringify(data, null, 2));
}

client.once('ready', () => {
  console.log(`✅ Bot başarılı şekilde giriş yaptı: ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  // /takım-seç komutu
  if (commandName === 'takım-seç') {
    const teamName = interaction.options.getString('takım');
    const teams = loadTeams();
    const users = loadUsers();
    const userId = interaction.user.id;

    const team = teams.find(t => t.name.toLowerCase() === teamName.toLowerCase());

    if (!team) {
      return interaction.reply({ content: '❌ Takım bulunamadı!', ephemeral: true });
    }

    if (team.manager) {
      return interaction.reply({ content: '❌ Bu takım zaten bir menajer tarafından yönetiliyor!', ephemeral: true });
    }

    team.manager = userId;
    users.managers[userId] = { teamId: team.id, teamName: team.name };

    saveTeams(teams);
    saveUsers(users);

    const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle(`🎉 Takım Başarılı Şekilde Seçildi!`)
      .setDescription(`${interaction.user.username} artık **${team.name}** menajerliğini yapıyor!`)
      .addFields(
        { name: '💰 Bütçe', value: `₺${team.budget.toLocaleString('tr-TR')}`, inline: true },
        { name: '📊 Puan', value: `${team.points}`, inline: true },
        { name: '⚽ Oyuncu Sayısı', value: `${team.players.length}`, inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }

  // /kadro komutu
  if (commandName === 'kadro') {
    const teams = loadTeams();
    const users = loadUsers();
    const userId = interaction.user.id;
    const userTeam = users.managers[userId];

    if (!userTeam) {
      return interaction.reply({ content: '❌ Henüz takım seçmemişsin! `/takım-seç` ile başla.', ephemeral: true });
    }

    const team = teams.find(t => t.id === userTeam.teamId);
    let description = '';

    team.players.forEach((player, index) => {
      description += `**${index + 1}. ${player.name}**\n`;
      description += `📍 Pozisyon: ${player.position} | ⭐ Rating: ${player.rating}\n`;
      description += `🎂 Yaş: ${player.age} | 💵 Pazar Değeri: ₺${player.market_value.toLocaleString('tr-TR')}\n\n`;
    });

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setTitle(`${team.name} - Oyuncu Kadrosu`)
      .setDescription(description)
      .setFooter({ text: `Toplam Oyuncu: ${team.players.length}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }

  // /puan-durumu komutu
  if (commandName === 'puan-durumu') {
    const teams = loadTeams();

    const standings = teams.sort((a, b) => {
      const pointsDiff = b.points - a.points;
      if (pointsDiff !== 0) return pointsDiff;
      return (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst);
    });

    let description = '';
    standings.forEach((team, index) => {
      const goalDiff = team.goalsFor - team.goalsAgainst;
      description += `**${index + 1}. ${team.name}**\n`;
      description += `🏆 ${team.points} Puan | 🎯 ${team.wins}W-${team.draws}D-${team.losses}L\n`;
      description += `⚽ ${team.goalsFor}:${team.goalsAgainst} (${goalDiff > 0 ? '+' : ''}${goalDiff})\n\n`;
    });

    const embed = new EmbedBuilder()
      .setColor('Gold')
      .setTitle('📊 Süper Lig - Puan Durumu')
      .setDescription(description)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }

  // /takım-bilgisi komutu
  if (commandName === 'takım-bilgisi') {
    const teams = loadTeams();
    const users = loadUsers();
    const userId = interaction.user.id;
    const userTeam = users.managers[userId];

    if (!userTeam) {
      return interaction.reply({ content: '❌ Henüz takım seçmemişsin!', ephemeral: true });
    }

    const team = teams.find(t => t.id === userTeam.teamId);

    const embed = new EmbedBuilder()
      .setColor('Purple')
      .setTitle(`${team.name} - Takım Bilgileri`)
      .addFields(
        { name: '💰 Bütçe', value: `₺${team.budget.toLocaleString('tr-TR')}`, inline: true },
        { name: '🏆 Puan', value: `${team.points}`, inline: true },
        { name: '⚽ Oyuncu Sayısı', value: `${team.players.length}`, inline: true },
        { name: '📋 Formasyonu', value: team.formation, inline: true },
        { name: '🎯 Galibiyet', value: `${team.wins}`, inline: true },
        { name: '🤝 Beraberlik', value: `${team.draws}`, inline: true },
        { name: '❌ Yenilgi', value: `${team.losses}`, inline: true },
        { name: '⚽ Gol Atılan', value: `${team.goalsFor}`, inline: true },
        { name: '⚽ Gol Yenen', value: `${team.goalsAgainst}`, inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }

  // /transfer komutu
  if (commandName === 'transfer') {
    const playerName = interaction.options.getString('oyuncu');
    const targetTeamName = interaction.options.getString('hedef-takım');
    const teams = loadTeams();
    const users = loadUsers();
    const userId = interaction.user.id;
    const userTeam = users.managers[userId];

    if (!userTeam) {
      return interaction.reply({ content: '❌ Henüz takım seçmemişsin!', ephemeral: true });
    }

    const currentTeam = teams.find(t => t.id === userTeam.teamId);
    const targetTeam = teams.find(t => t.name.toLowerCase() === targetTeamName.toLowerCase());

    if (!targetTeam) {
      return interaction.reply({ content: '❌ Hedef takım bulunamadı!', ephemeral: true });
    }

    const playerIndex = currentTeam.players.findIndex(p => p.name.toLowerCase() === playerName.toLowerCase());

    if (playerIndex === -1) {
      return interaction.reply({ content: '❌ Oyuncu kadronuzda bulunamadı!', ephemeral: true });
    }

    const player = currentTeam.players[playerIndex];

    if (currentTeam.budget < player.market_value) {
      return interaction.reply({ content: '❌ Yeterli bütçeniz yok!', ephemeral: true });
    }

    currentTeam.players.splice(playerIndex, 1);
    currentTeam.budget -= player.market_value;
    targetTeam.budget += player.market_value;
    targetTeam.players.push(player);

    saveTeams(teams);

    const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle('✅ Transfer Başarılı!')
      .setDescription(`**${player.name}** başarıyla **${targetTeam.name}**'a transfer edildi!`)
      .addFields(
        { name: '💵 Transfer Ücreti', value: `₺${player.market_value.toLocaleString('tr-TR')}`, inline: false }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.DISCORD_TOKEN);
