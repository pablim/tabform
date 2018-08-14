<!DOCTYPE html>

<html lang="pt-br">
	<head>
		<meta charset="utf-8" />
		<title>Página HTML</title>


		<script type="text/javascript">
			
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

		</script>

		<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"> 
		<style type="text/css">
			
		</style>
	</head>
	<body>
		<table id="tabela" 
				class="w3-table w3-card-4 w3-bordered w3-striped" 
				data-row-count="1">
			<tr id="header">
				<th>Número</th>
				<th>Nome</th>
				<th>Sexo</th>
				<th>Ações</th>
			</tr>
			<tr class="w3-hover-grey" style="display: none">
				<td>	
					<div data-row-number></div>
		    	 	<input
		    			data-row-number 
		    			type="hidden" 
		    			disabled
		    			name="info[#][numero]">
				</td>
				<td>
					<input id="nome"
						disabled
						type="text" 
						class="w3-input" 
						name="info[#][nome]" 
						oninput="localStorage.setItem(this.id, this.value);"/>
				</td>
				<td>
					<select id="sexo"
							disabled
							class="w3-select" 
							onchange="localStorage.setItem(this.id, this.options[this.options.selectedIndex].value);">
						<option value="1">Masculino</option>
						<option value="2">Feminio</option>
					</select>
				</td>
				<td>
					<a 
							class="w3-button w3-teal" 
							onclick="deleteRow('tabela', this)">
						Excluir
					</a>
					<a class="w3-button w3-teal">Editar</a>
				</td>
			</tr>
		</table>
		<a class="w3-button w3-margin w3-teal" onclick="addRow('tabela')">+</a>

	</body>
</html>
