import axios from "axios"

const request = axios.create({
    baseURL: 'https://api.green-api.com/'
})

export const getAccauntStatus = (id: string, apiToken: string) => {
    return request.get(`waInstance${id}/getStateInstance/${apiToken}`);
}

export const saveAccSettings = (id: string, apiToken: string) => {
    return request.post(`waInstance${id}/setSettings/${apiToken}`, {
        delaySendMessagesMilliseconds: 500,
        outgoingAPIMessageWebhook: 'yes',
        incomingWebhook: 'yes',
        stateWebhook: 'yes',
    });
}

export const sendMessage = (id: string, apiToken: string, chatId: string, message: string) => {
    return request.post(`waInstance${id}/sendMessage/${apiToken}`, {
        chatId,
        message
    });
}

export const getMessage = (id: string, apiToken: string) => {
    return request.get(`waInstance${id}/receiveNotification/${apiToken}`);
}

export const deleteMessageNotification = (id: string, apiToken: string, receiptId: number) => {
    return request.delete(`waInstance${id}/deleteNotification/${apiToken}/${receiptId}`);
}