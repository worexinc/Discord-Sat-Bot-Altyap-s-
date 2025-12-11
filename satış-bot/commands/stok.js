const fs = require("fs");
const { EmbedBuilder } = require("discord.js");
const ürünDosyası = "./products.json";

module.exports = {
    name: "stok",
    description: "Mevcut stokları gösterir",
    async execute(message, args) {
        if (!fs.existsSync(ürünDosyası)) {
            const embed = new EmbedBuilder()
                .setColor(0xffa500)
                .setDescription("Hiç ürün yok.");
            return message.reply({ embeds: [embed] });
        }

        const ürünler = JSON.parse(fs.readFileSync(ürünDosyası));
        if (ürünler.length === 0) {
            const embed = new EmbedBuilder()
                .setColor(0xffa500)
                .setDescription("Hiç ürün yok.");
            return message.reply({ embeds: [embed] });
        }

        const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("📦 Stok Durumu")
            .setDescription(
                ürünler.map(u => `**${u.isim}** → ${u.stok} adet`).join("\n")
            );

        message.reply({ embeds: [embed] });
    }
};
