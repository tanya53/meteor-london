if (Meteor.isClient) {
   var img_data = [
   	{
	   img_src: "tigger.jpg",
	   img_alt:"peeps picture"
	   },
   	{
	   img_src: "peeps.jpg",
	   img_alt:"tigger picture"
	   },
   	{
	   img_src: "tigger2.jpg",
	   img_alt:"another tigger picture"
	   }

   ];
   Template.images.helpers({images:img_data});
   
   Template.images.events({
   'click .js-image': function (event){
   		$(event.target).css("width","50px")
   }
   });
}
if (Meteor.isServer) {
   console.log("I am the server");
}
