module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.user.setActivity('Wynncraft', { type: 'PLAYING' })
        console.log(`Logged in as ${client.user.tag}!`)
    }
}