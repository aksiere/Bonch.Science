export default {
	name: 'events_add',
	run: async ({ ctx, superadmins, d }) => {
		if (!superadmins.includes(ctx.update.callback_query.from.id)) return

		await ctx.scene.enter('events_add_scene')
		await ctx.answerCbQuery()
	}
}
