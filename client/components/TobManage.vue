<template>
	<div class="login-container">
		{{pageMessage}}
		<a href="#/login">跳转路由</a>
	</div>
</template>
<script>
console.log('Login.vue');
export default {
	data(){
		return{
			pageMessage: 'This is TobManage.'
		}
	}
}
</script>
