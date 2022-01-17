import { config } from 'dotenv'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Client, Intents } from 'discord.js'
import { enforcerCommands, enforcer } from './lib/commands'
import { prepareRoleManager } from './role'

config({ path: `${__dirname}/../envs/.env` })

const commands = [...enforcerCommands]
const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN as string)

export const prepareMasterBot = () => {
  const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_VOICE_STATES,
    ],
  })

  client.login(process.env.BOT_TOKEN)

  client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`)
  })

  prepareRoleManager(client)

  try {
    rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID as string, process.env.GUILD_ID as string), {
      body: commands,
    })
  } catch (error) {
    console.error(error)
  }

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return

    enforcer(interaction)
  })
}
