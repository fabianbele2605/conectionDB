document.getElementById("loginForm").addEventListener("submit", async(event) => {
    event.preventDefault()

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (result.success) {
            localStorage.setItem('user', JSON.stringify(result.user));
            window.location.href = "dashboard.html";
        } else {
            alert(result.message || 'usuario o contraseña invalidos.');
        }
    } catch (err) {
        console.error('error al intentar iniciar sesion', err);
        alert('error al conectar con el servidor');
    }
});