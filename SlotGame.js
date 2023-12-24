const { Client, Intents } = require('discord.js-selfbot-v13');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    checkUpdate: false,
});

const reelSymbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() === '!spin') {
        const spinningMessage = await message.channel.send(
            '```css\n' +
            '⭐⭐⭐ VuviSlots ⭐⭐⭐\n' +
            '╔═══════╗\n' +
            '║ 🎰 Spinning... 🎰 ║\n' +
            '╚═══════╝\n' +
            '```'
        );

        const spins = 10; 
        const intervalTime = 500; 
        const totalDuration = spins * intervalTime;

        const updateInterval = setInterval(() => {
            const result = spinSlotMachine();
            spinningMessage.edit(
                '```css\n' +
                '⭐⭐⭐ VuviSlots ⭐⭐⭐\n' +
                '╔═══════╗\n' +
                `║ ${result} ║\n` +
                '╚═══════╝\n' +
                '```'
            );
        }, intervalTime);

        setTimeout(() => {
            clearInterval(updateInterval);
            const finalResult = spinSlotMachine();
            const outcome = checkWinLoss(finalResult);
            spinningMessage.edit(
                '```css\n' +
                '⭐⭐⭐ VuviSlots ⭐⭐⭐\n' +
                '╔════════════════╗\n' +
                `║ 🎰 **${finalResult}** 🎰 ║\n` +
                '╠════════════════╣\n' +
                `║ ${outcome} ║\n` +
                '╚════════════════╝\n' +
                '```'
            );
        }, totalDuration);
    }
});

function spinSlotMachine() {
    const reels = [];
    for (let i = 0; i < 3; i++) {
        const randomSymbol = reelSymbols[Math.floor(Math.random() * reelSymbols.length)];
        reels.push(randomSymbol);
    }
    return reels.join(' | ');
}

function checkWinLoss(result) {
    const symbolCount = {};
    result.split(' | ').forEach(symbol => {
        symbolCount[symbol] = (symbolCount[symbol] || 0) + 1;
    });

    const jackpotSymbol = Object.keys(symbolCount).find(symbol => symbolCount[symbol] === 3);
    const winSymbol = Object.keys(symbolCount).find(symbol => symbolCount[symbol] === 2);

    if (jackpotSymbol) {
        return `🎉 Jackpot! Three ${jackpotSymbol}s!`;
    } else if (winSymbol) {
        return `🎊 Two ${winSymbol}s! You won!`;
    } else {
        return '😞 Better luck next time. Try again!';
    }
}



client.login('UrToken');
