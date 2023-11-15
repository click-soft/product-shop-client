export default class DeviceUtils {
  static get isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }
}
