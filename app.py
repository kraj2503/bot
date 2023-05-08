from flask import Flask,render_template,request ,jsonify
from flask import send_from_directory
from chat import get_response

app = Flask(__name__)

@app.get("/")
def index_get():
    return render_template('index.html')

@app.post("/")
def predict():

    print("helllo")
    # text = request.get_json("message")
    text = request.args.get("message")
    response = get_response(text['message'])
    #print(response)
    message={"answer":response}
    message = {"answer": str(message['answer'])}
    print(message['answer'])
    return jsonify(message)
    #return str(text)

if __name__ == "__main__":
    app.run(debug = True)
