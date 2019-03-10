<template>
	<i :class="['z-icon', icon]" />
</template>

<style lang="stylus">
.z-icon
	font-style normal
</style>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

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

	undefined: 'no_icon_provided'
}

@Component({})
export default class ZIcon extends Vue {
	icon = 'no_icon_provided'

	created() {
		try {
			const d = this.$slots.default
			// @ts-ignore cause we're in a try for a reason
			const text = d[0].text
			// @ts-ignore but I say it can
			this.icon = icons[text] || text

		} catch (err) {
			this.icon = 'no_icon_provided'
		}
		// console.log(this)
	}
}
</script>
