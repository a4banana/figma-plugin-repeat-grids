import { toKebab } from 'utils/stringReplacer'
import Label from './_Label'
import Select from './_Select'

interface Prop {
    label: string
    id: string
    option: Array<string>
}

export default function Picker({ label, id, option }: Prop ) {
    const htmlId = toKebab( id )
    
    return (
        <>
            <Label content={ label } htmlId={ htmlId } />
            <Select htmlId={ htmlId } option={ option } />
        </>
    )
}