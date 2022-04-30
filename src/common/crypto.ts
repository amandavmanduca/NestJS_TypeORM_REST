import { hashSync } from 'bcryptjs';

export const hashPasswordTransform = {
  to(password: string): string {
    if (password) {
      const SALT_FACTOR = 10;
      const hash = hashSync(password, SALT_FACTOR);
      return hash;
    }
  },
  from(hash: string): string {
    if (hash) return hash;
  },
};
