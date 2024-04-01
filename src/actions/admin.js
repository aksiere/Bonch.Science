export default {
	name: 'admin',
	run: async ({ ctx, superadmins }) => {
		if (!superadmins.includes(ctx.update.callback_query.from.id)) return

		await ctx.reply('MODULE_ADMIN', {
			// parse_mode: 'HTML',
		})
		
		await ctx.answerCbQuery()
	}
}
