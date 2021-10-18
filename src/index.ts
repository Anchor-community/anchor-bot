import { config } from 'dotenv'
import { Client, Intents } from 'discord.js'
import { prepareCommands } from './command'

config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

prepareCommands(client)

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`)
})

client.login(process.env.BOT_TOKEN)
