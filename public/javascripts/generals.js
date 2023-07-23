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

const requestAxios = async (needRefresh, method, url, data) => {
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
            data
        };
        const request = await axios(dataSend);
        return request.data
    } catch (error) {
        return error.response.data
    }
};

const convertDate = (date) => {
    const days = {
        '0': 'Domingo',
        '1': 'Lunes',
        '2': 'Martes',
        '3': 'Miércoles',
        '4': 'Jueves',
        '5': 'Viernes',
        '6': 'Sábado'
    };
    const months = {
        '1': 'Enero',
        '2': 'Febrero',
        '3': 'Marzo',
        '4': 'Abril',
        '5': 'Mayo',
        '6': 'Junio',
        '7': 'Julio',
        '8': 'Agosto',
        '9': 'Septiembre',
        '10': 'Octubre',
        '11': 'Noviembre',
        '12': 'Diciembre'
    };
    const getDate = new Date(date);
    const nameDay = days[getDate.getDay()];
    const numberDay = String(getDate.getDate()).padStart(2, '0');
    const nameMonth = months[getDate.getMonth()+1];
    const year = getDate.getFullYear();
    const hour = String(getDate.getHours()).padStart(2, '0');
    const minutes = String(getDate.getMinutes()).padStart(2, '0');
    return `${nameDay} ${numberDay} de ${nameMonth} del ${year} a las ${hour}:${minutes}`;
};