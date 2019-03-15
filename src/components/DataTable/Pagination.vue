<template>
	<nav class="pagination flex mx-auto mt-4 px-4 justify-center">
		<round-button
			class="sub mr-4"
			:disabled="current === 1"
			@click="$emit('prev')"
		><z-icon>arrow-left</z-icon></round-button>
		<round-button
			v-for="number in max"
			:key="number"
			:class="['small shaded', current === number && 'has-text-sub']"
			@click="select(number)"
		>
			{{ number }}
		</round-button>
		<round-button
			class="sub ml-4"
			:disabled="current === max"
			@click="$emit('next')"
		><z-icon>arrow-right</z-icon></round-button>
	</nav>
</template>

<style lang="stylus">
.pagination
	width auto
	// padding 0.5rem
</style>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

import RoundButton from '@/components/Form/RoundButton.vue';
import ZIcon from '@/components/ZIcon.vue';

@Component({
	components: {
		RoundButton,
		ZIcon,
	}
})
export default class Pagination extends Vue {
	@Prop({
		type: Number,
		default: 1
	})
	readonly max!: number;

	@Prop({
		type: Number,
		default: 1
	})
	readonly current!: number;

	@Emit('select')
	select() {
	}
	// @Emit('prev')

}
</script>
