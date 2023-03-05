// Variables for HTML injection (could be w_123)
var target = document.querySelector("#w_141 > div > div > div.containerElement.g_GridLayoutEngine");
var myElement = document.createElement("div");

// Setting up main HTML injection
myElement.className = "tylerContainer";
myElement.innerHTML = `
<span class="titleText">Statistics</span>
<table class="TylerTable">
  <tbody>
    <tr>
      <td>Account #</td>
      <td id="Account">
        <input readonly="" class="InputBox disabled" id="TylerInput" style="width: 85px;">
      </td>
      <td>Customer #</td>
      <td id="CID">
        <input readonly="" class="InputBox disabled" id="TylerInput" style="width: 85px;">
      </td>
      <td>Special Conditions</td>
      <td id="checkbox">
        <div id="SPcheckbox"></div>
      </td>
      <td>Special Conditions:</td>
      <td id="checkbox">
        <input readonly="" class="InputBox disabled" id="checkboxText">
      </td>
    </tr>
    <tr>
      <td>Minimum</td>
      <td id="Min">
        <input readonly="" class="InputBox disabled" id="TylerInput">
      </td>
      <td>Variance</td>
      <td id="Var">
        <input readonly="" class="InputBox disabled" id="TylerInput">
      </td>
      <td>Dead Head</td>
      <td id="checkbox">
        <div id="DHcheckbox"></div>
      </td>
    </tr>
    <tr>
      <td>Mean</td>
      <td id="Mean">
        <input readonly="" class="InputBox disabled" id="TylerInput">
      </td>
      <td>Std Dev</td>
      <td id="Std">
        <input readonly="" class="InputBox disabled" id="TylerInput">
      </td>
      <td>Manual Read</td>
      <td id="checkbox">
        <div id="MRcheckbox"></div>
      </td>
    </tr>
    <tr>
      <td>Median</td>
      <td id="Median">
        <input readonly="" class="InputBox disabled" id="TylerInput">
      </td>
      <td>Service</td>
      <td id="Service">
        <input readonly="" class="InputBox disabled" id="TylerInput">
      </td>
      <td>HU Reread Completed</td>
      <td id="checkbox">
        <div id="HUcheckbox"></div>
      </td>
    </tr>
    <tr>
      <td>Maximum</td>
      <td id="Max">
        <input readonly="" class="InputBox disabled" id="TylerInput">
      </td>
      <td>Count</td>
      <td id="Count">
        <input readonly="" class="InputBox disabled" id="TylerInput">
      </td>
    </tr>
  </tbody>
</table>
`;

var insertCondition_target = document.querySelector("#w_116 > div > div");
var conditionElement = document.createElement("div");

conditionElement.className = "Condition"
conditionElement.innerHTML = `<div class="notification-light"></div>`;

insertCondition_target.after(conditionElement);

// Injecting custom HTML into desired area of page
target.after(myElement);

// Observer instance: Waiting for Element 658
const observer = new MutationObserver(function () {
  if (document.querySelector("#w_643")) {
    console.log("First Step: 658 is Found");

    // Declaring Original Account # input, #w_659 appears after page interaction in place of #w_123
    var mainTarget = document.querySelector("#w_643 > input");

    // Secondary Mutation Observer inside main Mutation Observer: Observing if field enabled/disabled
    var checker = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        // Checking if mainTarget input field is disabled & declarations
        if (mainTarget.hasAttribute("readonly") === true) {
          var fieldToggle = Array.from(
            document.querySelectorAll("#TylerInput")
          );
          fieldToggle.forEach((eachInput) => {
            eachInput.classList.remove("enabled"),
              eachInput.classList.add("disabled"),
              eachInput.setAttribute("readonly", "readonly");
          });
          console.log("Inputs disabled");
        }
        // Checking if mainTarget input field is Enabled & declarations
        if (mainTarget.hasAttribute("readonly") === false) {
          var fieldToggle = Array.from(
            document.querySelectorAll("#TylerInput")
          );
          fieldToggle.forEach((eachInput) => {
            eachInput.classList.remove("disabled"),
              eachInput.classList.add("enabled");
            eachInput.removeAttribute("readonly");
          });
          console.log("Inputs enabled");
        }
      });
    });

    // Configuration of Enable/Disable checker Mutation Observer
    var config = {
      attributes: true,
      attributeOldValue: true,
      subtree: true,
      childList: true,
    };

    // Element 658 (Account Field) as a node, node needed for mutation observer
    const Target = document.evaluate(
      '//*[@id="w_658"]',
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;

    // Begin Mutation Observation of mainTarget if Enabled or Disabled
    checker.observe(Target, config);
  }
});

var target0 = document.evaluate(
  '//*[@id="w_107"]',
  document,
  null,
  XPathResult.FIRST_ORDERED_NODE_TYPE,
  null
).singleNodeValue;

// Set configuration object:
const config0 = { childList: true };

// Start the observer
observer.observe(target0, config0);

// Observer instance: Waiting for Element 658
const observerSubmit = new MutationObserver(function () {
  if (document.querySelector("#w_658")) {
    console.log("Something has been submitted");

    // Declaring Original Account # input, #w_659 appears after page interaction in place of #w_123
    var mainTargetSubmit = document.querySelector("#w_643 > input");

    // Secondary Mutation Observer inside main Mutation Observer: Observing if field enabled/disabled
    var checkerSubmit = new MutationObserver(function (mutations) {
      // Checking if mainTarget input field is disabled & declarations
      if (mainTargetSubmit & mainTargetSubmit.value) {
        console.log("No Value");
      }
      // Checking if mainTarget input field is Enabled & declarations
      if (mainTargetSubmit.value != "") {
      }
    });

    // Configuration of Enable/Disable checker Mutation Observer
    var config = {
      attributes: true,
      attributeOldValue: true,
      subtree: true,
      childList: true,
    };

    // Element 658 (Account Field) as a node, node needed for mutation observer
    const Target = document.evaluate(
      '//*[@id="w_658"]',
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;

    // Begin Mutation Observation of mainTarget if Enabled or Disabled
    checkerSubmit.observe(Target, config);
  }
});

// Set configuration object:
const config1 = { childList: true };

// Start the observer
observerSubmit.observe(target0, config1);

const browser = new MutationObserver(function () {
  if (document.querySelectorAll(".currentDisplayedWindow")[1].innerText !== 'Browse Current Read/Consumption') {
    console.log('Not Browsing')
    return
  }
  if (document.querySelectorAll(".currentDisplayedWindow")[1].innerText == 'Browse Current Read/Consumption') {
    console.log('Browsing...');
    const wordButton = document.querySelectorAll('div')[162]
    var Newbutton = document.createElement("div")
    Newbutton.innerHTML = `<div class="mt-item gbc_WidgetBase gbc_ToolBarItemWidget gbc_StructuredToolBarItemWidget g_measureable gbc_WidgetBase_standalone" title="Copy to Clipboard" data-gqa-name="word" data-gqa-aui-id="1767">
  <div class="gbc_imageContainer gbc_autoScale" __widgetbase="" __toolbaritemwidget="" __structuredtoolbaritemwidget="">
    <div tabindex="0" __widgetbase="" __imagewidget="" __gbcimagewidget="" class="gbc_WidgetBase gbc_ImageWidget g_measureable gbc_WidgetBase_standalone gbc_autoScale gbc_ImageWidget_higher">
      <img id="tylerImg" src="chrome-extension://nnicpnmdnehfaanmabcmciblljiooemm/images/copy.png">
    </div>
  </div>
  <span __widgetbase="" __toolbaritemwidget="" __structuredtoolbaritemwidget="">Copy</span>
</div>`

    wordButton.append(Newbutton);

    // console.log(accList_final)
    let copyButton = document.querySelectorAll("div")[170];

    copyButton.addEventListener("click", writeData)
    function writeData() {
      // let recordTotal = document.querySelectorAll("span")[775].innerText.split(" ")[2]
      var accCol = document.querySelectorAll("div.gbc_dataContentPlaceholder.containerElement.gbc_staticMeasure")[1]
      var accNums = accCol.querySelectorAll("[data-gqa-index]")
      const accList = []
      var tableArea = document.querySelectorAll("div.gbc_TableScrollArea")[0]
      
      for (let i = 0; i < accNums.length; i++) {
        accList.push(accNums[i].outerText)

      };
      var accList_final = accList.join("|")
      //console.log(accList_final)
    
    
// Select the table container element
const tableContainer = document.querySelectorAll("div.gbc_dataContentPlaceholder.containerElement.gbc_staticMeasure")[1];

// Select all the data cell elements
const dataCells = tableContainer.querySelectorAll("[data-gqa-index]");

// Initialize an empty array to store the data
const data = [];

// Initialize the current scroll position
let scrollTop = 0;

// Iterate through each data cell element
dataCells.forEach((cell) => {
  // Get the parent row element
  const row = cell.closest('[role="row"]');

  // If this is the first cell in a new row, initialize a new rowData object
  if (cell === row.firstElementChild) {
    var rowData = {};
  }

  // Add the cell's data to the rowData object
  rowData[cell.getAttribute('aria-colindex')] = cell.innerText;

  // If this is the last cell in the row, add the rowData object to the data array
  if (cell === row.lastElementChild) {
    data.push(rowData);
  }

  // Get the height of the cell
  const cellHeight = cell.offsetHeight;

  // Scroll the table container to the next cell
  scrollTop += cellHeight;
  tableContainer.scrollTop = scrollTop;
});

// The data array now contains all the data from the table
console.log(data);


      
      // var scrollHeight = document.querySelectorAll("div.gbc_TableScrollArea")[0].scrollHeight
      // var offsetHeight = document.querySelectorAll("div.gbc_TableScrollArea")[0].clientHeight
      // var tableScroll = offsetHeight - scrollHeight;

      
      navigator.clipboard.writeText(accList_final).then(
        () => {
          console.log("Write Success")
          console.log(accList_final)
        },
        () => {
          console.log("Write Failure")
        }
      );
    };
    if (document.getElementById("tylerImg") !== null) {

      browser.disconnect();
    }
    return
  }
  }
);

if (document.getElementById("tylerImg") == null) {
  const generalBody = document.querySelector('body')
  const browseConfig = { childList: true };

  browser.observe(generalBody, browseConfig)
};