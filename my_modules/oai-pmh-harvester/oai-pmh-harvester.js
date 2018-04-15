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
