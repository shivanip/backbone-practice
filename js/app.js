
$(function(){


  // <--- Defining MovieModel --->

  var MovieModel = Backbone.Model.extend({
   defaults: {
    title: "",
    year: 1900
   }
  });


  // <--- Defining MoviesCollection --->

  var MoviesCollection = Backbone.Collection.extend({
      model: MovieModel
  });

  //<--- A Bunch of Movies --->

  var movies = new MoviesCollection([
        new MovieModel({title: "Titanic", year: 1997}),
        new MovieModel({title: "Avatar", year: 209}),
        new MovieModel({title: "The Avengers", year: 2012}),
        new MovieModel({title: "Star Wars", year: 1983}),
        new MovieModel({title: "The Dark Knight", year: 2008}),
        new MovieModel({title: "Inception", year: 2010}),
        new MovieModel({title: "The Hunger Games", year: 2012}),
        new MovieModel({title: "Jurassic Park", year: 1993}),
        new MovieModel({title: "Furous 7", year: 2015}),
        new MovieModel({title: "Transformers", year: 2007}),
        new MovieModel({title: "Gravity", year: 2013}),

      ]);



  // <--- Defining MovieModel View --->

  var MovieView = Backbone.View.extend({
    tagName: 'li',

    intialize: function(){

      this.listenTo(this.model, 'change', this.render);
    },

    render: function(){

      this.$el.html('<h3>'+this.model.get("title")+'</h3><hr/><h5>'+this.model.get("year")+"</h5>");
      return this;
    }

  });

  // <--- Defining Main App View --->

  var App = Backbone.View.extend({
      el: $("#main"),

      initialize: function(){
        this.moviesList = $("#movies");
        this.listenTo(movies, 'change', this.render);
        movies.each(function(movie){
          var view = new MovieView({model:movie});
          this.moviesList.append(view.render().el); 
        }, this);
      },

      render: function(){
        _.each(movies, function(elem){
          
        });
      }
  });

});


