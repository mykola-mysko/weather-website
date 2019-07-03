console.log('Client side js file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    fetch(`http://localhost:3000/weather?address=${location}`)
        .then(response => response.json())
        .then(({ forecast, location, error } = {}) => {
            if (error) {
                messageOne.textContent = error;
            } else {
                messageOne.textContent = forecast;
                messageTwo.textContent = location;
                search.value = '';
            }
        })
        .catch(err => console.log(err.message));
});
