import {EntitySchema} from '@mikro-orm/core';

export interface CustomBaseEntity {
    id?: number,
    createdAt?: Date;
    updatedAt?: Date;
}

export const schema = new EntitySchema<CustomBaseEntity>({
    name: 'CustomBaseEntity',
    abstract: true,
    properties: {
        id: { 
            type: 'number', 
            primary: true 
        },
        createdAt: {
            type: 'Date', 
            onCreate: () => new Date(), 
                defaultRaw: 'now()'
        },
        updatedAt: { 
            type: 'Date', 
            onCreate: () => new Date(), 
                onUpdate: () => new Date(),
                defaultRaw: 'now()',
        },
    }
});
