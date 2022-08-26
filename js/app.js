// Initializing
let hamburger = document.querySelector('.hamburger');
let navigation = document.querySelector('.navigation');
let schedule_btn = document.querySelector(".schedule_btn");
let nav_links = document.querySelectorAll(".nav_links")
let tab_desc = document.querySelector(".tab_desc");
let tablinks = document.querySelectorAll(".tablinks");

// Schedule Btn Event
schedule_btn.addEventListener('click',e=>{
  e.preventDefault();
  e.stopPropagation();
  window.location.href = "#contact"
})
// For Country API
let apiCountryData;

// Event for Hamburger
hamburger.addEventListener('click',(e)=>{
    e.preventDefault();
    navigation.classList.toggle("navi");
})

// Tab Setup for Information Section
nav_links.forEach(item=>{
  item.addEventListener('click',e =>{
    e.preventDefault();
    console.log(e.target.parentElement.className.slice(9,17));
    getApiData(e.target.parentElement.className.slice(9,17));
    nav_links.forEach(el => el.classList.remove("active"))
    e.target.classList.toggle("active")
  })
})

// Fetch API and Adding the exact data to tabs
const getApiData = async (datas) =>{
  const res = await fetch("data.json");
  const response = await res.json();
  const someData = response.find(item=>{
    return item.nature === datas
  })

  tab_desc.innerHTML = `<h3>Things you should know about New Zeland's ${someData.nature}</h3>
  <p>${someData.description}</p>
  <div class="blog_btn_and_data">
      <button type="submit" class="see_timeline blog_btn"> See Blog</button>
      <div class="data">
          <div class="details">
              ${someData.exact_location}<br>New Zealand
          </div>
          <div class="loc_img">
              <img src="${someData.img}" alt="River" class="small_img">
          </div>
      </div>
  </div>`
  
}

getApiData("river");

// Tabs links setup
tablinks.forEach(item=>{
  item.addEventListener('click', e =>{
    e.preventDefault();
    tablinks.forEach(el => el.classList.remove("active"))
    e.target.classList.toggle("active");
  })
})


// Date Range External Library
// link : https://www.auedu.in/assets/admin/plugins/daterangepicker/
$(function() {

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
    }, cb);
    cb(start, end);
});

// Timeline Date
$(function() {
    var start = moment().subtract(29, 'days');
    var end = moment();
    $('input[name="birthday"]').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      minYear: 1901,
      maxYear: parseInt(moment().format('YYYY'),10),
      startDate: start,
      endDate: end,
      locale: {
        format: 'DD MMMM YYYY  '
      }
    }, function(start, end, label) {
    });
});

// Fetching Data for Countries
const urlCountry = "https://countriesnow.space/api/v0.1/countries"

async function fetchCountryData(){
  const res = await fetch(urlCountry,{
    method:"GET"
  })
  const response = await res.json();

  apiCountryData = response.data

  apiCountryData.map((item)=>{
    country.innerHTML += `
    <option value="${item.country}">${item.country}</option>
    `
  })
}

fetchCountryData();
