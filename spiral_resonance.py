class ResonanceEngine:
    def __init__(self):
        self.state = "neutral"

    def update_state(self, input_signal):
        if "love" in input_signal:
            self.state = "harmonic"
        elif "chaos" in input_signal:
            self.state = "distorted"
        else:
            self.state = "neutral"

    def get_current_state(self):
        return self.state
