// ================= DATOS =================
let ganado = JSON.parse(localStorage.getItem("ganado")) || [];
let cosecha = JSON.parse(localStorage.getItem("cosecha")) || [];
let ventas = JSON.parse(localStorage.getItem("ventas")) || [];

// ================= NAVEGACIÓN =================
function mostrar(pantalla) {
  document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("activa"));
  document.getElementById(pantalla).classList.add("activa");
}

function volver() {
  mostrar("menu");
}

// ================= GUARDAR =================
function guardarDatos() {
  localStorage.setItem("ganado", JSON.stringify(ganado));
  localStorage.setItem("cosecha", JSON.stringify(cosecha));
  localStorage.setItem("ventas", JSON.stringify(ventas));
}

// ================= RESUMEN =================
function actualizarResumen() {
  let totalGanado = ganado.reduce((acc, g) => acc + Number(g), 0);
  document.getElementById("resumenGanado").innerText = totalGanado;

  document.getElementById("resumenCosecha").innerText = cosecha.length;

  let totalVentas = ventas.reduce((acc, v) => acc + Number(v), 0);
  document.getElementById("resumenVentas").innerText = "$" + totalVentas;
}

// ================= GANADO =================
function agregarGanado() {
  let valor = parseInt(document.getElementById("inputGanado").value);

  if (isNaN(valor) || valor <= 0) {
    alert("Ingresá un número válido");
    return;
  }

  ganado.push(valor);
  guardarDatos();
  mostrarGanado();
  actualizarResumen();
  document.getElementById("inputGanado").value = "";
}

function mostrarGanado() {
  let lista = document.getElementById("listaGanado");
  let total = 0;

  lista.innerHTML = "";

  if (ganado.length === 0) {
    lista.innerHTML = "<li>No hay datos</li>";
  }

  ganado.forEach((g, i) => {
    total += Number(g);

    let li = document.createElement("li");
    li.innerHTML = `
      Corral ${i + 1}: ${g} animales
      <button onclick="eliminar('ganado', ${i})">❌</button>
    `;
    lista.appendChild(li);
  });

  document.getElementById("totalGanado").innerText = "Total: " + total;
}

// ================= COSECHA =================
function agregarCosecha() {
  let valor = document.getElementById("inputCosecha").value.trim();

  if (valor === "") {
    alert("Ingresá un dato válido");
    return;
  }

  cosecha.push(valor);
  guardarDatos();
  mostrarCosecha();
  actualizarResumen();
  document.getElementById("inputCosecha").value = "";
}

function mostrarCosecha() {
  let lista = document.getElementById("listaCosecha");
  lista.innerHTML = "";

  if (cosecha.length === 0) {
    lista.innerHTML = "<li>No hay datos</li>";
    return;
  }

  cosecha.forEach((c, i) => {
    let li = document.createElement("li");
    li.innerHTML = `
      ${c}
      <button onclick="eliminar('cosecha', ${i})">❌</button>
    `;
    lista.appendChild(li);
  });
}

// ================= VENTAS =================
function agregarVentas() {
  let valor = parseFloat(document.getElementById("inputMonto").value);

  if (isNaN(valor) || valor <= 0) {
    alert("Ingresá un monto válido");
    return;
  }

  ventas.push(valor);
  guardarDatos();
  mostrarVentas();
  actualizarResumen();
  document.getElementById("inputMonto").value = "";
}

function mostrarVentas() {
  let lista = document.getElementById("listaVentas");
  let total = 0;

  lista.innerHTML = "";

  if (ventas.length === 0) {
    lista.innerHTML = "<li>No hay ventas</li>";
  }

  ventas.forEach((v, i) => {
    total += Number(v);

    let li = document.createElement("li");
    li.innerHTML = `
      $${v}
      <button onclick="eliminar('ventas', ${i})">❌</button>
    `;
    lista.appendChild(li);
  });

  document.getElementById("totalVentas").innerText = "Total: $" + total;
}

// ================= ELIMINAR =================
function eliminar(tipo, index) {
  if (tipo === "ganado") {
    ganado.splice(index, 1);
    mostrarGanado();
  }

  if (tipo === "cosecha") {
    cosecha.splice(index, 1);
    mostrarCosecha();
  }

  if (tipo === "ventas") {
    ventas.splice(index, 1);
    mostrarVentas();
  }

  guardarDatos();
  actualizarResumen();
}

// ================= INICIO =================
mostrarGanado();
mostrarCosecha();
mostrarVentas();
actualizarResumen();