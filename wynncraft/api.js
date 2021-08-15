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

                    var timeAcquired = oldTList[territory].acquired.split(' ');
                    var timeUnix = new Date(timeAcquired[0] + 'T' + timeAcquired[1] + '.000Z');
                    var timeElapsed = data.request.timestamp * 1000 - timeUnix;

                    var days = Math.floor(timeElapsed/86400000);
                    timeElapsed -= 86400000*days;
                    var hours = Math.floor(timeElapsed/3600000);
                    timeElapsed -= 3600000*hours;
                    var minutes = Math.floor(timeElapsed/60000);
                    timeElapsed -= 60000*minutes;
                    var seconds = Math.floor(timeElapsed/1000);

					const territoryEmbed = new MessageEmbed()
						.setColor('#0437F2')
						.setTitle(territory)
						.addFields(
							{ name: data.territories[territory].guild, value: 'Has taken *' + territory + '*.'},
							{ name: oldTList[territory].guild, value: 'Held *' + territory + '* for *' + days + '* days, *' + hours + '* hours, *'+ minutes + '* minutes and *'+ seconds + '* seconds.'}
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