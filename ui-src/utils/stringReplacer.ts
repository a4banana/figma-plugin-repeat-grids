export const toKebab = ( str: string ): string => {
    return str.replace( /\s+/g, '-' ).toLocaleLowerCase()
}

export const toConst = ( str: string ): string => {
    return str.replace( /\s+/g, '_' ).toLocaleUpperCase()
}