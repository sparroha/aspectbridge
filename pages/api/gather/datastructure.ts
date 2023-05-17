import { useRef } from "react";

//export default async function dataStruct(req, res) {return null; res.status(200).json({ alert: 'dataStruct' })}
export type Environment = {
    id: number;
    name: string;
    description: string;
    image: string;
    type: string;
    status: string;
};
export type Entity = {
    id: any,
    name: string,
    type: string,
    position: {x: number, y: number},
    vector: {x: number, y: number},
    pathing?: (environment: Environment) => Environment,//NYI
}
export type GameData = {
    sessionid: string,
    player: Entity,
    entities: Entity[],
    environments: Environment[],
    data: any,
    update: (data: any) => void,
    request: (data: any) => void,
}
export const GameData: {current: any} = useRef({})
export interface EntityConstructor {
    new (id: any, name: string, type: string, position: {x: number, y: number}, vector: {x: number, y: number}): Entity;
}
function getNearEntities(entity: Entity, entities: Entity[], radius: number): Entity[] {
    return entities.filter((e) => {
        return (e.id !== entity.id) && (Math.abs(e.position.x - entity.position.x) < radius) && (Math.abs(e.position.y - entity.position.y) < radius);
    });
}
function getNearEntitiesByType(entity: Entity, entities: Entity[], radius: number, type: string): Entity[] {
    return entities.filter((e) => {
        return (e.id !== entity.id) && (Math.abs(e.position.x - entity.position.x) < radius) && (Math.abs(e.position.y - entity.position.y) < radius) && (e.type === type);
    });
}
function getNearEntitiesByTypes(entity: Entity, entities: Entity[], radius: number, types: string[]): Entity[] {
    return entities.filter((e) => {
        return (e.id !== entity.id) && (Math.abs(e.position.x - entity.position.x) < radius) && (Math.abs(e.position.y - entity.position.y) < radius) && (types.includes(e.type));
    });
}

export default class DataStructure {
    entities: Entity[];
    environments: Environment[];
    constructor() {
        this.entities = [];
        this.environments = [];
    }
    addEntity(entity: Entity) {
        this.entities.push(entity);
    }
    addEnvironment(environment: Environment) {
        this.environments.push(environment);
    }
    getNearEntities(entity: Entity, radius: number): Entity[] {
        return getNearEntities(entity, this.entities, radius);
    }
    getNearEntitiesByType(entity: Entity, radius: number, type: string): Entity[] {
        return getNearEntitiesByType(entity, this.entities, radius, type);
    }
    getNearEntitiesByTypes(entity: Entity, radius: number, types: string[]): Entity[] {
        return getNearEntitiesByTypes(entity, this.entities, radius, types);
    }
    getEntityById(id: any): Entity {
        return this.entities.filter((e) => {
            return e.id === id;
        })[0];
    }
    getEnvironmentById(id: any): Environment {
        return this.environments.filter((e) => {
            return e.id === id;
        })[0];
    }
    getEntitiesByType(type: string): Entity[] {
        return this.entities.filter((e) => {
            return e.type === type;
        });
    }
    getEnvironmentsByType(type: string): Environment[] {
        return this.environments.filter((e) => {
            return e.type === type;
        });
    }
    getEntitiesByTypes(types: string[]): Entity[] {
        return this.entities.filter((e) => {
            return types.includes(e.type);
        });
    }
    getEnvironmentsByTypes(types: string[]): Environment[] {
        return this.environments.filter((e) => {
            return types.includes(e.type);
        });
    }
    getEntitiesByPosition(position: {x: number, y: number}): Entity[] {
        return this.entities.filter((e) => {
            return (e.position.x === position.x) && (e.position.y === position.y);
        });
    }
    getEntitiesByPositions(positions: {x: number, y: number}[]): Entity[] {
        return this.entities.filter((e) => {
            return positions.some((p) => {
                return (e.position.x === p.x) && (e.position.y === p.y);
            });
        });
    }
}