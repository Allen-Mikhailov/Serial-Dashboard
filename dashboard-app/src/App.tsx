import { useState, useEffect } from 'react'
import type { ListenerData, ConfigFile } from "@shared/index"
import { recentDataState } from './states';
import './App.css'
import TopBar from './components/TopBar';

function App() {
	const [configData, setConfigData] = useState<ConfigFile>();
	const [uuid, setUuid] = useState<string>("");
	const [recentData, setRecentData] = recentDataState.useState();

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
				.then(data => data.json())
				.then((jsonData: ListenerData) => {
				setRecentData(jsonData);	
			});
		}, 1000); // Calls every second

		return () => {
			clearInterval(fetchInterval);
		}
	}, []);


	
  return (
    <>
		<TopBar/>
    </>
  )
}

export default App
