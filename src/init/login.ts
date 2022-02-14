import { Client, Intents } from 'discord.js'
import { config } from 'dotenv'

config({ path: `${__dirname}/../envs/.env` })

export const bootBot = (token: string): Promise<Client> => {
  return new Promise((resolve) => {
    const client = new Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
      ],
    })

    client.login(token)

    client.on('ready', () => {
      console.log(`Logged in as ${client.user?.tag}!`)
      resolve(client)
    })
  })
}
