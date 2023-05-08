from flask import Flask, request, jsonify, render_template, url_for
from chat import get_response


app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/get")
def get_bot_response():
    user_input = request.args.get('msg')
    # print(user_input)
    return str(get_response(user_input))


@app.route("/chatbot_api", methods=['POST'])
def chatbot_api():
    data = request.get_json(force=True)
    print(request.data)
    message = data['message']
    return jsonify({'response': get_response(message)})


if __name__ == "__main__":
    app.run(debug=True)
