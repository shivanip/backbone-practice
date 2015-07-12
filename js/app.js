$(function(){

var movies = new MoviesCollection();

})

// <--- Defining MovieModel --->

var MovieModel = Backbone.Model.extend({
  defaults: {
    title: 'unknown',
    year: 1900
  }
});

// <--- Defining MoviesCollection --->

var MoviesCollection = Backbone.Collection.extend({
    model: Movie,
    url:"http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?limit=16&country=us&apikey=gaggg3wsjg3z4amcrfhr45z5",
    parse: function(data) {
      console.log(data.movies);
      return data.movies;
    },
    sync:function(method, model, options){
      options.timeout = 10000;
      options.dataType = "jsonp";
      return Backbone.sync(method, model, options);
    },
    initialize: function(){
       // console.log("TEST");
       this.fetch();
  } 
});
return MoviesCollection;

// <--- Defining MoviesCollection View --->

var MoviesView = Backbone.View.extend({

  el: ".page",
  render: function(){
    var that = this;
    var movies = new Movies();
    movies.fetch({
      success: function(Movies){
        var template = _.template($("#movie-Template").html());
        that.$el.html(template);
      }
    })
  }
  
});
 
var view = new MoviesView();

// <--- Defining MovieModel View --->

var MovieView = Backbone.View.extend({

});