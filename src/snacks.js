displaySnacks("src/snackvalg.json");

async function displaySnacks(file)
{
    var f = await fetch(file);
    var a = await f.json();
    d = document.getElementById("snackMenu");

    var drikke = "";
    drikke = createSnacks(a.drikke);

    d.innerHTML = drikke;
}

function createSnacks(element)
{
    return `

    <div class="number">
        <div class="name"><b>${element[0].name}</b></div>
        <div class="ingredients">${element[0].ingredients}</div>
        <div class="image">
            <figure>
                    <a href="${element[0].bigImage}" target="_blank">
                    <img src="${element[0].smallImage}"
                        alt="Pizza" title="${element[0].title}" width="100"></a>
                    <figcaption>${element[0].caption}</figcaption>
            </figure>
         </div> 
         </div>

        <div class="number">2.</div>
        <div class="name"><b>${element[1].name}</b></div>
        <div class="ingredients">${element[1].ingredients}</div>
        <div class="image">
        <figure>
                <a href="${element[1].bigImage}" target="_blank">
                <img src="${element[1].smallImage}"
                    alt="Pizza" title="${element[1].title}" width="100"></a>
                <figcaption>${element[1].caption}</figcaption>
        </figure>
    </div>
    `
}