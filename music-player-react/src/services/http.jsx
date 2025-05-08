import axios from 'axios'
import _ from 'lodash'

const MESSAGE_ERR_CSRF = 'Thao tác lưu thất bại, vui lòng thử lại !';
const MAX_RETRIES = 5;

let requestLock = false;

const waitUntilUnlocked = async () => {
    while (requestLock) {
        await new Promise(resolve => setTimeout(resolve, 50));
    }
};


const getCsrfHeaders = () => ({
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    'X-CSRF-TOKEN-KEY': document.querySelector('meta[name="csrf-token-key"]').getAttribute('content'),
});


export const request = async (
    endPoint,
    payload = {},
    method = 'get',
    headers = {},
    withoutDomain = false,
    options = {},
    retryCount = 0
) => {

    // if (requestLock === true) {
    //     requestLock = true;
    //     await waitUntilUnlocked();
    // }
    // requestLock = true;

    const csrfHeaders = getCsrfHeaders();
    const  headerDefault = {...csrfHeaders}

    let url = endPoint;
    if (withoutDomain) {
        url = endPoint
    }

    let headerSend = {
        ...headerDefault,
        ...headers
    }

    if (method === 'get') {
        payload = { params: payload };
    } else if (method !== 'get') {
        payload = { data: payload };
    }
    return axios({
        method,
        url,
        headers: { ...headerSend, 'X-Requested-With': 'XMLHttpRequest' },
        ...payload,
        ...options,
    })
        .then((res) => {
            const data = _.get(res, 'data')

            const newCsrfToken = _.get(res, 'headers.x-token');
            const newCsrfTokenKey = _.get(res, 'headers.x-token-key');

            if (newCsrfToken && newCsrfTokenKey) {
                document.querySelector('meta[name="csrf-token"]').setAttribute('content', newCsrfToken);
                document.querySelector('meta[name="csrf-token-key"]').setAttribute('content', newCsrfTokenKey);
            }
            // requestLock = false;
            return data
        })
        .catch(async (error) => {
            const newCsrfToken = _.get(error.response, 'headers.x-token');
            const newCsrfTokenKey = _.get(error.response, 'headers.x-token-key');
            const statusCode = _.get(error.response, 'data.code');
            const messageError = _.get(error.response, 'data.message');

            // if (newCsrfToken && newCsrfTokenKey) {
            //     document.querySelector('meta[name="csrf-token"]').setAttribute('content', newCsrfToken);
            //     document.querySelector('meta[name="csrf-token-key"]').setAttribute('content', newCsrfTokenKey);
            // }

            // if (retryCount < MAX_RETRIES &&  statusCode === 400 && messageError === MESSAGE_ERR_CSRF) {
            //     requestLock = false;
            //     let newPayload = {}
            //     if (payload.hasOwnProperty('data')) {
            //         newPayload = payload.data
            //     }else if (payload.hasOwnProperty('params')) {
            //         newPayload = payload.params
            //     }
            //
            //     return request(endPoint, newPayload, method, headers, withoutDomain, options, retryCount + 1);
            // }
            // requestLock = false;
            return _.get(error, 'response.data')
        })
}

export const httpGet = (
    endPoint,
    payload = {},
    headers = {},
    withoutDomain = false
) => {
    return request(endPoint, payload, 'get', headers, withoutDomain)
}

export const httpPost = (
    endPoint,
    payload = {},
    headers = {},
    withoutDomain = false,
    options = {}
) => {
    return request(endPoint, payload, 'post', headers, withoutDomain, options)
}

export const httpDelete = (
    endPoint,
    payload = {},
    headers = {},
    withoutDomain = false
) => {
    return request(endPoint, payload, 'delete', withoutDomain)
}

export const httpPut = async (endpoint, data, headers = {}, needAuth = false) => {
    try {
        const config = {
            headers: {
                ...headers,
            }
        };
        if (needAuth) {}
        const response = await axios.put(endpoint, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}