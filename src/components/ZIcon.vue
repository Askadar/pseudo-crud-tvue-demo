<template>
	<i v-if="icon" :class="['z-icon', icon]" />
	<i v-else class="z-icon">{{ text }}</i>
</template>

<style lang="stylus">
.z-icon
	font-style normal
</style>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const icons = {
	'edit': 'icon-feather',

	'trash': 'icon-trash',
	'delete': 'icon-trash',

	'search': 'icon-search',

	'add': 'icon-plus',

	'arrow-left': 'icon-angle-left',
	'arrow-right': 'icon-angle-right',
	'arrow-up': 'icon-angle-up',
	'arrow-down': 'icon-angle-down',

	undefined: null
}

@Component({})
export default class ZIcon extends Vue {
	icon = null
	text = ''

	created() {
		try {
			const d = this.$slots.default
			// @ts-ignore cause we're in a try for a reason
			const text = d[0].text.trim()
			// @ts-ignore but I say it can
			this.icon = icons[text]
			this.text = text

		} catch (err) {
			this.icon = null
			this.text = 'no_icon_provided'
		}
		// console.log(this)
	}
}
</script>
