require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');
const setupBennettNotifier = require('./bennettNotifier');
const serverListCommand = require('./serverList.js');
const registerSlashCommands = require('./registerSlashCommands.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

async function main() {
  await registerSlashCommands();

  client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}`);
  });

  setupBennettNotifier(client, process.env.CHANNEL_ID, process.env.ROLE_ID);

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === serverListCommand.name) {
      await serverListCommand.execute(interaction);
    }
  });

  await client.login(process.env.DISCORD_TOKEN);
}

main();