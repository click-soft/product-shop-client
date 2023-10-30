import axios from 'axios';
import { deliveryData as deliveryTrackingData } from '../shared/text-mapping';
import { TrackingResult } from '../interfaces/tracking';

const BASE_URL = 'https://apis.tracker.delivery/carriers';

const useDeliveryTracking = () => {
  const fetchTracking = async ({ name, trackingNumber }: TrackingType): Promise<TrackingResult> => {
    const carrierId = deliveryTrackingData[name];

    if (!carrierId) {
      return { message: '배송사 코드 오류' };
    }

    const result = await axios.get(`${BASE_URL}/${carrierId}/tracks/${trackingNumber}`);

    return result.data;
  };

  const convertBigoToTrackings = (bigo?: string) => {
    if (!bigo) return;
    const bigoArr = bigo.split(/,|\//).map((b) => b.trim());

    const trackings: TrackingType[] = [];

    bigoArr.forEach((b) => {
      const [name, number] = b.split(' ');

      if (name && number) {
        trackings.push(new TrackingType(name.toLowerCase(), number));
      } else if (!number && name) {
        if (trackings.length === 0) return;
        const number = name;
        const prevName = trackings[trackings.length - 1].name;

        trackings.push(new TrackingType(prevName, number));
      }
    });

    return trackings;
  };

  return {
    fetchTracking,
    convertBigoToTrackings,
  };
};

export class TrackingType {
  constructor(public name: string, public number: string) {}

  get trackingNumber() {
    const numbersOnly = this.number?.match(/\d+/g);
    return numbersOnly?.join('');
  }
}
export default useDeliveryTracking;
