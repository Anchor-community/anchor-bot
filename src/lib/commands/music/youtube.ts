import { config } from 'dotenv'
import { CommandInteraction, GuildMember } from 'discord.js'
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  DiscordGatewayAdapterCreator,
  VoiceConnection,
} from '@discordjs/voice'
import ytdl from 'ytdl-core'

config({ path: `${__dirname}/../envs/.env` })

export const youtube = async (interaction: CommandInteraction, voiceConnection?: VoiceConnection) => {
  const option = interaction.options.get('video')?.value
  const youtubeURLRegexp = new RegExp(process.env.YT_REGEXP as string)

  console.log(interaction.options.get('video'))

  if (typeof option !== 'string') {
    interaction.reply('Youtubeのリンクを添付してください！')
    return false
  }

  if (!youtubeURLRegexp.test(option as string)) {
    interaction.reply('Youtubeのリンクではないか、リンクが壊れています！')
    return false
  }

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

  const youtubeStream = ytdl(option, {
    filter: 'audioonly',
  })

  const stream = createAudioResource(youtubeStream, {
    inlineVolume: true,
  })
  stream.volume?.setVolume(0.1)

  player.play(stream)

  interaction.reply('Youtubeからの音源を流します！')

  // TODO: Implement disconnection after playing
  // connection.on('stateChange', (_oldState, newState) => {
  //   if (newState ===)
  // })

  return player
}
