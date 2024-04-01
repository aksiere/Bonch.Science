import { Markup } from 'telegraf'
import { db } from '../../prisma/index.js'

export default {
	name: /events_remove (.*) (.*)/,
	run: async ({ ctx, superadmins, d }) => {
		if (!superadmins.includes(ctx.update.callback_query.from.id)) return

		await ctx.editMessageText(`<b>ВЫ ХОТИТЕ УДАЛИТЬ МЕРОПРИЯТИЕ</b>\n<b>ВЫ ХОТИТЕ УДАЛИТЬ МЕРОПРИЯТИЕ</b>\n<b>ВЫ ХОТИТЕ УДАЛИТЬ МЕРОПРИЯТИЕ</b>`, {
			parse_mode: 'HTML',
			...Markup.inlineKeyboard([
				Markup.button.callback(d.MODULE_EVENTS_REMOVE_CONFIRM, `events_remove_confirm ${ctx.match[1]} ${ctx.match[2]}`),
				Markup.button.callback(d.MODULE_EVENTS_REMOVE_CANCEL, `events_get_all ${ctx.match[2]}`),
			])
		})
		await ctx.answerCbQuery()
	}
}
