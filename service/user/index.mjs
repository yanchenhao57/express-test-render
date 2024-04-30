import { HttpRequest } from "@mc/request"
// const { HttpRequest } = pkg;
// TODO: 定义接口响应的数据类型
const abstractAPI = async (url, data, method) => {
    const response = await HttpRequest.request({
        baseURL: 'https://wqez9thzpl.execute-api.ap-northeast-1.amazonaws.com/Test',
        method,
        url,
        data,
    });
    return response.data;
};

/**
 * 获取游客身份
 */

const requestGuestInfo = () => abstractAPI('/v2/account/tourist', {}, 'POST');

const getGuestInfo = async (onPermissionDenied = () => { }) => {
    const { data, code } = await requestGuestInfo();
    console.log("🚀 ~ getGuestInfo ~ data:", data)
    if (code === 0) {
        HttpRequest.initial({
            product: 'Notta',
            platform: 'Web',
            clientVersion: '3.18.0',
        });
        HttpRequest.configuration({
            token: data.token,
            "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            onPermissionDenied,
        });
    }

    return { data, code };
};

export default {
    getGuestInfo,
    abstractAPI,
}