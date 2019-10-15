<template>
	<div class="container">
		<h1>Notes</h1>
		<b-alert
			:show="dismissCountDown"
			dismissible
			:variant="message.color"
			@dismissed="dismissCountDown=0"
			@dismiss-count-down="countDownChanged">
			{{ message.text }}
		</b-alert>

		<form @submit.prevent="addNote()">
			<h3>Agregar nueva nota</h3>
			<input type="text" class="form-control my-2" placeholder="Nombre" v-model="note.name">
			<input type="text" class="form-control my-2" placeholder="Descripcion" v-model="note.description">
			<b-button class="btn-success mb-2 btn-block" type="submit">Agregar</b-button>
		</form>

		<table class="table">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Name</th>
					<th scope="col">Description</th>
					<th scope="col">Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in notes" :key="index">
					<th scope="row">{{ item._id }}</th>
					<td>{{ item.name }}</td>
					<td>{{ item.description }}</td>
					<td>
						<b-button @click='removeNote(item._id)' class="btn-danger">Eliminar</b-button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	data () {
		return {
			notes: [],
			dismissSecs: 5,
			dismissCountDown: 0,
			message: {color: '', text: ''},
			note: {name: '', description: ''}
		}
	},
	created () {
		this.listNotes()
	},
	methods: {
		addNote (e) {
			this.axios.post('/note', this.note)
				.then(res => {
					this.notes.push(res.data)
					this.note.name = ''
					this.note.description = ''
					this.showAlert('success', 'Nota agregada')
				})
				.catch(e => {
					console.error(e.response.data.err)
					this.showAlert('danger', e.response.data.err.message)
				})
		},
		removeNote (id) {
			this.axios.delete(`/note/${id}`)
				.then(res => {
					const index = this.notes.findIndex(item => item._id === res.data._id)
					this.notes.splice(index, 1)
					this.showAlert('success', 'Nota eliminada')
				})
				.catch(err => console.error(err.response))
		},
		listNotes () {
			this.axios.get('/note')
				.then(res => {
					this.notes = res.data
				})
				.catch(err => console.error(err.response))
		},
		countDownChanged (dismissCountDown) {
			this.dismissCountDown = dismissCountDown
		},
		showAlert (color, text) {
			this.message.color = color
			this.message.text = text
			this.dismissCountDown = this.dismissSecs
		}
	}
}
</script>