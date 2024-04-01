import { Markup } from 'telegraf'

export default {
	name: /events_remove_cancel (.*) (.*)/,
	run: async ({ ctx, superadmins, d }) => {
		if (!superadmins.includes(ctx.update.callback_query.from.id)) return

		await ctx.editMessageText('Удаление отменено', {
			parse_mode: 'HTML',
			...Markup.inlineKeyboard([
				Markup.button.callback(d.MODULE_EVENTS_GEL_ALL_FROM, `events_get_all ${ctx.match[2]}`),
			])
		})
		await ctx.answerCbQuery()
	}
}
