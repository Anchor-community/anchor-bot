import { Client, GuildMember, Message } from 'discord.js'
import roles from './lib/roles/roles.json'
import channels from './lib/channels/channels.json'

export const prepareRoleManager = (client: Client) => {
  console.log('loading Role manager!')
  client.on('guildMemberAdd', async (member: GuildMember) => {
    if (member.user.bot) return

    const guestRole = await member.guild.roles.fetch(roles.guestRoleId)
    guestRole && member.roles.add(guestRole)
  })

  client.on('messageCreate', async (message: Message) => {
    const introductionChannel = await message.guild?.channels.fetch(channels.introductionChannelId)
    const guestRole = await message.member?.guild.roles.fetch(roles.guestRoleId)
    const verifiedRole = await message.member?.guild.roles.fetch(roles.verifiedRoleId)

    if (message.channelId === introductionChannel?.id) {
      guestRole && message.member?.roles.remove(guestRole)
      verifiedRole && message.member?.roles.add(verifiedRole)
    }
  })
}
