export default interface UserProfile {
  place: '전주' | '광주';
  userId: string;
  jisa: string;
  ykiho: string;
  saupkiho: string;
  name: string;
  ceoName: string;
  fitCherbang: boolean;
  fitYoungsu: boolean;
  admin?: boolean;
  email?: string;
  useBNPL?: boolean;
}

export const parseUserProfile = (data: any): UserProfile => {
  return {
    place: data.gubun === '001' ? '전주' : '광주',
    userId: '',
    jisa: data.jisa,
    ykiho: data.code,
    saupkiho: data.saupkiho,
    ceoName: data.daepyo,
    name: data.myung,
    fitCherbang: data.fitCherbang,
    fitYoungsu: data.fitYoungsu,
  };
};
