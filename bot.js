var Discord = require('discord.js')
var client = new Discord.Client()
const moment = require('moment')
const fetch = require('node-fetch')
const jsonfile = require('jsonfile')



// Bot settings
const prefix = '/';
const token = 'YOUR_TOKEN_HERE';
const currencies = ['BTC', 'ETH']; // Here you can change the crypto currencies, the bot will check
const translatedInto = ['EUR', 'USD']; // Here you can change the currencies, the bot will translate the crypto currencies into
// End of settings



const requestMap = currencies.map(currency => {
  const requestString = `https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=${translatedInto.join(',')}`;
  return fetch(requestString);
});


client.on('message', msg => {
    if (msg.content.toLowerCase() == prefix + "btc")
    Promise.all(requestMap)
     .then(e => Promise.all(e.map(single => single.json())))
     .then(e => {
    const resolvedCurrencies = e.map((single, index) => ({
      from: currencies[index],
      resp: single
    }))

    resolvedCurrencies.forEach(item => {
      const exhangeString = Object.keys(item.resp).map(e => item.resp[e] + ' ' + e).join('** or **')
      let embed = {
      color: 0x2ecc71,
      description: ":money_with_wings: __***Current Crypto Currency Exchange***__\n***Note**: Every data you see below is the exchange rate for **one coin** of each currency.*\n ",
      footer: { text: `Last update: ${moment().format('MMMM Do YYYY, h:mm:ss a')}` },
      fields: [
      { name: ":chart_with_upwards_trend: __Bitcoin:__", value: `Current exchange for ${item.from}\n**` + exhangeString + `**`, inline: false },
      { name: ":chart_with_downwards_trend: __Ethereum:__", value: `Current exchange for ${item.from}\n**` + exhangeString + `**`, inline: false }
    ],
    }
    msg.channel.send('', {embed})
    })
  })
  .catch(error => {
    console.log(error);
  });
    
});


function gameupdate() { // The bot status
  client.user.setGame("with BTC @" + client.users.size);
}


client.on('ready', function () {
    gameupdate(); // Sets the bot status
    console.log('|----------------------------------------------------|');
    console.log('|                                                    |');
    console.log('|   CryptoCurrency(-Bot) online and ready to use!    |');
    console.log('|         - Current Verison: 2.2 by 4dams -          |');
    console.log('|                Contact: 4dams#3082                 |');
    console.log('|                                                    |');
    console.log('|----------------------------------------------------|');

});

client.login(token);
