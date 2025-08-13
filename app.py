from flask import Flask, render_template, send_from_directory

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/utils/init.js')
def utils():
    return send_from_directory('static/utils', 'init.js')

if __name__ == '__main__':
    app.run('0.0.0.0', port=5200, debug=True)
