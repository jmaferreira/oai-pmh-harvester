const OaiPmhModule = require('oai-pmh');
const debug = require('debug')('harvester')

class OaiPmhHarvester {

    constructor(dataProviderUrl, metadataPrefix = 'oai_dc') {
        this.dataProviderUrl = dataProviderUrl;
        this.metadataPrefix = metadataPrefix;
    }

    async harvest(processItemFunc, callback) {
        if(callback) {
            this.harvestAsync(this.dataProviderUrl, processItemFunc, callback);
        } else {
            return this.harvestAsync(this.dataProviderUrl, processItemFunc);
        }        
    }

    async harvestAsync(dataProviderUrl, itemProcessingFunction, callback) {
        debug(`harvesting ${dataProviderUrl}`)
        let counter = 0;

        let oaiPmh = new OaiPmhModule.OaiPmh(dataProviderUrl);
        let iterator = oaiPmh.listRecords( {'metadataPrefix': this.metadataPrefix} );

        for (const next of iterator) {
            const item = await next;
            let record = await itemProcessingFunction(item);
            counter++;
        }
        if(callback) {
            return callback(null, counter);
        } else {
            return counter; // return promisse
        }
    }
}

module.exports.Harvester = OaiPmhHarvester;
