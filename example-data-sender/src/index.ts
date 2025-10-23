import * as path from "path"
import * as http from "http"
import * as fs from "fs";
import { ConfigFile, ListenerData } from "@shared/index"

const configPath =  path.join(__dirname, '../..', 'config.json');
const configJSON: ConfigFile = JSON.parse(fs.readFileSync(configPath).toString());

const example_buffer: {[key: string]: any} = {};
Object.keys(configJSON.data_channels).map((key: string) => {
	example_buffer[key] = 0
});

const request_options = {
	hostname: configJSON.listen_hostname,
	port: configJSON.listen_port,
	path: '/data',
	method: 'POST'
};

setInterval(() => {
	const data: ListenerData = {
		data: {}
	}

	Object.keys(configJSON.data_channels).map((key: string) => {
		data.data[key] = [example_buffer[key]];
		example_buffer[key] += 1; 
	});

	const req = http.request(request_options);

	req.on('error', (e) => {
		console.error(`problem with request: ${e.message}`);
	});

	req.write(JSON.stringify(data));
	req.end();

	console.log("Sent data");
}, 500);

