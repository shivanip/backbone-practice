Dog = Backbone.Model.extend({
  initialize: function(){
    // This is a function that will run automatically as soon as
    // a new instance of Dog is created.

    // So immediately a new Dog is created we'll create a new view
    // to be associated with it (this === that particular instance of Dog)
    // Essentially what's happening is that whenever a new instance of Dog
    // is created we are assigning it a view and assigning that view to the
    // this.view property of the new instance of the Dog.
    this.view = new DogView({model: this});
    // Now we want that whenever there's a change in this model we want 
    // the view to update itself.
    this.on('change:name', function() {
      this.view.render(); // We'll write a render function in the Dogview, so that whenever there is a change in the name of the dog it will re-render the view showing that change.
    });// on will look for different events to occur

  }
});

