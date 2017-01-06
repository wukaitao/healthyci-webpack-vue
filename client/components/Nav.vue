<template>
	<div class="nav">
		<span @click="showEvent();">{{message}}</span>
	</div>
</template>
<script>
export default {
	data() {
		return {
			message: 'This is nav.'
		}
	},
	methods:{
		showEvent: function(){
			console.log('Hello Vue.');
		}
	}
}
</script>