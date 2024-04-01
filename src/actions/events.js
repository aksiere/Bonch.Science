import { Markup } from 'telegraf'

export default {
	name: 'events',
	run: async ({ ctx, d, superadmins }) => {
		const buttons = [
			Markup.button.callback(d.MODULE_EVENTS_GET_ALL, 'events_get_all 1'),
		]

		if (superadmins.includes(ctx.update.callback_query.from.id)) {
			buttons.push(Markup.button.callback(d.MODULE_EVENTS_ADD, 'events_add'))
		}

		await ctx.reply('MODULE_EVENTS', {
			// parse_mode: 'HTML',
			...Markup.inlineKeyboard([
				buttons
			])
		})
		
		await ctx.answerCbQuery()
	}
}
