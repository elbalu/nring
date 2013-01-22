/*global window:true document:true */

define([
	'jquery',
	'backbone'
],

function ($, Backbone) {
	'use strict';


	return Backbone.View.extend({

		el: '#content',


		events: {
			'submit form.proceed': 'proceedForm',
	    	'click a.proceed': 'proceedLink'
			
		},

		initialize: function () {
			this.model = new Backbone.Model();
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
			    require(['views/' + json.viewName], function(View){
			    	var pageView = new View(json);
					dust.render('public/templates/' + json.viewName + '.dust', json, function(err, out) {
						document.getElementById("content").innerHTML = out;
					});
			    	pageView.render(json);
			    });    
			});

		    e.preventDefault();
	    }
	});

});

