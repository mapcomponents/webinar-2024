import { RequestParameters, ResponseCallback } from 'maplibre-gl';
import { FeatureCollection, Geometry, GeometryCollection, Properties } from '@turf/turf';
import osm2geojson from 'osm2geojson-lite';
import protocolPathParser from './protocolPathParser';
import getProtocolData from './getProtocolData';

async function convertOSM(params: { filename: string, options: osm2geojson.Options }): Promise<FeatureCollection> {

	const options = params.options || {};

	// Use the csv2geojson library to convert the CSV to GeoJSON
	const geojson = await new Promise<FeatureCollection>((resolve, reject) => {
		getProtocolData(params.filename).then((rawData) => {
			const newData: FeatureCollection<Geometry | GeometryCollection, Properties> = osm2geojson(
				rawData, 
				options
			) as FeatureCollection<Geometry | GeometryCollection, Properties>;

			if (!newData) {
				reject('Conversion failed');
			} else {
				resolve(newData);
			}
		});
	});

	return geojson;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OSMProtocolHandler = (params: RequestParameters, callback: ResponseCallback<any>) => {
	const parsedParams = protocolPathParser(params.url);

	convertOSM(parsedParams).then((data) => {
		if (data !== undefined) {
			callback(null, data, null, null);
		} else {
			callback(new Error('OSM File not found'));
		}
	});
	return { cancel: () => {} };
};

export { OSMProtocolHandler, convertOSM };
