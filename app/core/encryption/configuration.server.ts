import type {CipherKey, BinaryLike} from 'crypto';

export class EncryptionConfigurations
  implements Application.EncryptionConfigurations
{
  key: CipherKey =
    '656a7647a4f30ec74447e0d0f083c5c3bc5b28f04efe5aa0e6858aafc2887131';
  iv: BinaryLike =
    '8d0c4607ed49ea38cdda00d7230df83aef2608ebef0bf785c146d70c9ac34f5e';
}
