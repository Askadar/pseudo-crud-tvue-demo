import defaultData, { Course, User } from './data'

const enum Methods {
	GET = 'GET',
	POST = 'POST',
	DELETE = 'DELETE',
}

class Mock {
	constructor() {
		this.data = this.loadData()
		return this
	}

	// should create class\interface\whatev works as struct in ts
	private data: {
		courses: Array<Course>,
		users: Array<User>,
		[key: string]: any // maybe?
	}

	private resolvePath(path: string) {
		const keys = path.split('/').slice(1)
		return {
			collection: keys[0],
			id: keys[1]
		}
	}

	private findIndexById(collection: (Course|User)[], id: string) {
		return collection.findIndex((entry: Course|User) => entry.id === id)
	}
	private findById(collection: (Course|User)[], id: string) {
		return collection.find((entry: Course|User) => entry.id === id)
	}

	private syncData(path: string, entry: Course|User|Course[]|User[]|null) {
		const { collection, id } = this.resolvePath(path)

		// uh-huh
		// typed languages don't seem to be working well with classic js'
		// we have it or we don't, who really cares
		if (collection && this.data[collection])
			if (id) {
				const index = this.findIndexById(this.data[collection], id)
				if (entry)
					this.data[collection][index] = entry
				else
					this.data[collection].splice(index, 1)
			}
			else
				this.data[collection].splice(0, 0, entry)

		localStorage.setItem('__zn', JSON.stringify(this.data))
		return entry
	}

	private loadData(): ({
		courses: Array<Course>,
		users: Array<User>,
		[key: string]: any
	}) {
		try {
			const data = JSON.parse(
				localStorage.getItem('__zn') ||
				JSON.stringify(defaultData)
			)
			if (data && Object.keys(data).length > 0)
				return data
		} catch (err) {
			console.warn(`Error parsing localstorage at Mock`, err)
			localStorage.removeItem('__zn')
		}
		// ts got confuzzled because of common data cloner functions
		// (they return Array<Course|User> - array of either of them)
		// @ts-ignore
		return defaultData
	}

	private jsonEncase(data: any): any {
		return JSON.parse(JSON.stringify(data))
	}

	public async request(
		path: string,
		options: {
			method: Methods
			data?: Object
			params?: Object
		}
	) {
		const { collection, id } = this.resolvePath(path)
		// we need to break references and simulate exchange between client and server
		options = this.jsonEncase(options)
		let prop

		if (collection && this.data[collection])
			if (id)
				prop = this.findById(this.data[collection], id)
			else
				prop = this.data[collection]
		else
			prop = null

		switch (options.method){
			// don't actually need this one cause we return data in the end in any case
			// case Methods.GET:
			case Methods.POST:
				if (!prop) {
					prop = options.data
					path = `/${collection}`
				}
				else if (Array.isArray(prop))
					prop.push(options.data)
				else
					prop = options.data
					// common cause again - in POST bracket data has to be defined before arriving to request()
					// ts might prefer specific methods for each verb in such cases it seems
					// @ts-ignore
					prop = this.syncData(path, prop)
				break;
			case Methods.DELETE:
				if (prop) {
					this.syncData(path, null)
					prop = { deleted: true }
				}
			break;
		}

		return this.jsonEncase({ data: prop })
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

	public async post(
		path: string,
		data: any,
		options?: Object
	) {
		return this.request(path, {
			...options,
			method: Methods.POST,
			data
		})
	}

	public async delete(
		path: string,
		options?: Object
	) {
		return this.request(path, {
			...options,
			method: Methods.DELETE,
		})
	}
}

export default new Mock()
