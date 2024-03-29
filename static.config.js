// This file is used to configure:
// - static-site generation
// - Document shell (index.html)
// - ...tons of other things!

// Get started at https://react-static.js.org

import * as fs from 'fs';
import * as util from 'util';

const readFileAsync = util.promisify(fs.readFile);
const TIMEZONE_DATA_PATH = './data/tz.json';

async function loadTimezones(path) {
  const fileString = await readFileAsync(path, 'utf8');
  return JSON.parse(fileString);
}


export default {
  siteRoot: 'https://clocks.live',
  maxThreads: 1, // Remove this when you start doing any static generation
  getSiteData: () => loadTimezones(TIMEZONE_DATA_PATH),
  plugins: [
    'react-static-plugin-typescript',
    'react-static-plugin-sass'
  ],
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    disableHostCheck: true
  }
}
