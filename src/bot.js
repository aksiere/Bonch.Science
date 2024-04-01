import { db } from '../prisma/index.js'

import{ Telegraf, Markup, Scenes, session } from 'telegraf'

import { fetchActions } from './utils.js'
import { events_add_scene } from './scenes/events_add.js'
import { submit_add_scene } from './scenes/submit_add.js'
import { recruitment_add_scene } from './scenes/recruitment_add.js'

import ru from './dict/ru.json' with { type: 'json' }
let d = ru

// 

let superadmins = [];

(async() => {
	const query = await db.user.findMany({ where: { role: 'super' } })
	superadmins = query.map(a => +a.tgId)
})()

// 

const bot = new Telegraf(process.env.BOT_TOKEN)
const stage = new Scenes.Stage([events_add_scene, submit_add_scene, recruitment_add_scene])

bot.use(session({ defaultSession: () => ({ events_current_page: 1 }) }))
bot.use(stage.middleware())

bot.hears('get_id', (ctx) => console.log(ctx.message.from))
bot.hears('add_admin', async (ctx) => {
	try {
		await db.user.create({ data: { tgId: ctx.message.from.id.toString(), role: 'super' } })
	} catch(e) {
		console.log(e)
	}
})

const startButtons = [
	{ text: d.MODULE_INFO_NAME, callback_data: 'info' },
	{ text: d.MODULE_EVENTS_NAME, callback_data: 'events' },
	{ text: d.MODULE_RECRUITMENT_NAME, callback_data: 'recruitment' },
	{ text: d.MODULE_ADMIN_NAME, callback_data: 'admin', super: true },
]

bot.start(async (ctx) => {
	let buttons = []

	for (const button of startButtons) {
		if ((button.super && superadmins.includes(ctx.message.from.id)) || (!button.super)) {
			buttons.push(Markup.button.callback(button.text, button.callback_data))
		}
	}

	return ctx.reply('<b>Bonch</b>.Science', {
		parse_mode: 'HTML',
		...Markup.inlineKeyboard([
			buttons.slice(0, 2),
			buttons.slice(2, 4),
		])
	})
})

bot.launch()

// Actions

fetchActions(async (action) => {
	bot.action(action.name, async (ctx) => {
		return await action.run({ ctx, superadmins, d})
	})
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
