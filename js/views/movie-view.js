// We set up a MovieView to be an extension of the backbone view object.
// And we told it that it's element should be pointing towards the div
// with the id of 'Movie'. 
// We set up an event object where it will be looking for clicks on 
// a button with the id of 'set' inside of the Movie element.
// Whenever we seea click on this button it's going to call the et name
// function. 
// When it calls the set name function it's going to create a variable
// called name and grab the value out of the form input with the
// id of 'name' and we're going to set the model associated with this
// view to have it's name property change to the name that the person
// typed into that form input.


var MovieView = Backbone.View.extend({
  tagName: 'li',
  template: _.template( $('#personTemplate').html()),
  render: function() {
    this.$el.html( this.template(this.model.toJSON()) );
    return this;
  }
});

var MoviesView = Backbone.View.extend({
  tagName: 'ul',
  render: function(){
    this.collection.each(function(movie) {
      var movieView = new MovieView({ model: movie });
      this.$el.append(movieView.render().el);
    }, this);

    return this;
  }
});