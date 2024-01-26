import { RequestParameters, ResponseCallback } from 'maplibre-gl';
import { FeatureCollection } from '@turf/turf';
import * as csv2geojson from 'csv2geojson';
import protocolPathParser from './protocolPathParser';
import getProtocolData from './getProtocolData';

async function convertCsv(filename: string, options: any ): Promise<FeatureCollection> {


	const geojson = await new Promise<FeatureCollection>((resolve, reject) => {
	
		const useOptions: any = options || {};
	   	const extension = filename.substring(filename.length -3)

						
		if(extension === 'tsv'){
			options.delimiter = '\t';
		}

		getProtocolData(filename).then((rawData) => {
		// Use the csv2geojson library to convert the CSV to GeoJSON	
		
		csv2geojson.csv2geojson(rawData, useOptions, (err: string, data: FeatureCollection) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	});

	return geojson;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CSVProtocolHandler = (params: RequestParameters, callback: ResponseCallback<any>) => {
	const parsedParams = protocolPathParser(params.url);

	convertCsv(parsedParams.filename, parsedParams.options).then((data) => {
		if (data !== undefined) {
			callback(null, data, null, null);
		} else {
			callback(new Error('CSV not found'));
		}
	});
	return { cancel: () => {} };
};

export { CSVProtocolHandler, convertCsv };