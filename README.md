[![Welcomebot](https://i.4da.ms/cryptocurrencies%20header.png)](#welcomebot)

"CryptoCurrency" is a small bot for discord which will keep track of the current exchange rates of the most common crypto currencies.

The bot also uses Discord's `playing...` feature to display the current exchange of Bitcoin, which will get automatically updated every 5 seconds.

![preview1](https://i.4da.ms/edV2fE.png)
![preview2](https://i.4da.ms/71L38Q.png)

# How to get this bot running?

First of all, you're gonna need node.js installed. A download for that can be found on [this page](https://nodejs.org/en/).

After you have installed node.js, you will have to install [discord.js](http://discordjs.readthedocs.io/en/latest/installing.html) in the folder you have downloaded. To do that, open a command prompt window and type `cd *DIRECTORY OF BOT.JS*` in order to get get to the directory where the bot.js is in. After that, tpye the following commands into command prompt, one by one, and wait until each of them is installed:

```
npm install discord.js
npm install moment
npm install jsonfile
npm install node-fetch
```
After node.js and and the required modules are installed, you will have to edit the "bot.js"-file with a text editor of your choice. In this file, you can edit all needed settings of the bot such as a custom prefix, the currencies the bot will check and of course, the user token, which is a **must** to change.

In order to change the user token, do the following:

Replace `"YOUR_TOKEN_HERE"` with the user token of the bot. You can get it by creating a new bot over at the [Discord Dev Dashboard](https://discordapp.com/developers/applications/me)

After you completed all of those steps you should be able to start the bot by running the "run.bat"-file in the downloaded folder. 

# How do I use the bot?

By default, the bot should display the current exchange rate of a currency of your choice in its "playing..." status. If that's the case, you know that the bot is running! Now, you can type `/cc` (or whatever prefix you chose) to display the current exchange rates for the most common Crypto Currencies!

⚠️ Don't forget to invite the bot to your server! ^_^
