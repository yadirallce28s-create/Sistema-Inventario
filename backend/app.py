from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# 1. Ruta para mostrar la pantalla de Login (GET)
@app.route('/')
def home():
    return render_template('login.html')

# 2. Ruta para procesar los datos que envíe el usuario (POST)
@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    # Credenciales temporales de prueba (Hardcoded)
    # Mientras tu compañero de Base de Datos crea las tablas reales
    USER_CORRECTO = "admin"
    PASS_CORRECTA = "123456"

    if username == USER_CORRECTO and password == PASS_CORRECTA:
        return jsonify({"status": "success", "message": "¡Bienvenido al sistema, acceso concedido!"})
    else:
        return jsonify({"status": "error", "message": "Usuario o contraseña incorrectos"}), 401

if __name__ == '__main__':
    app.run(debug=True)