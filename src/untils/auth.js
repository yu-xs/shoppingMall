export function checkAuth() {
    const token = localStorage.getItem('token'); // 从本地存储中获取token
    return !!token; // 如果token存在，则返回true，表示已登录；否则返回false，表示未登录
}