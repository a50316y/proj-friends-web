import Vue from 'vue';
import axios from "axios";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = process.env.API_ROOT; // 域名

// http request 欄截
axios.interceptors.request.use(
    config => {
        config.data = JSON.stringify(config.data);
        config.headers = { // 如果沒有cors的問題則可以都不加
            "Access-Control-Allow-Origin": process.env.API_ROOT,
            "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
            "Access-Control-Max-Age": "86400"
        };
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 異常處理
axios.interceptors.response.use(
    response => {
        console.log(response)
        // if (response.data.msg === 'no token ,請重新登入' || response.data.msg === 'token過期或錯誤,請重新登入' )
        //     alert('請重新登入')
        //     window.location ="http://localhost:8080/login";
        return response;
    },
    err => {
        if (err && err.response) {
            switch (err.response.status) {
                case 404:
                    console.log("找不到該頁面");
                    break;
                case 500:
                    console.log("伺服器出錯");
                    break;
                case 503:
                    console.log("服務失效");
                    break;
                default:
                    console.log(`連接錯誤${err.response.status}`);
            }
        } else {
            console.log("連接到服務器失敗");
        }
        return Promise.resolve(err.response);
    }
);
// import Vue from 'vue';
// import axios from 'axios'

// // axios.defaults.baseURL = "http://your.domain.name/"; // 域名
// // Error Handle
// const errorHandle = (status, msg) => {
//     switch (status) {
//         case 400:
//             console.log("400")
//             this.$toast.add({ severity: 'warn', summary: 'Bad Request', detail: msg, life: 3000 });
//             break;
//         case 401:
//             console.log("401")
//             Vue.prototype.$toast.add({ severity: 'warn', summary: '認證失敗', detail: msg, life: 3000 });
//             break;
//         default:
//             break;
//     }
// }
// // doing something with the request
// export const jwtToken = localStorage.getItem("jwtToken");
// axios.interceptors.request.use(
//     (request) => {
//         // do something with request meta data, configuration, etc
//         // dont forget to return request object, otherwise your app will get no answer
//         return request;
//     }
// );
// // doing something with the response
// axios.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         const { response } = error;
//         if (response) {
//             // 成功發出請求且收到 response, 但有 error
//             errorHandle(response.status, response.data.error);
//             return Promise.reject(error);
//         } else {
//             // 成功發出請求但沒收到 response
//             if (!window.navigator.onLine) {
//                 //如果是網路斷線
//                 Vue.prototype.$toast.add({ severity: 'warn', summary: 'Warn Message', detail: "網路出了問題, 請重新連線", life: 3000 });
//             } else {
//                 // 其它問題        
//                 Vue.prototype.$toast.add({ severity: 'warn', summary: 'Warn Message', detail: "主機伺服器發生問題, 請連絡資訊單位", life: 3000 });
//                 return Promise.reject(error);
//             }
//         }
//     }
// );
export default axios

// export function fetch(url, params = {}) {
//     return new Promise((resolve, reject) => {
//         axios
//             .get(url, {
//                 params: params
//             })
//             .then(response => {
//                 resolve(response.data);
//             })
//             .catch(err => {
//                 reject(err);
//             });
//     });
// }

// export function post(url, data = {}) {
//     return new Promise((resolve, reject) => {
//         axios.post(url, data).then(
//             response => {
//                 resolve(response.data);
//             },
//             err => {
//                 reject(err);
//             }
//         );
//     });
// }

// export function remove(url, data = {}) {
//     return new Promise((resolve, reject) => {
//         axios.delete(url, data).then(
//             response => {
//                 resolve(response.data);
//             },
//             err => {
//                 reject(err);
//             }
//         );
//     });
// }

// export function put(url, data = {}) {
//     return new Promise((resolve, reject) => {
//         axios.put(url, data).then(
//             response => {
//                 resolve(response.data);
//             },
//             err => {
//                 reject(err);
//             }
//         );
//     });
// }
// // 將封裝的方法打包起來
// export const UserServer = {
//     fetch: function (paramObj) {
//         return fetch("api/users", paramObj);
//     },
//     post: function (paramObj) {
//         return post("api/users", paramObj);
//     },
//     put: function (paramObj) {
//         return put("api/users", paramObj);
//     },
//     delete: function (paramObj) {
//         return remove("api/users", paramObj);
//     }
// };
