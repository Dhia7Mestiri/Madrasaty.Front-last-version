export function getCurrentUser()
{
    var currentUser = localStorage.getItem("currentUser");
    var user        = currentUser ? JSON.parse(currentUser) : null;
    
    return user;
}