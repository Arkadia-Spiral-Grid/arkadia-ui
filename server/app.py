from flask import Flask, jsonify, request
from vhix_core import VhixCore
from spiral_resonance import ResonanceEngine

app = Flask(__name__)
vhix = VhixCore()
resonance = ResonanceEngine()

@app.route("/api/ping", methods=["GET"])
def ping():
    return jsonify({
        "status": "🌀 Vortex Active",
        "resonance_state": resonance.get_current_state(),
        "memory_nodes": len(vhix.memory.get_all_entries())
    })

@app.route("/api/resonance", methods=["POST"])
def update_resonance():
    data = request.get_json()
    resonance.update_state(data.get("input", ""))
    return jsonify({"updated_resonance": resonance.get_current_state()})

@app.route("/api/memory", methods=["POST"])
def store_memory():
    data = request.get_json()
    entry = vhix.memory.save(data.get("content", ""))
    return jsonify({"stored": entry})

@app.route("/api/memory", methods=["GET"])
def list_memory():
    return jsonify(vhix.memory.get_all_entries())

# Remove this block or keep it guarded, as Vercel doesn't use this
if __name__ == "__main__":
    app.run(debug=True)
