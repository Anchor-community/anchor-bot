import { CommandInteraction } from 'discord.js'

export const pingCommand = {
  name: 'peng',
  description: 'Replies with Pong!',
}

export const ping = (interaction: CommandInteraction) => {
  if (interaction.commandName === 'peng') {
    console.log(interaction.member)
    interaction.reply('pong!')
  }
}
