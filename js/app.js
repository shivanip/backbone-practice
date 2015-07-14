
$(function(){

  // Backbone Movie View

  var Movie = Backbone.Model.extend({
    defaults:{
      title: 'My movies',
      year: 100,
      posters:{thumbnail:""}
    }
  });

  // Backbone Movies Collection

  var MovieList = Backbone.Collection.extend({
    model: Movie,
    url:function() {
       return this.url;
    },
    parse: function(data) {
      console.log(data.movies);
      return data.movies;
    },
    sync:function(method, model, options){
      options.timeout = 10000;
      options.dataType = "jsonp";
      return Backbone.sync(method, model, options);
    },
    initialize: function(model,options){
       this.url = options.url;
       console.log("Collection initialized "+ this.url);

    } 

  });

  // Backbone Movie View

  var MovieView = Backbone.View.extend({
    tagName: 'ul',
    //className:'col-md-1',
    initialize: function(){
      // this.listenTo(this.model, 'change', this.render);
    },
    render: function(){

      this.$el.html('<div class="row jumbotron"><div class="col-xs-6 col-md-3"><a href="#" class="thumbnail"><img src="' + this.model.get('posters').thumbnail+ '" /> </a></div>' + '<figcaption>'+this.model.get('title')+'</figcaption>' + '<span>' + this.model.get('year')+'  '+ this.model.get('mpaa_rating')+'</span><hr/><span>'+this.model.get('synopsis') +'</span></div>');
      // console.log(this);
      return this; // It's good practice for chaining.
    }
  });

  // Backbone Movies List View

  var MoviesView = Backbone.View.extend({
    tagName:'li',
    className:'row',
    el: $('#movies'),
    initialize: function(model,options){
      console.log("url="+options.url);
      this.collection = new MovieList([],{url:options.url});      
      this.collection.on("sync", this.render, this);
      this.collection.fetch();      
    },
    render: function(){
      this.collection.each(function(movie){
        // At this stage the movie object is not populated so logging attribute normally will not work
        // instead you will have to extract from attributes property
        var view = new MovieView({ model: movie });
        this.$el.append(view.render().el);
      }, this);
      return this;
    }
  });

  //new MoviesView();

  //Backbone Movie router

  var MovieRouter = Backbone.Router.extend({
    routes: {
      "inTheaters": "inTheaters",
      "newOnDvd":"newOnDvd"
    },

    inTheaters: function(){
      console.log("Test in in threater");
      $("#movies").html("");
      new MoviesView([],{url:'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?page_limit=16&page=1&country=us&apikey=gaggg3wsjg3z4amcrfhr45z5'});
    },
    newOnDvd: function(){
      console.log("Test in on dvd");
      $("#movies").html("");
      new MoviesView([],{url:'http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/current_releases.json?page_limit=16&page=1&country=us&apikey=gaggg3wsjg3z4amcrfhr45z5'});
    }
  });

  new MovieRouter();
  Backbone.history.start();

});








