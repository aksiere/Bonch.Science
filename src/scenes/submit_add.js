import { db } from '../../prisma/index.js'
import { Scenes, Markup } from 'telegraf'

import ru from '../dict/ru.json' with { type: 'json' }
let d = ru

export const submit_add_scene = new Scenes.WizardScene('submit_add_scene',
	(ctx) => {
		ctx.reply(d.MODULE_EVENTS_SUBMIT_FIO)
		ctx.wizard.state.data = {}
		return ctx.wizard.next()
	},
	(ctx) => {
		if (ctx.message.text.length < 1) return ctx.reply(d.ERROR)
		ctx.wizard.state.data.fio = ctx.message.text
		ctx.reply(d.MODULE_EVENTS_SUBMIT_FACULTY)
		return ctx.wizard.next()
	},
	(ctx) => {
		if (ctx.message.text.length < 1) return ctx.reply(d.ERROR)
		ctx.wizard.state.data.faculty = ctx.message.text
		ctx.reply(d.MODULE_EVENTS_SUBMIT_AC_GROUP)
		return ctx.wizard.next()
	},
	(ctx) => {
		if (ctx.message.text.length < 1) return ctx.reply(d.ERROR)
		ctx.wizard.state.data.ac_group = ctx.message.text
		ctx.reply(d.MODULE_EVENTS_SUBMIT_PHONE, {
			...Markup.keyboard([
				Markup.button.contactRequest('Поделиться номером телефона'),
			]).oneTime().resize(),
		})
		return ctx.wizard.next()
	},
	(ctx) => {
		if (!ctx.message.contact) return ctx.reply(d.ERROR)
		ctx.wizard.state.data.phone = ctx.message.contact.phone_number
		ctx.reply(d.MODULE_EVENTS_SUBMIT_VKCOM, {
			...Markup.removeKeyboard(true)
		})
		return ctx.wizard.next()
	},
	async (ctx) => {
		if (ctx.message.text.length < 1) return ctx.reply(d.ERROR)
		ctx.wizard.state.data.vkcom = ctx.message.text
		ctx.replyWithHTML('Готово. Вы записаны.')

		await db.submit.create({
			data: {
				user: {
					connectOrCreate: {
						where: {
							tgId: ctx.wizard.state.userId,
						},
						create: {
							tgId: ctx.wizard.state.userId,
							role: 'user',
						}
					}
				},
				event: {
					connect: {
						id: ctx.scene.state.eventId,
					}
				},

				fio: ctx.wizard.state.data.fio,
				faculty: ctx.wizard.state.data.faculty,
				ac_group: ctx.wizard.state.data.ac_group,
				phone: ctx.wizard.state.data.phone,
				vkcom: ctx.wizard.state.data.vkcom,
			},
		})

		ctx.scene.leave('submit_add_scene')
	}
)