// console.log('Client side javascript file is loaded');

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });
const getForecast = (address) => {
  fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
  response.json().then((data) => {
    if (data.error) {
      // console.log(data.error);
      messageOne.textContent = data.error;
    } else {
      // console.log(
      //   'address: ' + data.address + '\nforecast: ' + data.forecast
      // );
      messageOne.textContent = data.address;
      messageTwo.textContent = data.forecast;
    }
  });
});
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  getForecast(location);
  // console.log('Testing!', location);
})