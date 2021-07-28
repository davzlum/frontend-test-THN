const data = {};

const getDates = () => {
  data.checkInDate = document.querySelector('#fb-qs-summary-dates-arrival > span').getAttribute('data-date');
  data.checkOutDate = document.querySelector('#fb-qs-summary-dates-departure > span').getAttribute('data-date');
};

const getData = () => {
  getDates();
  return (data);
};

const error = () => 'error';

// eslint-disable-next-line no-unused-expressions
document.location.host === 'www.book-secure.com' ? getData() : error();
