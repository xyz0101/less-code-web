import {JSEncrypt} from 'jsencrypt';

export class SecurityUtils{
    static encrypt(publicKey,data):any {
        var jse = new JSEncrypt({default_key_size:1024});
        jse.setPublicKey(publicKey);
        var encrypted = jse.encrypt(JSON.stringify(data));
        return encrypted;
    }
}