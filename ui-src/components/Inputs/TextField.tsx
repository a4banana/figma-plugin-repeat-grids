import { toKebab } from 'utils/stringReplacer'
import Label from './_Label'
import Input from './_Input'
import { ReactElement, useMemo } from 'react'

interface Prop {
    label: string
    id: string
    initialValue?: string
    icon?: ReactElement
    className?: string
}

export default function TextField({ label, id, icon, className, initialValue }: Prop ) {
    const htmlId = useMemo<string>(() => toKebab( id ), [ id ])
    const classes = [
        'textfield',
        ( className && className )
    ].join( ' ' )
    
    return (
        <div className={ classes }>
            <Label content={ label } htmlId={ htmlId } icon={ icon && icon } />
            <Input htmlId={ htmlId } initialValue={ initialValue && initialValue } />
        </div>
    )
}