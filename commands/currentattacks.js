module.exports = {
	name: 'currentattacks',
	description: 'Territories currently being attack will be shown in this channel.',
	async execute(interaction) {
		await interaction.reply('Set channel:');
        console.log(interaction);
	},
};