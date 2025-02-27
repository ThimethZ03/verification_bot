const { Collection, Client, Discord, MessageEmbed, Message } = require('discord.js');
const client = new Client({
    disableMention: 'everyone'
});

require('discord-buttons')(client);
const path = require('path')
const fs = require('fs')
const discordbuttons = require('discord-buttons')
const { MessageButton, MessageActionRow } = require("discord-buttons")
const keepAlive = require("./server");
const config = require('./config.json');
client.prefix = config.prefix;

client.on('clickButton', async (button) => {
    if (button.id == 'AddVerifiedRole') {
        button.reply.send(`You have been verified!`, true);
        const role = button.guild.roles.cache.get(config.roleid);
        const member = button.clicker.member;
        await member.roles.add(role);
    }
});

client.on('ready', () => {
    console.log('The bot is online!')
})
client.on('message', async (message) => {
    if (message.content.startsWith('.verify')) {
        const embed = new MessageEmbed()
            .setTitle('Verification')
            .setColor("#c318cf")
            .setDescription('Click on the button below to verify!')
            .setThumbnail(`https://cdn.discordapp.com/attachments/1188520727683547140/1188902407632064563/new-logo-transparent.png?`)
            .setImage("https://cdn.discordapp.com/attachments/1188520729147363406/1189608954603511819/VERIFYr.png?ex=659ec8ac&is=658c53ac&hm=cbec85b9dd5807e23dcb8e1fae136c6183935a28fc4b04be8a4ac0d23d5bc75b&")
        const add = new MessageButton()
            .setStyle("green")
            .setLabel(":yeilonayy:Verify Me!")
            .setID("AddVerifiedRole")

        const row = new MessageActionRow()
            .addComponent([add])


        message.channel.send({ component: row, embed: embed })
    }
})

keepAlive();
client.login(config.TOKEN);
