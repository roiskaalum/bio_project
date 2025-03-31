displayFilmBanner("src/filmdata.json");

async function displayFilmBanner(file)
{
    var f = await fetch(file);
    var a = await f.json();
    d = document.getElementById("bannerContainer");

    var film = "";
    film = createFilmBanner(a.film);

    d.innerHTML = film;
}

function createFilmBanner(film)
{
    return `
        <div class="billederBanner">
            <img class="first" src="${film[0].images.base}" alt="" />
            <img src="${film[1].images.base}" alt="" />
            <img src="${film[2].images.base}" alt="" />
            <img src="${film[9].images.base}" alt="" />
            <img src="${film[4].images.base}" alt="" />
            <img src="${film[5].images.base}" alt="" />
            <img src="${film[6].images.base}" alt="" />
            <img src="${film[20].images.base}" alt="" />
            <img src="${film[18].images.base}" alt="" />
            <img src="${film[0].images.base}" alt="" />
            <img src="${film[1].images.base}" alt="" />
            <img src="${film[2].images.base}" alt="" />
            </div>
    `
}