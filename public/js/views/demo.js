/*global window:true document:true */

define([
	'jquery',
	'backbone'
],

function ($, Backbone) {
	'use strict';


	return Backbone.View.extend({

		el: '#demo',


		events: {
						
		},

		initialize: function () {
			
			this.model = new Backbone.Model();
		},

		
	});

});

