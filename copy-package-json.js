/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const fs = require('fs');

const content = JSON.parse(fs.readFileSync('./package.json').toString());

delete content.scripts;

fs.writeFileSync('./package-copy.json', JSON.stringify(content, null, 4));
