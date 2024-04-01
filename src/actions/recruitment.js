import { Markup } from 'telegraf'

export default {
	name: 'recruitment',
	run: async ({ ctx, superadmins, d }) => {
		const buttons = [
			
		]

		if (!superadmins.includes(ctx.update.callback_query.from.id)) {
			buttons.push(Markup.button.callback(d.MODULE_RECRUITMENT_SUBMIT, 'recruitment_add'))
			buttons.push(Markup.button.callback(d.MODULE_RECRUITMENT_CANCEL, 'recruitment_cancel'))
		}

		await ctx.reply('MODULE_RECRUITMENT', {
			// parse_mode: 'HTML',
			...Markup.inlineKeyboard([
				buttons
			])
		})

		await ctx.answerCbQuery()
	}
}
