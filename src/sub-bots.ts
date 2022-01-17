import { config } from 'dotenv'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Client, Intents } from 'discord.js'
import { playerCommands, player } from './lib/commands'
import botCredentials from '../envs/sub-bots.json'

config({ path: `${__dirname}/../envs/.env` })

const commands = [...playerCommands]

export const prepareSubBots = () => {
  botCredentials.bots.forEach(async (bot) => {
    const client = new Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
      ],
    })

    await client.login(bot.token)

    const rest = new REST({ version: '9' }).setToken(bot.token as string)

    try {
      rest.put(Routes.applicationGuildCommands(bot.client, process.env.GUILD_ID as string), {
        body: commands,
      })
    } catch (error) {
      console.error(error)
    }

    client.on('ready', () => {
      console.log(`Logged in as ${client.user?.tag}!`)
    })

    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return

      player(interaction)
    })
  })
}
