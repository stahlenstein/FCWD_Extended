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


    let accountData = recievedData[1]
    let cidData = recievedData[2]
    let minData = recievedData[6]
    let meanData = recievedData[4]
    let medianData = recievedData[5]
    let maxData = recievedData[3]
    let stdData = recievedData[8]
    let varData = recievedData[10]
    let countData = recievedData[11]
    let servicedata = recievedData[9]

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

    /*     const actualUsage = document.querySelector("#w_694 > input")
        if ( actualUsage.value > meanData) {
          alert("POSSIBLE HIGH USUAGE")
        } */
  }
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

// could be #w_123 or #w_659
function notifyBackgroundPage(e) {
  if (document.querySelector("#w_659 > input") == null) {
    console.log("Empty Field")
  };
  if (document.querySelector("#w_659 > input") !== null) {
    let accNo = document.querySelector("#w_659 > input").value
    let cidNo = document.querySelector("#w_663 > input").value
    console.log(cidNo)
    const accDetails = [accNo, cidNo]
    const send = chrome.runtime.sendMessage({ greeting: accDetails });
    send.then(handleResponse, handleError)
  };
}

let inputChange = document.querySelector("#w_659 > input")
inputChange.addEventListener("change", notifyBackgroundPage);