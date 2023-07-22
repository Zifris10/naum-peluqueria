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
    const links = document.querySelectorAll('.menu-links');
    const content = $('#contentDiv');
    content.html('<div class="text-center"><div class="spinner-border color-green" style="width: 6rem; height: 6rem;" role="status"></div></div>');
    let url = '';
    for(let index = 0; index < links.length; index++) {
        let valueFor = links[index];
        if(valueFor.dataset.href === location.hash) {
            valueFor.classList.add('bg-green');
            valueFor.children[0].classList.add('text-white');
            valueFor.children[1].classList.add('text-white');
            url = valueFor.dataset.api;
        } else {
            valueFor.classList.remove('bg-green');
            valueFor.children[0].classList.remove('text-white');
            valueFor.children[1].classList.remove('text-white');
        }
    }
    if(url) {
        const axiosRequest = await requestAxios(true, 'GET', url, {});
        if(axiosRequest.statusCode === 200) {
            content.html(axiosRequest.html);
            renderCalendar(axiosRequest.data);
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

const renderCalendar = (events) => {
    const calendarEl = document.getElementById('renderCalendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es',
        initialView: 'dayGridMonth',
        events,
        eventClick: (info) => {
            console.log(info.event);
        },
        dateClick: (info) => {
            console.log(info);
            $('#modalAddAppointment').modal('show')
        },
    });
    calendar.render();
}