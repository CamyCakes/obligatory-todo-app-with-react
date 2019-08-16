import React from 'react';
import RenderedList from './RenderedList'

class TodoList extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			listTitles:[
				'Things I Must Do'
			],
			lists: [
				[
					{ 
						label: 'That one thing',
						isChecked: false,
					}, {
						label: 'Make some React components',
						isChecked: true,
					}, {
						label: 'Understand the meaning of reality',
						isChecked: false,
					}, {
						label: 'Survive',
						isChecked: false,
					}, {
						label: 'Be good',
						isChecked: true,
					}
				]			
			]
		}
	}

	newList() {
		let arr = [...this.state.lists];
		let titles = [...this.state.listTitles];
		titles.push( [
			'An Amazing New List'
		])
		arr.push( [{ 
			label: 'A New Thing',
			isChecked: false 
		}] );
		this.setState( ()=>{
			return { lists: arr, listTitles: titles }
		});
	}

	removeList( i ){
		let arr =[...this.state.lists];
		let titles=[...this.state.listTitles];
		arr.splice( i, 1 );
		titles.splice( i, 1 )
		this.setState( () => {
			return { lists: arr, listTitles: titles };
		});
	}

	updateList( updatedList, i = false ){
		let arr = [...this.state.lists];
		arr[i] = updatedList;
	
		this.setState( () => {
			return { lists: arr };
		});
	}
	
	updateTitle( newTitle, i ){
		let arr = [...this.state.listTitles];
		arr[i] = newTitle;
		this.setState(()=>{
			return { listTitles: arr }
		});
	}
	
	render() {

		let renderedLists = this.state.lists.map(( list, index ) => {
			return ( 
				<RenderedList 
					listTitle={ this.state.listTitles[index] }
					items={ list } 
					id={ index }
					key={ index } 
					update={ ( updatedList ) => { this.updateList( updatedList, index ) }}
					removeList={ ( i ) => { this.removeList( i ) } }
					updateTitle={ ( newTitle ) => { this.updateTitle( newTitle, index ) } }
				/> );
		})

		return (
			<div className="todo-lists">
				{ renderedLists }
				<div className="add-list-cont"
					onClick={ ()=>{
						this.newList();
					}}>
					<div className="todo-list-cont add-list">+</div>
				</div>
			</div>
		);
	}
}

export default TodoList;