import { useState } from 'react'
import type { ChangeEvent } from 'react'

// Input
interface Prop {
    htmlId: string
    initialValue?: string
}

export default function Input({ htmlId, initialValue }: Prop ) {
    const [ value, setValue ] = useState<string>( '' )
    
    function onChangeHandler ( event: ChangeEvent<HTMLInputElement> ) {
        setValue( event.target.value )
    }

    return (
        <input type="text" id={ htmlId } onChange={ onChangeHandler } value={ initialValue && initialValue } />
    )
}