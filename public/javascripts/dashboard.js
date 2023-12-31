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
    content.html('<div class="text-center mt-5"><div class="spinner-border color-green" style="width: 6rem; height: 6rem;" role="status"></div></div>');
    const menuData = {
        '#calendar': {
            url: '/appointments/',
            title: 'Calendario'
        },
        '#inventory': {
            url: '/inventory/',
            title: 'Inventario'
        },
        '#welcome': {
            url: '/welcome/',
            title: 'Bienvenido'
        }
    };
    const urlData = menuData[location.hash];
    if(urlData) {
        if(location.hash === '#welcome') {
            const hours = new Date().getHours();
            let text = 'buenos días';
            if(hours >= 12 && hours < 19) {
                text = 'buenas tardes';
            } else if(hours >= 19 && hours <= 23) {
                text = 'buenas noches';
            }
            const html = `<div class="text-center">
                <img class="img-fluid rounded mb-5 invisible" src="../images/logo.jpeg" width="200">
                <p class="color-green font-30">
                    ¡Hola, ${text} 
                    <span id="nameSapnWelcome"></span>!
                </p>
                <br>
                <br>
                <button class="btn text-white btn-style font-16 bg-green" onclick="location.href = '#calendar'">Ir a citas</button>
                <br>
                <br>
                <br>
                <button class="btn text-white btn-style font-16 bg-green" onclick="location.href = '#inventory'">Ir a inventario</button>
            </div>`;
            content.html(html);
            getProfile();
        } else {
            const axiosRequest = await requestAxios(true, 'GET', urlData.url, {});
            document.title = urlData.title;
            if(axiosRequest.statusCode === 200) {
                content.html(axiosRequest.html);
                if(urlData.url === '/appointments/') {
                    renderCalendar(axiosRequest.data);
                }
            } else {
                logout();
            }
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
        const nameSapnWelcome = $('#nameSapnWelcome');
        if(nameSapnWelcome) {
            nameSapnWelcome.text(data.name);
        }
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
            const { event } = info;
            $('#spanNameAppointment').text(event.title);
            $('#spanPhoneAppointment').text(event.extendedProps.phone);
            $('#spanDateAppointment').text(convertDate(event.start));
            $('#btnDeleteAppointment').attr('onclick','showModalDeleteAppointment("'+event.id+'","'+event.title+'")');
            $('#btnCompleteAppointment').attr('onclick','showModalCompleteAppointment("'+event.id+'","'+event.title+'")');
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
        showToast('Has agregado la cita correctamente.', 'success');
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
    }
    btn.html('Agregar').prop('disabled', false);
};

const showModalDeleteAppointment = (appointmentID, name) => {
    $('#deleteTitle').text(`¿Estás seguro que deseas eliminar la cita de ${name}?`);
    $('#btnDelete').attr('onclick','deleteAppointment("'+appointmentID+'")');
    $('#deleteModal').modal('show');
};

const deleteAppointment = async (appointmentID) => {
    const id = calendar.getEventById(appointmentID);
    id.remove();
    const axiosRequest = await requestAxios(true, 'DELETE', `/appointments/${appointmentID}`, {});
    if(axiosRequest.statusCode === 200) {
        showToast('Has eliminado la cita correctamente.', 'success');
    } else {
        showToast(axiosRequest.message, 'error');
    }
};

const showModalCompleteAppointment = (appointmentID, name) => {
    $('#priceCompleteAppointment').text(`Por favor ingresa el precio del corte para ${name}`);
    $('#btnConfirmCompleteAppointment').attr('onclick','completeAppointment("'+appointmentID+'")');
    $('#modalCompleteAppointment').modal('show');
};

const completeAppointment = async (appointmentID) => {
    const btn = $('#btnConfirmCompleteAppointment');
    btn.html('<span class="spinner-border" role="status" aria-hidden="true"></span>').prop('disabled', true);
    const price = $('#inputPriceCompleteAppointment').val();
    const worker = $('#inputWorkerCompleteAppointment').val();
    const data = {
        price,
        worker
    };
    const axiosRequest = await requestAxios(true, 'PUT', `/appointments/${appointmentID}/complete`, data);
    if(axiosRequest.statusCode === 200) {
        const id = calendar.getEventById(appointmentID);
        id.remove();
        showToast('Has finalizado la cita correctamente.', 'success');
        cleanConfirmCompleteAppointment();
    } else {
        showToast(axiosRequest.message, 'error');
    }
    btn.html('Completar').prop('disabled', false);
};

const cleanConfirmCompleteAppointment = () => {
    $('#inputWorkerCompleteAppointment').val('');
    $('#inputPriceCompleteAppointment').val('');
    $('#modalCompleteAppointment').modal('hide');
};

const filterHistoryAppointment = async () => {
    const startDate = $('#appointmentHistoryStartDate').val();
    const endDate = $('#appointmenHistoryEndDate').val();
    const worker = $('#appointmenHistoryWorker').val();
    if(startDate && endDate) {
        const content = $('#contentHistoryAppointments');
        content.html('<div class="text-center mt-5"><div class="spinner-border color-green" style="width: 6rem; height: 6rem;" role="status"></div></div>');
        const axiosRequest = await requestAxios(true, 'GET', `/appointments/history?startDate=${startDate}&endDate=${endDate}&worker=${worker}`, {});
        if(axiosRequest.statusCode === 200) {
            content.html(axiosRequest.html);
        } else {
            showToast(axiosRequest.message, 'error');
            content.html('');
        }
    }
};

/////////////////////////////////
////////// INVENTORY ////////////
/////////////////////////////////
const showModalDeleteInventory = (inventoryID, name) => {
    $('#deleteTitle').text(`¿Estás seguro que deseas eliminar el artículo ${name} del inventario?`);
    $('#btnDelete').attr('onclick','deleteInventory("'+inventoryID+'")');
    $('#deleteModal').modal('show');
};

const deleteInventory = async (inventoryID) => {
    removeColumn(inventoryID);
    const axiosRequest = await requestAxios(true, 'DELETE', `/inventory/${inventoryID}`, {});
    if(axiosRequest.statusCode === 200) {
        showToast('Has eliminado el artículo correctamente.', 'success');
    } else {
        showToast(axiosRequest.message, 'error');
    }
};

const filterInventory = (value) => {
    const inputValue = value.toLowerCase();
    const allNames = document.querySelectorAll('.name-inventory');
    allNames.forEach(inventory => {
        const txtValue = inventory.value.toLowerCase();
        if(txtValue.indexOf(inputValue) > -1) {
            inventory.parentElement.parentElement.classList.remove('d-none');
        } else {
            inventory.parentElement.parentElement.classList.add('d-none');
        }
    });
};

const cleanAddInventory = () => {
    $('.new-inventory').val('');
    $('#modalAddInventory').modal('hide');
};

const addInventory = async () => {
    const btn = $('#btnAddInventory');
    btn.html('<span class="spinner-border" role="status" aria-hidden="true"></span>').prop('disabled', true);
    const name = $('#nameInventory').val();
    const price = $('#priceInventory').val();
    const data = {
        name,
        price
    };
    const axiosRequest = await requestAxios(true, 'POST', '/inventory/', data);
    if(axiosRequest.statusCode === 200) {
        showToast('Has agregado el artículo al inventario correctamente.', 'success');
        cleanAddInventory();
        const { data } = axiosRequest;
        const html = `<div class="row mb-4 mx-1 radius-20 bg-row" id="${data.id}">
            <div class="col-6">
                <input class="form-control border-0 bg-transparent text-center my-3 name-inventory" type="text" placeholder="Nombre" autocomplete="off" value="${data.name}">
            </div>
            <div class="col-4">
                <input class="form-control border-0 bg-transparent text-center my-3" type="text" placeholder="Precio" autocomplete="off" value="${data.price}">
            </div>
            <div class="col-2 text-center">
                <i class="fa-solid fa-dollar-sign color-green cursor-pointer font-20 pt-4 me-3" onclick="showModalSellItem('${data.id}','${data.name}',${data.price})"></i>
                <i class="fa-solid fa-trash text-danger cursor-pointer font-20 pt-4" onclick="showModalDeleteInventory('${data.id}','${data.name}')"></i>
            </div>
        </div>`;
        $('#contentInventory').prepend(html);
    } else {
        showToast(axiosRequest.message, 'error');
    }
    btn.html('Agregar').prop('disabled', false);
};

const updateInventory = async (inventoryID, fieldName, value) => {
    const data = {
        value,
        fieldName
    };
    const axiosRequest = await requestAxios(true, 'PUT', `/inventory/${inventoryID}`, data);
    if(axiosRequest.statusCode === 200) {
        showToast('Has actualizado el artículo del inventario correctamente.', 'success');
    } else {
        showToast(axiosRequest.message, 'error');
    }
};

/////////////////////////////////
////// INVENTORY HISTORY ////////
/////////////////////////////////
const showModalSellItem = (inventoryID, name, price) => {
    $('#textNameSellItem').html(`Producto: ${name}<br>Precio original: $${currencyFormat(price, false)}`);
    $('#inputPriceSellItem').val(price);
    $('#btnSellItem').attr('onclick','addInventoryHistory("'+inventoryID+'")');
    $('#modalSellItem').modal('show');
};

const addInventoryHistory = async (inventoryID) => {
    const btn = $('#btnSellItem');
    btn.html('<span class="spinner-border" role="status" aria-hidden="true"></span>').prop('disabled', true);
    const price = $('#inputPriceSellItem').val();
    const data = {
        inventoryID,
        price
    };
    const axiosRequest = await requestAxios(true, 'POST', '/inventory-history/', data);
    if(axiosRequest.statusCode === 200) {
        showToast('Has vendido el artículo correctamente.', 'success');
        $('#modalSellItem').modal('hide');
    } else {
        showToast(axiosRequest.message, 'error');
    }
    btn.html('Vender').prop('disabled', false);
};

const filterInventoryHistory = async () => {
    const startDate = $('#inventoryHistoryStartDate').val();
    const endDate = $('#inventoryHistoryEndDate').val();
    if(startDate && endDate) {
        const content = $('#contentInventoryHistory');
        content.html('<div class="text-center mt-5"><div class="spinner-border color-green" style="width: 6rem; height: 6rem;" role="status"></div></div>');
        const axiosRequest = await requestAxios(true, 'GET', `/inventory-history/?startDate=${startDate}&endDate=${endDate}`, {});
        if(axiosRequest.statusCode === 200) {
            content.html(axiosRequest.html);
        } else {
            showToast(axiosRequest.message, 'error');
            content.html('');
        }
    }
};