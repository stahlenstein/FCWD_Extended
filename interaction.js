// Variables for HTML injection (could be w_123)
var target = document.querySelector("#w_141 > div > div > div.containerElement.g_GridLayoutEngine");
var myElement = document.createElement("div");



// Setting up main HTML injection
myElement.className = "tylerContainer";
myElement.innerHTML = `<span style="
margin-left: 1000px;
vh: 75px;
position: absolute;
bottom: 99px;
color: #757575;
">Statistics</span>
<table class="TylerTable">
<tbody>
  <tr>
    <td>Account #</td>
    <td id="Account"><input readonly="" class="InputBox disabled" id="TylerInput" style="width: 85px;"></td>
    <td>Customer #</td>
    <td id="CID"><input readonly="" class="InputBox disabled" id="TylerInput" style="width: 85px;"></td>
  </tr>
  <tr>
    <td>Minimum</td>
    <td id="Min"><input readonly="" class="InputBox disabled" id="TylerInput"></td>
    <td>Variance</td>
    <td id="Var"><input readonly="" class="InputBox disabled" id="TylerInput"></td>
  </tr>
  <tr>
    <td>Mean</td>
    <td id="Mean"><input readonly="" class="InputBox disabled" id="TylerInput"></td>
    <td>Std Dev</td>
    <td id="Std"><input readonly="" class="InputBox disabled" id="TylerInput"></td>
  </tr>
  <tr>
    <td>Median</td>
    <td id="Median"><input readonly="" class="InputBox disabled" id="TylerInput"></td>
    <td>Service</td>
    <td id="Service"><input readonly="" class="InputBox disabled" id="TylerInput"></td>
  </tr>
  <tr>
    <td>Maximum</td>
    <td id="Max"><input readonly="" class="InputBox disabled" id="TylerInput"></td>
    <td>Count</td>
    <td id="Count"><input readonly="" class="InputBox disabled" id="TylerInput"></td>
  </tr>
</tbody>
</table>
`;

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

