# OAI-PMH-Harvester

This is a wrapper module for the oai-pmh node module from @andrenarchy
This also fixes a few bugs found on the original code that haven't yet been fixed on the original repository.

# How to install

Run the following command on the root of the project:
```
npm install
```
If you have any issues running this command on Windows (or any other operating system), make sure that the following line found on ```package.json``` is able to run on your operating system.

For example, the ```cp``` must be replaced by the ```copy``` command.


```
cd my_modules/oai-pmh-harvester/; npm i
```

An easy fix is to install the [Ubuntu Console on Windows 10](https://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/). This way the linux command can run on Win32 platforms.


# How to run the demo

```bash
node demo.js
```

or

```bash
npm start
```

# How to use

Open ```demo.js``` in a text editor and inspect the code. Change the function ```processRecord``` to do whatever you need it to do.
This function will process each record collected by the harvesting method.

Example:

```javascript
async function processItem(item) {
    try {
        if(item.header.$ && item.header.$.status == "deleted") return item;
        let titles = item.metadata['oai_dc:dc']['dc:title'];
        let title = (typeof titles == 'object' )?titles.join("\n"):titles;
        console.log(`${counter++}\t${title.substring(0,100)}...`);
        return item; // return as Promise
    } catch(err) {
        console.debug(err);
    }
};
```


# How to use the module in your own application?

Copy the folder "my_modules" to your project. Require the ```oai-pmh-harvester``` module as the example bellow:


```javascript
const oaipmh = require('./my_modules/oai-pmh-harvester/oai-pmh-harvester.js');

const dataProviderUrl = 'http://repositorium.sdum.uminho.pt/oai/oai';

// instanciate a new harvester object
let harvester = new oaipmh.Harvester(dataProviderUrl);

```
