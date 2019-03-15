class Course {
	speaker: string
	name: string

	id: number

	constructor({ name = '_course name_', speaker = '_user name_' }) {
		this.speaker = speaker
		this.name = name
		this.id = Math.random()

		return this
	}
}
const enum Level {
	speaker = 'speaker',
	student = 'student',
}
class User {
	level: Level
	name: string
	inactive = false

	id: number

	constructor({ name = '_course name_', level = Level.student, inactive = false }) {
		this.level = level
		this.name = name
		this.inactive = inactive
		this.id = Math.random()

		return this
	}
}

// multiple array by itself and shuffle ids
const copy = (a: Course|User, index: number, sourceArr: Array<Course|User>): Array<Course|User> => sourceArr.map(a => ({ ...a, id: Math.random() }))
// dechunk resulting 2d array
const dechunk = (arr: Array<Course|User>, chunk: Array<Course|User>): Array<Course|User> => arr.concat(chunk)
// randomize sorting
const random = (): number => Math.round(Math.random() * 2) - 1

const defaultCourses = [
	new Course({ speaker: 'Peter', name: 'Vue Mastery' }),
	new Course({ speaker: 'Peter', name: 'Intro to Nuxt.js' }),
	new Course({ speaker: 'James', name: 'CSS3 in-depth' }),
	new Course({ speaker: 'Peter', name: 'Nuxt.js: tips and tricks' }),
	new Course({ speaker: 'James', name: 'HTML5 for begginers' }),
].map(copy).reduce(dechunk, []).sort(random)

const defaultUsers = [
	new User({ name: 'Peter', level: Level.speaker,  }),
	new User({ name: 'James', level: Level.speaker, }),
	new User({ name: 'Vlad', level: Level.student, inactive: true, }),
	new User({ name: 'Jenny', level: Level.student, }),
	new User({ name: 'Ali', level: Level.student, }),
].map(copy).reduce(dechunk, []).sort(random)

const defaultData = {
	courses: defaultCourses,
	users: defaultUsers,
}

export default defaultData
