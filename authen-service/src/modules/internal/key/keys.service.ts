import { Injectable, OnModuleInit } from '@nestjs/common';
import { promises as fs } from 'fs';
import { generateKeyPairSync } from 'crypto';
import * as path from 'path';
import { Logger } from '@nestjs/common';
const logger = new Logger('KeyService');

@Injectable()
export class KeyService implements OnModuleInit {
  private privateKeyPath = path.join(__dirname, '../../../keys/private.pem');
  private publicKeyPath = path.join(__dirname, '../../../keys/public.pem');

  async onModuleInit() {
    await this.ensureKeysExist();
  }

  private async ensureKeysExist() {
    try {
      await fs.access(this.privateKeyPath);
      await fs.access(this.publicKeyPath);
      logger.log('🔐 RSA keys already exist.');
    } catch {
      logger.log('🔑 Generating new RSA key pair...');
      const { privateKey, publicKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
      });

      await fs.writeFile(this.privateKeyPath, privateKey);
      await fs.writeFile(this.publicKeyPath, publicKey);
      logger.log('RSA key pair generated. ✅');
    }
  }

  async getPrivateKey() {
    return fs.readFile(this.privateKeyPath, 'utf8');
  }

  async getPublicKey() {
    return fs.readFile(this.publicKeyPath, 'utf8');
  }
}
