import { CommandInteraction, GuildMember } from 'discord.js'
import { join } from 'path'
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  DiscordGatewayAdapterCreator,
  VoiceConnection,
  AudioPlayerStatus,
} from '@discordjs/voice'
import { readdirSync } from 'fs'

export const play = async (interaction: CommandInteraction, voiceConnection?: VoiceConnection) => {
  const sender = interaction.member as GuildMember

  const connection =
    voiceConnection ??
    joinVoiceChannel({
      channelId: sender.voice.channel?.id as string,
      guildId: sender.guild.id,
      adapterCreator: sender.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator,
    })

  const player = createAudioPlayer()
  connection.subscribe(player)

  const musics = readdirSync(join(__dirname, '/../../music/')).map((music) => join(__dirname, `/../../music/${music}`))

  // Initial play

  let currentTrackIndex = 0

  const initialResource = createAudioResource(musics[currentTrackIndex], {
    inlineVolume: true,
  })

  initialResource.volume?.setVolume(0.25)
  player.play(initialResource)

  player.on(AudioPlayerStatus.Idle, () => {
    currentTrackIndex + 1 === musics.length ? (currentTrackIndex = 0) : currentTrackIndex++

    const resource = createAudioResource(musics[currentTrackIndex], {
      inlineVolume: true,
    })

    resource.volume?.setVolume(0.25)
    player.play(resource)
  })

  interaction.reply('音楽を流します！')

  return player
}
