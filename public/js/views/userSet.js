define([
	'jquery', 
	'underscore', 
	'backbone',
	'../../jsdust/userSet'
	], 
	function($, _, Backbone, userSet, gmaps){
	
		var View = Backbone.View.extend({
		
			el: '#userSet',
		
			events: {
			},
			addMarker: function(map,coords){
				var marker = new google.maps.Marker({
		            position: coords,
		            map: map,
		            draggable: true,
		           	title: "Your current location!"
	        });
				var circle = new google.maps.Circle({
		            map: map,
		            radius: 10000,
		            fillColor: '#2C2B27'
	        });

			circle.bindTo('center', marker, 'position');

			},
			
			loadMap : function(json){
				var that=this;
				geocoder = new google.maps.Geocoder();
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
					}
					function errorFunction(error) {
						alert("not shared");
						//$('#msgCtn').slideDown('slow');
				    	//$('#errCtn').html("Geocoder failed");
					}
				    function successFunction(position) {
						var lat = position.coords.latitude;
				        var lng = position.coords.longitude;
						var coords = new google.maps.LatLng(lat,lng);
								
				        // Prepare the map options
				        var mapOptions = {
				            zoom: 15,
				            center: coords,
				            mapTypeControl: false,
				            navigationControlOptions: {
				                style: google.maps.NavigationControlStyle.SMALL
				            },
				            mapTypeId: google.maps.MapTypeId.ROADMAP
				        };
				        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
				        that.addMarker(map,coords);
				    }
				        // Create the map, and place it in the map_canvas div
				        
			},

			initialize: function(json) {
				//gmaps.load("maps", "3", {sensor: false});
				
				console.log('json');
				console.log(json);
					
			},
			
			render: function(json) {								
				
				this.loadMap(json);
					
			},
			afterRender:function(json){

			}
			
		
		});
		
		return View;
	
	}
);
