<template>
	<div class="users">
		<controls
			page="users"
			title="users"
			@search-updated="newSearch => searchFilter = newSearch"
			@page-size-updated="newPageSize => pageSize = newPageSize"
			@element-added="userAdded"
		/>
		<data-table
			:data="users"
			:columns="columns"
			:page-size="pageSize"
			:filter="searchFilter"
			@row-edited="userEdited"
			@row-removed="userRemoved"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Controls from '@/components/Controls.vue' // @ is an alias to /src
import DataTable from '@/components/DataTable/DataTable.vue' // @ is an alias to /src

import { User, Level } from '@/api/data'
// mock ajax api
import api from '../api'

let levels: { key: string, value: string }[] = []
for (let l in Level)
	levels.push({ key: l, value: l})

@Component({
	components: {
		Controls,
		DataTable,
	}
})
export default class Users extends Vue {
	users: Array<User> = []

	pageSize = 5

	searchFilter = ''

	columns = [
		{ key: 'name' },
		{
			key: 'level',
			editDescriptor: {
				inputType: 'select',
				selectOptions: levels
			}
		},
		{
			label: 'status',
			key: 'inactive',
			classComposer: (val: Boolean): string => val ? 'subtle danger' : 'subtle sub',
			descriptor: (val: Boolean): string => val ? 'inactive' : 'active',
			editDescriptor: {
				inputType: 'checkbox',
			}
		}
	]

	async mounted () {
		const users = (await api.get('/users')).data
		this.users = users
	}

	userAdded () {

		// this.users.splice(0, 0, new User({
	// 		name: 'New user name...', level: 'New user speaker...'
	// 	}))
	}

	async userEdited (user: User) {
		const result = await api.post(`/users/${user.id}`, user).catch(console.warn)
		const index = this.users.findIndex((a: User) => a.id === user.id)
		// this.users[index] = result.data
		this.users.splice(index, 1, result.data)
	}

	async userRemoved (userId: string) {
		const result = await api.delete(`/users/${userId}`).catch(console.warn)
		const index = this.users.findIndex((a: User) => a.id === userId)
		// this.users[index] = result.data
		if (result.data.deleted)
			this.users.splice(index, 1)
	}
}
</script>
