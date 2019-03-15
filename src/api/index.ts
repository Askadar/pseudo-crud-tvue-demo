import defaultData from './data'

const enum Methods {
	GET = 'GET',
	POST = 'POST',
}

class Mock {
	constructor() {
		this.data = this.loadData()
		return this
	}
	private data: {
		[key: string]: any
	}
	private syncData(path: string, data?: any) {
		const keys = path.split('/').slice(1)

		if (keys.length > 0 && data) {
			let chainedObject = this.data

			keys.slice(0, -1).forEach(key => {
				chainedObject = chainedObject[key]
			})

			chainedObject[keys.slice(-1)[0]] = data
		}
		localStorage.setItem('__zn', JSON.stringify(this.data))
	}
	private loadData(): Object {
		try {
			const data = JSON.parse(localStorage.getItem('__zn') || JSON.stringify(defaultData))
			if (data && Object.keys(data).length > 0) return data
		} catch (err) {
			console.warn(`Error parsing localstorage at Mock`, err)
			localStorage.removeItem('__zn')
		}
		return defaultData
	}

	private async request(
		path: string,
		options: {
			method: Methods
			data?: Object
			params?: Object
		}
	) {
		const keys = path.split('/').slice(1)
		let prop = keys.reduce((chainedObject: any, nextKey: string) => {
			// let parsing = chainedObject
			return chainedObject[nextKey] || null
		}, this.data)

		if (options.method === Methods.GET)
			return {
				data: prop,
			}

		if (options.method === Methods.POST)
			if (!prop) prop = [options.data]
			else if (Array.isArray(prop)) prop.push(options.data)
			else prop = options.data

		this.syncData(path, prop)
		return { data: prop }
	}
	public async get(
		path: string,
		options?: {
			data?: Object
			params?: Object
		}
	) {
		return this.request(path, {
			...options,
			method: Methods.GET,
		})
	}
}

export default new Mock()
