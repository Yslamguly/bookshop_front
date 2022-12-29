export const logout = () =>{
        sessionStorage.removeItem('token')
        localStorage.removeItem('token')
}
