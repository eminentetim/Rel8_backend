const http = require('http');
const app = require('./app');
const { init: initSocket } = require('./sockets/chat.socket');
const dotenv = require('dotenv');

dotenv.config();

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
