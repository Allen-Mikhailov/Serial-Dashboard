import { SerialPort } from "serialport"
import { ReadlineParser } from "@serialport/parser-readline"

import * as http from "http";
import * as fs from "fs";

console.log("Testing");

const serialPort = new SerialPort({
	path: 'COM3', // Replace with your serial port path (e.g., /dev/ttyUSB0 on Linux)
	baudRate: 9600, // Match the baud rate of your serial device
});

const dir = "../../serial-dashboard-app/dist"

const hostname: string = '127.0.0.1'; // Localhost
const port = 3000; // Port to listen on

// Create an HTTP server
const server: http.Server = http.createServer((req, res) => {
  // Set the response header
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  console.log(req.url);

  let url = req.url;
  if (url == "/")
	url = "/index.html";

  // Send the response body
  res.end('Hello World!\n');
});

// Make the server listen on the specified port and hostname
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
