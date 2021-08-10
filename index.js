const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

require('dotenv').config();
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const commandsData = [
    {
        name: 'currentattacks',
        description: 'Territories currently being attack will be shown in this channel.'
    },
    {
        name: 'attackresults',
        description: 'Shows when a guild has taken over a territory.'
    }
];

client.once('ready', async () => {
    client.user.setActivity('Wynncraft', { type: 'PLAYING' })
    console.log(`Logged in as ${client.user.tag}!`)

    //Register Slash Commands
    for(const guild of client.guilds.cache.map(guild => guild.id)) {
        const commands = await client.guilds.cache.get(guild)?.commands.set(commandsData);
        console.log(commands);
    }
})

//Joined Guild
client.on('guildCreate', async guild => {
    const commands = await client.guild.cache.get(guild)?.commands.set(commandsData);
})

client.on('interactionCreate', async interaction => {
    
	if (!interaction.isCommand()) return;
    if (!client.commands.has(interaction.commandName)) return;

	try {
		await client.commands.get(interaction.commandName).execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(process.env.CLIENT_TOKEN);