const fs = require("fs");
const { EmbedBuilder } = require("discord.js");
const ürünDosyası = "./products.json";

module.exports = {
    name: "ürün-sil",
    description: "Ürün siler (Admin)",
    async execute(message, args) {
        if (!message.member.permissions.has("Administrator")) {
            const embed = new EmbedBuilder()
                .setColor(0xff0000)
                .setDescription("❌ Bunu yapmak için yetkin yok!");
            return message.reply({ embeds: [embed] });
        }

        const isim = args[0];
        if (!isim) {
            const embed = new EmbedBuilder()
                .setColor(0xffa500)
                .setDescription("⚠ Kullanım: !ürün-sil <isim>");
            return message.reply({ embeds: [embed] });
        }

        if (!fs.existsSync(ürünDosyası)) {
            const embed = new EmbedBuilder()
                .setColor(0xffa500)
                .setDescription("Hiç ürün yok.");
            return message.reply({ embeds: [embed] });
        }

        let ürünler = JSON.parse(fs.readFileSync(ürünDosyası));
        const yeniÜrünler = ürünler.filter(u => u.isim.toLowerCase() !== isim.toLowerCase());
        fs.writeFileSync(ürünDosyası, JSON.stringify(yeniÜrünler, null, 2));

        const embed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle("✅ Ürün Silindi")
            .setDescription(`${isim} adlı ürün silindi!`);

        message.reply({ embeds: [embed] });
    }
};
