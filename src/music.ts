import { config } from 'dotenv'
import { Client } from 'discord.js'
import { join } from 'path'
import {
  getVoiceConnection,
  VoiceConnection,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} from '@discordjs/voice'

config()

export const prepareMusicManager = (client: Client) => {
  client.on('voiceStateUpdate', async (voiceState) => {
    if (voiceState.member !== voiceState.guild.me) return
    const connection = (await getVoiceConnection(voiceState.guild.id)) as VoiceConnection
    const player = await createAudioPlayer()
    connection.subscribe(player)

    const resource = await createAudioResource(join(__dirname, '/music/music1.mp3'), {
      inlineVolume: true,
    })
    resource.volume?.setVolume(0.25)

    player.play(resource)

    player.on(AudioPlayerStatus.Playing, () => {
      console.log('The audio player has started playing!')
    })

    player.on('error', (error) => {
      console.error('Error:', error.message)
    })
  })
}
