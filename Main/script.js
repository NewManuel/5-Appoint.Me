// $(document).ready(function () {
//   // listen for save button clicks
//   $('.saveBtn').on('click', function () {
//     // get nearby values
//     var value = $(this).siblings('.description').val();
//     var time = $(this).parent().attr('id');

//     // save in localStorage
//     localStorage.setItem(time, value);

//     // Show notification that item was saved to localStorage by adding class 'show'
//     $('.notification').addClass('show');

//     // Timeout to remove 'show' class after 5 seconds
//     setTimeout(function () {
//       $('.notification').removeClass('show');
//     }, 5000);
//   });

//   function hourUpdater() {
//     // get current number of hours
//     var currentHour = dayjs().hour();

//     // loop over time blocks
//     $('.time-block').each(function () {
//       var blockHour = parseInt($(this).attr('id').split('-')[1]);

//       // check if we've moved past this time
//       if (blockHour < currentHour) {
//         $(this).addClass('past');
//       } else if (blockHour === currentHour) {
//         $(this).removeClass('past');
//         $(this).addClass('present');
//       } else {
//         $(this).removeClass('past');
//         $(this).removeClass('present');
//         $(this).addClass('future');
//       }
//     });
//   }

//   hourUpdater();

//   // set up interval to check if current time needs to be updated
//   setInterval(hourUpdater, 15000);

//   // load any saved data from localStorage
//   $('#hour-9 .description').val(localStorage.getItem('hour-9'));
//   $('#hour-10 .description').val(localStorage.getItem('hour-10'));
//   $('#hour-11 .description').val(localStorage.getItem('hour-11'));
//   $('#hour-12 .description').val(localStorage.getItem('hour-12'));
//   $('#hour-13 .description').val(localStorage.getItem('hour-13'));
//   $('#hour-14 .description').val(localStorage.getItem('hour-14'));
//   $('#hour-15 .description').val(localStorage.getItem('hour-15'));
//   $('#hour-16 .description').val(localStorage.getItem('hour-16'));
//   $('#hour-17 .description').val(localStorage.getItem('hour-17'));

//   // display current day on page
//   $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
// });


 // This is a jQuery shortcut for $(document).ready(). It ensures that the enclosed code runs once the DOM is fully loaded. Event listeners is added for buttons, class selectors are used  and ids target specific ones.
$(function () {
 
  // $(".btn").on("click", function () { ... }): This attaches a click event listener to all elements with the class .btn. When any of these elements are clicked, the function inside the event listener is executed.
  $(".btn").on("click", function () {
    var idSpecificHr = $(this).closest("div").attr("id");

    // var textEntry = $(this).siblings("textarea").val();: This retrieves the value of the textarea element that is a sibling of the clicked button.
    var textEntry = $(this).siblings("textarea").val();

    // localStorage stores the hour and text-value in text area.
    localStorage.setItem(idSpecificHr, textEntry);
  });

  // To get the current hour no need to import because in js because it was imported in the html
  var currentHour = dayjs().hour();
  // Gets the number from the id to check against the current time to then set the classes for the time blocks.
  $(".time-block").each(function () {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
  // Sets the text area text to the previous memo by pulling from local storage.
  $(".time-block").each(function () {
    var idSpecificHr = $(this).attr("id");
    var storedInput = localStorage.getItem(idSpecificHr);

    $(this).find("textarea").val(storedInput);
  });
  // Deletes all keys in local storage and set the text value of the time blocks to blank.
  $("#clearBtn").on("click", function () {
    localStorage.clear();
    $("textarea").val("");
  });
  var currentDate = dayjs().format("MMMM DD, YYYY");
  $("#currentDay").text(currentDate);
});