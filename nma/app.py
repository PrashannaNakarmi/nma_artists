from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_mysqldb import MySQL
import MySQLdb.cursors
import os
import time

app = Flask(__name__)

# Set secret key for session management
app.secret_key = os.urandom(24)

# Database connection parameters
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'mysql'
app.config['MYSQL_DB'] = 'nma'

# Initialize MySQL
mysql = MySQL(app)

# Session timeout settings
SESSION_LIFETIME = 3600

@app.before_request
def make_session_permanent():
    session.permanent = True
    app.permanent_session_lifetime = SESSION_LIFETIME

@app.route('/', methods=['GET', 'POST'])
def login():
    # Check if session has expired
    if 'last_activity' in session:
        if (time.time() - session['last_activity']) > SESSION_LIFETIME:
            session.clear()
            return redirect(url_for('login'))

    session['last_activity'] = time.time()

    # Initialize alert variables
    alert_message = ""
    alert_type = "d-none"  # Initially, hide the alert

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM login WHERE BINARY username = %s AND BINARY password = %s', (username, password))
        account = cursor.fetchone()

        if account:
            session['loggedin'] = True
            session['user_id'] = account['user_id']
            session['username'] = account['username']
            return redirect(url_for('dashboard'))
        else:
            alert_message = "Incorrect username/password!"
            alert_type = "alert-danger"

    return render_template('index.html', alert_message=alert_message, alert_type=alert_type)

@app.route('/dashboard')
def dashboard():
    if 'loggedin' in session:
        return render_template('dashboard.html', username=session['username'])
    return redirect(url_for('login'))

@app.route('/addmusic')
def addmusic():
    if 'loggedin' in session:
        return render_template('addmusic.html')
    return redirect(url_for('login'))

@app.route('/listmusic')
def listmusic():
    if 'loggedin' in session:
        return render_template('listmusic.html')
    return redirect(url_for('login'))

# @app.route('/logout')
# def logout():
#     if 'loggedin' in session:
#         return render_template('logout.html')
#     return redirect(url_for('login'))


@app.route('/logout')
def logout():
     session.clear()
     return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)