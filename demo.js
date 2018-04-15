/**
 * Copyright 2018 Miguel Ferreira
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the "Software"), to deal 
 * in the Software without restriction, including without limitation the rights 
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
 * of the Software, and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all 
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN 
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const oaipmh = require('./my_modules/oai-pmh-harvester/oai-pmh-harvester.js');


// a valid data provider url
const dataProviderUrl = 'http://ciencipca.ipca.pt/oaiextended/request';

// instanciate a new harvester object
let harvester = new oaipmh.Harvester(dataProviderUrl);

// harvest data source passing a processing function
harvester.harvest(processItem, function(err, res){
    console.log(res);
});



// This function will process each harvested record
function processItem(item) {
    try {
        let titles = item.metadata['oai_dc:dc']['dc:title'];
        let title = (typeof titles == 'object' )?titles.join("\n"):titles;
        console.log(title);
        //console.dir(item.metadata['oai_dc:dc']);
    } catch(err) {
        // handle errors here
    }
};
