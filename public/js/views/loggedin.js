define([
	'jquery', 
	'underscore', 
	'backbone',
	'../../jsdust/loggedin'
	], 
	function($, _, Backbone, template){
	
		var View = Backbone.View.extend({
		
			el: '#loggedin',
		
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
