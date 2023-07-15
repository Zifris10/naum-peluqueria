const updatePassword = async (userID) => {
    const password = $('#password').val().trim();
    const btn = $('#btnForgotPassword');
    btn.html('<span class="spinner-border" role="status" aria-hidden="true"></span>').prop('disabled', true);
    const data = {
        userID,
        password
    };
    const axiosRequest = await requestAxios(false, 'PUT', '/auth/update-password', data);
    if(axiosRequest.statusCode === 200) {
        showToast('Tu contraseña ha sido actualizada correctamente.', 'success');
        setTimeout(() => {
            location.href = '/views/login';
        }, 3000);
    } else {
        showToast(axiosRequest.message, 'error');
        btn.html('Actualizar contraseña').prop('disabled', false);
    }
};

const forgotPassword = async () => {
    const email = $('#email').val().trim();
    const btn = $('#btnLogin');
    btn.html('<span class="spinner-border" role="status" aria-hidden="true"></span>').prop('disabled', true);
    const data = {
        email
    };
    const axiosRequest = await requestAxios(false, 'POST', '/auth/forgot-password', data);
    if(axiosRequest.statusCode === 200) {
        showToast('Por favor revisa tu correo para seguir las instrucciones para actualizar tu contraseña.', 'success');
    } else {
        showToast(axiosRequest.message, 'error');
    }
    btn.html('Iniciar sesión').prop('disabled', false);
};

const login = async () => {
    const email = $('#email').val().trim();
    const password = $('#password').val();
    const btn = $('#btnLogin');
    btn.html('<span class="spinner-border" role="status" aria-hidden="true"></span>').prop('disabled', true);
    const data = {
        email,
        password
    };
    const axiosRequest = await requestAxios(false, 'POST', '/auth/login', data);
    if(axiosRequest.statusCode === 200) {
        localStorage.setItem('naumToken', axiosRequest.token);
        localStorage.setItem('naumRefreshToken', axiosRequest.refreshToken);
        location.href = '/views/dashboard#calendar';
    } else {
        showToast(axiosRequest.message, 'error');
        btn.html('Iniciar sesión').prop('disabled', false);
    }
};

$(document).on('keypress', e => {
    if(e.which == 13) {
        login();
    }
});