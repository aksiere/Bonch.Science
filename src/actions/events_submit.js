export default {
	name: /events_submit (.*)/,
	run: async ({ ctx, superadmins, d }) => {
		await ctx.scene.enter('submit_add_scene', { eventId: ctx.match[1], userId: ctx.update.callback_query.from.id.toString() })
		await ctx.answerCbQuery()
	}
}
