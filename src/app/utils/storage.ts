export interface User {
  id: string;
  name: string;
  email: string;
  role: 'need-help' | 'can-help' | 'both';
  skills: string[];
  interests: string[];
  location: string;
  trustScore: number;
  helpGiven: number;
  helpReceived: number;
  badges: string[];
  avatar?: string;
}

export interface Request {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: 'low' | 'medium' | 'high';
  tags: string[];
  authorId: string;
  authorName: string;
  status: 'open' | 'in-progress' | 'solved';
  helpers: string[];
  createdAt: string;
  aiSummary?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  message: string;
  read: boolean;
  timestamp: string;
  link?: string;
}

// AI Category Detection
export function detectCategory(title: string, description: string): string {
  const text = (title + ' ' + description).toLowerCase();

  if (text.match(/\b(react|vue|angular|javascript|typescript|node|html|css|frontend|backend|api|database)\b/)) {
    return 'Web Development';
  }
  if (text.match(/\b(python|java|c\+\+|golang|rust|programming|code|algorithm)\b/)) {
    return 'Programming';
  }
  if (text.match(/\b(figma|design|ui|ux|sketch|adobe|photoshop|illustration)\b/)) {
    return 'Design';
  }
  if (text.match(/\b(data|analysis|visualization|machine learning|ai|ml|analytics)\b/)) {
    return 'Data & AI';
  }
  if (text.match(/\b(career|interview|resume|job|internship|mentor)\b/)) {
    return 'Career';
  }

  return 'General';
}

export function detectUrgency(title: string, description: string): 'low' | 'medium' | 'high' {
  const text = (title + ' ' + description).toLowerCase();

  if (text.match(/\b(urgent|asap|emergency|deadline|tomorrow|today|critical)\b/)) {
    return 'high';
  }
  if (text.match(/\b(soon|this week|upcoming|needed)\b/)) {
    return 'medium';
  }

  return 'low';
}

export function suggestTags(title: string, description: string): string[] {
  const text = (title + ' ' + description).toLowerCase();
  const tags: string[] = [];

  const tagMap: Record<string, string> = {
    'react': 'React',
    'vue': 'Vue',
    'angular': 'Angular',
    'javascript': 'JavaScript',
    'typescript': 'TypeScript',
    'python': 'Python',
    'java': 'Java',
    'node': 'Node.js',
    'api': 'API',
    'css': 'CSS',
    'html': 'HTML',
    'figma': 'Figma',
    'design': 'Design',
    'ui': 'UI',
    'ux': 'UX',
    'data': 'Data',
    'ml': 'Machine Learning',
    'portfolio': 'Portfolio',
    'interview': 'Interview',
  };

  for (const [keyword, tag] of Object.entries(tagMap)) {
    if (text.includes(keyword)) {
      tags.push(tag);
    }
  }

  return [...new Set(tags)].slice(0, 5);
}

// Storage utilities
export const storage = {
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  },

  getRequests(): Request[] {
    const requestsStr = localStorage.getItem('requests');
    return requestsStr ? JSON.parse(requestsStr) : [];
  },

  setRequests(requests: Request[]): void {
    localStorage.setItem('requests', JSON.stringify(requests));
  },

  addRequest(request: Request): void {
    const requests = this.getRequests();
    requests.unshift(request);
    this.setRequests(requests);
  },

  updateRequest(id: string, updates: Partial<Request>): void {
    const requests = this.getRequests();
    const index = requests.findIndex(r => r.id === id);
    if (index !== -1) {
      requests[index] = { ...requests[index], ...updates };
      this.setRequests(requests);
    }
  },

  getMessages(): Message[] {
    const messagesStr = localStorage.getItem('messages');
    return messagesStr ? JSON.parse(messagesStr) : [];
  },

  addMessage(message: Message): void {
    const messages = this.getMessages();
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
  },

  getNotifications(): Notification[] {
    const notificationsStr = localStorage.getItem('notifications');
    return notificationsStr ? JSON.parse(notificationsStr) : [];
  },

  addNotification(notification: Notification): void {
    const notifications = this.getNotifications();
    notifications.unshift(notification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
  },

  markNotificationRead(id: string): void {
    const notifications = this.getNotifications();
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  },

  initializeDemoData(): void {
    if (!localStorage.getItem('initialized')) {
      const demoRequests: Request[] = [
        {
          id: '1',
          title: 'Need help making my portfolio responsive before demo day',
          description: 'My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.',
          category: 'Web Development',
          urgency: 'high',
          tags: ['HTML/CSS', 'Responsive', 'Portfolio'],
          authorId: 'sara',
          authorName: 'Sara Noor',
          status: 'open',
          helpers: [],
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          aiSummary: 'Web Development request with high urgency. Best suited for members with relevant expertise.',
        },
        {
          id: '2',
          title: 'Looking for Figma feedback on a volunteer event poster',
          description: 'I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.',
          category: 'Design',
          urgency: 'medium',
          tags: ['Figma', 'Poster', 'Design Review'],
          authorId: 'ayesha',
          authorName: 'Ayesha Khan',
          status: 'in-progress',
          helpers: ['john'],
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          aiSummary: 'A visual design critique request where feedback on hierarchy, spacing, and messaging would create the most value.',
        },
        {
          id: '3',
          title: 'Need mock interview support for internship applications',
          description: 'Career coaching request focused on confidence-building, behavioral answers, and entry-level frontend interviews.',
          category: 'Career',
          urgency: 'low',
          tags: ['Career', 'Interview', 'Frontend'],
          authorId: 'rahul',
          authorName: 'Rahul Sharma',
          status: 'open',
          helpers: [],
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        },
      ];

      this.setRequests(demoRequests);
      localStorage.setItem('initialized', 'true');
    }
  },
};
