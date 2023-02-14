const country = document.getElementById('country')
const states = document.getElementById('state');

const res = fetch('https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json')

let all = [];
let country1 = [];

res.then((result1) => {
    result1.json().then((api) => {
        all = api;
        console.log(all);
        country1 = api.map((obj) => obj.name);
        addition(country, country1);
    });
});

const addition = (parentEle, arr) => {
    const newAdd = document.createElement("option");
    parentEle.appendChild(newAdd);
    arr.forEach((ele) => {
        const newAdd = document.createElement("option");
        newAdd.value = ele;
        newAdd.text = ele;
        parentEle.appendChild(newAdd);
    });
};


const selectCountry = (event) => {
    const length = states.options.length;
    for (i = length - 1; i >= 0; i--) {
        states.options[i] = null;
    }
    let requestdata = all.filter((item) => item.name == event.target.value);
    if (requestdata.length != 0) {
        let statesData = requestdata[0].states.map((state) => state.name);
        addition(states, statesData);
    }
}
country.addEventListener("change", selectCountry);