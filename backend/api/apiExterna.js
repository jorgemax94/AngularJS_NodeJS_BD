const axios = require("axios");

const api = axios.create({
    baseURL: 'https://cat-fact.herokuapp.com/facts/random?animal_type=dog&amount=3'
})

const apiEmail = axios.create({
    baseURL: 'http://apilayer.net/api/check?access_key=f20f7ae318c34b92ee6a685fac758feb&email='  
})

module.exports = {
    api,
    apiEmail
}