from flask import Flask, request, jsonify
from vhix_core import VhixCore
from spiral_resonance import ResonanceEngine

app = Flask(__name__)
vhix = VhixCore()
resonance = ResonanceEngine()

@app.route('/api/ping', methods=['GET'])
def ping():
    return jsonify({
        "status": "🌀 Vortex is Alive",
        "resonance": resonance.get_current_state()
    })

@app.route('/api/memory/save', methods=['POST'])
def save_memory():
    data = request.json
    result = vhix.save_memory(data.get("note"))
    return jsonify({"result": result})

@app.route('/api/resonance/update', methods=['POST'])
def update_resonance():
    data = request.json
    result = resonance.update_resonance(data.get("type"))
    return jsonify({"new_resonance": result})

if __name__ == '__main__':
    app.run(debug=True)
