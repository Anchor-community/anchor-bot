import { SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { config } from 'dotenv'

config({ path: `${__dirname}/../envs/.env` })

export const loadCommands = (
  token: string,
  client: string,
  commands: SlashCommandSubcommandsOnlyBuilder[]
): Promise<void> => {
  return new Promise((resolve) => {
    new REST({ version: '9' })
      .setToken(token as string)
      .put(Routes.applicationGuildCommands(client, process.env.GUILD_ID as string), {
        body: commands,
      })
    resolve()
  })
}
