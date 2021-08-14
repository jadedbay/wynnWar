const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

var oldTList;

async function checkTerritories() {
	let data = await fetch('https://api.wynncraft.com/public_api.php?action=territoryList')
		.then(res => res.json())
		.catch(err => {console.error(err)});

	if (!data) {
		return;
	}


	if (typeof oldTList !== 'undefined') {
		if (JSON.stringify(oldTList) !== JSON.stringify(data.territories)) {
			console.log('change');
			for (territory in data.territories) {
				if (JSON.stringify(oldTList[territory].guild) !== JSON.stringify(data.territories[territory].guild)) {

					const territoryEmbed = new MessageEmbed()
						.setColor('#0437F2')
						.setTitle(territory)
						.addFields(
							{ name: data.territories[territory].guild, value: 'Has taken *' + territory + '*'},
							{ name: oldTList[territory].guild, value: 'Has lost *' + territory + '*'}
						)
						.setTimestamp()

						client.channels.cache.get('867383094624649240').send({ embeds: [territoryEmbed] });
				}
			}
		}
	}

	oldTList = data.territories;
    setTimeout(checkTerritories, 10000);
}

module.exports = {
    checkTerritories: checkTerritories
}