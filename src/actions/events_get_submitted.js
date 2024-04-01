import { Markup } from 'telegraf'
import { db } from '../../prisma/index.js'

export default {
	name: /events_get_submitted (.*)/,
	run: async ({ ctx, superadmins, d }) => {
		if (!superadmins.includes(ctx.update.callback_query.from.id)) return

		const submitted = await db.submit.findMany({
			where: {
				eventId: ctx.match[1]
			}
		})

		await ctx.reply(`${JSON.stringify(submitted)}`, {
			parse_mode: 'HTML',
			...Markup.inlineKeyboard([
				Markup.button.callback(d.MODULE_EVENTS_CLOSE_GET_SUBMITTED, `events_close_get_submitted`),
			])
		})

		// await ctx.deleteMessage()
		await ctx.answerCbQuery()
	}
}
