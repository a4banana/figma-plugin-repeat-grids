/// <reference types="@figma/plugin-typings" />

import clone from './util/clone'

export enum ActionTypes {
	REPEAT_GRIDS = 'REPEAT_GRIDS'
}

enum ResizeDirection {
	HORIZONTAL = 'HORIZONTAL',
	VERTICAL = 'VERTICAL',
	NONE = 'NONE'
}

interface Prop {
	type: ActionTypes
}

type Interval = ReturnType<typeof setInterval>
type Selection = readonly SceneNode[]

const gap = 8;
const tolerance = 5;

/*
	1. select current node
	select current node
	( if Multiple nodes >> ) **

	set frame
	watch resize
		>> figma has no resize event
		>> create custom resize event with interval
		.. check user 'isResizing' event handler

	duplicate selected
	end resize
	select none
*/

// Dispatcher
function dispatch({ type }: Prop ) {
	switch( type ) {
		case ActionTypes.REPEAT_GRIDS:
			// const selection = getSingleSelection()
			const selection = getSelection( figma.currentPage.selection )
			const repeatGridFrame = createRepeatGridFrame( selection )
			// const repeatGridFrame = createRepeatGridFrame( selection )
			// console.log( clone( selection.fills! ) )
			
			// const { height } = selection
			
			figma.currentPage.selection = [ repeatGridFrame ]
			
			/*
			const originalSize = new Proxy({ width: repeatGridFrame.width, height: repeatGridFrame.height }, {})
			const interval: ReturnType<typeof setInterval> = setInterval( ()=> {
				const hasGap = testHeightAndItem( repeatGridFrame.height, height + gap, repeatGridFrame.children.length )
				if ( hasGap ) { repeatNode( repeatGridFrame, selection ) }

			}, 50 )
			*/
			break;

		default:
			throw new Error( "There's no action type " + type )
	}
}

const watch = ( fn: () => void ): Interval => {
	const interval: Interval = setInterval(() => { fn() }, 50)
	return interval
}

const unwatch = ( interval: Interval ): void => {
	clearInterval( interval )
}

const repeatNode = ( parent: FrameNode, node: SceneNode ): void => {
	parent.appendChild( node.clone() )
}

const testHeightAndItem = ( frameHeight, itemHeight, count ): boolean => {
	const len = frameHeight - ( itemHeight * count )
	return ( len > tolerance ) ? true : false
}

function getSelection( selection: Selection ): SceneNode {
	return hasMultipleSelection( selection ) ? getGroupSelection( selection, selection[0].parent! ) : getSingleSelection( selection )
}

const hasMultipleSelection = ( selection: Selection ): boolean => {
	return ( selection.length > 1 ) ? true : false
}

const getGroupSelection = ( selection: Selection, parent: BaseNode & ChildrenMixin ): SceneNode => {
	const clone = selection.slice()
	const group = figma.group( clone, parent )
	/*
		// const minX = Math.min( ...clone.map( node => node.x ))
		// const minY = Math.min( ...clone.map( node => node.y ))

		// const maxX = Math.max( ...clone.map( node => ( node.x - minX ) + node.width ))
		// const maxY = Math.max( ...clone.map( node => ( node.y - minY ) + node.height ))

		// frame.x = minX
		// frame.y = minY
		// frame.fills = new Array()
		// frame.resize( maxX, maxY )
		// clone.forEach( node => {
		// 	const nx = node.x - minX
		// 	const ny = node.y - minY
		// 	console.log( nx, ny )
		// 	frame.appendChild( node )
		// 	node.x = nx
		// 	node.y = ny
		// })
		*/
	return group
}

const getSingleSelection = ( selection: Selection ): SceneNode => {
	const [ _clone ] = selection.slice()
	return _clone
}

const createRepeatGridFrame = ( node: SceneNode ) => {
	const { x, y, width, height, parent } = node
	
	const repeatGridFrame = figma.createFrame()
	repeatGridFrame.layoutMode = 'VERTICAL'
	repeatGridFrame.itemSpacing = gap
	repeatGridFrame.name = "Repeat Grid"
	repeatGridFrame.counterAxisSizingMode = 'AUTO'
	repeatGridFrame.x = x
	repeatGridFrame.y = y
	repeatGridFrame.clipsContent = true
	repeatGridFrame.fills = new Array()
	
	repeatGridFrame.resize( width, height )
	repeatGridFrame.appendChild( node )
	node.x = 0
	node.y = 0
	parent?.appendChild( repeatGridFrame )

	return repeatGridFrame;
}

interface NodeSize {
	width: number
	height: number
}

// const clone = ( val: any ) => JSON.parse( JSON.stringify( val ))

function addResizeEventHandler( node: SceneNode, callback: () => void ): void {
	
}

function removeResizeEventHandler() {
	
}

const getResizeDirection = ( node: SceneNode, proxy: NodeSize ): ResizeDirection => {
	const widthTest = subt( proxy.width, node.width )
	const heightTest = subt( proxy.height, node.height )

	if ( heightTest ) return ResizeDirection.VERTICAL
	if ( widthTest ) return ResizeDirection.HORIZONTAL

	return ResizeDirection.NONE
}

const subt = ( o: number, n: number ): number => Math.abs( o - n )


// init
figma.on( 'selectionchange', () => figma.ui.postMessage( figma.currentPage.selection ))
// define UI
figma.showUI( __html__, { themeColors: true, title: "Repeat Grids!", height: 300 });
// bind dispatch
figma.ui.onmessage = dispatch