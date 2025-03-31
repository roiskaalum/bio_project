document.addEventListener("DOMContentLoaded", function() {
    console.log("test loaded");
    for(let i=0;i<10;i++)
    {
        let iteration = 0;
        const divRow = document.createElement("div");
        divRow.setAttribute("data-row", i+1);
        //i == row number. 
        for(let j = 0;j<8;j++)
        {
            console.log(iteration);
            iteration++;
            const divCol = document.createElement("div");
            divCol.setAttribute("data-col", j+1);
            divRow.appendChild(divCol);
    
        }
    
        console.log(divRow.getAttribute("data-row"));
        console.log(divRow);
        console.log(divRow.children[3]);
        console.log(divRow.children[3].getAttribute("data-col"));
    }

})