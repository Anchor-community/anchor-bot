import { CommandInteraction } from 'discord.js'

export const pardonAll = (interaction: CommandInteraction) => {
  interaction.guild?.members.fetch().then((members) =>
    members.forEach((member) => {
      member.roles.remove(process.env.PURGED_ROLE as string)
      console.log(`Pardoned ${member.displayName}`)
    })
  )

  interaction.reply('全ユーザーのパージを解除します。')
}
