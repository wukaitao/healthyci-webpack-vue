<template>
	<div class="login-container">
		{{pageMessage}}
		<a href="#/tobmanage">跳转路由</a>
		<div style="width: 100%;height: 150px;" id="editorWrap"></div>
	</div>
</template>
<script>
console.log('Login.vue');
export default {
	data(){
		return{
			pageMessage: 'This is Login'
		}
	},
	created(){
		console.log($.md5('Nicky.Wu'));
		//UE.getEditor('editorWrap');
	}
}
</script>
