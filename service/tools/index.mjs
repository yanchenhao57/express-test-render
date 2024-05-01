import { HttpRequest } from "@mc/request"
// const { HttpRequest } = pkg;
// TODO: 定义接口响应的数据类型
const abstractAPI = async (url, data, method, headers) => {
    const response = await HttpRequest.request({
        // baseURL: 'https://mgvha6r4sa.execute-api.ap-northeast-1.amazonaws.com/Dev',
        // baseURL: 'https://mgvha6r4sa.execute-api.ap-northeast-1.amazonaws.com/Test',
        baseURL: 'https://apigateway-mc-media-tool-ap.notta.io',
        method,
        url,
        data,
        headers,
    });
    return response.data;
};

const createYoutubeSummarize = async (data) => {
    return abstractAPI('/v0/subtitle-summarize/create', data, 'POST');
};


export default {
    createYoutubeSummarize
}