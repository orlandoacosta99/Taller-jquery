/**
 * @description: Funcion de calcular total iva con descuento.
 */
function calcularTotalIvaConDescuento(onBlurActivado) {
    var valorIngresado;
    var porcentajeIva;
    var valorIvaGenerado;
    var valorDescuentoIva;

    valorIngresado = $('#txtValor').val();
    porcentajeIva = $('#lblIva').html().replace('%', '');

    if (!onBlurActivado) {
        if (valorIngresado === '') {
            alert('Debe ingresar un valor.');
            $('#txtValor').focus();
            return;
        } else if (!/^[0-9]+$/g.test(valorIngresado)) {
            alert('Debe ingresar un valor numerico.');
            $('#txtValor').focus();
            return;
        }
    }
    valorIvaGenerado = calcularValorIva(valorIngresado, porcentajeIva, onBlurActivado);
    valorDescuentoIva = calcularDescuento(valorIvaGenerado, onBlurActivado);


    $('#lblSubTotal').text(valorIngresado);

    $('#lblTotal').text(parseInt(valorIngresado) + parseInt(valorIvaGenerado) - valorDescuentoIva);

    if (!onBlurActivado) {
        $('#divResultado').show('fast');
        $('#divBontonAceptar').hide('fast');
    }
}

/**
 * Función que se en cargar de calcular el valor del IVA
 */
function calcularValorIva(valor, iva, onBlurActivado) {
    var valorIvaCalulado;

    valorIvaCalulado = parseInt(valor * (iva / 100));

    if (!onBlurActivado) {
        $('#lblValorIva').text(valorIvaCalulado);
    }

    return valorIvaCalulado;
}

/**
 * Función que se en cargar de calcular el descuento del IVA

 */
function calcularDescuento(valorIva, onBlurActivado) {
    var valorDescuentoCalculador;
    var descuento;

    if (valorIva >= 1000 && valorIva <= 2000) {
        descuento = 2;
        valorDescuentoCalculador = parseInt(valorIva * (descuento / 100));
    } else if (valorIva > 2000 && valorIva <= 5000) {
        descuento = 6;
        valorDescuentoCalculador = parseInt(valorIva * (descuento / 100));
    } else if (valorIva > 5000) {
        descuento = 6;
        valorDescuentoCalculador = parseInt(valorIva * (descuento / 100))
    }

    if (descuento != undefined) {
        $('#lblDescuento').text('%' + descuento);
    } else {
        $('#lblDescuento').text('Sin descuento');
    }

    if (onBlurActivado) {
        $('#divDescuento').show('slow');
        $('#divBontonAceptar').show('slow');
    }

    if (valorDescuentoCalculador != undefined) {
        $('#lblValorDescuentoIVA').text('-' + valorDescuentoCalculador);
    } else {
        $('#lblValorDescuentoIVA').text(0);
    }

    if(valorDescuentoCalculador === undefined){
        valorDescuentoCalculador = 0;
    }

    return valorDescuentoCalculador;
}