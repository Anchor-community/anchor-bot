import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { purgeTarget, purgeAll, pardonTarget, pardonAll } from './emergency'

const purgeCommand = new SlashCommandBuilder()
  .setName('purge')
  .setDescription('任意のユーザーをパージします。')
  .addSubcommand((subCommand) =>
    subCommand
      .setName('target')
      .setDescription('パージする対象を指定します。')
      .addUserOption((target) => target.setName('target').setDescription('パージする対象を指定します。'))
  )

const lockCommand = new SlashCommandBuilder()
  .setName('purge-all')
  .setDescription('《非常用》全ユーザーをパージします。')

const pardonCommand = new SlashCommandBuilder()
  .setName('pardon')
  .setDescription('任意のユーザーのパージを解除します。')
  .addSubcommand((subCommand) =>
    subCommand
      .setName('target')
      .setDescription('パージの解除対象を指定します。')
      .addUserOption((target) => target.setName('target').setDescription('パージの解除対象を指定します。'))
  )

const unlockCommand = new SlashCommandBuilder()
  .setName('pardon-all')
  .setDescription('《非常用》全ユーザーのパージを解除します。')

export const enforcerCommands = [purgeCommand, lockCommand, pardonCommand, unlockCommand]

export const enforcer = (interaction: CommandInteraction) => {
  interaction.commandName === 'purge' && purgeTarget(interaction)
  interaction.commandName === 'purge-all' && purgeAll(interaction)
  interaction.commandName === 'pardon' && pardonTarget(interaction)
  interaction.commandName === 'pardon-all' && pardonAll(interaction)
}
