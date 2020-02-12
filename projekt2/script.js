

function getUserInfo() {
    checkBrowser();
   // document.getElementById("browser").innerHTML = "Browser: " + navigator.userAgent;
    document.getElementById("language").innerHTML = "Language: " + navigator.language;
    document.getElementById("OS").innerHTML = "OS: " + navigator.oscpu;
    document.getElementById("resolution").innerHTML = "Resolution: " + window.screen.availWidth + "x" + window.screen.availHeight;

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    getUserIP(function(ip){
        document.getElementById("ip").innerHTML = "IP: " + ip;
    });
    
    

}
function geoSuccess(pos) {
    var geoloclat = pos.coords.latitude;
    var geoloclong = pos.coords.longitude;
    document.getElementById("latitude").innerHTML = "Latitude: " + geoloclat;
    document.getElementById("longitude").innerHTML = "Longitude: " + geoloclong;

}
function geoError() {
    document.getElementById("latitude").innerHTML = "Kan inte hämta positionen";
}
function checkBrowser() {
    if (navigator.userAgent.indexOf("Firefox") > -1) {
        browser = "Mozilla Firefox";
      } else if (navigator.userAgent.indexOf("SamsungBrowser") > -1) {
        browser = "Samsung Internet";
      } else if (navigator.userAgent.indexOf("Opera") > -1 || navigator.userAgent.indexOf("OPR") > -1) {
        browser = "Opera";
      } else if (navigator.userAgent.indexOf("Trident") > -1) {
        browser = "Microsoft Internet Explorer";
      } else if (navigator.userAgent.indexOf("Edge") > -1) {
        browser = "Microsoft Edge";
      } else if (navigator.userAgent.indexOf("Chrome") > -1) {
        browser = "Google Chrome";
      } else if (navigator.userAgent.indexOf("Safari") > -1) {
        browser = "Apple Safari";
      } else {
        browser = "unknown";
      }
      document.getElementById("browser").innerHTML = "Browser: " + browser;
      }

/**
 * Get the user IP throught the webkitRTCPeerConnection
 * @param onNewIP {Function} listener function to expose the IP locally
 * @return undefined
 */
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome

    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
    noop = function() {},
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g, key;


    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

     //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer().then(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });
        
        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function(reason) {
        // An error occurred, so handle the failure to connect
    });

    //listen for candidate events
    pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}
const memBox = document.querySelectorAll(".memoryBox");
console.log(memBox);

let boxFlipped = false;
let lockBoxes = false;
let firstBox, secondBox;

function flipBox() {
    console.log("Click");
    if (lockBoxes) return;
    this.classList.add("flip");

    if (!boxFlipped) {
        boxFlipped = true;
        firstBox = this;
        console.log("Not flipped");
        return;
    }
    secondBox = this;
    boxFlipped = false;
    console.log("Second box flipped");
    checkMatch();
}
function checkMatch() {
    if (firstBox.dataset.framework == secondBox.dataset.framework) {
        disableBox();
        console.log("Match")
        return;
    }
    unflipBox();
}
function disableBox() {
    firstBox.removeEventListener("click", flipBox);
    secondBox.removeEventListener("click", flipBox);

}

function unflipBox() {
    lockBoxes = true;
    setTimeout(() =>  {
        firstBox.classList.remove("flip");
        secondBox.classList.remove("flip");
        lockBoxes = false;
    }, 1500);
}

memBox.forEach(box => box.addEventListener("click", flipBox));


 var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("empty");
  var columns = document.getElementsByClassName("column");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < columns.length; i++) {
      columns[i].className = columns[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  columns[slideIndex-1].className += " active";
}

var running = 0;
var startTime;
var interval;
var paused = 0;
var difference;
var savedTime;
var updatedTime;
var intervalTime;
var intervalList = [];


function startAndStop() {
    if (!running) {
        startTime = new Date().getTime();
        running = 1;
        paused = 0;
        console.log("Timer running now");
        interval = setInterval(showTime, 1);


    } else if (!paused) {
        clearInterval(interval);
        savedTime = difference;
        paused = 1;
        running = 0;
        console.log("now paused");
    }
        

}
function convertTime(time) {
    var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((time % (1000 * 60)) / 1000);
    var milliseconds = Math.floor((time % (1000 * 60)) / 100);
    console.log(milliseconds);

    hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
  return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;

}

function resetAndInter() {
    if (!paused) {
        console.log("Running, taking interval");
        intervalList.push(convertTime(difference));
        document.getElementById("timerInter").innerHTML = "Interval: <br>" + intervalList.join("<br>");

    }
    if (!running) {
        console.log("Stopped, resetting")
    clearInterval(interval);
    savedTime = 0;
    difference = 0;
    paused = 0;
    running = 0;
    firstStart = 0;
    document.getElementById("timer").innerHTML = "00:00:00";
    intervalList = [];
    document.getElementById("timerInter").innerHTML = "Interval: <br>" + intervalList.join("<br>");


    }

}
function showTime() {
    updatedTime = new Date().getTime();
    console.log(updatedTime);
    if (savedTime) {
        difference = (updatedTime - startTime) + savedTime;
    } else {
    difference = updatedTime - startTime;
    }
  document.getElementById("timer").innerHTML = convertTime(difference);


  
}

function whoWins(play1, play2) {
    var bothHands = play1[1] + play2[1];

    switch (bothHands) {
        case "stensten":
        case "saxsax":
        case "påsepåse":
            alert("Jämt spel");
            break;
        case "stensax":
        case "saxpåse":
        case "påsesten":
            alert(play1[0] + " vinner")
            break;
        default:
            alert(play2[0] + " vinner")
            break;



    }

}

function handSelect() {
    var spelare1 = prompt("Mata in spelare 1");
    var spelare2 = prompt("Mata in spelare 2");
   
   while (true) {
    
    var hand1input = prompt("Mata in " + spelare1 + " hand, tomt slutar spelet");
    var hand1 = hand1input.toLowerCase();
    if (hand1 != "sten" && hand1 != "sax" && hand1 != "påse") {
        alert("Slut på spelet");
        break;

    }
    var hand2input = prompt("Mata in " + spelare2 + " hand, tomt slutar spelet");
    var hand2 = hand2input.toLowerCase();
    if (hand2 != "sten" && hand2 != "sax" && hand2 != "påse") {
        alert("Slut på spelet");
        break;

    }
    var playAndHand1 = [spelare1, hand1];
    var playAndHand2 = [spelare2, hand2];
    whoWins(playAndHand1, playAndHand2);
   }
}


if(window.addEventListener) {
    window.addEventListener('load', function () {
      var canvas, context, tool;
    
      function init () {
        canvas = document.getElementById('canvasView');
        context = canvas.getContext('2d');
    
        tool = new tool_pencil();
    
        canvas.addEventListener('mousedown', ev_canvas, false);
        canvas.addEventListener('mousemove', ev_canvas, false);
        canvas.addEventListener('mouseup',   ev_canvas, false);
      }
    
      function tool_pencil () {
        var tool = this;
        this.started = false;
    
        this.mousedown = function (ev) {
            context.beginPath();
            context.moveTo(ev._x, ev._y);
            tool.started = true;
        };
    
        this.mousemove = function (ev) {
          if (tool.started) {
            context.lineTo(ev._x, ev._y);
            context.stroke();
          }
        };
    
        this.mouseup = function (ev) {
          if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;
          }
        };
      }
    
      function ev_canvas (ev) {
        if (ev.layerX || ev.layerX == 0) { 
          ev._x = ev.layerX;
          ev._y = ev.layerY;
        } else if (ev.offsetX || ev.offsetX == 0) {
          ev._x = ev.offsetX;
          ev._y = ev.offsetY;
        }
    
        var func = tool[ev.type];
        if (func) {
          func(ev);
        }
      }
    
      init();
    
    }, false); 
}
    
    
    function allowDrop(ev) {
        ev.preventDefault();
    }
    
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    var puzzleCount = 0;

    
    function drop(ev) {
        ev.preventDefault();

        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
        
        puzzleCount++;
        console.log(puzzleCount);
        if (puzzleCount > 8) {
            checkWin();
        }

        //checkWin();
    }
    console.log(document.getElementById("drag1").dataset.fw);
    console.log(document.getElementById("div1").dataset.fw);



    function checkWin() {
        var win = false;

        for (i = 1; i < 10; i++) {

            if (document.getElementById("div" + i).dataset.fw == document.getElementById("div" + i).children[0].dataset.fw) {
                console.log("Match!");
                win = true;
            } else {
                console.log("No match!")
                win = false;
                break;
            }

        }
        if (win == true) {
            alert("Du vinner");
        } /*else {
            alert("Pusslet är fel");
        }*/

    }
    /*function restartPuzzle() {
        for (i = 1; i < 10; i++) {

        }
    }*/
