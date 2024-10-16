const listSearch = document.querySelector("#list");
const btn = document.querySelector("form");
const resultNum = document.querySelector("#resultNum");
//-------------------------------------------------------------------
async function anime(searchValue) {
    const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=` + searchValue
    );
    const data = await response.json();

    console.log(data.data);
    resultNum.textContent = `Number of results: ${data.data.length}`;
    data.data.forEach((anime) => {
        const div = document.createElement("div");
        const title = document.createElement("h1");
        const status = document.createElement("h3");
        const episode = document.createElement("h3");
        const type = document.createElement("h3");
        const img = document.createElement("img");
        const score = document.createElement("h3");

        //--------------------------------
        title.textContent = anime.title;
        status.textContent = anime.status;
        episode.textContent = "Episodes: " + anime.episodes;
        type.textContent = "Type: " + anime.type;
        img.src = anime.images.webp.image_url;
        score.textContent = anime.score;
        if (anime.score < 5) {
            score.style.color = "#ff0000";
        }
        if (5 <= anime.score && 8 >= anime.score) {
            score.style.color = "#e6b800";
        }
        if (8 <= anime.score && anime.score <= 10) {
            score.style.color = "#00cf13";
        }
        //--------------------------------
        div.appendChild(title);
        div.appendChild(status);
        if (anime.episodes > 1) {
            div.appendChild(episode);
        }
        div.appendChild(type);
        div.appendChild(score);
        div.appendChild(img);
        listSearch.appendChild(div);
    });
}
//-------------------------------------------------------------------
async function characters(searchValue) {
    const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.jikan.moe/v4/characters?q=` +
            searchValue
    );
    const data = await response.json();
    console.log(data.data);
    resultNum.textContent = `Number of results: ${data.data.length}`;
    data.data.forEach((character) => {
        const div = document.createElement("div");
        const name = document.createElement("h1");
        const nameKanji = document.createElement("h3");
        const img = document.createElement("img");
        //--------------------------------
        name.textContent = character.name;
        nameKanji.textContent = character.name_kanji;
        img.src = character.images.webp.image_url;
        //--------------------------------
        div.appendChild(name);
        div.appendChild(nameKanji);
        div.appendChild(img);
        listSearch.appendChild(div);
    });
}
//-------------------------------------------------------------------
async function clubs(searchValue) {
    const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.jikan.moe/v4/clubs?q=` +
            searchValue
    );
    const data = await response.json();
    console.log(data.data);
    resultNum.textContent = `Number of results: ${data.data.length}`;
    data.data.forEach((club) => {
        const div = document.createElement("div");
        const name = document.createElement("h1");
        const access = document.createElement("h3");
        const img = document.createElement("img");
        const members = document.createElement("h3");
        //--------------------------------
        name.textContent = club.name;
        access.textContent = club.access;
        members.textContent = "Members: " + club.members;
        if (club.access === "public") {
            access.style.color = "#00cf13";
        } else {
            access.style.color = "#ff0000";
        }
        img.src = club.images.jpg.image_url;
        //--------------------------------
        div.appendChild(name);
        div.appendChild(access);
        div.appendChild(members);
        div.appendChild(img);
        listSearch.appendChild(div);
    });
}
//-------------------------------------------------------------------
async function manga(searchValue) {
    const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.jikan.moe/v4/manga?q=` +
            searchValue
    );
    const data = await response.json();
    console.log(data.data);
    resultNum.textContent = `Number of results: ${data.data.length}`;
    data.data.forEach((club) => {
        const div = document.createElement("div");
        const title = document.createElement("h1");
        const status = document.createElement("h3");
        const img = document.createElement("img");
        const members = document.createElement("h3");
        const chapters = document.createElement("h3");
        const volumes = document.createElement("h3");
        //--------------------------------
        title.textContent = club.title;
        members.textContent = "Members: " + club.members;
        status.textContent = club.status;
        chapters.textContent = "Chapters: " + club.chapters;
        volumes.textContent = "Volume: " + club.volumes;
        img.src = club.images.jpg.image_url;
        //--------------------------------
        div.appendChild(title);
        div.appendChild(status);
        if (club.chapters != null) {
            div.appendChild(chapters);
        }
        if (club.volumes != null) {
            div.appendChild(volumes);
        }

        div.appendChild(members);
        div.appendChild(img);
        listSearch.appendChild(div);
    });
}
//-------------------------------------------------------------------
async function people(searchValue) {
    const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.jikan.moe/v4/people?q=` +
            searchValue
    );
    const data = await response.json();
    console.log(data.data);
    resultNum.textContent = `Number of results: ${data.data.length}`;
    data.data.forEach((club) => {
        const div = document.createElement("div");
        const name = document.createElement("h1");
        const givenName = document.createElement("h3");
        const img = document.createElement("img");
        const familyName = document.createElement("h3");
        const birthday = document.createElement("h3");
        let date = new Date(club.birthday);
        date = new Intl.DateTimeFormat("en-GB").format(date);
        //     //--------------------------------
        name.textContent = club.name;
        givenName.textContent = club.given_name;
        familyName.textContent = club.family_name;
        birthday.textContent = "Birthday: " + date;
        img.src = club.images.jpg.image_url;
        //     //--------------------------------
        div.appendChild(name);
        div.appendChild(givenName);
        div.appendChild(familyName);
        div.appendChild(birthday);
        div.appendChild(img);
        listSearch.appendChild(div);
    });
}
//-------------------------------------------------------------------
btn.addEventListener("submit", async function (event) {
    event.preventDefault();
    listSearch.innerHTML = "";
    const search = document.querySelector("#search");
    const searchValue = search.value;
    const selected = document.querySelector("#type");
    const selectedValue = selected.value;
    if (selectedValue === "anime") {
        await anime(searchValue);
    }
    if (selectedValue === "characters") {
        await characters(searchValue);
    }
    if (selectedValue === "clubs") {
        await clubs(searchValue);
    }
    if (selectedValue === "manga") {
        await manga(searchValue);
    }
    if (selectedValue === "people") {
        await people(searchValue);
    }
});
