import { config } from 'dotenv'
import { prepareMasterBot } from './master'
import { prepareSubBots } from './sub-bots'

config({ path: `${__dirname}/../envs/.env` })

prepareMasterBot()
prepareSubBots()
