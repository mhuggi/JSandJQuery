

function myFunction() {
    var menyn = document.getElementsByTagName("nav")[0].children[0];
    console.log(menyn);

}
function askNums() {
    var num1 = Number(prompt("Please enter number"));
    var num2 = Number(prompt("Please add another number"));
    addNums(num1, num2);
    subNums(num1, num2);



}
function addNums(num1, num2) {
    console.log(num1 + num2);
    document.getElementById("answer").innerHTML = "Svaret är: " + num1 + num2;


}
function subNums(num1, num2) {
    console.log(num1 - num2);
}

function whoWins(play1, play2) {
    hand1 = play1[1];
    hand2 = play2[1];
    if (hand1 == hand2) {
        alert("Jämt spel");
    } else if (hand1 == "påse" && hand2 == "sten"){
        alert(play1[0] + " vinner");
    } else if (hand1 == "sten" && hand2 == "sax") {
        alert(play1[0] + " vinner");
    } else if (hand1 == "sax" && hand2 == "påse") {
        alert(play1[0] + " vinner");
    } else {
        alert(play2[0] + " vinner");

}


}

function handSelect() {
    var spelare1 = prompt("Mata in spelare 1");
    var spelare2 = prompt("Mata in spelare 2");
   
   while (true) {
    
    var hand1 = prompt("Mata in " + spelare1 + " hand, tomt slutar spelet");
    if (hand1 != "sten" && hand1 != "sax" && hand1 != "påse") {
        alert("Slut på spelet");
        break;

    }
    var hand2 = prompt("Mata in " + spelare2 + " hand, tomt slutar spelet");
    if (hand2 != "sten" && hand2 != "sax" && hand2 != "påse") {
        alert("Slut på spelet");
        break;

    }
    var playAndHand1 = [spelare1, hand1];
    var playAndHand2 = [spelare2, hand2];
    whoWins(playAndHand1, playAndHand2);
   }
}