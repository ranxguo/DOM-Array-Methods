const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data =[];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add Money
async function getRandomUser(){
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

//Double every user's money

function doubleMoney(){
  data = data.map(item => {return {...item, money: item.money * 2}});
  updateDOM();
}

function sortByMoney() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function showMillionaires() {
  data = data.filter(item => item.money > 1000000);
  updateDOM();
}


function calculateWealth() {
  const wealth = data.reduce((sum, user) => (sum += user.money), 0);

  const wealthElement = document.createElement('div');
  wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthElement);
}

function addData(obj){
  data.push(obj);
  updateDOM();

}

//Updata DOM
function updateDOM(provideData = data){
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  provideData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number){
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}



// Event Listener

addUserBtn.addEventListener('click',  getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
