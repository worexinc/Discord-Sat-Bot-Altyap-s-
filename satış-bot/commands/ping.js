const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Botun gecikmesini gösterir",
    async execute(message, args) {
        const msg = await message.reply("Ping ölçülüyor...");
        const embed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle("Ping Sonucu")
            .setDescription(`Gecikme: ${msg.createdTimestamp - message.createdTimestamp}ms`);

        msg.edit({ content: null, embeds: [embed] });
    }
};
