$(document).ready(function() {
    $(hide).click(function() {
        $(showHideP).hide(1000);
        $(div1).fadeOut(1000);
    }); 
    $(show).click(function() {
        $(showHideP).show(1000);
        $(div1).fadeIn(1000);

    });
    $(slide).click(function() {
        $(panel).slideToggle("slow");
    });
    $(anim).click(function() {
        $(div2).animate({
            left: '500px',
            height: '150px',
            width: '150px',
        });
        $(div2).animate({
            left: '70%',
            height: '50px',
            width: '50px'
        })
        $(div2).animate({
            left: '25%',
            height: '80px',
            width: '80px'
        })
    });
    $(hoppa).click(function() {
        $("#div3").toggle("bounce", { times: 3 }, "slow");
    });


    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }
      
    
    function getCookie(cname) {
        var carr = document.cookie.split(";");
        var username = carr[0].split("=");
        console.log(carr[0]);
        return username[1];
    }
    getCookie();
    
    function checkCookie() {
        var user = getCookie("username");
        if (user == "eme") {
            console.log("Welcome " + user);
            document.getElementById("hemlis").style.display = "block";
        } else {
            console.log("Unknown user");
            setCookie("username", "anon", 7);
    
        }
    }
    checkCookie();
    
    
    function loggaIn() {
        var username = prompt("Username:");
        //var password = prompt("Password:");
        setCookie("username", username, 7);
        checkCookie();
    
    
    }

    function loggaUt() {
        setCookie("username", "anon", 7);
        document.getElementById("hemlis").style.display = "none";
        localStorage.clear();
        document.getElementById("storageOut").innerHTML = "First visit!";

        checkCookie();
    }
    document.getElementById("inloggning").addEventListener("click", loggaIn);
    document.getElementById("utloggning").addEventListener("click", loggaUt);

    if(localStorage.visited) {
        localStorage.visited = Number(localStorage.visited) + 1;
    } else {
        localStorage.visited = 1;
    }
    
    if(!localStorage.firstVisit) {
        localStorage.firstVisit = new Date();
    }
    document.getElementById("storageOut").innerHTML = "First visit: " + localStorage.firstVisit + "</br>Times visited: " + localStorage.visited;


//AJAX

    function loadDoc() {
        var xhttp = new XMLHttpRequest();
        //Check slide for JSON
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {

            document.getElementById("showData").innerHTML = this.responseText;
          }
        };
        xhttp.open("GET", "data.txt", true);
        xhttp.send();
      }

      function loadExtDoc() {
        var xhttp = new XMLHttpRequest();
        //Check slide for JSON
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {




            document.getElementById("showExtData").innerHTML = this.responseText;
          }
        };
        xhttp.open("GET", "http://ip-api.com/json/", true);
        xhttp.send();
      }
      document.getElementById("ajaxBut").addEventListener("click", loadExtDoc);



      window.onscroll = function() {scrollFunction()};

      function scrollFunction() {
        if ($(window).scrollTop() >= ($(document).height() - $(window).height()) * 0.6){
            loadDoc();
        } else {
            console.log("Scroll more");
        }
      
      }

      var ctx = document.getElementById('myChart');
      var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', 'Projected 2020'],
              datasets: [{
                  label: '# of Votes',
                  data: [3, 7, 8, 5, 10, 12, 14, 15],
                  backgroundColor: [
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 159, 64, 0.2)',

                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 0, 0, 0.2)'

                  ],
                  borderColor: [
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 0, 0, 0.2)'


                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });
            
    


});

var redSlider = document.getElementById("redRange");
var blueSlider = document.getElementById("blueRange");
var greenSlider = document.getElementById("greenRange");
var output = document.getElementById("rgbOutput");
output.innerHTML = redSlider.value + ", " + greenSlider.value + ", " + blueSlider.value;

redSlider.oninput = function() {
  output.innerHTML = redSlider.value + ", " + greenSlider.value + ", " + blueSlider.value;
  document.getElementById("body").style.background = "rgb(" + redSlider.value + ", " + greenSlider.value + ", " + blueSlider.value + ")";
}
blueSlider.oninput = function() {
    output.innerHTML = redSlider.value + ", " + greenSlider.value + ", " + blueSlider.value;
    document.getElementById("body").style.background = "rgb(" + redSlider.value + ", " + greenSlider.value + ", " + blueSlider.value + ")";
  
  }
greenSlider.oninput = function() {
    output.innerHTML = redSlider.value + ", " + greenSlider.value + ", " + blueSlider.value;
    document.getElementById("body").style.background = "rgb(" + redSlider.value + ", " + greenSlider.value + ", " + blueSlider.value + ")";
  
  }

  

      google.charts.load('current', {'packages':['corechart']});

      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Rating');
        data.addColumn('number', 'Numbers');
        data.addRows([
          ['Very bad', 1],
          ['Bad', 2],
          ['OK', 1],
          ['Good', 3],
          ['Very Good', 7]
        ]);

        // Set chart options
        var options = {'title':'Satisfaction with my site',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('gChart'));
        chart.draw(data, options);
      }

      //HighChart
      Highcharts.chart('highChart', {

        title: {
            text: 'Satisfaction over time'
        },
        
        yAxis: {
            title: {
                text: 'Rating'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2013
            }
        },
    
        series: [{
            name: 'Satisfaction',
            data: [2, 2.4, 2.8, 3.2, 3, 3.6, 4]
        }, {
            name: 'Projection',
            data: [null, null, null, null, null, null, 4, 4.4],
            dashStyle: 'ShortDash',
            
        } ],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    });

