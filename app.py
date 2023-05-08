from flask import Flask, request, jsonify, render_template
from chat import get_response

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_bot_response', methods=['POST'])
def get_bot_response():
    user_input = request.form['text']
    bot_response = get_response(user_input)
    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True)
