$(function(){

  var Movie = Backbone.Model.extend({
    defaults:{
      title: 'My movies',
      year: 100,
      posters:{thumbnail:""}
    }
  });

  var MovieList = Backbone.Collection.extend({
    model: Movie,
    url:"http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?limit=16&country=us&apikey=gaggg3wsjg3z4amcrfhr45z5",
    parse: function(data) {
      // console.log(data.movies);
      // var movies = data.movies;
      // var cleanMovies = [];
      // Object.keys(movies).forEach(function(key){ 
      //   var value = movies[key];
      //   cleanMovies.push(value);
      //   // console.log(value.title+","+value.year);
      //   // cleanMovies.push({title:value.title,posters:value.posters.thumbnail,year:value.year});

      // });
      console.log(data.movies);
      return data.movies;
    },
    sync:function(method, model, options){
      options.timeout = 10000;
      options.dataType = "jsonp";
      return Backbone.sync(method, model, options);
    },
    initialize: function(){
       console.log("Cllection initialized");
    } 

  });

  var MovieView = Backbone.View.extend({
    tagName: 'div',
    className:'col-md-1',
    initialize: function(){
      this.listenTo(this.model, 'change', this.render);
    },
    render: function(){
      this.$el.html('<img src="' + this.model.get('posters').thumbnail+ '" /> ' + '<figcaption>'+this.model.get('title')+'</figcaption>' + '<span>' + this.model.get('year') + '</span>');
      return this;
    }
  });

  var MoviesView = Backbone.View.extend({
    tagName:'li',
    className:'row',
    el: $('#movies'),
    initialize: function(){        
      this.collection = new MovieList();      
      this.collection.on("sync", this.render, this);
      this.collection.fetch();      
    },
    render: function(){
      console.log("called render");
      this.collection.each(function(movie){
        console.log(movie.year);
        var view = new MovieView({ model: movie });
        this.$el.append(view.render().el);
      }, this);
      return this;
    }
  });

  new MoviesView();

});