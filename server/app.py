from flask import Flask, jsonify, request
from vhix_core import VhixCore
from spiral_resonance import ResonanceEngine

app = Flask(__name__)

# Initialize VhixCore and ResonanceEngine
vhix = VhixCore()
resonance = ResonanceEngine()

# Basic health and status check
@app.route("/api/ping", methods=["GET"])
def ping():
    return jsonify({
        "status": "🌀 Vortex Active",
        "resonance_state": resonance.get_current_state(),
        "memory_nodes": len(vhix.memory.get_all_entries())  # Ensure get_all_entries() returns a list
    })

# Update resonance state with symbolic input
@app.route("/api/resonance", methods=["POST"])
def update_resonance():
    data = request.get_json()
    input_data = data.get("input", "")
    resonance.update_state(input_data)
    return jsonify({"updated_resonance": resonance.get_current_state()})

# Store memory entry from input
@app.route("/api/memory", methods=["POST"])
def store_memory():
    data = request.get_json()
    content = data.get("content", "")
    if not content:
        return jsonify({"error": "Missing 'content' in request"}), 400
    entry = vhix.memory.save(content)
    return jsonify({"stored": entry})

# Retrieve all memory nodes
@app.route("/api/memory", methods=["GET"])
def list_memory():
    return jsonify(vhix.memory.get_all_entries())

# Guard this for local dev use only
if __name__ == "__main__":
    app.run(debug=True)
