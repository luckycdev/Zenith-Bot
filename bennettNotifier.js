const { io } = require('socket.io-client');

module.exports = function setupBennettNotifier(client, channelId, roleId) {
  const socket = io('https://besthikers.herokuapp.com');

  socket.on('connect', () => {
    console.log('Connected to chat');
  });

  socket.on('disconnect', (reason) => {
    console.warn(`Chat disconnected: ${reason} - Will attempt to reconnect`);
  });

  socket.on('chat message', (data) => {
    if (typeof data.msg === 'string' && data.msg.toLowerCase().startsWith('bennett:')) {
      const channel = client.channels.cache.get(channelId);
      if (channel) {
        channel.send(`<@&${roleId}>\n\n\`${data.msg}\``);
      } else {
        console.error(`Channel ${channelId} not found`);
      }
    }
  });

  return socket;
};