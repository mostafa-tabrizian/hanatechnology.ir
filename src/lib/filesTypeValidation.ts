const filesTypeValidation = (files: File[]): { valid: boolean, name: string } => {
    let invalidFile

    files.map((file) => {
        if (!['image/jpeg', 'image/webp'].includes(file.type)) {
            invalidFile = { 'valid': false, name: file.name }
        }
    })

    if (invalidFile) return invalidFile
    else return { 'valid': true, name: '' }

}


export default filesTypeValidation