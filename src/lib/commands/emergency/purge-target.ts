import { CommandInteraction } from 'discord.js'

export const purgeTarget = (interaction: CommandInteraction) => {
  if (interaction.options.get('target')?.value) {
    const targetId = interaction.options.get('target')?.value as string

    interaction.guild?.members.fetch(targetId).then((target) => {
      target?.roles.add(process.env.PURGED_ROLE as string)
      interaction.reply(`${target.displayName}をパージしました。`)
    })
  } else {
    interaction.reply(`パージ対象を指定してください。`)
  }
}
