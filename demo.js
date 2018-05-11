const oaipmh = require('./my_modules/oai-pmh-harvester/oai-pmh-harvester.js');

// a valid data provider url
const dataProviderUrl = 'http://ciencipca.ipca.pt/oaiextended/request';

// instanciate a new harvester object
let harvester = new oaipmh.Harvester(dataProviderUrl);

// harvest data source passing a processing function
// harvester.harvest(processItem, function(err, res){
//     console.log(res);
// });





// This function will process each harvested record
async function processItem(item) {
    try {
        if(item.header.$ && item.header.$.status == "deleted") return item;
        let titles = item.metadata['oai_dc:dc']['dc:title'];
        let title = (typeof titles == 'object' )?titles.join("\n"):titles;
        console.log(title);
        return item; // return as Promise
    } catch(err) {
        throw err;
    }
};



async function main() {
    try {
        let recordCount = await harvester.harvest(processItem);
        console.log(recordCount);
    } catch(err) {
        //console.debug(err);
    }
}

main();