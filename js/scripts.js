// Esta función calcula la potencia estimada generada por energía undimotriz, usando una fórmula física, y muestra el resultado en la página web.
function calcularEnergiaUndimotriz() {
  // Obtiene los valores de los campos con id="altura" y id="periodo"
  // ParseFloat Convierte esos valores a números flotantes().
  // H representa la altura de la ola (en metros).
    const H = parseFloat(document.getElementById("altura").value);
  // T representa el período de la ola (tiempo entre olas, en segundos).
    const T = parseFloat(document.getElementById("periodo").value);
// La función isNaN() se usa para verificar si un valor NO es un número.
// NaN significa "Not-a-Number" (no es un número)
// Verifica que H y T sean números válidos y positivos.
    if (isNaN(H) || isNaN(T) || H <= 0 || T <= 0) {
        alert("Por favor, ingrese valores válidos"); // document.getElementById("Resultado").textContent = "Por favor, introduce valores válidos.";
        // Si no lo son, muestra una alerta o un mensaje de error y detiene la función (return).
        return;
    }

      const rho = 1025; // Densidad del agua del mar en kg/m³
      const g = 9.81;   // Aceleración gravitacional en m/s²
      // Calcula la potencia por metro de frente de ola en vatios (W/m).
      // Fórmula: P = (ρ * g² * H² * T) / (64 * π)
      const P = (rho * Math.pow(g, 2) * Math.pow(H, 2) * T) / (64 * Math.PI);
      //Muestra la potencia calculada con dos decimales usando P.toFixed(2) y escribe el texto e un elemento HTML con id="Resultado".
    document.getElementById("Resultado").textContent = "La potencia estimada es de " + P.toFixed(2) + " W/m";
    }
