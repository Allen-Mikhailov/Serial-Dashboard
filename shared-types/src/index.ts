import { SerialPort } from "serialport"
import { ReadlineParser } from "@serialport/parser-readline"

import * as http from "http";
import * as path from "path"
import * as fs from "fs";

interface ListenerData {
	data: {[key: string]: any}	
}

interface ConfigFile {
	listen_port: number;
	serve_port: number;
	data_channels: {[key: string]: {
		"type": string;	
	}};
}

type StreamData = [any]

export { ListenerData, ConfigFile, StreamData }
