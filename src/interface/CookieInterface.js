import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function GetToken() {
    return cookies.get("token");
}
export function SetToken(value) {
    cookies.set("token", value);
}
export function RemoveToken() {
    cookies.remove("token")
}


