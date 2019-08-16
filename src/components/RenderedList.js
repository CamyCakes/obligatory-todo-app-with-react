import React from 'react';

class RenderedLists extends React.Component {

	itemBeingDragged = null;

	setDraggedItem(i) {
		this.itemBeingDragged = { 
			index: i, 
			value: this.props.items[i]
		};
	}

	resetDraggedItem(){
		this.itemBeingDragged = null;
	}

	dragEnter( dropZone ) {
		let draggedIndex = this.itemBeingDragged.index;
		let draggedVal = this.itemBeingDragged.value;
		let arr = [...this.props.items];

		if( draggedIndex === dropZone )
			return arr;

		if( draggedIndex > dropZone ){ 
			arr[dropZone + 1] = arr[dropZone];
			arr[dropZone] = draggedVal;	
		}else{
			arr[dropZone - 1] = arr[dropZone];
			arr[dropZone] = draggedVal;
		}
		this.itemBeingDragged.index = dropZone;
		return arr;
	}

	checkItem( i ) {
		let arr = [...this.props.items];
		arr[i].isChecked = !arr[i].isChecked;
		return arr;
	}

	editItem( i, newLabel ) {
		let arr = [...this.props.items];
		arr[i].label = newLabel;
		return arr;
	}

	removeItem( i ) {
		let arr = [...this.props.items];
		arr.splice( i, 1 );
		return arr;
	}

	newItem(){
		let arr = [...this.props.items];
		arr.push( { label:'A new thing', isChecked: false } )
		return arr;
	}
	
	render() {
		let updateList = this.props.update;
		let renderedItems = this.props.items.map(( item, index ) => {

			let checked = item.isChecked ? 'checked' : '';
			let disabled = item.isChecked ? 'disabled' : '';

			return (
				<li className={ checked }
					key={ index }
					draggable='true'
					onDragStart={ () => { this.setDraggedItem( index ) }}
					onDragOver={ (e) => { e.preventDefault() }}
					onDragEnter={ ()=>{ updateList( this.dragEnter( index )) }}
					onDrop={ ()=> { this.resetDraggedItem() } }
				>
				
					<div contentEditable={ disabled }
						className='item-label-input'
						type='text'
						onChange={ (e) => { updateList( this.editItem( index, e.target.value )) }}
					>{ item.label }</div>
					<div className="item-controls">
						<input type='checkbox'
							onChange={ () => { updateList( this.checkItem( index ) ) }}
							checked={ checked }
						/>
						<div className='remove-item'
							onClick={ () => { updateList( this.removeItem( index )) }}
						>&times;</div>
					</div>
				</li >
			)
		})

		return (
			<div className='todo-list-cont'>
				
				<div className="card-controls">
					<input 
						className='search' 
						value={ this.props.listTitle } 
						type='text' 
						onChange={ (e)=>{ this.props.updateTitle( e.target.value ) }}
					/>
					<div className='close-card-button'
						onClick={ () => { this.props.removeList( this.props.id ) }}>
							&times;
						</div>
				</div>

				<div className='item-list'>
					{ renderedItems }
				</div>

				<li className='new-item'>
					<div className='item-label-input'
						onClick={ ()=> { updateList( this.newItem() ) }}
					>+</div>
				</li>

			</div>
		);
	}
}

export default RenderedLists;