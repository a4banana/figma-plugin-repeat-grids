/// <reference types="@figma/plugin-typings" />

export enum ActionTypes {
	FLEX_WRAP = 'FLEX_WRAP'
}

export enum FrameNames {
	ROW = 'Row',
	WRAP = 'FlexWrap'
}

export type Gap = {
	columnGap: number
	rowGap: number
}

interface FlexWrapAction {
	type: ActionTypes.FLEX_WRAP
	payload: Gap
}

type ContainerNode = FrameNode | GroupNode

// Actions
export type ActionProps = FlexWrapAction