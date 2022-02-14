import { config } from 'dotenv'
import { playerCommands, player } from './lib/commands'
import botCredentials from '../envs/sub-bots.json'
import { bootBot } from './init/login'
import { loadCommands } from './init/command'

config({ path: `${__dirname}/../envs/.env` })

const commands = [...playerCommands]

export const prepareSubBots = () => {
  botCredentials.bots.forEach(async (bot) => {
    bootBot(bot.token).then((client) => {
      loadCommands(bot.token, bot.client, commands)

      client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return

        player(interaction)
      })
    })
  })
}
