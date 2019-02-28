<template>
	<div class="courses">
		<controls page="courses" title="Courses" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Controls from '@/components/Controls.vue'; // @ is an alias to /src

@Component({
	components: {
		Controls,
  },
	}
})
export default class Courses extends Vue {
}
</script>
