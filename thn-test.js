const data = {};

const getDates = () => {
  data.checkInDate = document.querySelector('#fb-qs-summary-dates-arrival > span').getAttribute('data-date');
  data.checkOutDate = document.querySelector('#fb-qs-summary-dates-departure > span').getAttribute('data-date');
};

function getCurrency() {
  const money = document.querySelector('#fb-headbar-block-currency > span.fb-headbar-value').innerText.split(' ');
  data.currency = money[1].replace(/\((\w+)\)/g, '$1');
}

function getGuestsInfo() {
  const roomSelection = document.querySelector('#fb-qs-summary-rooms-quantity > span');
  data.rooms = Number(roomSelection.getAttribute('data-placeholders').replace(/\[(\w+)\]/g, '$1'));
  const adults = Number(document.querySelector('span[data-key=adult]').getAttribute('data-mode'));
  const childrens = Number(document.querySelector('span[data-key=child]').getAttribute('data-mode'));
  data.guests = { adults, childrens };
  data.totalGuests = adults + childrens;
}

const getData = () => {
  getDates();
  getCurrency();
  getGuestsInfo();
  return (data);
};

const error = () => 'error';

// eslint-disable-next-line no-unused-expressions
document.location.host === 'www.book-secure.com' ? getData() : error();
