window.addEventListener('DOMContentLoaded', (event) => {
    console.log('Versión 1.0.0');
    const userAgent = navigator.userAgent;
    if(userAgent.match(/chrome|chromium|crios/i) || userAgent.match(/firefox|fxios/i)) {
        const token = localStorage.getItem('naumToken');
        if(token) {
            getProfile();
            getHash();
        } else {
            logout();
        }
    } else {
        logout();
    }
});

const logout = () => {
    localStorage.removeItem('naumToken');
    localStorage.removeItem('naumRefreshToken');
    location.href = '/views/login';
};

const getHash = async () => {
    document.documentElement.scrollTop = 0;
    const content = $('#contentDiv');
    content.html('<div class="text-center mt-5"><div class="spinner-border color-blue" style="width: 6rem; height: 6rem;" role="status"></div></div>');
    const menuData = {
        '#calendar': '/appointments/'
    };
    const url = menuData[location.hash];
    if(url) {
        const axiosRequest = await requestAxios(true, 'GET', url, {});
        if(axiosRequest.statusCode === 200) {
            content.html(axiosRequest.html);
            if(url === '/appointments/') {
                renderCalendar(axiosRequest.data);
            }
        } else {
            logout();
        }
    } else {
        logout();
    }
};

/////////////////////////////////
//////////// PERFIL /////////////
/////////////////////////////////
const getProfile = async () => {
    const axiosRequest = await requestAxios(true, 'GET', '/users/profile', {});
    if(axiosRequest.statusCode === 200) {
        const { data } = axiosRequest;
        $('#navbarName').text(data.name);
    } else {
        logout();
    }
};

/////////////////////////////////
///////// APPOINTMENT ///////////
/////////////////////////////////
let calendar = [];
const renderCalendar = (events) => {
    const calendarEl = document.getElementById('renderCalendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es',
        initialView: 'dayGridMonth',
        events,
        eventClick: (info) => {
            console.log(info.event);
            $('#modalDetailAppointment').modal('show');
        },
        dateClick: (info) => {
            $('#dateAppointment').val(info.dateStr);
            $('#modalAddAppointment').modal('show');
        },
    });
    calendar.render();
};

const cleanAddAppointment = () => {
    $('.new-appointment').val('');
    $('#modalAddAppointment').modal('hide');
};

const addAppointment = async () => {
    const btn = $('#btnAddAppointment');
    btn.html('<span class="spinner-border" role="status" aria-hidden="true"></span>').prop('disabled', true);
    const startDate = $('#dateAppointment').val();
    const startTime = $('#startTimeAppointment').val();
    const endTime = $('#endTimeAppointment').val();
    const name = $('#nameAppointment').val();
    const phone = $('#phoneAppointment').val();
    const data = {
        startDate,
        startTime,
        endTime,
        name,
        phone
    };
    const axiosRequest = await requestAxios(true, 'POST', '/appointments/', data);
    if(axiosRequest.statusCode === 200) {
        cleanAddAppointment();
        const { data } = axiosRequest;
        calendar.addEvent({
            backgroundColor: data.backgroundColor,
            end: data.endDate,
            id: data.id,
            phone: data.phone,
            start: data.startDate,
            title: data.name
        });
    } else {
        showToast(axiosRequest.message, 'error');
        btn.html('Agregar').prop('disabled', false);
    }
};