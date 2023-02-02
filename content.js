/* Working example, observer for a new <div> with ID 'new-div' */

// Select the entire DOM for observing:
const target = document.querySelector('body');

// Create a new observer instance:
const observer = new MutationObserver(function () {
  if (document.querySelector("#w_510")) {
    addJavaScript("interaction.js");
    addStyleSheet("tyler.css");
    console.log("We got 'em, boss");
    // Do something with new div element
    observer.disconnect();
  }
});

// Set configuration object:
const config = { childList: true };

// Start the observer
observer.observe(target, config);

function addStyleSheet(filename) {
  var style = document.createElement("link");
  style.href = chrome.runtime.getURL(filename);
  style.type = "text/css";
  style.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(style);
};

function addJavaScript(filename) {
  var script = document.createElement("script");
  script.src = chrome.runtime.getURL(filename);
  document.getElementsByTagName("body")[0].append(script);
};

// Message to background script
function handleResponse(message) {
  // console.log(`Message from the background script: ${message.response}`)
  const recievedData = message.response;
  if (recievedData !== null) {
    let accountField = document.querySelector("#Account > input")
    let cidField = document.querySelector("#CID > input")
    let minField = document.querySelector("#Min > input")
    let varField = document.querySelector("#Var > input")
    let meanField = document.querySelector("#Mean > input")
    let stdField = document.querySelector("#Std > input")
    let medianField = document.querySelector("#Median > input")
    let maxField = document.querySelector("#Max > input")
    let countField = document.querySelector("#Count > input")
    let serviceField = document.querySelector("#Service > input")


    let accountData = recievedData[0]
    let cidData = recievedData[1]
    let minData = recievedData[5]
    let meanData = recievedData[3]
    let medianData = recievedData[4]
    let maxData = recievedData[2]
    let stdData = recievedData[7]
    let varData = recievedData[9]
    let countData = recievedData[6]
    let servicedata = recievedData[8]

    accountField.value = accountData
    cidField.value = cidData
    minField.value = minData
    meanField.value = meanData
    medianField.value = medianData
    maxField.value = maxData
    stdField.value = stdData
    varField.value = varData
    countField.value = countData
    serviceField.value = servicedata
    console.log(accountField.value)

    const actualUsage = document.querySelectorAll("input")[30].value
    const testValue3 = (meanData+(stdField.value*3))
    const testValue2 = (meanData+(stdField.value*2))
    console.log(actualUsage, testValue2, testValue3)
    var notLight = document.getElementsByClassName("notification-light");
    if (testValue2 < actualUsage < testValue3) {
      notLight[0].style.animation = "blinkyellow 1s infinite";
    };
    if (actualUsage > testValue3) {
      notLight[0].style.animation = "blinkRed 1s infinite";
    };
    if (actualUsage < testValue2) {
      notLight[0].style.animation = "blinkGreen 0.5s infinite";
    }
  }
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

// could be #w_123 or #w_659
function notifyBackgroundPage(e) {
  if (document.querySelectorAll("input")[1].value == null) {
    console.log("Empty Field")
  };
  if (document.querySelectorAll("input")[1].value !== null) {
    let accNo = document.querySelectorAll("input")[1].value
    let cidNo = document.querySelectorAll("input")[2].value
    let serCo = document.querySelectorAll("input")[4].value
    const accDetails = [accNo, cidNo, serCo]
    console.log(accDetails)
    const send = chrome.runtime.sendMessage({ greeting: accDetails });
    send.then(handleResponse, handleError)
  };
}

document.addEventListener("click", initNotify);

function initNotify() {
setTimeout(function() {
  notifyBackgroundPage();
}, 350);
};

window.addEventListener('keydown', (event => {
  console.log(event);
  if(event.key === 'Control' || event.key === 'Enter') {
    notifyBackgroundPage();
  }
}))