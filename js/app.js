
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
      console.log(data.movies);
      return data.movies;
    },
    sync:function(method, model, options){
      options.timeout = 10000;
      options.dataType = "jsonp";
      return Backbone.sync(method, model, options);
    },
    initialize: function(){
       console.log("Collection initialized");
    } 

  });

  var MovieView = Backbone.View.extend({
    tagName: 'ul',
    //className:'col-md-1',
    initialize: function(){
      // this.listenTo(this.model, 'change', this.render);
    },
    render: function(){

      this.$el.html('<div class="row"><div class="col-xs-6 col-md-3"><a href="#" class="thumbnail"><img src="' + this.model.get('posters').thumbnail+ '" /> </a></div>' + '<figcaption>'+this.model.get('title')+'</figcaption>' + '<span>' + this.model.get('year')+'  '+ this.model.get('mpaa_rating')+'</span><hr/><span>'+this.model.get('synopsis') +'</span></div>');
      // console.log(this);
      return this; // It's good practice for chaining.
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
      this.collection.each(function(movie){
        // At this stage the movie object is not populated so logging attribute normally will not work
        // instead you will have to extract from attributes property
        var view = new MovieView({ model: movie });
        this.$el.append(view.render().el);
      }, this);
      return this;
    }
  });

  new MoviesView();

});