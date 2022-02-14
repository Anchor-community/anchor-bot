import { config } from 'dotenv'
import { enforcerCommands, enforcer } from './lib/commands'
import { prepareRoleManager } from './lib/messages/role'
import { bootBot } from './init/login'
import { loadCommands } from './init/command'
import { prepareAntiSpam } from './lib/messages/spam'

config({ path: `${__dirname}/../envs/.env` })
const commands = [...enforcerCommands]

export const prepareMasterBot = () => {
  loadCommands(process.env.BOT_TOKEN as string, process.env.CLIENT_ID as string, commands)
  bootBot(process.env.BOT_TOKEN as string).then((client) => {
    prepareRoleManager(client)
    prepareAntiSpam(client)

    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return

      enforcer(interaction)
    })
  })
}
