
export default function clone( val: any ) {
    if ( isNull( val ) ) return null
    const type = typeof val;

    switch( true ) {
        case isAnyOtherObject( type ):
            if ( Array.isArray( val ) ) return val.map( v => clone( v ) )
            if ( isUint8Array( val ) ) return new Uint8Array( val )
            return Object.assign({}, val)
        case isSomePrimitives( type ): 
            return val
        default:
            console.error( type + ' is unsupported type.' )
            throw 'unknown';
    }
}

const isNull = ( val ) => ( val === null ) ? true : false;
const isUint8Array = ( val ) => ( val instanceof Uint8Array ) ? true : false;
const isAnyOtherObject = ( type ) =>( type === 'object' ) ? true : false;
const isSomePrimitives = ( type ) => {
    return ( new Set([ 'undefined', 'number', 'string', 'boolean' ]).has( type )) ? true : false;
}