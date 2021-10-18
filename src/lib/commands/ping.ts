import { CommandInteraction } from 'discord.js'

export const pingCommand = {
  name: 'ping',
  description: 'Replies with Pong!',
}

export const ping = (interaction: CommandInteraction) => {
  if (interaction.commandName === 'ping') interaction.reply('pong!')
}
