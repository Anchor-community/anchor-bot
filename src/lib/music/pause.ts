import { CommandInteraction } from 'discord.js'
import { createAudioPlayer, AudioPlayerStatus, getVoiceConnection, VoiceConnection } from '@discordjs/voice'

export const pause = (interaction: CommandInteraction) => {
  const connection = getVoiceConnection(interaction.guild?.id as string) as VoiceConnection
  const player = createAudioPlayer()
  connection.subscribe(player)

  player.on(AudioPlayerStatus.Playing, () => {
    console.log('The audio player has started playing!')
  })
}
