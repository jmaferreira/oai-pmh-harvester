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
const OaiPmhModule = require('oai-pmh');
const debug = require('debug')('harvester')


class OaiPmhHarvester {

    constructor(dataProviderUrl, metadataPrefix = 'oai_dc') {
        this.dataProviderUrl = dataProviderUrl;
        this.metadataPrefix = metadataPrefix;
    }


    harvest(processItemFunc, callback) {
        this.harvestAsync(this.dataProviderUrl, processItemFunc, callback);
    }


    async harvestAsync(dataProviderUrl, itemProcessingFunction, callback) {    
        debug(`harvesting ${dataProviderUrl}`)
        let counter = 0;

        let oaiPmh = new OaiPmhModule.OaiPmh(dataProviderUrl);
        let iterator = oaiPmh.listRecords( {'metadataPrefix': this.metadataPrefix} );
    
        for (const next of iterator) {
            const item = await next;
            itemProcessingFunction(item);
        }
        callback(null, "done");
    }


}

module.exports.Harvester = OaiPmhHarvester;
