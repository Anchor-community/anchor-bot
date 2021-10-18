import { CommandInteraction } from 'discord.js'
import axios from 'axios'

export const githubCommand = {
  name: 'github',
  description: 'Replies github status!',
}

export const github = (interaction: CommandInteraction) => {
  if (interaction.commandName === 'github') {
    axios
      .get('https://www.githubstatus.com/api/v2/incidents/unresolved.json')
      .then((result: any) => {
        const incidents: any[] = result.data?.incidents

        switch (incidents.length) {
          case 0:
            interaction.reply('Github is running normally!')
            break

          case 1:
            interaction.reply(
              `Github is in trouble!\nProblem: ${incidents[0]?.name}`
            )
            break

          default:
            interaction.reply(
              `Github has multiple troubles!\nTry checking: https://www.githubstatus.com/`
            )
            break
        }
      })
      .catch((_error) => {
        interaction.reply('Something went wrong...')
      })
  }
}
