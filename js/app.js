$(function(){

var movies = new Movies();

})

Movie = Backbone.Model.extend({
  defaults: {
    title: 'unknown',
    year: 1900
  }
});

var Movies = Backbone.Collection.extend({
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

var MovieView = Backbone.View.extend({
  // tagName: 'li',
  // template: _.template( $('#personTemplate').html()),
  // render: function() {
  //   this.$el.html( this.template(this.model.toJSON()) );
  //   return this;
  // }
});
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
  // tagName: 'ul',
  // initialize: function(){
  //   console.log(this.collection);
  // }
  // render: function(){
  //   this.collection.each(function(movie) {
  //     var movieView = new MovieView({ model: movie });
  //     this.$el.append(movieView.render().el);
  //   }, this);

  //   return this;
  // }
});
 var view = new MoviesView();