//'use strict'
import Vue from 'vue';
import VueRouter from 'vue-router';
//import store from './store/index';
import Nav from './components/Nav.vue';
import Popup from './components/Popup.vue';
import Login from './components/Login.vue';
import TobManage from './components/TobManage.vue';
console.log('test.');
/*
import PointManage from './components/pointManage/PointManage.vue';
import CreatePoint from './components/pointManage/CreatePoint.vue';
import TobManage from './components/tobManage/TobManage.vue';
import TobEdit from './components/tobManage/TobEdit.vue';
import PointChoose from './components/tobManage/PointChoose.vue';
import PointDrag from './components/tobManage/PointDrag.vue';*/
require('./assets/css/main.scss');
require('ueditor-style-path/ueditor.css');
Vue.use(VueRouter);

const routes = [
	{path: '/',component: Login},
	{path: '/login',component: Login},
	{path: '/tobmanage',component: TobManage}/*,
	{path: '/tobview',component: TobEdit},
	{path: '/tobadd',component: TobEdit},
	{path: '/tobedit/:id',component: TobEdit},
	{path: '/tobcopy/:id',component: TobEdit},
	{path: '/pointchoose',component: PointChoose},
	{path: '/pointdrag',component: PointDrag},
	{path: '/pointmange',component: PointManage},
	{path: '/createcate/:type',component: CreatePoint},
	{path: '/modifycate/:id', component: CreatePoint},
	{path: '/createpoint/:type/:parentId', component: CreatePoint},
	{path: '/modifypoint/:pointId', component: CreatePoint}*/
];

const router = new VueRouter({
	routes: routes
});

new Vue({
	el: '#app',
	router,
	components: {
		'head-nav': Nav,
		'popup': Popup
	}
});
/*
new Vue({
	el: '#app',
	//data: {
	//	message: 'Hello Nicky.'
	//}
	components: {App}
});
*/
console.log('vue webpack yes.js');
//console.log($.md5('Nicky.Wu'));
//$('.image-two').on('click',function(){
//	console.log('image-two');
//});
