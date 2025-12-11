const fs = require("fs");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const config = require("./config.json"); // config dosyasını alıyoruz

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.commands = new Collection();

// Komutları yükle
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Komutları dinle
client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("Komutu çalıştırırken bir hata oluştu!");
    }
});

// Botu başlat
client.login(config.token);
client.on("ready", () => {
    console.log(`${client.user.tag} giriş yaptı!`);

    // Durum ayarı
    client.user.setPresence({
        status: "online", // online, idle, dnd, invisible
        activities: [
            { name: "Worex INC.", type: 3 } // 0: Playing, 1: Streaming, 2: Listening, 3: Watching, 5: Competing
        ]
    });
});

