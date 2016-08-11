'use strict';
const cli = require('../../bin/cli');
const command = cli.input[0];
const script_src = cli.flags.script;

if (command === 'start') {
  const nodemon = require('nodemon');
  const localtunnel = require('localtunnel');
  const config = require('config');

  const BOT_PORT = config.get('botPort') || 8007;
  const BOT_TUNNEL_SUBDOMAIN = config.get('botTunnelSubDomain') || '';
  const VERIFY_TOKEN = config.get('verifyToken');

  const SCRIPT_INDEX = script_src || './index.js';

  const mon = nodemon({
    script: SCRIPT_INDEX
  });

  const tunnel = localtunnel(BOT_PORT, { subdomain: BOT_TUNNEL_SUBDOMAIN }, (err, client) => {
    if (err) {
      return console.error(`Error running localtunnel: ${err}`);
    }

    const url = client.url.replace('http://', 'https://');

    console.log(`

     ____    ___    ___   ______  ____    ___   ______
    |    \\  /   \\  /   \\ |      T|    \\  /   \\ |      T
    |  o  )Y     YY     Y|      ||  o  )Y     Y|      |
    |     T|  O  ||  O  |l_j  l_j|     T|  O  |l_j  l_j
    |  O  ||     ||     |  |  |  |  O  ||     |  |  |
    |     |l     !l     !  |  |  |     |l     !  |  |
    l_____j \\___/  \\___/   l__j  l_____j \\___/   l__j

    `);
    console.log(`
    Local Bot running on: ${url}

    Configure your Facebook App's Webhook with:

    Webhook URL: ${url}/webhook
    Verify Token: ${VERIFY_TOKEN}

    Press Ctrl + C to stop.
    `);
  });

  tunnel.on('close', () => console.log(`\nTunnel closed`));
  tunnel.on('error', (err) => console.log(`Tunnel errored ${err}`));

  process.once('SIGINT', function () {
    tunnel.close();
    console.log(`BootBot server closed`);
    process.exit(0);
  });
}
