### Cryptocurrencies Monitor

This is a Node/Express API that is wrapper of [CoinGecko](​https://www.coingecko.com/en/api​).

#### Instructions

## Run the app locally

- Make sure to run MySQL on your machine
- Add your environment variables to .env file
- The first time run the app with `npm start` (this will install dependencies and create the database)
- Once you have the db in place you can run the app via `npm run dev`

## Try the API

Documentation is available here: [Go to docs](https://documenter.getpostman.com/view/10987040/TW6tLq57)

Postman collection: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/de0047489a725a200518)

Available endpoints:
`POST /users/register` - Register a new user
`POST /users/login` - Login
`POST /crypto/add-coin` - Add favorite coins
`GET /crypto/coins` - List all available coins
`GET /crypto/top/:N/:order` - List and sort top N favorite coins
