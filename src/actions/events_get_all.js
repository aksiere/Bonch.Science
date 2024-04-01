import { Markup } from 'telegraf'
import { db } from '../../prisma/index.js'

export default {
	name: /events_get_all (.*)/,
	run: async ({ ctx, d, superadmins }) => {
		const currentPage = +ctx.match[1] || 1
		const count = await db.event.count()

		const results = await db.event.findMany({
			orderBy: { date: 'asc' },
			take: 1,
			skip: ctx.match[1] - 1,
		})

		const isSubmitted = await db.submit.findMany({
			where: {
				eventId: results[0].id,
				user: {
					tgId: ctx.update.callback_query.from.id.toString()
				}
			}
		})

		let buttons = []
		let c = 0

		if (currentPage > 1) {
			c++
			buttons.push(Markup.button.callback(d.MODULE_EVENTS_PREV_PAGE, `events_get_all ${currentPage - 1}`))
		}

		if (currentPage < count) {
			c++
			buttons.push(Markup.button.callback(d.MODULE_EVENTS_NEXT_PAGE, `events_get_all ${currentPage + 1}`))
		}

		if (superadmins.includes(ctx.update.callback_query.from.id) && results.length > 0) {
			buttons.push(Markup.button.callback(d.MODULE_EVENTS_REMOVE, `events_remove ${results[0].id} ${currentPage}`))
			buttons.push(Markup.button.callback(d.MODULE_EVENTS_GET_SUBMITTED, `events_get_submitted ${results[0].id}`))
		} else {
			if (isSubmitted.length === 0) {
				buttons.push(Markup.button.callback(d.MODULE_EVENTS_SUBMIT, `events_submit ${results[0].id}`))
			}
		}

		await ctx.editMessageText(results.length > 0 ? `<b>${results[0].name}</b>\n\n${results[0].description || d.NO_DESCRIPTION}\n\n${results[0].locatedAt || d.NO_LOCATION}\n${results[0].date.toLocaleString() || d.NO_DATE}${isSubmitted.length > 0 ? '\n\n<b>Вы записаны.</b>' : ''}` : 'Предстоящих мероприятий не найдено', {
			parse_mode: 'HTML',
		})
		await ctx.editMessageReplyMarkup({
			inline_keyboard: [
				buttons.slice(0, c),
				buttons.slice(c, buttons.length)
			],
		})
		
		await ctx.answerCbQuery()
	}
}
