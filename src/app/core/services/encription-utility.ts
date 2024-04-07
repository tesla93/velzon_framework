import CryptoES from "crypto-es";

export class EncriptionUtility {
  static encryptData(data: any, encryptSecretKey: any) {

    try {
      return CryptoES.AES.encrypt(JSON.stringify(data), encryptSecretKey).toString();
    } catch (e) {
      return null
    }
  }

  static decryptData(data: any, encryptSecretKey: any) {

    try {
      const bytes = CryptoES.AES.decrypt(data, encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoES.enc.Utf8));
      }
      return data;
    } catch (e) {
      return null
    }
  }
}