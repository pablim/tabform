function addRow(table) {

	var table = document.getElementById(table); // find table to append to

	var row = table.rows[1]; // row model
	var rowCount = table.getAttribute("data-row-count");

  	var cloneRow = row.cloneNode(true); // copy children too

  	// Incrementa elementos de contagem.
	elementCount = cloneRow.querySelectorAll('[data-row-number]');
	for(var i=0; i<elementCount.length; i++) {
		if (elementCount[i] != null) {
			if (typeof elementCount[i].value === "undefined") {
				elementCount[i].innerHTML = parseInt(rowCount);
			}else {
	      		elementCount[i].value = parseInt(rowCount);
	      	}
		}
	}
  	table.setAttribute("data-row-count", parseInt(rowCount) + 1);
  	
  	cloneRow.style.display = "table-row"; // Show row
  	cloneRow.id = table + "row" + rowCount; // Id

  	// Incrementa ids
  	var elementsToIncrementId = cloneRow.querySelectorAll('[id]');
  	for (var i=0; i<elementsToIncrementId.length; i++) {
  		elementsToIncrementId[i].id = elementsToIncrementId[i].id + rowCount;
    }
  	
  	// Incrementa names
  	var elementsToIncrementName = cloneRow.querySelectorAll('[name]');
  	for (var i=0; i<elementsToIncrementName.length; i++) {
  		var name = elementsToIncrementName[i].name;
  		var char = name.indexOf("#");
  		elementsToIncrementName[i].name = name.replace("#", rowCount);
    }
  	
  	var elementsToEnabled = cloneRow.querySelectorAll('[disabled]');
  	for (var i=0; i<elementsToEnabled.length; i++) {
  		if (elementsToEnabled[i].getAttribute("data-keep-disabled") == null) {
  			elementsToEnabled[i].disabled = false;  			
  		}
    }
  	
  	// Armazena cada número de linha localmente.
  	localStorage.setItem(table.id + 'RowCount', rowCount);
  	
  	table.appendChild(cloneRow); // add new row to end of table
}

function deleteRow(table, obj) {

	var table = document.getElementById(table); // find table to append to

	while (obj.nodeName != "TR") {
		obj = obj.parentNode;
	}

	var rowCount = table.getAttribute("data-row-count");
	
  	table.setAttribute("data-row-count", parseInt(rowCount) - 1);

  	var rowIndex = obj.rowIndex;
	table.deleteRow(rowIndex);
	
	// Armazena cada número de linha localmente.
  	localStorage.setItem(table.id + 'RowCount', parseInt(rowCount)-1);

	// Começa da linha deletada
	for (i=rowIndex; i<table.rows.length; i++) {

		// Linhas depois da excluída
		var rowCountElement = table.rows[i].querySelector('[data-row-number]');
		if (rowCountElement != null) {
			if (typeof rowCountElement.value === "undefined") {
				rowCountElement.innerHTML = parseInt(rowCountElement.innerHTML) - 1;
			} else {
				rowCountElement.value = parseInt(rowCountElement.value) - 1;
			}
		}

	}
}