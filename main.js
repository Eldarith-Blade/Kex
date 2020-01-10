/**
 * Kex is the functionality of the website demonstrating the usage of interactivity and cookies
 * Kex is Swedish for 'biscuit' - a pun of cookies
 * @author - Peter Ovenden <www.github.com/Eldarith-Blade/Kex>
 */

/**
 * Transparency plugin for colorPicker
 * @constructor
 * @requires https://cdn.jsdelivr.net/npm/iro-transparency-plugin/dist/iro-transparency-plugin.min.js
 */
 iro.use(iroTransparencyPlugin);

/** @const {method} $get - Global custom prefix for querySelector of HTML elements */
const $get = document.querySelector.bind(document);

/** @const {method} getBody - Global variable for selecting body element of DOM */
const getBody = $get('body'); 

/** @const {method} getFont - Global variable for selecting fonts */
const getFont = $get('.fontStyle');

/** @const {method} getEmail - Global query selector */
const getEmail = $get('.email');

/**@const {method} getPwd - Global query selector */
const getPwd = $get('.pwd');
/**@const {method} hexValue - Global get container for hexadecimal value to be displayed*/
const hexValue = $get('#hex-value');

/**@type {number} 
* @var {number} failCount - Global counter for failed login attempts
*/
let failCount = 0; 

/**
 * Colour picker object values of innerHTML div element
 * @typedef {object} colorPicker
 * @property {string} color - hexadecimal number
 * @property {boolean} transparency - allow for transparency
 * @property {number} borderWidth - border styling element
 * @property {string} borderColor - hexadecimal value of border colour
 */
let colorPicker = new iro.ColorPicker('#color-picker-container', {
    color: "#00000044",
    transparency: true,
    borderWidth: 4,
    borderColor: "#FB9500"
});

/**
 * Event listener for colour picker - change overlay colour
 * @constructor
 * @function anonymous
 * @param {string} color - rgba value of object key 'color'
 */
colorPicker.on(["color:init", "color:change"], function(color) {
  $get('.overlay').style.backgroundColor = color.rgbaString;
  hexValue.innerHTML = "Hexadecimal: " + color.hexString;
});

 /**
  * Changes current state of visibility within a query selector
  * @param {string} selector - class selector
  * @param {string} state - current state of visibility : hidden or visible
  */
function toggleVisibility(selector, state) {
  if(state === 'visible') {
    $get(selector).style.visibility = 'visible';
  } else {
      $get(selector).style.visibility = 'hidden';
    }
}

/**
 * Generates a random colour to be assigned to an overlay 
 * @param {string} selector - querySelector to be assigned    
 */
function randomiseColour(selector) {
  let querySel = $get(selector);
  //max range of hexadecimal numbers convert to string base 16 
  let calcHex = Math.floor(Math.random() * 16777215).toString(16);

  if(`#${calcHex}` === querySel.backgroundColor) {
    //recursively rerun function, if colour is already being used (unlikely when millions of numbers are being used)
    randomiseColour(); 
  } else {
      querySel.style.backgroundColor = `#${calcHex}66`;
      colorPicker.color.hexString = `${calcHex}66`;
      hexValue.style.opacity = '1';
      hexValue.innerHTML = `Hexadecimal: #${calcHex}`;
  }
}

/**
 * Functional digital based clock loaded upon website load 
 * @function realTimeClock
 * @param {object} Date - current time  
 */
getBody.onload = function realTimeClock() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();

  //format clock 
  hours = ('0' + hours).slice(-2);
  minutes = ('0' + minutes).slice(-2);
  seconds = ('0' + seconds).slice(-2);

  //display formatted clock in easily readable format  
  $get('.realTimeClock').innerHTML = `${hours} : ${minutes} : ${seconds}`;

  setInterval(realTimeClock, 1000); 
}

/**
 * Dropdown option menu selection changes font of all necessary elements
 * @function changeFont
 * @param {array[]} selectorArray - all elements within the body DOM
 */
getFont.onchange = function changeFont() {
  let selectorArray = ['body', '.email', '.pwd', '.btn', '.col_btn', '.randomise', '.close', '.reset'];
  
  //loop through menu elements 
  for(i=0; i < selectorArray.length; i++) {
    $get(selectorArray[i]).style.fontFamily = getFont.value; 
  }
  return; 
}

/**
 * Regular expression validation of registration and store values in local storage and as a cookie format
 * @function validateReg
 * @param {string} emailStr - inputted value of email field box 
 * @param {string} pwdStr - inputted value of password field box  
 */
function validateReg() {
  const emailKey = "email"; 
  const pwdKey = "password"; 
  const emailStr = getEmail.value.toString().toLowerCase();
  const pwdStr = getPwd.value.toString(); 

  //test register string for regular expression and length is greater than 3, proceed to login
  if(/^[A-Za-z_0-9]*$/.test(emailStr) === true && emailStr.length > 3 && pwdStr.length > 3) {
    document.cookie = 'email=' + emailStr; 
    document.cookie = 'password=' + pwdStr; 

    localStorage.setItem(emailKey, emailStr + '@outlook.com'); 
    localStorage.setItem(pwdKey, pwdStr);

    location.href = 'Login.html'; 
  //display invalid registration otherwise 
  } else {
    getEmail.value = '';
    getEmail.placeholder = "Only letters and numbers";
    getPwd.value = '';
    getPwd.placeholder = "Greater than 3 characters"; 
    $get('.overlay').style.backgroundColor = '#FF150044';
    //reset background 
    setTimeout(function() {
      $get('.overlay').style.backgroundColor = '#00000044';
      getEmail.placeholder = "Username (Example: Eldarith)";
      getPwd.placeholder = "Password"; 
    }, 1500);
  }
  return; 
}

/**
 * Retrieve value of local storage and login in verified user
 * @function validateLogin 
 * @param {string} currentUserEmail - registered email address
 * @param {string} currentUserPwd - registered password to email address
 */
function validateLogin() {
  const currentUserEmail = localStorage.getItem('email');
  const currentUserPwd = localStorage.getItem('password'); 
  const emailValue = getEmail.value.toString().toLowerCase(); 
  const pwdValue = getPwd.value.toString();  

  //credentials match, display success
  if(currentUserEmail === emailValue && currentUserPwd === pwdValue) {
    $get('.overlay').style.backgroundColor = '#38F00066';
    getEmail.value = "Success!";
    getEmail.style.color = "#FFFFFF";
    getPwd.value = "Success!"; 
    getPwd.style.color = "#FFFFFF";

    alert('You have successfully been logged in'); 
    //credentials do not match, display invalid 
  } else if (currentUserEmail !== emailValue || currentUserPwd !== pwdValue) {
    getEmail.value = '';
    getEmail.placeholder = `Invalid: ${emailValue} - add username@outlook.com`;
    getPwd.value = '';
    getPwd.placeholder = `Invalid: ${pwdValue} - try again`;
    $get('.overlay').style.backgroundColor = '#FF150044';
    let revealInfo = failCount++;
    /*conditional statement used to check increment of failCount has reached 6 to reveal forgotten information of registration,
    demonstrates atrocious method of password retrievable, but applicable as an aid to assess programming skills*/ 
    if(revealInfo === 6) {
      failCount = 0; 
      getEmail.value = `${currentUserEmail}`;
      getEmail.style.color = '#38F00066';
      getPwd.value = `${currentUserPwd}`;
      getPwd.style.color = '#38F00066';
      getPwd.type = 'text';
    } 
    //reset previous state of login after failed attempt
    setTimeout(function(){
      $get('.overlay').style.backgroundColor = '#00000044';
      getEmail.placeholder = `Email address (Example: User@outlook.com)`;
      getPwd.placeholder = `Password`;
    }, 1500);
  } else {
    console.error('validateLogin Error');
  }
  return; 
}

//event delegation and handling of button functions
document.body.addEventListener('click', function(event){
  let menuArray = ['.close', '.reset', '#color-picker-container', '.randomise']

  switch(true) {
    case(event.target.matches('.btn_submit_register')):
      validateReg();
      break; 
    case(event.target.matches('.btn_submit_login')):
      validateLogin();
      break; 
    case(event.target.matches('.registerNavigation')):
      location.href = 'Index.html';
      break;
    case(event.target.matches('.loginNavigation')):
      location.href = 'Login.html';
      break; 
    case(event.target.matches('.col_btn')):
      for(cb = 0; cb < menuArray.length; cb++) {
        toggleVisibility(menuArray[cb], 'visible');
      }
      hexValue.style.opacity = '1';
      break;
    case(event.target.matches('.close')):
      for(c = 0; c < menuArray.length; c++) {
        toggleVisibility(menuArray[c], 'hidden');
      }
      hexValue.style.opacity = '0';
      break; 
    case(event.target.matches('.reset')): 
      $get('.overlay').style.backgroundColor = '#00000044';
      $get('body').style.fontFamily = 'Courier';
      hexValue.innerHTML = "";
      colorPicker.color.hexString = "#00000044";
      break;
    case(event.target.matches('.randomise')):
      randomiseColour('.overlay');
      break;
    default: 
      return; 
      break; 
  }
});