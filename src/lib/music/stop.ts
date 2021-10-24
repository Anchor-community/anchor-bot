import { CommandInteraction } from 'discord.js'
import { VoiceConnection } from '@discordjs/voice'

export const stop = (interaction: CommandInteraction, voiceConnection?: VoiceConnection) => {
  if (voiceConnection) {
    voiceConnection.destroy()
    interaction.reply('音楽を停止しました！')
  } else {
    interaction.reply('現在何も再生されていません！')
  }
}
