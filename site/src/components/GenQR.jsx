import React, { useEffect, useState } from 'react';
import "../css/Qr.css"
import baseUrl from '../baseUrl';
import axios from 'axios';

const GenQR = ({ingredients, cuisine}) => {
    const [QRUrl, setQRUrl] = useState("");
    const [admin, setAdmin] = useState(false);

    const routing_url = "http:/54.77.118.182:3000/qr_routing/"

    useEffect(() => {
        setQRUrl("");
    }, [ingredients])

    useEffect(() => {
        isAdmin();
    }, [])

    const generateQRUrl = () => {
        //encode the url string

        const url_ext = `${ingredients}/${cuisine === "" ? "undefined" : cuisine}`;
        
        const url = routing_url + url_ext;

        console.log(encodeURI(url));

        setQRUrl("http://api.qrserver.com/v1/create-qr-code/?data=" + encodeURI(url));
    }

    const isAdmin = async () => {
        let url = process.env.REACT_APP_BASEURL + "/isAdmin/" + sessionStorage.getItem("token");
        await axios.get(url).then(res => {
            setAdmin(res.data);
        }).catch(err => {
            setAdmin(false);
        })
    }

    return (
        <>
            { admin ? (
                <div className='qr-container'>
                {QRUrl === "" ? (
                    <button className='btn btn-primary' onClick={generateQRUrl}>
                        Generate QR Code
                    </button>
                ) : (
                    <img src={QRUrl} alt='QR Code' />
                )}
                </div>
            ) : ""}
        </>
    )
}

export default GenQR;