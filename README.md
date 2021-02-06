# Form Table

    <template  id="pessoaRowData">
	    <!-- put only children in template -->
	    <tr  class="w3-hover-grey"  style="display: none">
		    <td>
			    <div  data-row-number></div>
			    <input
				    data-row-number
				    type="hidden"
				    disabled
				    name="info[#][numero]">
		    </td>
		    <td>
			    <input  id="nome"
				    disabled
				    type="text"
				    class="w3-input"
				    name="info[#][nome]"
				    oninput="localStorage.setItem(this.id, this.value);"/>
		    </td>
		    <td>
			    <select  id="sexo"
					    disabled
					    class="w3-select"
					    onchange="localStorage.setItem(this.id, this.options[this.options.selectedIndex].value);">
				    <option  value="1">Masculino</option>
				    <option  value="2">Feminio</option>
			    </select>
		    </td>
		    <td>
			    <a
					    class="w3-button w3-teal"
					    onclick="deleteRow('tabela', this)">
				    Excluir
			    </a>
			    <a  class="w3-button w3-teal">Editar</a>
		    </td>
	    </tr>
    </template>
    <table  id="tabela"
		    class="tableform w3-table w3-card-4 w3-bordered w3-striped"
		    data-templateId="pessoaRowData"
		    data-row-count="1">
	    <tr  id="header">
		    <th>Number</th>
		    <th>Nome</th>
		    <th>Sexo</th>
		    <th>Ações</th>
	    </tr>
    </table>

    <a class="w3-button w3-margin w3-teal" 
			onclick="tableFormAddRowTemplate('.form-table')">+</a>

In container expecify <code>data-row-count</code> attribute for counting start number.

Associate the tamplate row on the <code>data-templateId</code> attribute.

In the tamplate row identify the count elements of row with <code>data-row-count</code> attribute these can are a div element or input element or the both.

In the name attribute in input elements you can expecify # in array of data to indicate the number of data row <code>name="info[#][count]"</code>

Each row have a id composite for the id table plus "row" string and number of counting

[Edit on codepen](https://codepen.io/pablimvaz/pen/qBaLJNY)
