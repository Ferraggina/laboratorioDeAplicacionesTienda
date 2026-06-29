// Wrappers de SweetAlert2 — centraliza configuración de toasts y diálogos

export function toast(mensaje, icono = 'success') {
  Swal.fire({
    toast:            true,
    position:         'bottom-end',
    icon:             icono,
    title:            mensaje,
    showConfirmButton: false,
    timer:            2500,
    timerProgressBar: true,
  });
}

export function confirm(mensaje) {
  return Swal.fire({
    title:              '¿Estás seguro?',
    text:               mensaje,
    icon:               'warning',
    showCancelButton:   true,
    confirmButtonText:  'Sí, continuar',
    cancelButtonText:   'Cancelar',
    confirmButtonColor: '#dc3545',
  }).then(result => result.isConfirmed);
}

export function success(mensaje) {
  return Swal.fire({
    title:            '¡Listo!',
    text:             mensaje,
    icon:             'success',
    confirmButtonText: 'Aceptar',
  });
}
