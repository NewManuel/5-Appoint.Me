 // This is a jQuery shortcut for $(document).ready(). It ensures that the enclosed code runs once the DOM is fully loaded. Event listeners is added for buttons, class selectors are used  and ids target specific ones.
$(function () {
 
  // $(".btn").on("click", function () { ... }): This attaches a click event listener to all elements with the class .btn. When any of these elements are clicked, the function inside the event listener is executed.
  $(".btn").on("click", function () {
    var timeSpecific = $(this).closest("div").attr("id");

    // var textEntry = $(this).siblings("textarea").val();: This retrieves the value of the textarea element that is a sibling of the clicked button.
    var textEntry = $(this).siblings("textarea").val();

    // localStorage stores the hour and text-value in text area.
    localStorage.setItem(timeSpecific, textEntry);
  });

  // This retrieves the current hour using the dayjs() library.
  var currentHour = dayjs().hour();
  
  // This iterates over each element(id) with the class .time-block and applies a function (checks with the current time, then sets the class for each time block) to it.

  $(".time-block").each(function () {
    // This extracts the hour value from the id attribute of each .time-block element.
    var hourBlock = parseInt($(this).attr("id").split("-")[1]);

    // Based on the current time, it adds a class (past, present, or future) to each time block to visually indicate if it's in the past, present, or future.
    if (hourBlock < currentHour) {
      $(this).addClass("past");
    } else if (hourBlock === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  //  This iterates over each .time-block element again to retrieve and display any previously stored input from localStorage in the corresponding textarea.
  $(".time-block").each(function () {
    var timeSpecific = $(this).attr("id");
    var savedText = localStorage.getItem(timeSpecific);

    
  $(this).find("textarea").val(savedText);
  });

  //This attaches a click event listener to the element with the id #clearBtn (presumably a clear button). When clicked, it clears the localStorage and sets all text areas to blank.Deletes all keys in local storage and set the text value of the time blocks to blank.
  $("#clearBtn").on("click", function () {
    localStorage.clear();
    $("textarea").val("");
  });

  //  This retrieves the current date using the dayjs() library and formats it as "Month Day, Year".
  var currentDate = dayjs().format("MMMM DD, YYYY");
  //  This sets the text content of the element with the id #currentDay to display the current date.
  $("#currentDay").text(currentDate);
});