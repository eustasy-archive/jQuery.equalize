////////////////////////////////////////////////////////
////////                                        ////////
////////            jQuery Equalize             ////////
////////                                        ////////
////////////////////////////////////////////////////////
//                                                    //
//  This small jQuery Script equalizes the height of  //
//  all the divs with the class of equalize within    //
//  each of the group classes.                        //
//                                                    //
//  It works well with our columns system.            //
//                                                    //
//  You should use the minified version.              //
//                                                    //
////////////////////////////////////////////////////////

function equalize() { // Define a new function
    $('.group').each(function(){ // For each group class
        var highestBox = 0; // Clear the highest height
        $('.equalize', this).css('height', 'auto') // Set all the equalize classes to auto
        $('.equalize', this).each(function(){ // For each equalize class
            // If it's height is bigger than the highest height, it's the new heighest
            if($(this).height() > highestBox) highestBox = $(this).height();
        }); // Finshed with this group?
        $('.equalize',this).height(highestBox); // Set them to all be the heighest
    }); // Start again, or finished with all the groups?
} // Finish defining the function
$(function(){ equalize(); }); // Run the function when the page has loaded
window.onresize = function() { equalize(); } // And every time the window is resized.