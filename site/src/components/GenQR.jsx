import React, { useEffect, useState } from 'react';
import "../css/Qr.css"

const GenQR = ({ingredients, cuisine}) => {
    const [QRUrl, setQRUrl] = useState("");

    const base_url = "http:/localhost:3000/qr_routing/"

    useEffect(() => {
        setQRUrl("");
    }, [ingredients])

    const generateQRUrl = () => {
        //encode the url string

        const url_ext = `${ingredients}/${cuisine === "" ? "undefined" : cuisine}`;
        
        const url = base_url + url_ext;

        console.log(encodeURI(url));

        setQRUrl("http://api.qrserver.com/v1/create-qr-code/?data=" + encodeURI(url));
    }

    return (
        <div className='qr-container'>
        {QRUrl === "" ? (
            <button className='btn btn-primary' onClick={generateQRUrl}>
                Generate QR Code
            </button>
        ) : (
            <img src={QRUrl} alt='QR Code' />
        )}
        </div>
    )
}

export default GenQR;