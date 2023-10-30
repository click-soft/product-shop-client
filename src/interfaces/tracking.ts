export interface TrackingStatus {
  id: string;
  text: string;
}

export interface TrackingFromTo {
  name?: string;
  time?: Date;
}

export interface TrackingProgress {
  time: Date;
  status: TrackingStatus;
  description: string;
  location: {
    name: string;
  };
}

export interface TrackingResult {
  carrier?: {
    id: string;
    name: string;
    tel: string;
  };
  from?: TrackingFromTo;
  to?: TrackingFromTo;
  progresses?: TrackingProgress[];
  state?: TrackingStatus;
  message?: string;
}
