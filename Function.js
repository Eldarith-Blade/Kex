let emailInp = document.getElementById("email_string");
    //input form
let pwdInp = document.getElementById("password_string");
    //register button
let btnInp = document.getElementById("btn_submit");

let btnCol = document.getElementById("btn_colour");

let btnRes = document.getElementById("reset");

let btnRand = document.getElementById("randomise");

let colorCont = document.getElementById("color-picker-container");

let valueToChangeText = ["'overlay'"]

let resetPage = document.getElementById("resetPage");

docGrab = [];


iro.use(iroTransparencyPlugin);

let colorPicker = new iro.ColorPicker('#color-picker-container', {
      color: "#00000044",
      transparency: true,
      borderWidth: 4,
      borderColor: "#FB9500"
});

  btnRand.onclick = function RandomCol() {
    let numCal;
    for(i = 0; i < 6; i++){
      numCal = Math.floor(Math.random() * 7);
  }
      console.log(numCal);
     switch(numCal) {
        case 1:
         document.getElementById("overlay").style.backgroundColor = "rgba(255, 255, 255, 0.3)";
         break;
        case 2:
         document.getElementById("overlay").style.backgroundColor = "rgba(255, 0, 255, 0.3)";
         break;
        case 3:
          document.getElementById("overlay").style.backgroundColor = "rgba(255, 230, 0, 0.3)";
          break;
        case 4:
          document.getElementById("overlay").style.backgroundColor = "rgba(0, 34, 255, 0.3)";
          break;
        case 5:
          document.getElementById("overlay").style.backgroundColor = "rgba(255, 140, 0, 0.3)";
          break;
        case 6:
          document.getElementById("overlay").style.backgroundColor = "rgba(0, 0, 0, 0.3)";
          break;
        default:
          document.getElementById("overlay").style.backgroundColor = "rgba(0, 255, 8, 0.3)";
          break;
     }

      colorCont.style.visibility = "hidden";

}

  document.getElementById("info").onmouseover = function() {
    document.getElementById("information-text").style.visibility = "visible";
  }

  document.getElementById("info").onmouseout = function() {
    document.getElementById("information-text").style.visibility = "hidden";
  }

  btnCol.onclick = function() {

    colorPicker.on(["color:init", "color:change"], function(color) {
      eval(docGrab[0]);
});
    colorCont.style.visibility = "visible";
    btnRes.style.visibility = "visible";
    btnRand.style.visibility = "visible";
    resetPage.style.visibility = "visible";
}

  btnRes.onclick = function() {
    colorCont.style.visibility = "hidden";
    btnRes.style.visibility = "hidden";
    btnRand.style.visibility = "hidden";
    resetPage.style.visibility = "hidden";
}

  resetPage.onclick = function() {
    location.reload();
  }





for(c = 0; c < valueToChangeText.length; c++) {
      docGrab.push(`document.getElementById(${valueToChangeText[c]}).style.backgroundColor =  color.rgbaString`);
}

    btnInp.onclick = function() {
        const emailKey = "email";
        const pwdKey = "password";
        const emailVal = emailInp.value.toString();
        const pwdVal = pwdInp.value.toString();

        var expiration_date = new Date();
        expiration_date.setYear(expiration_date.getYear () + 1);
        expiration_date = expiration_date.toGMTString();



       if(/^[A-Za-z_0-9]*$/.test(emailVal) === true && /^[A-Za-z_0-9]*$/.test(pwdVal) === true) {
         if(emailVal.length && pwdVal.length >= 3) {
           document.cookie = 'name=peter;value=' + emailVal;
           localStorage.setItem(emailKey, emailVal);
           localStorage.setItem(pwdKey, pwdVal);
          //testing to see if values are logged (will remove later on)
            console.log(emailVal);
            console.log(pwdVal);
            console.log(document.cookie);
          }
        else {
          console.log("error")
        }
}
  else {
    console.log("error");
  }
}





  function realTimeClock() {
    let clockC = document.getElementById("realTimeClock");
    let rtc = new Date();

    let hours = rtc.getHours();
    let minutes = rtc.getMinutes();
    let seconds = rtc.getSeconds();

    hours = ('0' + hours).slice(-2);
    minutes = ('0' + minutes).slice(-2);
    seconds = ('0'+ seconds).slice(-2);


    clockC.innerHTML = hours + " : " + minutes + " : " + seconds;

    setInterval(realTimeClock, 1000);
}

$get("#styleFont").onchange = function () {
            let class = $get('.fontStyle option' + ':selected').text();
            $("#input-field").css('font-family',id);
            $("#resetPage").css('font-family',id);
            $("#randomise").css('font-family',id);
            $("#btn_colour").css('font-family',id);
            $("#btn_submit").css('font-family',id);
            $("#email_string").css('font-family',id);
            $("#password_string").css('font-family',id);
            $("#reset").css('font-family',id);
});
