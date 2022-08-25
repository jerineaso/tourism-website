// Initializing
let hamburger = document.querySelector('.hamburger');
let navigation = document.querySelector('.navigation');
let schedule_btn = document.querySelector(".schedule_btn");
let naviagte = document.querySelectorAll(".navigate");


// Event for Hamburger
hamburger.addEventListener('click',(e)=>{
    e.preventDefault();
    navigation.classList.toggle("navi");
})

// Tab Setup for Information Section
naviagte.forEach(item=>{
  item.addEventListener('click',e =>{
    e.preventDefault();
    getApiData(e.target.parentElement.className.slice(9,16));
  })
})

const getApiData = async (datas) =>{
  const res = await fetch("data.json");
  const response = await res.json();
  const someData = response.filter(item=>{
    return item.nature > datas
  })
  console.log(someData[0].nature);

}




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