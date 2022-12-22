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

async function getData(accountNumber, customerNumber) {
  // Communicating with content scripts
  let { data: Reading_Stats, error } = await supabase // Basically stating 'let Reading_Stats = supabase.Reading_Stats...(etc) but more complicated
    .from("Reading_Stats") // Declaring what table to select
    .select("*") // Select all but kinda redundant by '.limit('1')'
    .limit("1") // limits called data to only one row/entry
    .eq("Account", accountNumber).eq("Customer", customerNumber)


  // Issue Token
  if (error) {
    console.log("There was an Error:", error);
  }
  // Receive Token
  if (Reading_Stats) {
    console.log("Supabase Data Returned:", Reading_Stats);
  }
  return Reading_Stats
};

function handleMessage(request, sender, sendResponse) {
  console.log(`A content script sent a message: ${request.greeting}`);
  const accountDetails = request.greeting
  const accountNumber = accountDetails[0]
  const customerNumber = accountDetails[1]
  console.log(accountNumber, customerNumber)

  var accData = getData(accountNumber, customerNumber)
  accData.then(value => {
    value;
    if (value.length !== 0) {
      let primaryKey = Object.entries(value[0])[0][1];
      let accNo = Object.entries(value[0])[1][1];
      let Name = Object.entries(value[0])[2][1];
      let CID = Object.entries(value[0])[3][1];
      let Service = Object.entries(value[0])[4][1];
      let Min = Object.entries(value[0])[5][1];
      let Mean = Object.entries(value[0])[6][1];
      let Median = Object.entries(value[0])[7][1];
      let Max = Object.entries(value[0])[8][1];
      let STD = Object.entries(value[0])[9][1];
      let VAR = Object.entries(value[0])[10][1];
      let Count = Object.entries(value[0])[11][1];
      const accountData = [primaryKey, accNo, CID, Max, Mean, Median, Min, Name, STD, Service, VAR, Count]
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

