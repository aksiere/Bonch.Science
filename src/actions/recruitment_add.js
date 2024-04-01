export default {
	name: 'recruitment_add',
	run: async ({ ctx }) => {
		await ctx.scene.enter('recruitment_add_scene', { userId: ctx.update.callback_query.from.id.toString() })
		await ctx.answerCbQuery()
	}
}
