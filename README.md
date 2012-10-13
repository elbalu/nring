simple-mvc-app
==============

Simple MVC app with node, express, backbone, underscore, dust

This is just my first attempt to put together an app that uses require to load modules, express to define routes (controller), Backbone views and models (both on the client side and server side), dust for templating, and a mechanism to render the dust templates with the "current" data on either the server side or client side depending on whether it is an AAJAX request or a non-ajax request.

TODO: Basic CRUD (Create, read, update, delete) with a mongodb

Note: This app does not use webcore, since this is an attempt to understand each of these technologies separately.


Steps
=====
git clone git@github.paypal.com:nshanker/simple-mvc-app.git

(cd into the folder where the apps files were cloned)

npm install backbone consolidate dustjs-linkedin express uglify-js underscore

./compile

node server.js

(go to localhost:3000 using a browser)

