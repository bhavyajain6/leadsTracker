let myLeads = [];
const inputEl = document.querySelector("#input-el");
const saveButton = document.querySelector("#btn");
const list = document.querySelector("#list-el");
const deleteButton = document.querySelector("#dlt-btn");
const saveTabBtn = document.querySelector('#tab-btn');
// localStorage.clear();

let leadsFromLocalStorage = localStorage.getItem("myLeads");
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    renderLeads();
}
saveButton.addEventListener("click",()=>{
    myLeads.push(inputEl.value);
    inputEl.value = '';
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    renderLeads();
})


saveTabBtn.addEventListener('click',()=>{
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        renderLeads(myLeads);
    })
})


deleteButton.addEventListener("click",()=>{
    localStorage.clear();
    myLeads = [];
    renderLeads();
})


function renderLeads(){
    let listItems = "";
    for(let i=0;i<myLeads.length;i++){
        listItems += `
            <li>
                <a href="${myLeads[i]}" target="_blank">${myLeads[i]}</a>
            </li>
        `
    }
    list.innerHTML = listItems;
}


