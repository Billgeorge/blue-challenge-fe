import React from "react";
import axios from 'axios';

export const consumeService = (payload, url, operation) => {

    console.log('Consuming service ...', { payload, url, operation })

    let axiosParams
    if (payload) {
        axiosParams = {
            data: JSON.stringify(payload),            
            method: operation,
            url: url
        }
    } else {
        axiosParams = {            
            method: operation,
            url: url
        }
    }
    return axios(axiosParams)
}