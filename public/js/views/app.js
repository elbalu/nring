define([
  'jquery',
  'underscore', 
  'backbone',
  'bootstrap'
  ], function($, _, Backbone,Bootstrap){
  var AppView = Backbone.View.extend({

    el: $("#content"),

    events: {
	    'submit form.proceed': 'proceedForm',
	    'userSet submit form.proceed': 'proceedFormUserSet',
	    'click a.proceedInner': 'proceedInnerLink'
    },

    initialize: function() {

    	    $('.carousel').carousel({
		    interval: 5000
		    })
   
    	
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
     proceedFormUserSet: function(e) {
    	
		$.post(e.target.action,	function(json){
		    require(['views/' + json.viewName], function(View){
		    	var pageView = new View(json);
				dust.render('public/templates/' + json.viewName + '.dust', json, function(err, out) {
					$('#userSet').empty();
					document.getElementById("userSet").innerHTML = out;
				});
		    	pageView.render(json);
		    });    
		});

	    e.preventDefault();
    },

    proceedInnerLink: function(e) {
    	$.get(e.target.href,	function(json){
			console.log('json');
			console.log(json.viewName);
			//document.getElementById("innerContent").innerHTML = "outsdfdsafdsafdasfsdafsdafdsafsdafdsafffffffffffffffffffff";
		    require(['views/' + json.viewName], function(View){
		    	var pageView = new View(json);
				dust.render('public/templates/' + json.viewName + '.dust', json, function(err, out) {
					document.getElementById("innerContent").innerHTML = out;
				});
		    	pageView.render(json);
		    });    
		});

	    e.preventDefault();
    }
    

  });
  
  return AppView;
  
});
