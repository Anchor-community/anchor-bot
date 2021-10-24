import { config } from 'dotenv'
import { Client, Intents } from 'discord.js'
import { prepareCommands } from './command'
import { prepareRoleManager } from './role'
// import { prepareMusicManager } from './music'

config()

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
})

prepareCommands(client)
prepareRoleManager(client)
// prepareMusicManager(client)

client.login(process.env.BOT_TOKEN)

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`)
})
