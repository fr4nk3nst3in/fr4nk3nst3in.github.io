(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
    
     	var cols = [
     	
        	{ id : "date", alias : "date", columnRole: "dimension",  dataType : tableau.dataTypeEnum.date },
        	{ id : "open", alias : "open",  columnRole: "measure", dataType : tableau.dataTypeEnum.float  },
        	{ id : "high", alias : "high",  columnRole: "measure", dataType : tableau.dataTypeEnum.float },
        	{ id : "low", alias : "low", columnRole: "measure", dataType : tableau.dataTypeEnum.float },
        	{ id : "close", alias : "close",columnRole: "measure", dataType : tableau.dataTypeEnum.float },
        	{ id : "volume", alias : "volume",columnRole: "measure", dataType : tableau.dataTypeEnum.int }
    	];

    	var tableInfo = {
        	id : "alphavantage",
        	alias : "historical symbol data from alphavantage",
        	columns : cols
    	};

    	schemaCallback([tableInfo]);

    };

    myConnector.getData = function (table, doneCallback) {
		$.getJSON("http://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=RHT&apikey=KIO2ZPVEEHLOKGAZ", function(resp) {
        		var ds = resp['Time Series (Daily)'], tableData = [];
//TODO: Implement reading data and copy to tableDate

        		// Iterate over the JSON object
       		for (var i = 0, len = ds.length; i < len; i++) {
       		 		tableData.push({
       		 			"date" : ds[i].id,
//                		"id": feat[i].id,
//                		"mag": feat[i].properties.mag,
//                		"title": feat[i].properties.title,
//                		"lon": feat[i].geometry.coordinates[0],
//                		"lat": feat[i].geometry.coordinates[1]
            		});
        		}

        		table.appendRows(tableData);
        		doneCallback();
    	});
    };

    tableau.registerConnector(myConnector);
        // Create event listeners for when the user submits the form
    
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "alphavantage"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
    
})();