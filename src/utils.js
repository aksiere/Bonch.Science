import { promises } from 'fs'

export async function fetchActions(callback) {
	promises.readdir('./src/actions/').then(files => files.filter(file => file.endsWith('.js')).forEach(async file => {
		import('./actions/'+file).then(f => callback(f.default))
	}))
}
