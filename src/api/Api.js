export class Api {
    constructor (url) {
        this.url = url
    }

    request(endpoint = '', method = 'GET', body) {
        const fullUrl = endpoint ? `${this.url}${endpoint}` : this.url;
        return fetch(fullUrl, {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }

                throw new Error(`${response.status} ${response.statusText}`);
            })
    }
}