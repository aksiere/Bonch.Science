export default {
	name: /recruitment_cancel/,
	run: async ({ ctx }) => {
		await ctx.deleteMessage()
		await ctx.answerCbQuery()
	}
}
