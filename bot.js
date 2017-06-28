var Discord = require('discord.js')
var client = new Discord.Client()
const moment = require('moment')
const fetch = require('node-fetch')
const jsonfile = require('jsonfile')



// Bot settings
const prefix = '/'; // The prefix used to control the bot in the chat
const token = 'YOUR_TOKEN_HERE'; // The token the bot will use to log in
const currencies = ['BTC', 'ETH', 'XRP', 'LTC', 'DASH', 'ETC', 'XMR', 'MAID', 'STRAT']; // Here you can change the crypto currencies, the bot will check
const translatedInto = ['EUR', 'USD']; // Here you can change the currencies, the bot will translate the crypto currencies into
const armed = ["85128690765144064"]; // ID of users that are allowed to use the autoupdate-function
const aa_delay = '30000'; // The delay that will be used in the auto-update function of the bot
// End of settings



const requestMap = () => currencies.map(currency => {
    const requestString = `https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=${translatedInto.join(',')}`;
    return fetch(requestString);
});

client.on('message', msg => {
    if (msg.content.toLowerCase() == prefix + "cc")
        Promise.all(requestMap())
        .then(e => Promise.all(e.map(single => single.json())))
        .then(e => {
            const resolvedCurrencies = e.map((single, index) => ({
                from: currencies[index],
                resp: single
            }))
            // ALRIGHT! Now it's gettin' tricky. Just leave everything below this point if you don't 100% know what you're doing.
            const firstExchange = "**" + resolvedCurrencies[0].resp["EUR"] + " EUR** or **" + resolvedCurrencies[0].resp["USD"] + " USD**"
            const secondExchange = "**" + resolvedCurrencies[1].resp["EUR"] + " EUR** or **" + resolvedCurrencies[1].resp["USD"] + " USD**"
            const thirdExchange = "**" + resolvedCurrencies[2].resp["EUR"] + " EUR** or **" + resolvedCurrencies[2].resp["USD"] + " USD**"
            const fourthExchange = "**" + resolvedCurrencies[3].resp["EUR"] + " EUR** or **" + resolvedCurrencies[3].resp["USD"] + " USD**"
            const fifthExchange = "**" + resolvedCurrencies[4].resp["EUR"] + " EUR** or **" + resolvedCurrencies[4].resp["USD"] + " USD**"
            const sixthExchange = "**" + resolvedCurrencies[5].resp["EUR"] + " EUR** or **" + resolvedCurrencies[5].resp["USD"] + " USD**"
            const seventhExchange = "**" + resolvedCurrencies[6].resp["EUR"] + " EUR** or **" + resolvedCurrencies[6].resp["USD"] + " USD**"
            const eighthExchange = "**" + resolvedCurrencies[7].resp["EUR"] + " EUR** or **" + resolvedCurrencies[7].resp["USD"] + " USD**"
            const ninthExchange = "**" + resolvedCurrencies[8].resp["EUR"] + " EUR** or **" + resolvedCurrencies[8].resp["USD"] + " USD**"

            let embed = {
                color: 0x7289DA,
                description: ":money_with_wings: __***Current Crypto Currency Exchange***__\n***Note**: Every data you see below is the exchange rate for **one coin** of each currency.*\n ",
                footer: {
                    text: `Last update: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`
                },
                fields: [{
                        name: ":chart_with_upwards_trend: __Bitcoin:__",
                        value: `Current exchange for ${resolvedCurrencies[0].from}\n` + firstExchange,
                        inline: false
                    },
                    {
                        name: ":chart_with_upwards_trend: __Ethereum:__",
                        value: `Current exchange for ${resolvedCurrencies[1].from}\n` + secondExchange,
                        inline: false
                    },
                    {
                        name: ":chart_with_upwards_trend: __Ripple:__",
                        value: `Current exchange for ${resolvedCurrencies[2].from}\n` + thirdExchange,
                        inline: false
                    },
                    {
                        name: ":chart_with_upwards_trend: __Litecoin:__",
                        value: `Current exchange for ${resolvedCurrencies[3].from}\n` + fourthExchange,
                        inline: false
                    },
                    {
                        name: ":chart_with_upwards_trend: __Dash:__",
                        value: `Current exchange for ${resolvedCurrencies[4].from}\n` + fifthExchange,
                        inline: false
                    },
                    {
                        name: ":chart_with_upwards_trend: __Ethereum Classic:__",
                        value: `Current exchange for ${resolvedCurrencies[5].from}\n` + sixthExchange,
                        inline: false
                    },
                    {
                        name: ":chart_with_upwards_trend: __Monero:__",
                        value: `Current exchange for ${resolvedCurrencies[6].from}\n` + seventhExchange,
                        inline: false
                    },
                    {
                        name: ":chart_with_upwards_trend: __MaidSafeCoin:__",
                        value: `Current exchange for ${resolvedCurrencies[7].from}\n` + eighthExchange,
                        inline: false
                    },
                    {
                        name: ":chart_with_upwards_trend: __Stratis:__",
                        value: `Current exchange for ${resolvedCurrencies[8].from}\n` + ninthExchange,
                        inline: false
                    },
                ],
            }
            console.log('Crypto Currency Stats requested.')
            msg.channel.send('', {
                embed
            })
        })
        .catch(error => {
            console.log(error);
        });

});



// Every time "gameupdate()" is called, the bot will update its status and display the current Bitcoin exchange!

function gameupdate() {
    Promise.all(requestMap())
        .then(e => Promise.all(e.map(single => single.json())))
        .then(e => {
            const resolvedCurrencies = e.map((single, index) => ({
                from: currencies[index],
                resp: single
            }))
            const status = resolvedCurrencies[0].resp["EUR"] + "€"
            client.user.setGame("BTC @ " + status);
        })
};



client.on("message", (msg) => {
    if (msg.content.toLowerCase() == (prefix + "status")) {
        Promise.all(requestMap())
            .then(e => Promise.all(e.map(single => single.json())))
            .then(e => {
                const resolvedCurrencies = e.map((single, index) => ({
                    from: currencies[index],
                    resp: single
                }))
                const status = resolvedCurrencies[0].resp["EUR"] + "€"

                msg.channel.send(`Bot up and running! :blush:`);
                msg.channel.send(`By the way, did you know that one Bitcoin is worth **` + status + `** right now? :fire:`)
            })
    }
});


client.on('ready', function() {
    gameupdate(); // Sets the bot status
    console.log('|----------------------------------------------------|');
    console.log('|                                                    |');
    console.log('|   CryptoCurrency(-Bot) online and ready to use!    |');
    console.log('|         - Current Verison: 2.6 by 4dams -          |');
    console.log('|                Contact: 4dams#3082                 |');
    console.log('|                                                    |');
    console.log('|----------------------------------------------------|');
    console.log('| Autoupdater requested.                             |');
    console.log('|----------------------------------------------------|')
    setInterval(function() { // Starts the auto update of the bot
        gameupdate();
    }, aa_delay) // Searches for the delay of the autoupdate in the bot settings

});

client.login(token);
