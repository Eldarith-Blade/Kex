iro.use(iroTransparencyPlugin);

//global variable used for custom prefix of Document methods
const $get = document.querySelector.bind(document);
const $getAll = document.querySelectorAll.bind(document);

let selectorArray = ['.reset', '.close', '#color-picker-container', '.randomise'];

let colorPicker = new iro.ColorPicker('#color-picker-container', {
      color: "#00000044",
      transparency: true,
      borderWidth: 4,
      borderColor: "#FB9500"
});

colorPicker.on(["color:init", "color:change"], function(color) {
  $get('.overlay').style.backgroundColor = color.rgbaString;
});

//replacement content storage with parameters of new class and naming value
function storeContent(classifier, content) {
  $get('.contentUpdate').remove();
  $get('.overlay').insertAdjacentHTML(
    'afterbegin',
    `
    <div class="contentUpdate">
      <div class="${classifier} registerContainer">
        <h1 class="${classifier}">${content}</h1>
        <div class="${classifier} textContainer">
          <i class="fas fa-user"></i>
          <input class="${classifier}" type="text" name="" value="" placeholder="Enter username">
          </div>

          <div class="${classifier} textContainer">
          <i id ="fas01" class="fas fa-lock"></i>
          <input class="${classifier} plc" type="password" placeholder="Password">
          </div>

          <input name="${content}" class="${classifier} btn_submit_${classifier}" type="button" value="${content}">
          </div>
        </div>
    `
  );
}

//animation state
function transitionInOut(state_in, state_out, selector) {
  if(state_in === 1 && state_out === 0) {
    gsap.fromTo(selector, {opacity: 0}, {duration: 3, opacity: 1, ease: 'Power2.easeInOut'});
    gsap.fromTo(selector, {x: '-150%'}, {duration: 2, x: '0%', ease: 'Power2.easeInOut'});
  } else if(state_in === 0 && state_out === 1) {
      gsap.fromTo(selector, {opacity: 1}, {duration: 3, opacity: 0, ease: 'Power2.easeInOut'});
      gsap.fromTo(selector, {x: '0'}, {duration: 2, x: '150%', ease: 'Power2.easeInOut'});
  } else {
      console.log('cannot animate currently');
  }
}

//toggle visibility
function toggleItem(selector, state) {
  if(state === 'visible') {
    $get(selector).style.visibility = 'visible';
  }
  else {
    $get(selector).style.visibility = 'hidden';
  }
}

function randomColour() {
  let randNum;
  for(rn=0; rn < 10; rn++) {
    randNum = Math.floor(Math.random() * 11);
  }
  console.log(randNum);
  switch(randNum) {
    case 1:
      $get('.overlay').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
      break;
    case 2:
      $get('.overlay').style.backgroundColor = "rgba(122, 3, 255, 0.3)";
      break;
    case 3:
      $get('.overlay').style.backgroundColor = "rgba(244, 200, 100, 0.3)";
      break;
    case 4:
      $get('.overlay').style.backgroundColor = "rgba(255, 230, 0, 0.3)";
      break;
    case 5:
      $get('.overlay').style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      break;
    case 6:
      $get('.overlay').style.backgroundColor = "rgba(0, 255, 8, 0.3)";
      break;
    case 7:
      $get('.overlay').style.backgroundColor = "rgba(22, 33, 255, 0.3)";
      break;
    case 8:
      $get('.overlay').style.backgroundColor = "rgba(255, 0, 0, 0.3)";
      break;
    case 9:
      $get('.overlay').style.backgroundColor = "rgba(130, 130, 80, 0.3)";
      break;
    default:
      $get('.overlay').style.backgroundColor = "rgba(255, 20, 255, 0.3)";
      break;
  }
}

//real-time clock, get current system time
$get('body').onload = function realTimeClock () {
  let rtc = new Date();
  let hours = rtc.getHours();
  let minutes = rtc.getMinutes();
  let seconds = rtc.getSeconds();

  hours = ('0' + hours).slice(-2);
  minutes = ('0' + minutes).slice(-2);
  seconds = ('0'+ seconds).slice(-2);

  $get('.realTimeClock').innerHTML = hours + " : " + minutes + " : " + seconds;

  setInterval(realTimeClock, 1000);
}

if($get('.btn_submit_register')) {
  $get('.btn_submit_register').onclick = function() {
    transitionInOut(0, 1, '.register');
    setTimeout(function () {
      storeContent('login', 'Login');
    }, 2000);
    setTimeout(function () {
      transitionInOut(1, 0, '.login');
    }, 2000);
  }
} else if($get('.btn_submit_login')) {
    $get('.btn_submit_login').onclick = function() {
  }
}

$get('.registerNavigation').onclick = function() {
  transitionInOut(0, 1, '.login');
  setTimeout(function () {
    storeContent('register', 'Register');
  }, 2000);
  setTimeout(function () {
    transitionInOut(1, 0, '.register');
  }, 2000);
}

$get('.loginNavigation').onclick = function() {
  transitionInOut(0, 1, '.register');
  setTimeout(function () {
    storeContent('login', 'Login');
  }, 2000);
  setTimeout(function () {
    transitionInOut(1, 0, '.login');
  }, 2000);
}

$get('.col_btn').onclick = function() {
  for(cb = 0; cb < selectorArray.length; cb++) {
    transitionInOut(1, 0, selectorArray[cb]);
    toggleItem(selectorArray[cb], 'visible');
  }
  gsap.fromTo('#color-picker-container', {y: '-250%'}, {duration: 4, y: '0%', ease: 'bounce'});
}

$get('.close').onclick = function() {
  for(c = 0; c < selectorArray.length; c++) {
    toggleItem(selectorArray[c], 'hidden');
  }
}

$get('.reset').onclick = function() {
  $get('.overlay').style.backgroundColor = '#00000044';
  $get('body').style.fontFamily = 'Courier';
}

$get('.randomise').onclick = function () {
  randomColour();
}
