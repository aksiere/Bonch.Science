// import { Markup } from 'telegraf'
// import { db } from '../../prisma/index.js'

// export default {
// 	name: /events_submit (.*)/,
// 	run: async ({ ctx, superadmins, d }) => {
// 		console.log(ctx.update.callback_query.message)
// 		try {
// 			await db.submit.create({
// 				data: {
// 					// eventId: ctx.match[1],
// 					// userId: ctx.update.callback_query.from.id.toString(),
// 					user: {
// 						connectOrCreate: {
// 							where: {
// 								tgId: ctx.update.callback_query.from.id.toString()
// 							},
// 							create: {
// 								tgId: ctx.update.callback_query.from.id.toString(),
// 								role: 'user',
// 							}
// 						}
// 					},
// 					event: {
// 						connect: {
// 							id: ctx.match[1],
// 						}
// 					}
// 				}
// 			})
// 		} catch (e) {
// 			if (e.code === 'P2002') {
// 				console.log('already submitted')
// 			} else {
// 				console.log(e)
// 			}
// 		}

// 		await ctx.editMessageText(ctx.update.callback_query.message.text + '\n\n<b>Вы записаны.</b>', {
// 			parse_mode: 'HTML',
// 		})
// 		await ctx.editMessageReplyMarkup({
// 			inline_keyboard: [ctx.update.callback_query.message.reply_markup.inline_keyboard[0].filter(e => e.text !== d.MODULE_EVENTS_SUBMIT)]
// 		})
// 		await ctx.answerCbQuery()
// 	}
// }

import { db } from '../../prisma/index.js'

export default {
	name: /events_submit (.*)/,
	run: async ({ ctx, superadmins, d }) => {
		await ctx.scene.enter('submit_add_scene', { eventId: ctx.match[1], userId: ctx.update.callback_query.from.id.toString() })
		await ctx.answerCbQuery()
	}
}
