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
        let error = null;

        let oaiPmh = new OaiPmhModule.OaiPmh(dataProviderUrl);

        let iterator = oaiPmh.listRecords( {
        'metadataPrefix': this.metadataPrefix,
        //'from': '2018-05-10T13:08:10Z',
        //'until': '2018-05-14T13:08:10Z'
        });


        try {
            for (const next of iterator) {
                const item = await next;
                let record = await itemProcessingFunction(item);
                counter++;
            }

        } catch(err) {
            error = err;
        } 

        if(callback) {
            return callback(error, counter);
        } else {
          if(error) {
              throw error;
          } else {
            return counter; // return promisse
          }
        }
    }
}

module.exports.Harvester = OaiPmhHarvester;
