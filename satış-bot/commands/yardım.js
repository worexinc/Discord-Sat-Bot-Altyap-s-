const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "yardım",
    description: "Tüm komutları listeler",
    async execute(message, args) {
        const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("Shop-Bot Yardım Menüsü")
            .setDescription("Aşağıda tüm komutlar listelenmiştir:")
            .addFields(
                { name: "!yardım", value: "Yardım menüsünü gösterir", inline: false },
                { name: "!ping", value: "Botun gecikmesini gösterir", inline: false },
                { name: "!ürün-ekle", value: "Yeni ürün ekler (Admin)", inline: false },
                { name: "!ürün-sil", value: "Ürün siler (Admin)", inline: false },
                { name: "!stok", value: "Mevcut stokları gösterir", inline: false },
                { name: "!aktif-ürünler", value: "Satışta olan ürünleri listeler", inline: false }
            )
            .setFooter({ text: "Shop-Bot © 2026" })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};
