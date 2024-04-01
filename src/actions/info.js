export default {
	name: 'info',
	run: async ({ ctx }) => {
		await ctx.reply('MODULE_INFO', {
			// parse_mode: 'HTML',
		})

		await ctx.answerCbQuery()
	}
}
