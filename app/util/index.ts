const config = require('../config/default').config;

function request(pathName: string, body, method: string = 'POST') {
    return fetch(`${config.proxy}${pathName}`, {
        method,
        headers: {
            "Content-Type": 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export { request };