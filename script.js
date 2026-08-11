function iterateRecords(data) {
	console.log("Data returned: "+JSON.stringify(data));
	var records = data.result.records;
	Object.entries(records).forEach(([key, value]) => {
		var recordTitle = value["Title"];
		var recordLink = value["Link"];
		var recordDescription = value["Description"];
		if(recordTitle && recordLink && recordDescription) {
			
				$("#records").append(
					$('<section class="record">').append(
						$('<h2>').text(recordTitle),
						$('<a>').attr("href", recordLink).text(recordLink),
						$('<p>').text(recordDescription)
					)
				);
		}
	});

}

$(document).ready(function() {
	var data = {};
	/* 
	* Connecting to datasets on data.qld.gov.au
	* Base URL searches the datastore for the specified data resource (resource_id)
	* You will need the resource_id for the dataset you want to access
	*/
	const apiURL = "https://www.data.qld.gov.au/api/3/action/datastore_search";
	const requestParams = {
		resource_id: "9eaeeceb-e8e3-49a1-928a-4df76b059c2d", //the id of the dataset we want to access
		limit: 50 // the number of records to return
	}
	const queryString = new URLSearchParams(requestParams).toString(); //slightly convoluted way to construct the URL but can avoid typos
	const fullURL = apiURL + "?" + queryString;
	console.log("URL: " + fullURL);
	
	fetch(fullURL)
		.then(response => response.json())
		.then(data => iterateRecords(data))
		.catch(error => console.error("Error fetching data:", error));
	

});