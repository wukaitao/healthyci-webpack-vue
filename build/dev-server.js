'use strict'
const HtmlWebpackPlugin =  require('html-webpack-plugin');//生成html中间件
const webpack = require('webpack');//打包工具
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';//热重载(重新刷新)
const path = require('path');//路径中间件
const express = require('express');//框架
const app = express();//web框架
const port = '8888';//端口
const publicPath = 'http://localhost:'+port+'/';

const config = {
	entry: {
		common: [
			'./client/assets/js/jquery/jquery.js',
			'./client/assets/js/jquery/jquery.md5.js',
			'./client/assets/js/ueditor/ueditor.config.js',
			'./client/assets/js/ueditor/ueditor.all.js',
			'./client/assets/js/ueditor/lang/zh-cn/zh-cn.js'
		],
		main: [
			hotMiddlewareScript,
			'./client/main.js'
		]
	},
	output: {
		path: '/',//因为文件运行在内存,所以输出路径不同(相对于静态目录)
		publicPath: publicPath,//因为文件运行在内存,内联路径不同
		filename: '[name].[hash].js'//文件名
	},
	devtool: 'source-map',//开发模式(配置显示合并前的js文件,去除则显示合并后的js文件)
	module: {
		loaders: [
			{
				test: /\.html/,
				loader: 'html!resolve-url'
			},
			{
				test: /\.vue/,
				loader: 'vue'
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader?presets=es2015'
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.(css|scss)$/,
				loaders: ['style','css?sourceMap','resolve-url','sass?sourceMap']
			},
			{
				test: /\.(jpg|jpeg|gif|png)$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: 'assets/images/[name].[hash].[ext]'
				}
			},
			{
				test: /\.(eot|svg|ttf|woff)$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: 'assets/fonts/[name].[hash].[ext]'
				}
			},
			{
				test: path.resolve(__dirname,'../client/assets/js/jquery/jquery.js'),
				loader: 'expose?jQuery!expose?$'
			}
		]
	},
	vue: {
		//vue编译器配置(js/style/css/scss/less等)
		loaders: {
			js: 'babel-loader?presets=es2015'
		}
	},
	resolve: {
		//自动扩展文件后缀名
        extensions: ['','.js','json','.css','.scss'],
    	//别名配置
        alias: {
            'vue': path.resolve(__dirname,'../node_modules/vue/dist/vue.js'),
            'vue-router': path.resolve(__dirname,'../node_modules/vue-router/dist/vue-router.js'),
            'vue-resource': path.resolve(__dirname,'../node_modules/vue-resource/dist/vue-resource.js'),
            'vuex': path.resolve(__dirname,'../node_modules/vuex/dist/vuex.js'),
            'ueditor-style-path': path.resolve(__dirname,'../client/assets/js/ueditor/themes/default/css')
        }
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),//热重载
		new webpack.NoErrorsPlugin(),//报错而不退出webpack进程
		new HtmlWebpackPlugin({
			filename: 'index.html',//文件名
			title: 'my first project by webpack.',//标题(会被template模板覆盖)
			template: path.resolve(__dirname,'../client/main.html'),//模板
			inject: true//是否插入到body
		})
	]
};

//注入服务器/热重载
let compiler = webpack(config);//配置
//服务器
const devMiddleWare = require('webpack-dev-middleware')(compiler,{
	publicPath: config.output.publicPath,
	stats: {
		colors: true,
		chunks: false
	}
});
//热重载
const hotMiddleWare = require('webpack-hot-middleware')(compiler);
//热重载html
/*
compiler.plugin('compilation',function(compilation){
	compilation.plugin('html-webpack-plugin-after-emit',function(data,cb){
		hotMiddleWare.publish({action: 'reload'});
		cb();
	});
});
*/
app.use(devMiddleWare);//注入服务器
app.use(hotMiddleWare);//注入热重载
app.use(express.static('./client'));//静态目录
app.listen(port,function(e){
	console.log(`server start at http://localhost:${port}`);
});