import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';
import { from, Observable } from 'rxjs';
import { UserStateService } from '../../repository/repo.state.user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class EncryptionService {
    private serverPublicKey: string | null = null;
    private aesKey: string | null = null;
    private iv: string | null = null;

    constructor(
        private ru: UserStateService,
        private router: Router,
    ) {
        // pas service dibuat, coba load AES & IV dari sessionStorage
        this.aesKey = sessionStorage.getItem('aesKey');
        this.iv = sessionStorage.getItem('iv');
    }

    setServerPublicKey(key: string) {
        this.serverPublicKey = key;
        sessionStorage.setItem('publicKey', key); // simpan ke sessionStorage

    }

    getServerPublicKey(): string | null {
        if (!this.serverPublicKey) {
            this.serverPublicKey = sessionStorage.getItem('publicKey');
        }
        return this.serverPublicKey;
    }


    // 🔑 Shared function
    prepareEncryptedPayload(data: any): Observable<string> {
        const publicKey = this.getServerPublicKey(); // ambil dari memory/session
        console.log('prepareEncryptedPayload ini publicKey:', publicKey);

        if (!publicKey) {
            localStorage.clear();
            this.router.navigate(['/login']);
            throw new Error('Public key missing. Please login again.');

        }

        const payload = JSON.stringify(data);

        let x = from(this.encrypt(payload).then(obj => JSON.stringify(obj)));

        console.log(this.encrypt(payload).then((c) => {
            console.log(c);
        }))

        return from(this.encrypt(payload).then(obj => JSON.stringify(obj)));
    }



    private ensureAesKey() {
        if (!this.aesKey || !this.iv) {
            this.aesKey = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Base64);
            this.iv = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Base64);

            // di simpen ke session biar bisa dipake lagi aeskey sama iv nya
            sessionStorage.setItem('aesKey', this.aesKey);
            sessionStorage.setItem('iv', this.iv);
        }

        return { aesKey: this.aesKey, iv: this.iv };
    }

    async encrypt(data: string): Promise<string> {
        if (!this.serverPublicKey) throw new Error('Server public key missing');

        const { aesKey, iv } = this.ensureAesKey();

        const aesKeyWA = CryptoJS.enc.Base64.parse(aesKey);
        const ivWA = CryptoJS.enc.Base64.parse(iv);
        const encrypted = CryptoJS.AES.encrypt(data, aesKeyWA, { iv: ivWA }).toString();

        const crypt = new JSEncrypt();
        crypt.setPublicKey(this.serverPublicKey);

        // cuma sekali pas login perlu dikirim ke server
        const encAes = crypt.encrypt(aesKey);
        const encIv = crypt.encrypt(iv);

        return `${encAes}::${encIv}::${encrypted}`;
    }

    decryptServerResponse(encryptedStr: string): string {
        console.log('encryptedStr');

        console.log("encryptedStr");
        console.log(encryptedStr);

        if (encryptedStr == 'null') {
            this.clearKeys();
            this.ru.logout();
        }

        if (!this.aesKey || !this.iv) {
            throw new Error("AES key/IV missing in client");
        }

        const aesKeyWA = CryptoJS.enc.Base64.parse(this.aesKey);
        const ivWA = CryptoJS.enc.Base64.parse(this.iv);

        // kalo data dari server masih format 3-part
        const parts = encryptedStr.split('::');

        console.log("parts");
        console.log(parts);

        const ciphertext = parts.length === 3 ? parts[2] : encryptedStr;

        const decrypted = CryptoJS.AES.decrypt(ciphertext, aesKeyWA, { iv: ivWA });

        console.log("decrypted");
        console.log(decrypted);
        console.log(decrypted.toString(CryptoJS.enc.Utf8));

        return decrypted.toString(CryptoJS.enc.Utf8);
    }


    clearKeys() {
        this.aesKey = null;
        this.iv = null;
        sessionStorage.removeItem('aesKey');
        sessionStorage.removeItem('iv');
    }
}
