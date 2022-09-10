import { ChangeEvent, useMemo, useState } from 'react'
import { toConst } from 'utils/stringReplacer'

interface Prop {
    htmlId: string
    option: Array<string>
}

type Option = {
    val: string
    label: string
}

export default function Select({ htmlId, option }: Prop) {
    const defaultValue = useMemo(() => toConst( option[1] ), [ htmlId ])
    const optionKeys: Array<Option> = useMemo(() => {
        return option.map( o => {
            const val = toConst( o )
            return { val, label: o }
        })
    }, [ option ])

    const [ value, setValue ] = useState<string>( defaultValue )
    
    function onChangeHandler( event: ChangeEvent<HTMLSelectElement> ) {
        setValue( event.target.value )
    }
    
    const options = optionKeys.map(( o: Option, i: number ) => {
        return <option value={ o.val } key={ i }>{ o.label }</option> 
    })

    return (
        <select name={ htmlId } id={ htmlId } onChange={ onChangeHandler } defaultValue={ defaultValue }>
            { options }
        </select>
    )
}