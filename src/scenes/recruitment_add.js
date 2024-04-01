import { db } from '../../prisma/index.js'
import { Scenes } from 'telegraf'

import ru from '../dict/ru.json' with { type: 'json' }
let d = ru

export const recruitment_add_scene = new Scenes.WizardScene('recruitment_add_scene',
	(ctx) => {
		ctx.reply(d.MODULE_EVENTS_SUBMIT_EMAIL)
		ctx.wizard.state.data = {}
		return ctx.wizard.next()
	},
	(ctx) => {
		if (ctx.message.text.length < 1) return ctx.reply(d.ERROR)
		ctx.wizard.state.data.email = ctx.message.text
		ctx.reply(d.MODULE_EVENTS_SUBMIT_FIO)
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
		ctx.reply(d.MODULE_EVENTS_SUBMIT_PHONE)
		return ctx.wizard.next()
	},
	(ctx) => {
		if (ctx.message.text.length < 1) return ctx.reply(d.ERROR)
		ctx.wizard.state.data.phone = ctx.message.text
		ctx.reply(d.MODULE_EVENTS_SUBMIT_VKCOM)
		return ctx.wizard.next()
	},
	(ctx) => {
		if (ctx.message.text.length < 1) return ctx.reply(d.ERROR)
		ctx.wizard.state.data.vkcom = ctx.message.text
		ctx.reply(d.MODULE_EVENTS_SUBMIT_DESCRIBE)
		return ctx.wizard.next()
	},
	(ctx) => {
		if (ctx.message.text.length < 1) return ctx.reply(d.ERROR)
		ctx.wizard.state.data.describe = ctx.message.text
		ctx.reply(d.MODULE_EVENTS_SUBMIT_Q1)
		return ctx.wizard.next()
	},
	(ctx) => {
		if (ctx.message.text.length < 1) return ctx.reply(d.ERROR)
		ctx.wizard.state.data.q1 = ctx.message.text
		ctx.reply(d.MODULE_EVENTS_SUBMIT_Q2)
		return ctx.wizard.next()
	},
	(ctx) => {
		if (ctx.message.text.length < 1) return ctx.reply(d.ERROR)
		ctx.wizard.state.data.q2 = ctx.message.text
		ctx.reply(d.MODULE_EVENTS_SUBMIT_Q3)
		return ctx.wizard.next()
	},
	(ctx) => {
		if (ctx.message.text.length < 1) return ctx.reply(d.ERROR)
		ctx.wizard.state.data.q3 = ctx.message.text
		ctx.reply(d.MODULE_EVENTS_SUBMIT_Q4)
		return ctx.wizard.next()
	},
	(ctx) => {
		if (ctx.message.text.length < 1) return ctx.reply(d.ERROR)
		ctx.wizard.state.data.q4 = ctx.message.text
		ctx.reply(d.MODULE_EVENTS_SUBMIT_Q5)
		return ctx.wizard.next()
	},
	async (ctx) => {
		if (ctx.message.text.length < 1) return ctx.reply(d.ERROR)
		ctx.wizard.state.data.q5 = ctx.message.text
		ctx.replyWithHTML('Готово. Вы записаны.')

		await db.recruit.create({
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
				email: ctx.wizard.state.data.email,
				fio: ctx.wizard.state.data.fio,
				faculty: ctx.wizard.state.data.faculty,
				ac_group: ctx.wizard.state.data.ac_group,
				phone: ctx.wizard.state.data.phone,
				vkcom: ctx.wizard.state.data.vkcom,
				describe: ctx.wizard.state.data.describe,
				q1: ctx.wizard.state.data.q1,
				q2: ctx.wizard.state.data.q2,
				q3: ctx.wizard.state.data.q3,
				q4: ctx.wizard.state.data.q4,
				q5: ctx.wizard.state.data.q5,
			},
		})

		ctx.scene.leave('recruitment_add_scene')
	}
)