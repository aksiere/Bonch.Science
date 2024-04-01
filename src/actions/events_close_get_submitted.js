export default {
	name: /events_close_get_submitted/,
	run: async ({ ctx, superadmins, d }) => {
		if (!superadmins.includes(ctx.update.callback_query.from.id)) return

		await ctx.deleteMessage()
		await ctx.answerCbQuery()
	}
}
