import { CommandInteraction } from 'discord.js'

export const pardonTarget = (interaction: CommandInteraction) => {
  if (interaction.options.get('target')?.value) {
    const targetId = interaction.options.get('target')?.value as string

    interaction.guild?.members.fetch(targetId).then((target) => {
      target?.roles.remove(process.env.PURGED_ROLE as string)
      interaction.reply(`${target.displayName}のパージを解除します。`)
    })
  } else {
    interaction.reply(`パージ解除対象を指定してください。`)
  }
}
