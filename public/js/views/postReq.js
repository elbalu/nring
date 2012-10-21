define([
	'jquery', 
	'underscore', 
	'backbone',
	'../../jsdust/postReq'
	], 
	function($, _, Backbone){
	
		var View = Backbone.View.extend({
		
			el: '#postReq',
		
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
