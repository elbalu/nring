define([
  'jquery',
  'underscore', 
  'backbone'
  ], function($, _, Backbone){
  var AppView = Backbone.View.extend({

    el: $("#content"),

    events: {
	    'submit form.proceed': 'proceedForm',
	    'click a.proceed': 'proceedLink'
    },

    initialize: function() {
    },

    render: function() {
    },
    
    proceedForm: function(e) {
		$.post(e.target.action,	function(json){
		    require(['views/' + json.viewName], function(View){
		    	var pageView = new View(json);
				dust.render('public/templates/' + json.viewName + '.dust', json, function(err, out) {
					document.getElementById("content").innerHTML = out;
				});
		    	pageView.render(json);
		    });    
		});

	    e.preventDefault();
    },
    
    proceedLink: function(e) {
    	$.get(e.target.href,	function(json){
			console.log('json');
			console.log(json.viewName);
		    require(['views/' + json.viewName], function(View){
		    	var pageView = new View(json);
				dust.render('public/templates/' + json.viewName + '.dust', json, function(err, out) {
					document.getElementById("innerContent").innerHTML = err+out;
				});
		    	pageView.render(json);
		    });    
		});

	    e.preventDefault();
    }
    

  });
  
  return AppView;
  
});
