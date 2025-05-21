class VhixMemory:
    def __init__(self):
        self.entries = []

    def save(self, content):
        entry = {"id": len(self.entries) + 1, "content": content}
        self.entries.append(entry)
        return entry

    def get_all_entries(self):
        return self.entries

class VhixCore:
    def __init__(self):
        self.memory = VhixMemory()
