import { EntitySchema } from '@mikro-orm/core';
export const Schema = new EntitySchema({
    name: 'verification_code',
    extends: 'CustomBaseEntity',
    properties: {
        code: { type: 'string' },
        user: { reference: 'm:1', entity: 'user', ref: true },
        expirationDate: {
            type: 'Date',
            nullable: true
        }
    }
});
//# sourceMappingURL=VerificationCode.js.map