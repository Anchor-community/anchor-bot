import { config } from 'dotenv'
import { CommandInteraction, GuildMember } from 'discord.js'
import { ApplicationCommandOptionType } from 'discord-api-types'
import { play, stop } from '../music'
import { getVoiceConnection } from '@discordjs/voice'

config()

export const musicCommand = {
  name: 'music',
  description: '音楽を流します',
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: 'state',
      description: '音楽の再生・ポーズ・停止を指定します。',
      required: true,
      choices: [
        {
          name: 'Play',
          value: 'play',
        },
        {
          name: 'Stop',
          value: 'stop',
        },
      ],
    },
  ],
}

export const music = (interaction: CommandInteraction) => {
  if (interaction.commandName === 'music') {
    const sender = interaction.member as GuildMember

    if (!sender.voice.channel) {
      interaction.reply('このコマンドはボイスチャンネルに入った状態で実行してください！')
      return
    }

    const voiceConnection = getVoiceConnection(interaction.guild?.id as string)

    switch (interaction.options.get('state')?.value) {
      case 'play':
        play(interaction, voiceConnection)
        break

      case 'stop':
        stop(interaction, voiceConnection)
        break

      default:
        interaction.reply('未知のコマンドが送信されました...。')
        break
    }
  }
}
