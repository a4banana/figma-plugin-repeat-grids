import { memo, ReactElement } from 'react'

// Label
interface LabelProp {
    content: string
    htmlId: string
    icon?: ReactElement
}

const Label = memo(({ content, htmlId, icon }: LabelProp ) => {
    const labelContent = icon ? icon : content
    const classes = icon ? 'has-icon' : '';

    return (
        <label htmlFor={ htmlId } className={ classes }>{ labelContent }</label>
    )   
})

export default Label