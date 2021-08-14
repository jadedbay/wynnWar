module.exports = {
	name: 'guildterritories',
	description: 'Shows guild\'s current attacks and territories taken or lost in this channel.',
    options: [{
		name: 'guild',
		type: 'STRING',
		description: 'Your guild tag. (Case Sensitive)',
		required: true,
	}],
	async execute(interaction) {
		await interaction.reply('Set channel `#' + interaction.client.channels.cache.get(interaction.channelId).name + '` to show current attacks on territories.');
	},
};