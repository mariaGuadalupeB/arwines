
Rutas users: 
==================================================
API USER  REGISTER
http://localhost:5000/api/user/register
{
    "admin": false,
    "id": 5,
    "email": "cuatro@gmail.com",
    "password": "$2b$16$DhmAG6ALzigMcoVndlwFUuPjO/9VZ5PzaHEmm1qk9dDnZHTfm9Cui",
    "firstName": "uno",
    "lastName": "dos",
    "updatedAt": "2021-03-10T23:26:10.792Z",
    "createdAt": "2021-03-10T23:26:10.792Z",
    "salt": "$2b$16$DhmAG6ALzigMcoVndlwFUu",
    "address": null,
    "cart": {
        "id": 4,
        "status": "active",
        "userId": 5,
        "createdAt": "2021-03-10T23:26:16.107Z",
        "updatedAt": "2021-03-10T23:26:16.107Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoiY3VhdHJvQGdtYWlsLmNvbSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjE1NDE4Nzc2LCJleHAiOjE2MTU3Nzg3NzZ9.GpXXaaGnIfYcRRIQ_JwtkDbG2bhYQemvn7auUr7ps0E"
}
==================================================
AUTH JWT 
De este paso, si esta ok, data guardada en req.user es el objeto debajo: 

PASO JWT --> 
const data = jwt.verify(token, SECRET);
    if (data) {
        req.user = data;
        return next();
    }

OBJETO RTA --> 
{
  userId: 8,
  email: 'cinco@gmail.com',
  admin: false,
  iat: 1615419042,
  exp: 1615779042
}

==================================================

SAVE_CART_BUTTON --> localhost:5000/api/cart [{productId: id, quantity: cantidad}, {productId: id, quantity: cantidad}]
ON_USER_LOGOUT --> localhost:5000/api/cart [{productId: id, quantity: cantidad}, {productId: id, quantity: cantidad}]