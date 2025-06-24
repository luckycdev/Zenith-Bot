const axios = require('axios');

module.exports = {
  name: 'serverlist',
  description: 'Check the GOIMP server list',
  async execute(interaction) {
    await interaction.deferReply();

    try {
      const res = await axios.get('https://master.gettingoverit.mp/list');
      const lines = res.data.trim().split('\n');
      const formatted = lines.map(line => {
        const [ip, port] = line.trim().split(';');
        const server = `${ip}:${port}`;
        return server === '193.122.138.111:12345'
          ? `${server} (Official Zenith Demo)`
          : server;
      });

      await interaction.editReply({ content: formatted.join('\n') });
    } catch (error) {
      console.error('Error fetching server list:', error.message);
      await interaction.editReply('Error loading servers.');
    }
  }
};