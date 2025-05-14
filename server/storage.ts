import { users, type User, type InsertUser, EssenceEntry, InsertEssenceEntry, Hint, InsertHint, Message, InsertMessage } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Essence Entry methods
  getAllEssenceEntries(): Promise<EssenceEntry[]>;
  getEssenceEntry(id: number): Promise<EssenceEntry | undefined>;
  createEssenceEntry(entry: InsertEssenceEntry): Promise<EssenceEntry>;
  
  // Hint methods
  getAllHints(): Promise<Hint[]>;
  getHint(id: number): Promise<Hint | undefined>;
  createHint(hint: InsertHint): Promise<Hint>;
  
  // Message methods
  getAllMessages(): Promise<Message[]>;
  getMessage(id: number): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private essenceEntries: Map<number, EssenceEntry>;
  private hints: Map<number, Hint>;
  private messages: Map<number, Message>;
  
  private userIdCounter: number;
  private essenceEntryIdCounter: number;
  private hintIdCounter: number;
  private messageIdCounter: number;

  constructor() {
    this.users = new Map();
    this.essenceEntries = new Map();
    this.hints = new Map();
    this.messages = new Map();
    
    this.userIdCounter = 1;
    this.essenceEntryIdCounter = 1;
    this.hintIdCounter = 1;
    this.messageIdCounter = 1;
    
    // Initialize with some default hints
    this.initializeHints();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Essence Entry methods
  async getAllEssenceEntries(): Promise<EssenceEntry[]> {
    return Array.from(this.essenceEntries.values()).sort((a, b) => b.id - a.id);
  }
  
  async getEssenceEntry(id: number): Promise<EssenceEntry | undefined> {
    return this.essenceEntries.get(id);
  }
  
  async createEssenceEntry(insertEntry: InsertEssenceEntry): Promise<EssenceEntry> {
    const id = this.essenceEntryIdCounter++;
    const entry: EssenceEntry = { 
      ...insertEntry, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.essenceEntries.set(id, entry);
    return entry;
  }
  
  // Hint methods
  async getAllHints(): Promise<Hint[]> {
    return Array.from(this.hints.values());
  }
  
  async getHint(id: number): Promise<Hint | undefined> {
    return this.hints.get(id);
  }
  
  async createHint(insertHint: InsertHint): Promise<Hint> {
    const id = this.hintIdCounter++;
    const hint: Hint = { ...insertHint, id };
    this.hints.set(id, hint);
    return hint;
  }
  
  // Message methods
  async getAllMessages(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }
  
  async getMessage(id: number): Promise<Message | undefined> {
    return this.messages.get(id);
  }
  
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageIdCounter++;
    const message: Message = { 
      ...insertMessage, 
      id, 
      timestamp: new Date().toISOString() 
    };
    this.messages.set(id, message);
    return message;
  }
  
  // Initialize with default hints
  private initializeHints() {
    const defaultHints = [
      {
        title: 'Quantum Gateway',
        description: 'Reveals the path to the inner sanctum',
        content: 'The gateway is activated by focused intention. Concentrate on your desired destination within the Arkadia system.',
        relatedSection: 'gateway'
      },
      {
        title: 'Akashic Cipher',
        description: 'Uncover the hidden meaning behind the symbols',
        content: 'The symbols represent frequency patterns that activate dormant neural pathways. Study them with both logical and intuitive awareness.',
        relatedSection: 'arkana'
      },
      {
        title: 'Crystal Resonance',
        description: 'Align the frequency patterns for optimal flow',
        content: 'Your essence entry contains quantum signature patterns. Make sure to express your true nature rather than conceptual identities.',
        relatedSection: 'essentia'
      }
    ];
    
    defaultHints.forEach(hint => {
      const id = this.hintIdCounter++;
      this.hints.set(id, { ...hint, id });
    });
  }
}

export const storage = new MemStorage();
