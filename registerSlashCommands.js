require('dotenv').config();
const { REST, Routes } = require('discord.js');
const serverListCommand = require('./serverList.js');

const commands = [
  {
    name: serverListCommand.name,
    description: serverListCommand.description,
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

async function registerSlashCommands() {
  try {
    console.log('Registering slash commands...');
    await rest.put(
      Routes.applicationCommands(process.env.APPLICATION_ID),
      { body: commands }
    );
    console.log('Slash commands registered');
  } catch (error) {
    console.error(error);
  }
}

module.exports = registerSlashCommands;