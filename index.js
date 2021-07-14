const express = require('express')
const request = require('request-promise')
const app = express()

const PORT = process.env.PORT || 5000
const API_KEY = '7364c9aa8d815d40c182da46bbc27790'
const baseURL = `http://api.scraperapi.com?api_key=${API_KEY}&autoparse=true`

app.use(express.json())

//Get product details 
app.get('/products/:productID', async (req,res) => {
    const { productID } = req.params;
    try {
        const response = await request(`${baseURL}&url=http://amazon.com/dp/${productID}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

//GET product reviews
app.get('/products/:productID/reviews', async (req,res) => {
    const { productID } = req.params;
    try {
        const response = await request(`${baseURL}&url=http://amazon.com/product-reviews/${productID}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

//GET product offers
app.get('/products/:productID/offers', async (req,res) => {
    const { productID } = req.params;
    try {
        const response = await request(`${baseURL}&url=http://amazon.com/gp/offer-listing/${productID}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

//GET search results
app.get('/search/:searchQuery', async (req,res) => {
    const { searchQuery } = req.params;
    try {
        const response = await request(`${baseURL}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

app.listen(PORT, () => console.log(`server is running on ${PORT}`))
