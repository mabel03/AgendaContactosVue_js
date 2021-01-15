$(document).ready(function () {
	$('#telefono').mask('000-000-0000');
});
let txtNombre = document.getElementById('txtNombre');
txtNombre.focus();

const app = new Vue({
	el: '#appAgenda',
	data() {
		return {
			buscarNombre: null,
			titulo: 'Agenda Telefonbuch',
			contactos: [],
			DatosNombre: '',
			DatosApellido: '',
			DatosTelefono: '',
			DatosEmail: '',
			DatosDireccion: '',
			seleccionado: false,
		};
	},
	////// Buscar contactos en la agenda.
	  computed: {
		filteredResources (){
			if(this.buscarNombre){
				return this.contactos.filter((item)=>{return this.buscarNombre.toLowerCase().split(' ').every(v => item.nombre.toLowerCase().includes(v));
				})
				}else{
				  return this.contactos;
				}
		}
	  },
		
	methods: {	
		mostrarContacto: function (index) {
			if (this.DatosNombre === '') {
				document.getElementById('boton-submit').disabled = true;
				this.contactos[index].seleccionado = true;
				this.DatosNombre = this.contactos[index].nombre;
				this.DatosApellido= this.contactos[index].apellido;
				this.DatosTelefono= this.contactos[index].telefono;
				this.DatosEmail= this.contactos[index].email;
				this.DatosDireccion= this.contactos[index].direccion;
			} else {
				this.editarContacto(index);
				this.contactos[index].seleccionado = false;
				document.getElementById('boton-submit').disabled = false;
			}
		},

		limpiar: function () {
			this.DatosNombre = '';
			this.DatosApellido = '';
			this.DatosTelefono = '';
			this.DatosEmail = '';
			this.DatosDireccion = '';
		},

		////// Insertar contactos en la agenda.
		agregarContacto: function () {
			if (
				this.DatosNombre === '' || this.DatosApellido === '' ||	this.DatosTelefono === '' || this.DatosEmail === '' || this.DatosDireccion === ''
			) 
			{
				alert('¡Todos los campos son requeridos!');
			} 
			
			else {
				this.contactos.push({
					nombre: this.DatosNombre,
					apellido: this.DatosApellido,
					telefono: this.DatosTelefono,
					email: this.DatosEmail,
					direccion: this.DatosDireccion,
				});

				this.limpiar();
				localStorage.setItem('agenda-pro', JSON.stringify(this.contactos));
				let txtNombre = document.getElementById('txtNombre');
				txtNombre.focus();
			}
		},

		///// Mostrar contactos de la agenda.

		mostrarContacto: function (index) {
			if (this.DatosNombre === '') {
				document.getElementById('boton-submit').disabled = true;
				this.contactos[index].seleccionado = true;
				this.DatosNombre = this.contactos[index].nombre;
				this.DatosApellido= this.contactos[index].apellido;
				this.DatosTelefono= this.contactos[index].telefono;
				this.DatosEmail= this.contactos[index].email;
				this.DatosDireccion= this.contactos[index].direccion;
			} else {
				this.editarContacto(index);
				this.contactos[index].seleccionado = false;
				document.getElementById('boton-submit').disabled = false;
			}
		},

		///// Editar contactos de la agenda.
		editarContacto: function (index) {
			this.contactos[index].nombre = this.DatosNombre;
			this.contactos[index].apellido= this.DatosApellido;
			this.contactos[index].telefono = this.DatosTelefono;
			this.contactos[index].email= this.DatosEmail;
			this.contactos[index].direccion = this.DatosDireccion;
			this.btnEdicion = 'Editar';
			this.limpiar();

			localStorage.setItem('agenda-pro', JSON.stringify(this.contactos));
		},

		///// Eliminar contactos de la agenda.
		eliminar: function (index) {
			this.contactos.splice(index, 1);
			localStorage.setItem('agenda-pro', JSON.stringify(this.contactos));
		},
	},

	/////// Guardar contactos de la agenda en el local.
	created: function () {
		let datosDB = JSON.parse(localStorage.getItem('agenda-pro'));
		console.log(datosDB);

		if (datosDB === null) {
			this.contactos = [];
		} else {
			this.contactos = datosDB;
		}
	},


});
