import { db } from '../../prisma/index.js'
import { Scenes } from 'telegraf'

import ru from '../dict/ru.json' with { type: 'json' }
let d = ru

export const events_add_scene = new Scenes.WizardScene('events_add_scene',
	(ctx) => {
		ctx.reply(d.MODULE_EVENTS_ADD_NAME)
		ctx.wizard.state.data = {}
		return ctx.wizard.next()
	},
	(ctx) => {
		if (ctx.message.text.length < 4) {
			ctx.reply('название ошибка')
			return
		}
		ctx.wizard.state.data.name = ctx.message.text

		ctx.reply(d.MODULE_EVENTS_ADD_DESCRIPTION)
		return ctx.wizard.next()
	},
	(ctx) => {
		if (ctx.message.text.length > 1000) {
			ctx.reply('описание ошибка')
			return
		}
		ctx.wizard.state.data.description = ctx.message.text

		ctx.reply(d.MODULE_EVENTS_ADD_LOCATION)
		return ctx.wizard.next()
	},
	(ctx) => {
		if (ctx.message.text.length < 4) {
			ctx.reply('место ошибка')
			return
		}
		ctx.wizard.state.data.locatedAt = ctx.message.text

		ctx.reply(d.MODULE_EVENTS_ADD_DATE)
		return ctx.wizard.next()
	},
	async (ctx) => {
		const date = new Date(ctx.message.text)
		if (isNaN(date) || date.getFullYear() > new Date().getFullYear() + 1) {
			ctx.reply('дата ошибка')
			return
		}
		ctx.wizard.state.data.date = new Date(ctx.message.text)

		ctx.replyWithHTML(`${'успех'}\n\n${'название'}: <b>${ctx.wizard.state.data.name}</b>\n${'описание'}: <i>${ctx.wizard.state.data.description}</i>\n\n${'дата'}: ${ctx.wizard.state.data.date}\n${'место'}: ${ctx.wizard.state.data.locatedAt}`)

		await db.event.create({
			data: {
				name: ctx.wizard.state.data.name,
				description: ctx.wizard.state.data.description,
				locatedAt: ctx.wizard.state.data.locatedAt,
				date: ctx.wizard.state.data.date,
			},
		})

		ctx.scene.leave('events_add_scene')
	}
)