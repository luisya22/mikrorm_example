import { Collection, EntitySchema } from '@mikro-orm/core';
import {CustomBaseEntity} from './BaseEntity.js';
import * as VerificationCode from './VerificationCode.js';

export interface Model extends CustomBaseEntity {
    firstName: string,
    lastName: string,
    verificationCodes?: Collection<VerificationCode.Model>
}

export const Schema = new EntitySchema<Model, CustomBaseEntity>({
    name: 'user',
    extends: 'CustomBaseEntity',
    properties: {
        firstName: {type: 'string'},
        lastName: {type: 'string'},
        verificationCodes: {reference: '1:m', entity: 'verification_code'},
    }
});
