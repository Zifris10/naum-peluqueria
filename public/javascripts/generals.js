const currencyFormat = (number, withPennies) => {
    let formato;
    if(withPennies) {
        formato = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(number);
    } else {
        formato = new Intl.NumberFormat('en-US').format(number);
    }
    return formato;
};

const removeColumn = (elementID) => {
    $(`#${elementID}`).remove();
};

const showToast = (text, type) => {
    Toastify({
        text,
        duration: 6000,
        style: {
            background: type === 'error' ? '#d50000' : '#4687F9'
        }
    }).showToast();
};

const requestAxios = async (needRefresh, method, url, data, params = {}) => {
    try {
        if(needRefresh) {
            const dataRefresh = {
                method: 'POST',
                url: '/api/v1/auth/refresh-token',
                headers: {
                    'Authorization': localStorage.getItem('naumRefreshToken'),
                    'content-type': 'application/json'
                }
            };
            const refreshToken = await axios(dataRefresh);
            localStorage.setItem('naumToken', refreshToken.data.token);
            localStorage.setItem('naumRefreshToken', refreshToken.data.refreshToken);
        }
        const dataSend = {
            method,
            url: '/api/v1' + url,
            headers: {
                'Authorization': localStorage.getItem('naumToken'),
                'content-type': 'application/json'
            },
            data,
            params
        };
        const request = await axios(dataSend);
        return request.data
    } catch (error) {
        return error.response.data
    }
};