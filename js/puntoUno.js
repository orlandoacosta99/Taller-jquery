var porcentajeRiesgoProfecional = [1.25, 2.25, 3.25, 4.25, 5.25];

$(document).ready(function () {
    //Eleccion de la Hora de entrada y salida de turno
    $('input.timepicker').timepicker({});

    $('#txtSalario').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    $('#txtHoraEntrada').focus(function () {
        if (this.value != '') {
            return;
        }
        var instancia = M.Timepicker.getInstance(this);
        instancia.open();
    });

    $('#txtHoraSalida').focus(function () {
        if (this.value != '') {
            return;
        }
        var instancia = M.Timepicker.getInstance(this);
        instancia.open();
    });

    $('#btnCalcularSalario').click(function () {
        //Funcion para calcular el salario
        var salarioFinal;
        var valorRecargo;
        var salario = $('#txtSalario').val();
        var horaEntrada = $('#txtHoraEntrada').val();
        var horaSalida = $('#txtHoraSalida').val();
        var nivelRiesgoProfecional = $('#ddlLetraClave option:selected').val();
        var porcentajeHoras = 0;
        var valorjeSalud;
        var valorjePensCesantias;
        var valorNiveRiesgoProfecional = 0;

        if (salario == '') {
            alert('Debe ingresar un valor de salario.');
            return;
        }
        if (horaEntrada == '') {
            alert('Debe ingresar una hora de entrada.');
            return;
        }
        if (horaSalida == '') {
            alert('Debe ingresar una hora de salida.');
            return;
        }

        valorjeSalud = parseInt(salario) * 15 / 100;
        valorjePensCesantias = parseInt(salario) * 14.5 / 100;

        if (nivelRiesgoProfecional != '-1') {
            valorNiveRiesgoProfecional = parseInt(salario) * porcentajeRiesgoProfecional[parseInt(nivelRiesgoProfecional) - 1] / 100;
        }

        // Horas Extras

        if (horaEntrada === '08:00 AM' && horaSalida === '10:00 PM') {
            porcentajeHoras = 10 / 100;
        } else if (horaEntrada === '10:00 PM' && horaSalida === '06:00 AM') {
            porcentajeHoras = 20 / 100;
        }

        valorRecargo = salario * porcentajeHoras;

        salarioFinal = parseInt(salario) + valorRecargo - valorjeSalud - valorjePensCesantias - valorNiveRiesgoProfecional;

        $('#lblSalario').html(salarioFinal);
    });
});