import { CommandInteraction } from 'discord.js'
import { DiscordGatewayAdapterCreator, joinVoiceChannel } from '@discordjs/voice'

export const musicCommand = {
  name: 'music',
  description: '[WIP] hoge',
}

export const music = (interaction: CommandInteraction) => {
  if (interaction.commandName === 'music') {
    const sender = interaction.guild?.members.cache.find((member) => member.id === interaction.user.id)

    console.log(sender?.voice.channel)

    if (!sender?.voice.channel) {
      interaction.reply('このコマンドはボイスチャンネルに入った状態で実行してください！')
      return
    }

    const connection = joinVoiceChannel({
      channelId: sender.voice.channel.id,
      guildId: interaction.guild?.id || '',
      adapterCreator: interaction.guild?.voiceAdapterCreator as DiscordGatewayAdapterCreator,
    })

    connection.destroy()
  }
}
