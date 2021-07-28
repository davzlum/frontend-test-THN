const data = {};

const getDates = () => {
  data.checkInDate = document.querySelector('#fb-qs-summary-dates-arrival > span').getAttribute('data-date');
  data.checkOutDate = document.querySelector('#fb-qs-summary-dates-departure > span').getAttribute('data-date');
};

const getCurrency = () => {
  const money = document.querySelector('#fb-headbar-block-currency > span.fb-headbar-value').innerText.split(' ');
  data.currency = money[1].replace(/\((\w+)\)/g, '$1');
};

const getGuestsInfo = () => {
  const roomSelection = document.querySelector('#fb-qs-summary-rooms-quantity > span');
  data.rooms = Number(roomSelection.getAttribute('data-placeholders').replace(/\[(\w+)\]/g, '$1'));
  const adults = Number(document.querySelector('span[data-key=adult]').getAttribute('data-mode'));
  const childrens = Number(document.querySelector('span[data-key=child]').getAttribute('data-mode'));
  data.guests = { adults, childrens };
  data.totalGuests = adults + childrens;
};

const getLanguage = () => {
  data.language = document.documentElement.lang;
};

const getRoomsDetails = (roomsByTypes) => {
  const roomsPricesList = [];
  const nightsNum = document.querySelector('div.fb-results-rate--right > div:nth-child(1) > span > span:nth-child(1)').getAttribute('data-mode');
  for (let i = 0; i < roomsByTypes.length; i += 1) {
    for (let z = 0; z < roomsByTypes[i].prices.length; z += 1) {
      roomsPricesList.push({
        price: roomsByTypes[i].prices[z].toFixed(2),
        dailyPrice: ((roomsByTypes[i].prices[z]) / nightsNum).toFixed(2),
        refundable: !roomsByTypes[i].refundable[z].includes('cross'),
        breakfast: !roomsByTypes[i].breakfast[z].includes('cross'),
        typeRoom: roomsByTypes[i].type,
      });
    }
  }
  data.ratesList = roomsPricesList;
  roomsPricesList.sort((a, b) => a.price - b.price);
  data.minimumPrice = { ...roomsPricesList[0] };
};

const getRoomsData = () => {
  const roomsByTypes = [];
  const roomsSelection = document.getElementsByClassName('col-xs-12 fb-results-accommodation fb-gray-bg');
  for (let i = 0; i < roomsSelection.length; i += 1) {
    const pricesSelection = roomsSelection[i].querySelectorAll('div.fb-results-rate--right > div:nth-child(2) > div> span');
    const pricesFiltered = Array.from(pricesSelection).filter((element) => (element.getAttribute('class') === 'fb-price'));
    const pricesArray = pricesFiltered.map((element) => Number(element.getAttribute('data-price')));
    const refundable = Array.from(roomsSelection[i].querySelectorAll('div:nth-child(2) > div.col-xs-12.col-sm-1.fb-container > img')).map((element) => (element.getAttribute('src')));
    const breakfast = Array.from(roomsSelection[i].querySelectorAll('div.col-xs-4.fb-dark-gray.fb-container > div.col-xs-12.col-sm-2.fb-container > img')).map((element) => (element.getAttribute('src')));
    roomsByTypes.push({
      type: (roomsSelection[i].querySelector('div.col-xs-12.fb-dark-bg.fb-block-header.fb-results-acc-title > span')).getAttribute('data-fallback'),
      prices: pricesArray,
      refundable,
      breakfast,
    });
  }
  getRoomsDetails(roomsByTypes);
};

const getData = () => {
  getDates();
  getCurrency();
  getGuestsInfo();
  getLanguage();
  getRoomsData();
  return (data);
};

const error = () => 'error';
document.location.host === 'www.book-secure.com' ? getData() : error();
