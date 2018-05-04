export class Pokemon {
    id: number;
    name: string;
    type: string[];
    description: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
