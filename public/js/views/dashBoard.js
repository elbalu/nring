define([
	'jquery', 
	'underscore', 
	'backbone'
	], 
	function($, _, Backbone){
	
		var View = Backbone.View.extend({
		
			el: '#dashBoard',
		
			events: {
			},
			
			initialize: function(json) {
			},
			
			render: function(json) {
			}
		
		});
		
		return View;
	
	}
);
