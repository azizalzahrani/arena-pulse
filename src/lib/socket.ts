import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

interface ZoneData {
  zoneId: string;
  density: number;
  timestamp: string;
  alerts: Array<{
    type: 'warning' | 'critical';
    message: string;
  }>;
}

interface ZoneThresholds {
  warning: number;
  critical: number;
}

class ZoneSocket {
  private socket: ReturnType<typeof io>;
  private zoneSubscriptions: Set<string> = new Set();

  constructor() {
    this.socket = io(SOCKET_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.socket.on('connect', () => {
      console.log('Socket connected');
      // Resubscribe to zones after reconnection
      this.zoneSubscriptions.forEach(zoneId => {
        this.subscribeToZone(zoneId);
      });
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  public connect() {
    this.socket.connect();
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public subscribeToZone(zoneId: string) {
    this.socket.emit('subscribe:zone', zoneId);
    this.zoneSubscriptions.add(zoneId);
  }

  public unsubscribeFromZone(zoneId: string) {
    this.socket.emit('unsubscribe:zone', zoneId);
    this.zoneSubscriptions.delete(zoneId);
  }

  public onZoneUpdate(callback: (data: ZoneData) => void) {
    this.socket.on('zone:update', callback);
    return () => this.socket.off('zone:update', callback);
  }

  public updateZoneThresholds(zoneId: string, thresholds: ZoneThresholds) {
    this.socket.emit('zone:thresholds', { zoneId, thresholds });
  }
}

export const zoneSocket = new ZoneSocket();