//console.log(year)

// hozzunk létre 2 componenst, amire szükségünk lesz 

const monthSectionComponent = function (inner, id) { //minden hónapnak csinálunk egy sectiont
    return `
        <section id="${id}">${inner}</section>
    `
}

const dayCardComponent = function (year, month, day) { //hónapokon belül minden napnak lesz egy div-e
    return `
        <div class="card">
            <time datetime="${year}">${year}</time>
            <time datetime="${month}">${month}</time>
            <time datetime="${day}">${day}</time>
        </div>
    `
}

const titleIntroComponent = `
    <section id="intro">
    <h1>The Calendar Game</h1>
    <p>Try to color the days of the calendar by either</p> 
        <ul>
            <li>click on the days (easy-peasy) or </li>
            <li>hover on the days (like a pro)* </li>
        </ul>
    <p>Wanna take it further and feed your OCD? Try the button below then clean up the mess!</p>
    <button id="button1">Generate Mess</button>
    <button id="button2">Reset all white</button>
     <p><i>*Functionality on mobile devices is limited.</i></p>
    </section>
    `;

const loadEvent = function (){
    const rootElement = document.getElementById("root");

    rootElement.insertAdjacentHTML("afterbegin", titleIntroComponent);

    for (const item of year) {  //a year tömb minden elemére (hónapok) megcsinálja a függvény utasításait (year elemei: items, de bárhogy elnevezhetjük
        let sectionInner = ""

        for (let index = 1; index <= item.days; index++) {      // 1-el indul, és addig csinálja a függvény utasításait, amíg i <= hónap napjainak száma (.days kulcs)  
            sectionInner += dayCardComponent(2022, item.month, index) // a sectionInner-be beleírjuk a hónap összes napját, minden nap egy div
        }
        
        rootElement.insertAdjacentHTML("beforeend", monthSectionComponent(sectionInner, item.id))
    }

    const dayCards = document.querySelectorAll(".card"); //kiválasztjuk az összes, .card classba tartozó elemet, egy tömb fog létrejönni
    const dayClickEvent = function (event) { //a napokra való klikkelésnél mi történjen
        event.currentTarget.classList.toggle("clicked");
    }
    const dayMouseOnEvent = function (event) { // az egérrel napokra menéskor mi történjen
        event.currentTarget.classList.toggle("mouse-on");
    }
    //const dayMouseLeaveEvent = function (event) {}
    for (const card of dayCards) { // 
        card.addEventListener("click", dayClickEvent);
        card.addEventListener("mouseenter", dayMouseOnEvent);
        //card.addEventListener("mouseleave", dayMouseLeaveEvent);
    }

    const button1 = document.querySelector("#button1"); //kiválasztjuk az 1. button elemet
    const button2 = document.querySelector("#button2"); //kiválasztjuk a 2. button elemet
    
    const button1ClickEvent = function (event){ //mi történjen, ha rákattintunk a button 1-re?
        event.currentTarget.classList.add("button-clicked"); 
        button1.innerHTML = "Do it again"; 
        for (const card of dayCards) {
            card.classList.remove("mouse-on");
            card.classList.remove("clicked");
            if (Math.random() >= 0.8) { // a számok változtatásával más lesz a színek aránya
                card.classList.add("mouse-on");
            } else if (Math.random() <= 0.2){
                card.classList.add("clicked");
            }
        }         
    }
    button1.addEventListener("click", button1ClickEvent);
    
    const button2ClickEvent = function (){ //mi történjen, ha rákattintunk a button 2-re?
        for (const card of dayCards) {
            card.classList.remove("clicked");
            card.classList.remove("mouse-on");
        }
        button1.innerHTML = "Generate Mess";
    }
    button2.addEventListener("click", button2ClickEvent);
}

window.addEventListener("load", loadEvent)





