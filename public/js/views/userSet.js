/*global window:true document:true */

define([
	'jquery',
	'backbone'
],

function ($, Backbone) {
	'use strict';


	return Backbone.View.extend({

		el: '#userSet',


		events: {
						
		},

		initialize: function () {

			this.model = new Backbone.Model();
		},

		
	});

});

