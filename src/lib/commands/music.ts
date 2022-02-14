import { config } from 'dotenv'
import { CommandInteraction, GuildMember } from 'discord.js'
import { play, youtube, stop } from './music/'
import { getVoiceConnection } from '@discordjs/voice'
import { SlashCommandBuilder } from '@discordjs/builders'

config({ path: `${__dirname}/../envs/.env` })

const musicCommand = new SlashCommandBuilder()
  .setName('music')
  .setDescription('音楽を流します。')
  .addStringOption((option) =>
    option
      .setName('state')
      .setDescription('音楽の再生・ポーズ・停止を指定します。')
      .setRequired(true)
      .addChoice('Play', 'play')
      .addChoice('Stop', 'stop')
  )

const youtubeCommand = new SlashCommandBuilder()
  .setName('youtube')
  .setDescription('Youtubeの任意の動画音源を再生します。')
  .addSubcommand((subCommand) =>
    subCommand
      .setName('video')
      .setDescription('Youtubeの任意の動画音源を再生します。')
      .addStringOption((option) => option.setName('video').setDescription('Youtubeの任意の動画音源を再生します。'))
  )

export const playerCommands = [musicCommand as SlashCommandBuilder, youtubeCommand]

export const player = (interaction: CommandInteraction) => {
  const voiceConnection = getVoiceConnection(interaction.guild?.id as string)
  if (interaction.commandName === 'music') {
    const sender = interaction.member as GuildMember

    if (!sender.voice.channel) {
      interaction.reply('このコマンドはボイスチャンネルに入った状態で実行してください！')
      return
    }

    switch (interaction.options.get('state')?.value) {
      case 'play':
        play(interaction, voiceConnection)
        break

      case 'stop':
        stop(interaction, voiceConnection)
        break

      default:
        interaction.reply('未知のコマンドが送信されました...。でもどうやって？')
        break
    }
  }

  if (interaction.commandName === 'youtube') {
    youtube(interaction, voiceConnection)
  }
}
