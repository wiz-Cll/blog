var config = require('./Base/config');


var BlogAPI = require('./apiController/blogCtrl').BlogAPI;
var CommentAPI = require('./apiController/commentCtrl');

var pageRoute = require('./pageController');

var apiBaseUrl = config.apiBase,
	pageBaseUrl = config.pageBase;


var apiRouteList = [
/* ------------ BlogAPI的CGUD操作 ------------ */
	{
		action: 'post',
		url: '/blog',
		handler: BlogAPI.create
	},
	{
		action: 'get',
		url: '/blog',
		handler: BlogAPI.getSome
	},
	{
		action: 'get',
		url: '/blog/:id',
		handler: BlogAPI.getById
	},
	{
		action: 'put',
		url: '/blog/:id',
		handler: BlogAPI.updateOne
	},
/* ------------ CommentAPI的 CGUD 操作 ------------ */
	{
		action: 'post',
		url: '/comment',
		handler: CommentAPI.create
	},
    {
        action: 'get',
        url: '/comment',
        handler: CommentAPI.get
    }
];

var pageRouteList = [
	{
		action: 'get',
		url: '/',
		handler: pageRoute.index
	},
	{
		action: 'get',
		url: '/posts',
		handler: pageRoute.index
	},
	{
		action: 'get',
		url: '/posts/:id',
		handler: pageRoute.thePost
	}
];


function bindRoute( app ){
	bindByRuleSet( app, apiRouteList, apiBaseUrl );
	bindByRuleSet( app, pageRouteList, pageBaseUrl );
}

function bindByRuleSet( app, routeRuleSet, baseUrl ){
	var apiCount = routeRuleSet.length;
	for( var i=0; i<apiCount; i++ ){
		var routeIterm = routeRuleSet[i];
		routeIterm.url = baseUrl + routeRuleSet[i].url;
		app[ routeIterm.action ]( routeIterm.url, routeIterm.handler );

		console.log( routeIterm.action +' -|- '+ routeIterm.url +' -|- '+ routeIterm.handler.name );
	}
	
}


exports.bind = bindRoute;