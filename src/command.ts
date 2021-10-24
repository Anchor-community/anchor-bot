import { config } from 'dotenv'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Client } from 'discord.js'
import { pingCommand, ping, githubCommand, github, musicCommand, music } from './lib/commands'

config()

const commands = [musicCommand, pingCommand, githubCommand]

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN as string)

export const prepareCommands = (client: Client) => {
  try {
    console.log('Started refreshing application (/) commands.')

    rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID as string, process.env.GUILD_ID as string), {
      body: commands,
    })

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return

    music(interaction)
    ping(interaction)
    github(interaction)
  })
}
