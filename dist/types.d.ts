/**
 * SDK 提供的 interface
 */
export { AlipaySdkConfig, AlipaySdkCommonResult } from 'alipay-sdk';
/**
 * SDK 类型
 */
export declare type SdkType = 'cert' | 'simple';
/**
 * Interface of the simple literal object with any string keys.
 */
export interface ObjectLiteral {
    [key: string]: any;
}
/**
 * 无需加密的接口
 *
 * @param: oauthToken `string` alipay.system.oauth.token
 * @param: code `string` 调用许可码
 * @param: refreshToken `string` 刷新许可码
 */
export interface ExecOptions {
    code: string;
    oauthToken: string;
    refreshToken: string;
}
/**
 * 需要AES加解密的接口
 *
 * @param: aesSet `string` alipay.open.auth.app.aes.set
 * @param: merchantAppId `string` 商家 ID
 */
export interface ExecByAesOptions {
    aesSet: string;
    merchantAppId: string;
}
