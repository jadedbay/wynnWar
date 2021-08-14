const api = require('./api.js')

var emitter = require('events').EventEmitter;
var em = new emitter();

territoryList = api.getTerritoryList()
// function getNewTerritoryList() {
//     console.log(territoryList)

//     setTimeout(getNewTerritoryList, 5000);
// }

function checkAttacks() {
    em.on('newAttack', function (data) {
        console.log(data)
    });

    
}

// module.exports = {
//     getNewTerritoryList: getNewTerritoryList
// }
