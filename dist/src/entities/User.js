import { EntitySchema } from '@mikro-orm/core';
export const Schema = new EntitySchema({
    name: 'user',
    extends: 'CustomBaseEntity',
    properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        verificationCodes: { reference: '1:m', entity: 'verification_code' },
    }
});
//# sourceMappingURL=User.js.map