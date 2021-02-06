/**
 * 
 * @param {*} containerRef container reference
 */
function formTableAddRow(containerRef) {

	var containers = []
	if (containerRef?.content) {
		containers.push(table)
	} else if (typeof(containerRef) === 'string') {
		var containers = document.querySelectorAll(containerRef); // find table to append
	}

	// each container 
	for (container of containers) {

		// Table container
		if (container.nodeName === "TABLE") {

			// get template
			if (!container.dataset?.templateid) {
				console.log('templateId não definido')
				return false
			}
			template = document.getElementById(container.dataset.templateid)
			if (!template) {
				console.log('template ' + container.dataset.templateid + 'não existe')
				return false
			}
			var templateContent = template.content

			var rowCount = container.getAttribute("data-row-count");
	
			// copy children too
			var cloneRow = templateContent.cloneNode(true).children[0]; 
			
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
			container.setAttribute("data-row-count", parseInt(rowCount) + 1);
			
			cloneRow.style.display = "table-row"; // Show row
			cloneRow.id = container.id + "_row" + rowCount; // Id
			cloneRow.classList.add("form-table-row-container")
	
			// Incrementa ids
			var elementsToIncrementId = cloneRow.querySelectorAll('[id]');
			for (var i=0; i<elementsToIncrementId.length; i++) {
				elementsToIncrementId[i].id = container.id + "_" + 
					elementsToIncrementId[i].id + "_" + rowCount;
			}
			
			// Incrementa names
			var elementsToIncrementName = cloneRow.querySelectorAll('[name]');
			for (var i=0; i<elementsToIncrementName.length; i++) {
				var name = elementsToIncrementName[i].name;
				var char = name.indexOf("#");
				elementsToIncrementName[i].name = container.id + "_" + 
					name.replace("#", rowCount);
			}
			
			var elementsToEnabled = cloneRow.querySelectorAll('[disabled]');
			for (var i=0; i<elementsToEnabled.length; i++) {
				if (elementsToEnabled[i].getAttribute("data-keep-disabled") == null) {
					elementsToEnabled[i].disabled = false;  			
				}
			}
			
			// Armazena cada número de linha localmente.
			localStorage.setItem(container.id + 'RowCount', rowCount);
			
			container.appendChild(cloneRow); // add new row to end of table
	
		}
	}
}

/**
 * 
 * @param {*} actionElement action element reference
 */
function formTableDeleteRow(actionElement) {
	
    // até encontrar a table
    while (!actionElement.classList.contains("form-table")) {
        // aproveitando para encontrar a row container
        if (actionElement.classList.contains("form-table-row-container")) {
            var row = actionElement
        }
		var actionElement = actionElement.parentNode;
	}
    var table = actionElement

	var rowCount = table.getAttribute("data-row-count");
	
	table.setAttribute("data-row-count", parseInt(rowCount) - 1);

	var rowIndex = row.rowIndex;
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