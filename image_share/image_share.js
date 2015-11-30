Images = new Mongo.Collection("images");
console.log(Images.find().count());

if (Meteor.isClient) {
   var img_data = [
   {
      img_src:"laptops.jpg",
      img_alt:"some laptops on a table" 
   }, 
   {
      img_src:"bass.jpg",
      img_alt:"a bass player" 
   }, 
   {
      img_src:"beard.jpg",
      img_alt:"some musicians with beards" 
   }, 

   ];

// below code is for when use the data from above
//   Template.images.helpers({images:img_data});
//below for database query, sorted by highest rating
	Template.images.helpers({images:
	   Images.find({},{sort:{createdOn:-1, rating:-1}})
	   });

//puts the images out
   Template.images.events({
    'click .js-image':function(event){
        $(event.target).css("width", "50px");
    },
//does the delete of the image
    'click .js-del-image':function(event){
    	var image_id = this._id;
    	console.log(image_id);
    	//delay the delete, uses jquery animation, so it is noticeable
    	$("#"+image_id).hide('slow',function(){
    	Images.remove({"_id":image_id});
  	    })
  	  },
//does the rating
	  'click .js-rate-image':function(event){
	  	var rating = $(event.currentTarget).data("userrating");
	  	console.log(rating);
	  	var image_id = this.id;
	  	console.log(image_id);
	  	Images.update({_id:image_id},{$set:{rating:rating}});
	  },
	  'click .js-show-image-form':function(event){
	  	$("#image_add_form").modal('show');
	  }

   });
   
   Template.image_add_form.events({
   		'submit .js-add-image':function(event){
   		    var img_src,img_alt;
   		    img_src=event.target.img_src.value;
   		    img_alt=event.target.img_alt.value;
   		    console.log("src: "+img_src +" img_alt: "+img_alt);
   		    Images.insert({img_src:img_src,
   		     			   img_alt:img_alt,
   		     			   createdOn:new Date()
   		     			  });
   		    $("#image_add_form").modal('show');
   		    return false;
   		    }
   });
   

}

if (Meteor.isServer) {
   console.log("I am the server");
}


console.log("where am I running");

