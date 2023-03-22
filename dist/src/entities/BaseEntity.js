import { EntitySchema } from '@mikro-orm/core';
export const schema = new EntitySchema({
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
//# sourceMappingURL=BaseEntity.js.map