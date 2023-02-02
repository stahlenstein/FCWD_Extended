import "./supabase.js";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNob3J1bWNjY3pkdWxmZm1hbml5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk2NDYyMjQsImV4cCI6MTk4NTIyMjIyNH0.30Vfv-1bIxthJlmFjVFtUWXVAa98sb9ZPv4urC6jUDk";
const SUPABASE_URL = "https://shorumccczdulffmaniy.supabase.co";
const options = {
  db: {
    schema: "public",
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: { "x-my-custom-header": "my-app-name" },
    fetch: fetch.bind(globalThis),
  },
};
const { createClient } = supabase;

supabase = createClient(SUPABASE_URL, SUPABASE_KEY, options);

console.log("supabase?", supabase);

async function getData(accountNumber, customerNumber, serviceCode) {
  // Communicating with content scripts
  let { data: usage_stats, error } = await supabase // Basically stating 'let Reading_Stats = supabase.Reading_Stats...(etc) but more complicated
    .from("usage_stats") // Declaring what table to select
    .select("*") // Select all but kinda redundant by '.limit('1')'
    .limit("1") // limits called data to only one row/entry
    .eq("ACCOUNT_NO", accountNumber).eq("CID_NO", customerNumber).eq("Service_Code", serviceCode)


  // Issue Token
  if (error) {
    console.log("There was an Error:", error);
  }
  // Receive Token
  if (usage_stats) {
    console.log("Supabase Data Returned:", usage_stats);
  }
  return usage_stats
};

function handleMessage(request, sender, sendResponse) {
  console.log(`A content script sent a message: ${request.greeting}`);
  const accountDetails = request.greeting
  const accountNumber = accountDetails[0]
  const customerNumber = accountDetails[1]
  const serviceCode = accountDetails[2]
  console.log(accountNumber, customerNumber, serviceCode)

  var accData = getData(accountNumber, customerNumber, serviceCode)
  accData.then(value => {
    value;
    if (value.length !== 0) {
      let accNo = Object.entries(value[0])[0][1];         // 0
      let Name = Object.entries(value[0])[7][1];          // 2
      let CID = Object.entries(value[0])[1][1];           // 1
      let Service = Object.entries(value[0])[3][1];       // 3
      let Min = Object.entries(value[0])[9][1];           // 9
      let Mean = Object.entries(value[0])[6][1];          // 6
      let Median = Object.entries(value[0])[10][1];       // 10
      let Max = Object.entries(value[0])[8][1];           // 8
      let STD = Object.entries(value[0])[12][1];          // 12
      let VAR = Object.entries(value[0])[11][1];          // 11
      let Count = Object.entries(value[0])[7][1];         // 7
      const accountData = [accNo, CID, Max, Mean, Median, Min, Name, STD, Service, VAR, Count]
      console.log(accountData)
      sendResponse({ response: accountData });
    }
    if (value.length === 0) {
      console.log("Account/Customer Number not found")
    }
  });

  return true;

}

chrome.runtime.onMessage.addListener(handleMessage);

