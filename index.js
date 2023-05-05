// chrome://extensions 
// HTML  SAVE LEAD

let myLead = []
let inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
// getting Leads from our localStorage
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLead = leadsFromLocalStorage
    renderLeads(myLead) 
}


tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
        myLead.push(tabs[0].url)
        localStorage.setItem("myLead", JSON.stringify(myLead))
        renderLeads(myLead)

    })
})

function renderLeads(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i ++) {
        // listItems +=  "<li><a target='_blank' href='" + myLead[i] + "'>" +  myLead[i] + " </a></li>"
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
       `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    myLead = []
    localStorage.clear()
    renderLeads(myLead)
})

inputBtn.addEventListener("click", function() {
    myLead.push(inputEl.value)
    inputEl.value = "";
    // Saving to our localStorage
    localStorage.setItem("myLeads", JSON.stringify(myLead))
    renderLeads(myLead)
    // console.log(localStorage.getItem("myLeads"))
})


// HTML  SAVE LEAD