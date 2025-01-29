const axios = require("axios");

const random = (el, type) => {
    el.filter((i) => (i.type.value = type));
    const indx = Math.floor(Math.random() * el.length);

    return el[indx];
};

axios
    .get("https://fortnite-api.com/v2/cosmetics")
    .then((res) => res.data.data)
    .then((data) => console.log(random(data.br, "pickaxe")));
