import React, { useContext, useEffect, useState } from 'react';
import "../css/Qr.css"
import baseUrl from '../baseUrl';
import axios from 'axios';
import { ChangeLoginContext } from '../App';


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

    const reCheckLogin = useContext(ChangeLoginContext);

    const generateQRUrl = () => {
        reCheckLogin(true);
        //encode the url string
        
        const url = window.location.href;

        console.log(encodeURI(url));

        setQRUrl("http://api.qrserver.com/v1/create-qr-code/?data=" + encodeURIComponent(url));
    }

    const isAdmin = async () => {
        let url = process.env.REACT_APP_BASEURL + "/isAdmin/" + sessionStorage.getItem("token");
        await axios.get(url).then(res => {
            setAdmin(res.data);
        }).catch(err => {
            setAdmin(false);
        })
    }

    const printQRCode = () => {
        var win = window.open('', "_blank");
        win.document.open();
        win.document.write([
            '<html>',
            '   <body onload="window.print()" onafterprint="window.close()">',
            '       <img style="width:50%" src="' + QRUrl + '"/>',
            '   </body>',
            '</html>'
        ].join(''));
        win.document.close();
    }

    return (
        <>
            { admin ? (
                <div className='qr-container'>
                {QRUrl === "" ? (
                    <button className='input-btn btn btn-outline-light' onClick={generateQRUrl}>
                        Generate QR Code
                    </button>
                ) : (
                    <img src={QRUrl} id='QRCode' onClick={printQRCode} alt='QR Code' />
                )}
                </div>
            ) : ""}
        </>
    )
}

export default GenQR;