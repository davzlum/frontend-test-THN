const data = {};

function getDates() {
  data.checkInDate = document.querySelector('#fb-qs-summary-dates-arrival > span').getAttribute('data-date');
  data.checkOutDate = document.querySelector('#fb-qs-summary-dates-departure > span').getAttribute('data-date');
}

function getData() {
  getDates();
}

document.location.host === 'www.book-secure.com' ? getData() : 'error';
