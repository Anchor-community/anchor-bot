import { CommandInteraction } from 'discord.js'

export const purgeAll = (interaction: CommandInteraction) => {
  interaction.guild?.members.fetch().then((members) =>
    members.forEach((member) => {
      member.roles.add(process.env.PURGED_ROLE as string)
      console.log(`Purged ${member.displayName}`)
    })
  )

  interaction.reply('解除までしばらくお待ち下さい。')
}
