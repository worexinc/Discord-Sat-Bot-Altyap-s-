const fs = require("fs");
const { EmbedBuilder } = require("discord.js");
const ürünDosyası = "./products.json";

module.exports = {
    name: "ürün-ekle",
    description: "Yeni ürün ekler (Admin)",
    async execute(message, args) {
        if (!message.member.permissions.has("Administrator")) {
            const embed = new EmbedBuilder()
                .setColor(0xff0000)
                .setDescription("❌ Bunu yapmak için yetkin yok!");
            return message.reply({ embeds: [embed] });
        }

        const [isim, fiyat, stok] = args;
        if (!isim || !fiyat || !stok) {
            const embed = new EmbedBuilder()
                .setColor(0xffa500)
                .setDescription("⚠ Kullanım: !ürün-ekle <isim> <fiyat> <stok>");
            return message.reply({ embeds: [embed] });
        }

        let ürünler = [];
        if (fs.existsSync(ürünDosyası)) {
            ürünler = JSON.parse(fs.readFileSync(ürünDosyası));
        }

        ürünler.push({ isim, fiyat: Number(fiyat), stok: Number(stok) });
        fs.writeFileSync(ürünDosyası, JSON.stringify(ürünler, null, 2));

        const embed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle("✅ Ürün Eklendi")
            .setDescription(`${isim} adlı ürün başarıyla eklendi!`)
            .addFields(
                { name: "Fiyat", value: `${fiyat} TL`, inline: true },
                { name: "Stok", value: `${stok} adet`, inline: true }
            );

        message.reply({ embeds: [embed] });
    }
};
