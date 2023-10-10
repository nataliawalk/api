const timezoneUrl =  'http://worldtimeapi.org/api/timezone';
const timezoneSelect = document.getElementById('timezoneSelect');
const timezoneTime = document.querySelector('.timezoneTime');
const timezoneUtc = document.querySelector('.timezoneUtc');
const timezoneCountry = document.querySelector('.timezoneCountry');

const countryName = document.getElementById('countryName');
const countryCommon = document.querySelector('.countryCommon');
const countryOfficial = document.querySelector('.countryOfficial');
const countryCapital = document.querySelector('.countryCapital');
const countryRegion = document.querySelector('.countryRegion');
const countryPopulation = document.querySelector('.countryPopulation');
const countryTimezones = document.querySelector('.countryTimezones');
const check = document.getElementById('check');


buildTimezoneDropdown(timezoneUrl);

async function buildTimezoneDropdown(url) {
    let data = await callUrl(url);
    timezoneSelect.innerHTML = buildOptions(data);
    timezoneSelect.addEventListener('change', () => {
        const selectedOption = timezoneSelect.options[timezoneSelect.selectedIndex].value;
        fetchDataAndWriteToHTML(url+'/'+ selectedOption);
    });
}

function buildOptions(data) {
    let options = '<option value="">---</option>';
    data.forEach((el) => {
        options += '<option value="'+el+'">'+el+'</option>';
    });
    return options;
}

async function fetchDataAndWriteToHTML(urlSelected) {
        let data = await callUrl(urlSelected);
        writeFullTimeDataToHTML(data);
}

function writeFullTimeDataToHTML(data) {
    let timeZone = data.timezone;
    timezoneCountry.textContent = 'Country: '+timeZone;

    let utc = data.utc_offset;
    timezoneUtc.textContent = 'UTC offset: '+utc;

    let dateTime = data.datetime;
    timezoneTime.textContent = 'Time: '+dateTime;
}

async function callUrl(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error:', error);
    }    
}

check.addEventListener('click', function() {
    let name = countryName.value;
    let countryUrl = 'https://restcountries.com/v3.1/name/'+name;
    fetchCountryDataAndWriteToHTML(countryUrl);
});

async function fetchCountryDataAndWriteToHTML(urlSelected) {
    let data = await callUrl(urlSelected);

    if(data && data.status === 404) {
        writeErrorToHTML();
    }
    else {
        writeFullCountryDataToHTML(data);
    }
}

function writeErrorToHTML() {
    countryCommon.textContent = "Write correct name";
    countryOfficial.textContent = '';
    countryCapital.textContent = '';
    countryRegion.textContent = '';
    countryPopulation.textContent = '';
    countryTimezones.textContent = '';
}

function writeFullCountryDataToHTML(data) {
    let common = data[0].name.common;
    countryCommon.textContent = 'Common name: '+ common;

    let official = data[0].name.official;
    countryOfficial.textContent = 'Official name: '+ official;

    let capital = data[0].capital;
    countryCapital.textContent = 'Capital: '+ capital;

    let region = data[0].region;
    countryRegion.textContent = 'Region: '+ region;

    let population = data[0].population;
    countryPopulation.textContent = 'Population: '+ population;

    let timezones = data[0].timezones;
    countryTimezones.textContent = 'Timezone: '+ timezones;
}