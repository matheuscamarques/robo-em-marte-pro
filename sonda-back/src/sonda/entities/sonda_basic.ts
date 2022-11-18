import { Serializable } from "./serializable";
import { SondaEngine } from "./sonda_engine";

export class SondaBasic extends SondaEngine implements Serializable {
    public id: string;
    public serialize() {
        return {
            id: this.id,
            position: this.position,
            direction: this.direction
        }
    }
}