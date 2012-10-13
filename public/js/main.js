require.config({
	paths: {
		jquery: 'lib/jquery-min',
		underscore: 'lib/underscore-min',
		backbone: 'lib/backbone-optamd3-min'
	}
});

require(['views/app'], function(AppView){
	var app_view = new AppView;
	app_view.render();
});

