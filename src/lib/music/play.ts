import { CommandInteraction, GuildMember } from 'discord.js'
import { join } from 'path'
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  DiscordGatewayAdapterCreator,
  VoiceConnection,
} from '@discordjs/voice'

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

  const resource = createAudioResource(join(__dirname, '/../../music/music1.mp3'), {
    inlineVolume: true,
  })

  resource.volume?.setVolume(0.25)

  player.play(resource)

  return player
}
