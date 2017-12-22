var Discord = require('discord.js');
var client = new Discord.Client();
const moment = require('moment');
const fetch = require('node-fetch');
const jsonfile = require('jsonfile');

// Bot settings
const prefix = '/'; // The prefix used to control the bot in the chat
const token = process.env.TOKEN; // The token the bot will use to log in
const currencies = ['BTC', 'ETH', 'XRP', 'LTC']; // Here you can change the crypto currencies, the bot will check
const translatedInto = ['USD']; // Here you can change the currencies, the bot will translate the crypto currencies into
const armed = ['85128690765144064']; // ID of users that are allowed to use the autoupdate-function
const aa_delay = '30000'; // The delay that will be used in the auto-update function of the bot
// End of settings

const requestMap = () =>
  currencies.map(currency => {
    const requestString = `https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=${translatedInto.join(',')}`;
    return fetch(requestString);
  });

client.on('message', msg => {
  // /cc convert 50 ETH BTC
  if (msg.content.startsWith(prefix + 'cc convert')) {
    const parts = msg.content.split(' ');
    const amount = parseFloat(parts[2]);
    const source = parts[3];
    const dest = parts[4];

    const requestString = `https://min-api.cryptocompare.com/data/price?fsym=${source}&tsyms=${dest}`;
    fetch(requestString).then(res => res.json())
      .then(res => {
        const unitPrice = res[dest];
        const totalPrice = unitPrice * amount;
        msg.channel.send(`${amount} ${source} ~ ${totalPrice} ${dest}`);
      }).catch(e => console.log(e));

    return;
  }

  if (msg.content.toLowerCase() == prefix + 'cc')
    Promise.all(requestMap())
      .then(e => Promise.all(e.map(single => single.json())))
      .then(e => {
        const resolvedCurrencies = e.map((single, index) => ({
          from: currencies[index],
          resp: single
        }));
        // ALRIGHT! Now it's gettin' tricky. Just leave everything below this point if you don't 100% know what you're doing.
        const fields = [];
        for (let resolvedCurrency of resolvedCurrencies) {
          const value =
            `Current exchange for ${resolvedCurrency.from}: ` +
            `**${resolvedCurrency.resp['USD']} USD**`;
          fields.push({
            name: `:chart_with_upwards_trend: __${resolvedCurrency.from}:__`,
            value,
            inline: false
          });
        }

        let embed = {
          color: 0x7289da,
          description: ':money_with_wings: __***Current Crypto Currency Exchange***__\n***Note**: Every data you see below is the exchange rate for **one coin** of each currency.*\n ',
          footer: {
            text: `Last update: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`
          },
          fields
        };
        console.log('Crypto Currency Stats requested.');
        msg.channel.send('', {
          embed
        });
      })
      .catch(error => {
        console.log(error);
      });
});

// Every time "gameupdate()" is called, the bot will update its status and display the current Bitcoin exchange!

function gameupdate() {
  Promise.all(requestMap()).then(e => Promise.all(e.map(single => single.json()))).then(e => {
    const resolvedCurrencies = e.map((single, index) => ({
      from: currencies[index],
      resp: single
    }));
    const status = resolvedCurrencies[0].resp['EUR'] + '€';
    client.user.setGame('BTC @ ' + status);
  });
}
client.on('message', msg => {
  if (msg.content.toLowerCase() == prefix + 'status') {
    Promise.all(requestMap()).then(e => Promise.all(e.map(single => single.json()))).then(e => {
      const resolvedCurrencies = e.map((single, index) => ({
        from: currencies[index],
        resp: single
      }));
      const status = resolvedCurrencies[0].resp['EUR'] + '€';
      msg.channel.send(`Bot up and running! :blush:`);
      msg.channel.send(
        `By the way, did you know that one Bitcoin is worth **` + status + `** right now? :fire:`
      );
    });
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
  console.log('|----------------------------------------------------|');
  setInterval(function() {
    // Starts the auto update of the bot
    gameupdate();
  }, aa_delay); // Searches for the delay of the autoupdate in the bot settings
});
client.login(token);
