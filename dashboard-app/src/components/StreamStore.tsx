import { useState, useEffect } from "react";
import { recentDataState } from "src/states";

function StreamStore({channel, data, setData}: {channel: string, data: [any], setData: any})
{
	const [recentData] = recentDataState.useState();
	useEffect(() => {
		if (recentData.data[channel] == undefined)
			return;

		setData([...data, ...recentData.data[channel]]);
	}, [recentData]);
	return <></>;
}

export default StreamStore
