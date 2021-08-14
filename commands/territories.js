module.exports = {
	name: 'territories',
	description: 'Shows when a territory is taken/lost in this channel.',
	async execute(interaction) {
		await interaction.reply('Set channel `#' + interaction.client.channels.cache.get(interaction.channelId).name + '` to show current attacks on territories.');
	},
};