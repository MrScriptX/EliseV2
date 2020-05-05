const Discord = require('discord.js');
const client = new Discord.Client();
const { config } = require("dotenv");

config({
    path: __dirname + "/.env"
});

client.on('ready', () => {
    console.log('Tuturuuu ! :ST_mayuri_tuturu:');
});

let mute_list = [];

let command = {
    "ping": {
        "description": "Check if Elise is alive.",
        process: async (message, args) => {
            await message.channel.send(`Tuturuuuu!`);
        }
    },
    "mute": {
        "description": "Mute someone in text channels.",
        process: async (message, args) => {
            if (message.author.tag === 'R3DC0DE#8002')
            {
                mute_list.push(args[0]);
                await message.channel.send(`C'est fait !`);
            }
        }
    },
    "unmute": {
        "description": "Unmute someone in the text channels.",
        process: async (message, args) => {
            if (message.author.tag === 'R3DC0DE#8002') 
            {
                let index = mute_list.findIndex(args[0]);

                if (index != -1) 
                {
                    mute_list.slice(index, 1);
                    await message.channel.send(args[0] + ` est unmute !`);
                }
            }
        }
    }
};

client.on('message', async message => {
    const prefix = '&';

    if (message.author.bot) return;
    if (!message.guild) return;

    mute_list.forEach(tag => {
        if (message.author.tag === tag) {
            message.delete();
            return;
        }    
    });

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    command[cmd].process(message, args);
});

client.login(process.env.TOKEN);