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
  let finalData;
  finalData = recievedData.map(element => {
    if(element === null){
      return ' ';
    }else{
     return element 
    }
  })
  console.log(finalData)

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
    let SPCheck = document.querySelector("#SPcheckbox")
    let DHCheck = document.querySelector("#DHcheckbox")
    let MRCheck = document.querySelector("#MRcheckbox")
    let HUCheck = document.querySelector("#HUcheckbox")
    let SpConText = document.querySelector("#checkboxText")


    let accountData = finalData[0]
    let cidData =     finalData[1]
    let minData =     finalData[5]
    let meanData =    finalData[3]
    let medianData =  finalData[4]
    let maxData =     finalData[2]
    let stdData =     finalData[6]
    let varData =     finalData[8]
    let countData =   finalData[9]
    let servicedata = finalData[7]
    let HURR =        finalData[12]   
    let MCon =        finalData[10]
    let SPCon =       finalData[11]


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

    if(MCon !== 'E'||'R' ) {
      console.log("No Meter Condition Found")
      MRCheck.value = ' '
      DHCheck.value = ' '
    }

    if(MCon == 'E') {
      DHCheck.value = "✔"
      console.log('DH:', DHCheck.value)
    }

    if(MCon == 'R') {
      MRCheck.value = "✔"
      console.log('MR:', MRCheck.value)
    }

    if(HURR !== ' ') {
      HUCheck.value = "✔"
      console.log('HU:', HUCheck.value)
    }

    if(HURR == ' ') {
      HUCheck.value = ' '
    }

    if(SPCon !== ' ') {
      SPCheck.value = "✔"
      SpConText.value = SPCon
      console.log('SPcon text:', SPCon.value)
    }

    if(SPCon == ' ') {
      SPCheck.value = ' '
      SpConText.value = ' '
    }




    const actualUsage = document.querySelectorAll("input")[35].value
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

const browser = new MutationObserver(function() {
  if(document.querySelector("#w_90 > div.mt-toolbar-title > span").innerHTML == 'Browse Current Read/Consumption') {
  console.log('Browsing...');
  const wordButton = document.querySelectorAll('div')[162]
  var Newbutton = document.createElement("div") 
  Newbutton.innerHTML = `<div class="mt-item gbc_WidgetBase gbc_ToolBarItemWidget gbc_StructuredToolBarItemWidget w_2220 g_measureable gbc_WidgetBase_standalone" role="menuitem" __widgetbase="" __toolbaritemwidget="" __structuredtoolbaritemwidget="" id="w_2220" tabindex="0" title="Copy to Clipboard" data-gqa-name="word" data-gqa-aui-id="1767">
  <div class="gbc_imageContainer gbc_autoScale" __widgetbase="" __toolbaritemwidget="" __structuredtoolbaritemwidget="">
    <div tabindex="0" __widgetbase="" __imagewidget="" __gbcimagewidget="" id="w_2221" class="gbc_WidgetBase gbc_ImageWidget w_2221 g_measureable gbc_WidgetBase_standalone gbc_autoScale gbc_ImageWidget_higher">
      <img src="https://floydcountyubgamunisapp.tylerhost.net:443/0783prod/munis/gas/app/ua/ft/5b46627d40fd6e4e58ed4bccf05a7471/fgl-files/57208/Word_Small.png?t=1619555232">
    </div>
  </div>
  <span __widgetbase="" __toolbaritemwidget="" __structuredtoolbaritemwidget="">Copy to Clipboard</span>
</div>`
  wordButton.append(Newbutton) 
  }
})

const generalBody = document.querySelector('body')
const browseConfig = { childList: true };

browser.observe(generalBody, browseConfig)