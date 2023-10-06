export default interface UserProfile {
  place: "전주" | "광주";
  jisa: string;
  ykiho: string;
  saupkiho: string;
  name: string;
  ceoName: string;
  fitCherbang: boolean;
  fitYoungsu: boolean;
}

export const parseUserProfile = (data: any): UserProfile => {
  return {
    place: data.gubun === "001" ? '전주' : "광주",
    jisa: data.jisa,
    ykiho: data.code,
    saupkiho: data.saupkiho,
    ceoName: data.daepyo,
    name: data.myung,
    fitCherbang: data.fitCherbang,
    fitYoungsu: data.fitYoungsu,
  }
}