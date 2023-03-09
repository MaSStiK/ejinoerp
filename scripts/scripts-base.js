export function setInputError(className) { // Ошибка в заполнении
    if (!$(className).hasClass("input-error")) {
        $(className).addClass("input-error")
    }
    setTimeout(() => {$(className).removeClass("input-error")}, 2000)
}

export function setBlockWaiting(className) { // Ожидание
    if (!$(className).hasClass("waiting")) {
        $(className).addClass("waiting")
    }
    setTimeout(() => {$(className).removeClass("waiting")}, 2000)
}

export function setButtonDisabled(className) {
    $(className).attr("disabled", "disabled")
    setTimeout(() => {$(className).removeAttr("disabled")}, 2000)
}

export function createNotification(text, color=null) {
    $("main").append(`<div class="modal-notification">${text}</div>`)
    if (color) {
        if (color === "primary") {
            $(".modal-notification").last().addClass("modal-notification-primary")
        }
        if (color === "danger") {
            $(".modal-notification").last().addClass("modal-notification-danger")
        }
    }
    setTimeout(() => {$(".modal-notification").first().remove()}, 3000)
}

// Ивенты онлайн / оффлайн
$(window).on("offline", (event) => {
    createNotification("Потеряно интернет соединение", "danger")
})
$(window).on("online", (event) => {
    createNotification("Интернет соединение восстановлено", "primary")
})


// Google Sheets
const GoogleSheetURL = "https://script.google.com/macros/s/AKfycbzmEh-mzZiBmqynucvNcpuwk6KCReRiEA09NuN9YkZJhSyfEPgpcDmQCmEZFfAJZEE0/exec"

export function sendGSRequest(sheet, action, data={}, func=null) {
    const sendData = {
        sheet: sheet
    }
    switch(action) {
        // actions:
        case "getEvent": // getEvent sendGSRequest("any", "getEvent", {}, (data) => {})
            sendData.data = JSON.stringify(data)
            break;
        case "getData": // getData sendGSRequest("sheetName", "getData", {}, (data) => {})
            break;
        
        case "getDataByRange": // getData sendGSRequest("sheetName", "getDataByRange", {range: A:A}, (data) => {})
            sendData.data = JSON.stringify(data)
            sendData.range = data.range
            break;
        case "getDataById": // getData sendGSRequest("sheetName", "getDataById", {anyData, id: int}, (data) => {})
            sendData.data = JSON.stringify(data)
            sendData.id = data.id
            break;
        case "findValueInRange": // getData sendGSRequest("sheetName", "findValueInRange", {anyData, range: A:A, value: str}, (data) => {})
            sendData.data = JSON.stringify(data)
            sendData.range = data.range
            sendData.value = data.value
            break;
        case "getValueCompareById": // getData sendGSRequest("sheetName", "getValueCompareById", {anyData, id: int, value: str}, (data) => {})
            sendData.data = JSON.stringify(data)
            sendData.id = data.id
            sendData.value = data.value
            break;
        case "addDataById": // getData sendGSRequest("sheetName", "addDataById", {anyData, id: int}, (data) => {})
            sendData.data = JSON.stringify(data)
            sendData.id = data.id
            break;
        case "addValueById": // getData sendGSRequest("sheetName", "addValueById", {anyData, id: int, value: str}, (data) => {})
            sendData.data = JSON.stringify(data)
            sendData.id = data.id
            sendData.value = data.value
            break;
        case "updateDataById": // getData sendGSRequest("sheetName", "updateDataById", {anyData, id: int}, (data) => {})
            sendData.data = JSON.stringify(data)
            sendData.id = data.id
            break;
        case "updateValueById": // getData sendGSRequest("sheetName", "updateValueById", {anyData, id: int, value: str}, (data) => {})
            sendData.data = JSON.stringify(data)
            sendData.id = data.id
            sendData.value = data.value
            break;
        case "deleteRowById": // getData sendGSRequest("sheetName", "deleteRowById", {anyData, id: int}, (data) => {})
            sendData.data = JSON.stringify(data)
            sendData.id = data.id
            break;
        default:
            break;
    }
    $.ajax({
        crossDomain: true,
        url: GoogleSheetURL + "?action=" + action,
        method: "GET",
        dataType: 'JSONP',
        data: sendData,
        success: (res) => {
            if (func) {func(res)}
        }
    })
}

// sendGSRequest("users", "updateDataById", {id: 4411, name: "увагуе"}, (data) => {
//     console.log(data);
// })

// VK API
let token = "vk1.a.PfD30rLv8JpK3-RBjksczmShBSymiZ0gxlZn2FixH-B8OG-MA_GVSB-aOFlvydrzzyAYpPfs6Q8_fRUWJxapzjyHpcuzBynC2baY_fU0WkzgqC5yK1-tvY9fGEtBdnzZdOvFI1EPbst2XPt-yyR6JxTN7-T51bSaIhjNzcjPpWo1XD7DBhdAaJLBN1o0I36R31L0ORlG4wuLc1i4p2Jpaw"
function getMethodUrl(method, params) {
    params = params || {}
    params['access_token'] = token
    params['v'] = "5.131"
    return "https://api.vk.com/method/" + method + "?" + $.param(params)
}

export function sendVkRequest(method, params, func=null) {
    $.ajax({
        url: getMethodUrl(method, params),
        method: 'GET',
        dataType: 'JSONP',
        success: func,
    })
}

// 2000000001 Рп беседа
// 2000000002 test_chamber
// 2000000005 logs
// 2000000006 Географ Жалобы
// 2000000007 Географ Логи