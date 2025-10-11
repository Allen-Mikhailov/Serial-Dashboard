import { useState, useEffect } from 'react'
import type { ListenerData, ConfigFile } from "@shared/index"
import './App.css'

function App() {
	const [configData, setConfigData] = useState<ConfigFile>();
	const [uuid, setUuid] = useState<string>("");

	useEffect(() => {
		// Generating UUID to use for communication
		// Not intended to be security
		const uuid: string = crypto.randomUUID();
		setUuid(uuid);


		// Getting config file	
		fetch("/config.json").then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json(); // Or .text(), .blob(), etc.
		}).then(data => setConfigData(data));

		// Setting the timeout
		const fetchInterval = setInterval(() => {
			fetch(`/get?client_id=${uuid}`)
		}, 1000); // Calls every second

		return () => {
			clearInterval(fetchInterval);
		}
	}, []);


	
  return (
    <>
    </>
  )
}

export default App
