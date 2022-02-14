import { config } from 'dotenv'
import { Client, Guild, Message, MessageEmbed } from 'discord.js'

config({ path: `${__dirname}/../envs/.env` })

const spamMessages: Message[] = []

export const prepareAntiSpam = (client: Client) => {
  client.on('messageCreate', async (message: Message) => {
    if (message.guild?.id !== process.env.GUILD_ID) return
    if (message.author.bot) return
    spamMessages.push(message)
    setTimeout(() => {
      spamMessages.shift()
    }, 1000)

    spamMessages.length >= 6 && triggerLockDown(spamMessages)
  })

  console.log('Anti-Spam loaded!')
}

const triggerLockDown = (messages: Message[]) => {
  console.log(messages)

  purgeAll(messages)
  announce(messages[0])
}

const purgeAll = (messages: Message[]) => {
  const enforcedGuild = messages[0].guild as Guild
  enforcedGuild.members.fetch().then((members) =>
    members.forEach((member) => {
      member.roles.add(process.env.PURGED_ROLE as string)
      console.log(`Purged ${member.displayName}`)
    })
  )
}

const announce = (message: Message) => {
  const announceMessage = new MessageEmbed()
    .setColor('#D30000')
    .setTitle('重要なお知らせ')
    .setImage(
      'https://media.discordapp.net/attachments/805160279528833046/942714413432070214/emergency_state_banner.png'
    )
    .addField(
      'Anchorのセキュリティボットが異常な挙動を検知しました。',
      'サーバーのメンテナが対応するまでお待ち下さい。'
    )
    .setFooter(
      'Anchor メンテナンスチーム',
      'https://media.discordapp.net/attachments/805160279528833046/942735931943841862/Frame_16.png'
    )

  message.channel.send({ embeds: [announceMessage] })
}
