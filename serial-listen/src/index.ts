import { SerialPort } from "serialport"
import { ReadlineParser } from "@serialport/parser-readline"
import { ListenerData } from "@shared/index"

import * as http from "http";
import * as path from "path"
import * as fs from "fs";

const serialPort = new SerialPort({
	path: 'COM3', // Replace with your serial port path (e.g., /dev/ttyUSB0 on Linux)
	baudRate: 9600, // Match the baud rate of your serial device
});


