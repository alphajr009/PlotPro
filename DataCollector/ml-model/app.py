from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask ()
CORS(app)