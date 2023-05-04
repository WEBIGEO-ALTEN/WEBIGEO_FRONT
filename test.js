const { default: axios } = require("axios");

axios
    .get('http://localhost:8000/country/?page=25')
    .then((res) => {
        var data = res.data;
        var result = data.results;
        console.log(res.data)
        console.log(result.length)
    })