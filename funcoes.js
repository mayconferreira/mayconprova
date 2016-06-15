$(function(){

	var operacao = "A"; 
	var indice_selecionado = -1;
	var tbProduct = localStorage.getItem("tbProduct");

	tbProduct = JSON.parse(tbProduct); 
	if(tbProduct == null) 
		tbProduct = [];

	function Adicionar(){
		var prod = GetProduct("Name", $("#txtName").val());

		if(prod != null){
			alert("Produto ja cadastrado.");
			return;
		}

		var product = JSON.stringify({
			Name   : $("#txtName").val(),
			Price  : $("#txtPrice").val()
		});

		tbProduct.push(product);

		localStorage.setItem("tbProduct", JSON.stringify(tbProduct));

		alert("Produto adicionado.");
		return true;
	}

	function Editar(){
		tbProduct[indice_selecionado] = JSON.stringify({
			Name   : $("#txtName").val(),
			Price  : $("#txtPrice").val()
		});
		localStorage.setItem("tbProduct", JSON.stringify(tbProduct));
		alert("Produto editado.")
		operacao = "A";
		return true;
	}

	function Listar(){
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>"+
			"	<tr>"+
			"	<th></th>"+
			"	<th></th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		for(var i in tbProduct){
			var prod = JSON.parse(tbProduct[i]);
			$("#tblListar tbody").append("<tr>"+
				"	<td><img src='edit.png' alt='"+i+"' class='btnEditar'/><img src='delete.png' alt='"+i+"' class='btnExcluir'/></td>" + 
				"	<td>"+prod.Name+"</td>" + 
				"	<td>"+prod.Price+"</td>" +

				"</tr>");
		}
	}

	function Excluir(){
		indice_selecionado = parseInt($(this).attr("alt"));
		tbProduct.splice(indice_selecionado, 1);
		localStorage.setItem("tbProduct", JSON.stringify(tbProduct));
		alert("Produto Excluído.");
	}

	function GetProduct(propriedade, valor){
		var prod = null;
		for (var item in tbProduct) {
			var i = JSON.parse(tbProduct[item]);
			if (i[propriedade] == valor)
				prod = i;
		}
		return prod;
	}

	Listar();

	$("#frmProduct").on("submit",function(){
		if(operacao == "A")
			return Adicionar();
		else
			return Editar();		
	});

	$("#tblListar").on("click", ".btnEditar", function(){
		operacao = "E";
		indice_selecionado = parseInt($(this).attr("alt"));
		var prod = JSON.parse(tbProduct[indice_selecionado]);
		$("#txtName").val(prod.Name);
		$("#txtPrice").val(prod.Price);
		$("#txtName").attr("readonly","readonly");
	});

	$("#tblListar").on("click", ".btnExcluir", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		alert(indice_selecionado);
		Excluir();
		Listar();
	});
});