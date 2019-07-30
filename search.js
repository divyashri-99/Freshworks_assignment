/* Variables for checking state of the system */

var typed = "";
var result = "";
var presence = false;

/* Creates DOM with the search field on page load */

window.onload = function(){
    typed = "";
    searchDOM();
    process();
};

/* Creates the DOM element for the search field */

function searchDOM() {
    let searchWindow = document.querySelector(".search-body");
    var search = document.createElement("input");
    search.className = "search_field";
    search.id = "search_field";
    search.placeholder = "Enter the country name"
    searchWindow.appendChild(search);
}
/* Function to show suggestions if there is no user activity throttels 400 times */

function process(){
    window.setInterval(function(){
        var changed = document.getElementById('search_field').value;
        if (changed.length == 0) {
            typed = changed;
            clearList();
        }
        if (changed != typed) {
            if (changed.length >= 3) 
            {
              typed = changed;
              apiCall(changed);
            }
            else {
                typed = changed;
                if (presence == true) {
                clearList();
                }
            }
        }
    }, 400);
}

/* function for API Call to get countries data */

function apiCall(changed) {
    console.log("Called")
    let url = 'https://restcountries.eu/rest/v2/name/' + changed
    fetch(url)
    .then(function(response){
        if (response.status == 404) {
            showNone();
        }
        else {
            return response.json();
        }
    })
    .then(function(myJSON){
        result = myJSON;
        listCreator(myJSON);
    })
    .catch(function(){
        showFailure();
    });
    
}

/* Creates the list of suggestions based on the typed text */

function listCreator(result) {
    console.log("reached");
    if (presence == true) {
        clearList();
    }
    presence = true;
    let main = document.querySelector(".search-body");
    let holder = document.createElement("div");
    holder.className = "card_holder";
    main.appendChild(holder);
    for (var index = 0; index < result.length ; index++) {
        let card = document.createElement("div");
        card.className = "card";
        card.id = index;
        card.setAttribute("onclick","information(this)");
        let name = document.createElement("p");
        name.className = "country"
        name.textContent = result[index].name;
        let flag = document.createElement("img");
        flag.src = result[index].flag;
    
        card.appendChild(flag);
        card.appendChild(name);
 
        holder.appendChild(card);
    }
}
/* switching to the respective country's details page */
function information(ele)
{
    var blk = ele.querySelector("p");
    var fname = blk.textContent;
    location.href = "details.html?fname=" + fname;

}
/* Function called to clear the list before new suggestions  */

function clearList(){
    var items = document.querySelectorAll(".card");
    items.forEach(function(item){
        item.parentNode.removeChild(item);
    })
    var holder = document.querySelector(".card_holder");
    holder.parentNode.removeChild(holder);
    presence = false;
}



/* Showing failed status when the list does not return any results */

function showFailure() {
    if(presence == true) {
        clearList();
    }
    let main = document.querySelector(".search-body");
    let holder = document.createElement("div");
    holder.className = "card_holder";
    main.appendChild(holder);
    let p = document.createElement("p");
    p.textContent = "No results found!";
    p.className = "sorryText"
    holder.appendChild(p);
    presence = true;
}

/* Showing failed status in the case of error code 404 */

function showNone(){
    if(presence == true) {
        clearList();
    }
    let main = document.querySelector(".search-body");
    let holder = document.createElement("div");
    holder.className = "card_holder";
    main.appendChild(holder);
    let p = document.createElement("p");
    p.textContent = "No results found!";
    p.className = "sorryText"
    holder.appendChild(p);
    presence = true;
}