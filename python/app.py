
from flask import Flask, render_template, request, Response, url_for, redirect, send_file
import text
import os
import numpy as np
import io



app = Flask(__name__)

@app.route("/", methods = ['POST', 'GET'])
def index():

	if request.method == "POST":

		if request.files:



			file = request.files['image'].read() ## byte file
			npimg = np.frombuffer(file, np.uint8)
			

			return text.img2text(npimg)


	return 'Hello, World!'
	
if __name__ == "__main__":
	
	app.run(debug = True)
