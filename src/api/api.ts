import axios from "axios"

const request = axios.create({
    baseURL: 'https://api.green-api.com/'
})

export const getAccauntStatus = (id: string, apiToken: string) => {
    return request.get(`waInstance${id}/getStateInstance/${apiToken}`)
}