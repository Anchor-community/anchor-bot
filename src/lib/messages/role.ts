import { config } from 'dotenv'
import { Client, GuildMember, Message } from 'discord.js'

config({ path: `${__dirname}/../envs/.env` })

export const prepareRoleManager = (client: Client) => {
  console.log('loading Role manager!')

  client.on('guildMemberAdd', async (member: GuildMember) => {
    if (member.user.bot || member.guild.id !== process.env.GUILD_ID) return

    const guestRole = await member.guild.roles.fetch(process.env.GUEST_ROLE as string)
    guestRole && member.roles.add(guestRole).catch((err) => console.log(err))
  })

  client.on('messageCreate', async (message: Message) => {
    if (message.guild?.id !== process.env.GUILD_ID) return

    const introductionChannel = await message.guild?.channels.fetch(process.env.INTRODUCTION_CHANNEL as string)
    const guestRole = await message.member?.guild.roles.fetch(process.env.GUEST_ROLE as string)
    const verifiedRole = await message.member?.guild.roles.fetch(process.env.VERIFIED_ROLE as string)

    if (message.channelId === introductionChannel?.id) {
      guestRole && message.member?.roles.remove(guestRole).catch((err) => console.error(err))
      verifiedRole && message.member?.roles.add(verifiedRole).catch((err) => console.error(err))
    }
  })
}
