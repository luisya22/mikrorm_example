import { CustomBaseEntity } from './BaseEntity.js';
import * as User from './User.js';
import {EntitySchema, Ref} from '@mikro-orm/core';

export interface Model extends CustomBaseEntity {
    code: string,
    user: Ref<User.Model>,
    expirationDate?: Date,
}

export const Schema = new EntitySchema<Model, CustomBaseEntity>({
    name: 'verification_code',
    extends: 'CustomBaseEntity',
    properties: {
        code: {type: 'string'},
        user: {reference: 'm:1', entity: 'user', ref:true},
        expirationDate: {
            type: 'Date',
            nullable: true
        }
    }
})
