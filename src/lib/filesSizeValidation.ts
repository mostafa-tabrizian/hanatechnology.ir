const fileSizeCalculator = (fileSize: number) => (fileSize / 1024 / 1024) * 1000  // ex: 400 KB

const filesSizeValidation = (files: File[]): { valid: boolean, fileSize: number, name: string } => {

    let invalidFile

    files.map((file) => {
        const size = fileSizeCalculator(file.size)

        if (size > 100) {
            const fileSize = Math.round(fileSizeCalculator(file.size))
            invalidFile = { 'valid': false, fileSize, name: file.name }
        }
    })

    if (invalidFile) return invalidFile
    else return { 'valid': true, fileSize: 0, name: '' }

}


export default filesSizeValidation