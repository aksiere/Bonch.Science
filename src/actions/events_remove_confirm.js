import { Markup } from 'telegraf'
import { db } from '../../prisma/index.js'

export default {
	name: /events_remove_confirm (.*) (.*)/,
	run: async ({ ctx, superadmins, d }) => {
		if (!superadmins.includes(ctx.update.callback_query.from.id)) return

		await db.event.delete({
			where: {
				id: ctx.match[1]
			}
		})

		await ctx.editMessageText('Мероприятие успешно удалено', {
			parse_mode: 'HTML',
			...Markup.inlineKeyboard([
				Markup.button.callback(d.MODULE_EVENTS_GEL_ALL_FROM, `events_get_all ${ctx.match[2]}`),
			])
		})
		await ctx.answerCbQuery()
	}
}
