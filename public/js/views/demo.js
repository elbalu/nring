define([
	'jquery', 
	'underscore', 
	'backbone',
	'../../jsdust/demo'
	], 
	function($, _, Backbone){
	
		var View = Backbone.View.extend({
		
			el: '#demo',
		
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
