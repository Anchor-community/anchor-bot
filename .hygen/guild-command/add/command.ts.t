---
to: src/lib/commands/<%= name %>.ts
unless_exists: true
---
import { CommandInteraction } from 'discord.js'

export const pingCommand = {
  name: 'ping',
  description: 'Replies with Pong!',
}

export const ping = (interaction: CommandInteraction) => {
  if (interaction.commandName === 'ping') interaction.reply('pong!')
}
