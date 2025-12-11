const fs = require("fs");
const { EmbedBuilder } = require("discord.js");
const ürünDosyası = "./products.json";

module.exports = {
    name: "aktif-ürünler",
    description: "Satışta olan ürünleri listeler",
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
            .setColor(0x00ff99)
            .setTitle("🛒 Aktif Ürünler")
            .setDescription(
                ürünler.map(u => `**${u.isim}** | Fiyat: ${u.fiyat} TL`).join("\n")
            );

        message.reply({ embeds: [embed] });
    }
};
