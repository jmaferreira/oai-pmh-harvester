# OAI-PMH-Harvester

This is a wrapper module for the oai-pmh node module from @andrenarchy
This also fixes a few bugs found on the original code that haven't yet been fixed.

# How to install

```
npm install
```
If you have any issues running this command on Windows (or any other operating system), make sure that the following line found on ```package.json``` is able to run on your operating system.

```
cp my_modules\oai-pmh-harvester\index.js node_modules\oai-pmh\src & cd node_modules\oai-pmh & npm i

```

An easy fix is to install the [Ubuntu Console on Windows 10](https://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/). This way the linux command can run on Win32 platforms.


# How to run

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
function processRecord(item) {
    try {
        let titles = item.metadata['oai_dc:dc']['dc:title'];
        let title = (typeof titles == 'object' )?titles.join("\n"):titles;
        console.log(title);
        //console.dir(item.metadata['oai_dc:dc']);
    } catch(err) {
        // handle errors here
    }
};
```
