# Solo Challenge - Bootstrap - 1 
Challenge points:
- Front End Styling
- Bootstrap Grid System
- Bootstrap Screen Size Adjustments and Styling
- Working with data using a third party API
- Population of Content through jQuery and Bootstrap

For this challenge, you will once again be working with the Giantbomb API. Your goal is to populate Bootstrap content based on the return of the API call. For this challenge, do not start with a search bar, go ahead and start with the search occuring in your Javascript.

Once the call is successful, the code provided will already have the success callback in place to hook into (this is the exact same code you started with yesterday). In that success callback, start the content population process.

You will need to populate Bootstrap content using jQuery and Javascript. Specifically, we are looking for you to populate an image, the title of the return, and the 'deck' of the returned objects. 

List out only 9 returned titles. Each title should be in a well that has an overridden color in your own stylesheet. The image should only display on LG and MD displays and should hide for SM and XS displays. The title should be in a p tag and have a lead class. Finally, include a button that has the bootstrap styling to make it small with the success styling. This button should remove the entire game title from the page (the content need not update in the html page to adjust rows)

##Hard Mode
Include a jQuery fadeOut for the title being removed. Additionally, have the content appear with a jQuery fadeIn.

##Pro Mode
Update the rows based off removed titles (This will be tricky)
