import React, { useState } from 'react';

const GenQR = ({ingredients, cuisine}) => {
    const [QRUrl, setQRUrl] = useState("");

    const base_url = "http:/localhost:3000/qr_routing/"

    const generateQRUrl = () => {
        //encode the url string
        console.log(ingredients);

        const url_ext = `${ingredients}/${cuisine == "" ? "undefined" : cuisine}`;
        
        const url = base_url + url_ext;

        console.log(encodeURI(url));

        setQRUrl("http://api.qrserver.com/v1/create-qr-code/?data=" + encodeURI(url));
    }

    return (
        <div>
        {QRUrl == "" ? (
            <button onClick={generateQRUrl}>
            </button>
        ) : (
            <img src={QRUrl} alt='QR Code' />
        )}
        </div>
    )
}

export default GenQR;