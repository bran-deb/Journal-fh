export const fileUpload = async (file) => {
    const cloudURL = 'https://api.cloudinary.com/v1_1/developers-sr/upload'

    const formData = new FormData()
    //selecciona el upload-preset de (react-journal) en cloudinary
    formData.append('upload_preset', 'react-journal')
    // se inserta el file
    formData.append('file', file)

    try {
        //postea formData en el cloudURL
        const resp = await fetch(cloudURL, {
            method: 'POST',
            body: formData
        })
        if (resp.ok) {    //si resp es correcto
            const cloudResp = await resp.json()
            //regresa la url a donde se subio
            return cloudResp.secure_url
        } else {
            throw await resp.json()
        }
    }
    catch (e) {
        throw e
    }
}
