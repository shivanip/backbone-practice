// We set up a DogView to be an extension of the backbone view object.
// And we told it that it's element should be pointing towards the div
// with the id of 'dog'. 
// We set up an event object where it will be looking for clicks on 
// a button with the id of 'set' inside of the dog element.
// Whenever we seea click on this button it's going to call the et name
// function. 
// When it calls the set name function it's going to create a variable
// called name and grab the value out of the form input with the
// id of 'name' and we're going to set the model associated with this
// view to have it's name property change to the name that the person
// typed into that form input.


DogView = Backbone.View.extend({
  // Associating this view to the particular element in the html page.
  el: '#dog',// el is the property that is given automatically with a view
  events: { // over her we pass in user events such as hover etc. 
    'click #set': 'setName' // this will for a click event on somthing with the id of set in the element with the id of dog.
  },
  setName: function() {
    var name = $('#name').val();
    this.model.set({name: name}); // Allows to change things in the model
  },
  // In 'render' function we want to select the element that belongs go this 
  // view and swap out the contents of that element with the new name that
  // has been set by that model.
  render: function() {
    this.$el.html(this.model.get('name'));    // this.el is the reference to the element with the id of dog. 
    // With the $ sign in front this will have jQuery to select this element
    // this element for us and now this is a jQuery selection.              
  }
});