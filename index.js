// The following is my backend code

// Functionality code for the imageDisplayButton to fetch data from API and display random photos onClick.
     function fetchAndDisplayImage() {
      /*const imageUrl = 'https://picsum.photos/200/300';*/
      const imageUrl = 'https://source.unsplash.com/random?pictures';

      fetch(imageUrl)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.blob();
          })
          .then(blob => {
              const objectURL = URL.createObjectURL(blob);
              document.getElementById('imageToDisplay').src = objectURL;
          })
          .catch(error => {
              console.error('Error fetching image:', error);
          });
  }

// Functionality code for the Booking Session, clients book specific date and time and cannot be shared with another client. 

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('form');
  const bookedDates = new Set();
  const bookedDetails = [];

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve form values
    const firstName = document.querySelector('[name="First Name"]').value;
    const lastName = document.querySelector('[name="Last Name"]').value;
    const email = document.querySelector('[name="Email-address"]').value;
    const dateTime = document.querySelector('[name="date/time"]').value;
    const photographer = document.querySelector('[name="Photographers"]').value;

    // Validate if the selected date/time is not before today
    const selectedDate = new Date(dateTime);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert('Please choose a date and time from today and onwards.');
      return;
    }

    // Check if the date/time is already booked
    if (bookedDates.has(dateTime)) {
      alert('Sorry, the selected date and time are already booked. Please choose another time and date.');
    } else {
      // Add the booked date/time to the set
      bookedDates.add(dateTime);

      // Store the booked details
      const bookingDetails = {
        firstName,
        lastName,
        email,
        dateTime,
        photographer,
      };
      bookedDetails.push(bookingDetails);

      // Display a confirmation message with the list of booked people
      const bookedList = bookedDetails.map(details => `${details.firstName} ${details.lastName} - ${details.dateTime} with ${details.photographer}`).join('\n');
      alert(`Thank you, ${firstName} ${lastName}! You have successfully booked a session with ${photographer} on ${dateTime}. An email confirmation will be sent to ${email}.\n\nBooked List:\n${bookedList}`);

      // Reset the form
      form.reset();
    }
  });

  // Reset button functionality
  const resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', function () {
    bookedDates.clear(); // Clear booked dates when the form is reset
    bookedDetails.length = 0; // Clear booked details
  });
});