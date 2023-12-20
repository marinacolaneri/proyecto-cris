var data; // Variable global para almacenar los datos cargados desde piesas.json
var remittanceNumber = 1; // Initialize the remittance number

document.getElementById('generar remito').addEventListener('click', function () {
  // Logic to generate the remittance number
  var generatedRemittanceNumber = remittanceNumber; // Use the current remittance number
  remittanceNumber++; // Increment the remittance number for the next remittance
  alert('Remittance generated. Remittance number: ' + generatedRemittanceNumber);
  var remitoInfo = {
    remittanceNumber: generatedRemittanceNumber,
    // Otros detalles del remito que deseas almacenar
  };
  localStorage.setItem('remitoInfo', JSON.stringify(remitoInfo));


  // Clear the form fields
  document.getElementById('pieza').value = '';
  document.getElementById('cantidad').value = '';

  // Clear the table rows
  document.querySelector('#piece-details tbody').innerHTML = '';

  // Reset the total
  updateTotal();
});


document.getElementById('pieza').addEventListener('change', function () {
  var selectedPieza = this.value;

  // Cargar el archivo piesas.json
  fetch('piesas.json')
    .then((response) => response.json())
    .then((jsonData) => {
      data = jsonData; // Almacenar los datos globalmente
      var imagenPieza = document.getElementById('imagen-pieza');
      var pesoPieza = document.getElementById('peso-pieza');

      // Establecer la imagen y el peso correspondiente según la pieza seleccionada
      imagenPieza.src = data[selectedPieza].image;
      pesoPieza.textContent = 'Peso: ' + data[selectedPieza].peso + ' kg';
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  var selectedPieza = document.getElementById('pieza').value;
  var cantidad = document.getElementById('cantidad').value;

  // Get the table body to append a new row
  var tableBody = document.querySelector('#piece-details tbody');

  // Create a new row with the selected pieza details
  var newRow = document.createElement('tr');
  var totalKg = data[selectedPieza].peso * cantidad;
  newRow.setAttribute('data-total-kg', totalKg); // Almacenar el valor del peso total en un atributo
  newRow.innerHTML = `
      <td>${tableBody.children.length + 1}</td>
      <td>${selectedPieza}</td>
      <td><img src="${data[selectedPieza].image}" alt="Imagen de la Pieza"></td>
      <td class="cantidad">${cantidad}</td>
      <td>${data[selectedPieza].peso} kg</td>
      <td>${totalKg.toFixed(2)} kg</td>
      <td>${document.getElementById('colada').value}</td>
      <td>${document.getElementById('fecha').value}</td>
      <td><button class="editar">Editar</button></td>
      <td><button class="eliminar">Eliminar</button></td>
    `;

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Recalculate and update the total
  updateTotal();

  // Reset the form fields
  document.getElementById('pieza').value = '';
  document.getElementById('cantidad').value = '';
});

document.querySelector('#piece-details tbody').addEventListener('click', function (event) {
  var target = event.target;

  if (target.classList.contains('editar')) {
    // Obtener la fila del botón "Editar" clicado
    var row = target.closest('tr');
    var cantidadCell = row.querySelector('.cantidad'); // Celda de la cantidad
    var cantidadValue = cantidadCell.textContent.trim(); // Valor actual de la cantidad

    // Reemplazar la celda de cantidad con un campo de entrada editable
    cantidadCell.innerHTML = `<input type="number" value="${cantidadValue}" id="edit-cantidad" min="0" />`;

    // Agregar un botón "Guardar" para confirmar la edición
    var guardarButton = document.createElement('button');
    guardarButton.textContent = 'Guardar';
    guardarButton.classList.add('guardar');
    cantidadCell.appendChild(guardarButton);

    // Deshabilitar otros botones de editar en la tabla
    row.querySelectorAll('.editar').forEach(function (editarButton) {
      editarButton.disabled = true;
    });
  } else if (target.classList.contains('guardar')) {
    // Obtener la fila del botón "Guardar" clicado
    var row = target.closest('tr');
    var cantidadInput = row.querySelector('#edit-cantidad'); // Campo de entrada editable
    var cantidadValue = cantidadInput.value; // Nuevo valor de la cantidad

    // Restaurar la celda de cantidad con el nuevo valor
    var cantidadCell = row.querySelector('.cantidad');
    cantidadCell.textContent = cantidadValue;

    // Recalcular y actualizar el total después de la edición
    updateTotal();

    // Habilitar nuevamente los botones de editar en la fila
    row.querySelectorAll('.editar').forEach(function (editarButton) {
      editarButton.disabled = false;
    });
  }
});

// Agregar un listener para el evento de cambio en el campo de entrada editable
document.querySelector('#piece-details tbody').addEventListener('input', function (event) {
  var target = event.target;

  if (target.classList.contains('cantidad')) {
    // Si el cambio ocurrió en la celda de cantidad, recalcular el total
    updateTotal();
  }
});

function updateTotal() {
  var total = 0;
  var tableRows = document.querySelectorAll('#piece-details tbody tr');

  tableRows.forEach(function (row) {
    var cantidadCell = row.querySelector('.cantidad');
    var cantidadValue = cantidadCell.textContent.trim();
    var totalKg = parseFloat(row.getAttribute('data-total-kg'));

    if (!isNaN(totalKg)) {
      total += totalKg;
    }

    // Actualizar el total en la fila
    row.querySelector('td:nth-child(6)').textContent = totalKg.toFixed(2) + ' kg';
  });

  // Actualizar el total en el pie de la tabla
  var totalRemitoElement = document.getElementById('total-remito');
  totalRemitoElement.textContent = 'Total Remito: ' + total.toFixed(2) + ' kg';
}
document.getElementById('atras').addEventListener('click', function () {
  window.history.back();
});


document.getElementById('eliminar-remito').addEventListener('click', function () {
  // Lógica para eliminar el remito
  // Puedes utilizar la función updateTotal() para restablecer el total a 0
  document.querySelector('#piece-details tbody').innerHTML = ''; // Limpiar la tabla
  updateTotal();
});

document.getElementById('compartir').addEventListener('click', function () {
  // Lógica para compartir
});

document.getElementById('imprimir').addEventListener('click', function () {
  // Lógica para imprimir
});
// Logic to confirm the remito and generate the remito number
// Logic to confirm the remittance and generate the remittance number
// Logic to confirm the remittance and generate the remittance number
function confirmRemittance() {
  // Other logic for confirming the remittance
  var selectedRemittanceNumber = remittanceNumber; // Use the current remittance number
  remittanceNumber++; // Increment the remittance number for the next remittance
  alert('Remittance confirmed. Remittance number: ' + selectedRemittanceNumber);
}
// Recuperar el valor actual de remittanceNumber desde localStorage
var remittanceNumber = parseInt(localStorage.getItem('remittanceNumber')) || 1;

document.getElementById('generar-remito').addEventListener('click', function () {
  // Lógica para generar el remito
  var generatedRemittanceNumber = remittanceNumber; // Utilizar el valor actual de remittanceNumber
  remittanceNumber++; // Incrementar el valor para el próximo remito

  // Guardar el valor actualizado en localStorage
  localStorage.setItem('remittanceNumber', remittanceNumber);



  alert('Remittance generated. Remittance number: ' + generatedRemittanceNumber);

  // Obtener la lista actual de remitos desde localStorage
  var remitosList = JSON.parse(localStorage.getItem('remitosList')) || [];

  // Agregar el nuevo remito a la lista
  remitosList.push({
    remittanceNumber: generatedRemittanceNumber,
    // Otros detalles del remito que deseas almacenar
  });

  // Guardar la lista actualizada en localStorage
  localStorage.setItem('remitosList', JSON.stringify(remitosList));


});

// Lógica para confirmar el remito y generar el número de remito
function confirmRemittance() {
  // Otra lógica para confirmar el remito
  var selectedRemittanceNumber = remittanceNumber; // Utilizar el valor actual de remittanceNumber
  remittanceNumber++; // Incrementar el valor para el próximo remito
  alert('Remittance confirmed. Remittance number: ' + selectedRemittanceNumber);
}

// Otras funciones y lógica...

// Evento que se dispara cuando se selecciona un remito en baja.html
document.getElementById('remitoSelect').addEventListener('change', function () {
  var selectedIndex = this.value;
  var remitosList = JSON.parse(localStorage.getItem('remitosList')) || [];

  if (remitosList[selectedIndex]) {
    // Aquí puedes usar remitosList[selectedIndex] para acceder a los detalles del remito seleccionado
    console.log('Detalles del Remito:', remitosList[selectedIndex]);
  }
});


