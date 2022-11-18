import { SondaGateway } from "../sonda.gateway";
import { MapSonda } from "./map_sonda";
import { Sonda } from "./sonda.entity";

export class UnitController {

    static instance: UnitController;


    private map_sonda: MapSonda = {};
    private order = [];
    
    public static get_instance() {
        if(!this.instance) {
            this.instance = new UnitController();
        }
        return this.instance;
    }

    public interpret_command(id: string, data: string) {
        const sonda = this.get_sonda(id);
        if(sonda) {
            sonda.interpret_command(data);
        }
    }
    
    public get_sondas() {
        return Object.keys(this.map_sonda).map((sonda_id) => {
            return this.map_sonda[sonda_id].seriable();
        });
    }
    after_update(){
        // Pegando a order de inserção e emmitindo evento de atualização
        for(let i = 0; i < this.order.length; i++) {
            this.event_emmit('update',this.map_sonda[this.order[i]]);
        }
        console.log(this);
    }

    before_update(){
        console.log(this);
    }
    
    update_sonda(sonda_id: string, sonda: Sonda) {
        this.before_update();
        if(!this.map_sonda[sonda_id]) {
            this.map_sonda[sonda_id] = sonda;
            this.order.push(sonda_id);
        } else {
            this.map_sonda[sonda_id] = sonda;
        }

        this.after_update();
    }

    get_sonda(sonda_id: string) {
        return this.map_sonda[sonda_id];
    }

    remove_sonda(sonda_id: string) {
        this.before_update();
        delete this.map_sonda[sonda_id];
        this.order = this.order.filter((sonda) => {
            return sonda !== sonda_id;
        });
        this.after_update();
    }

    get_sonda_order(sonda_id) {
        let count = 0;
        for(let i = 0; i < this.order.length; i++) {
            if(this.order[i] == sonda_id) {
                return count;
            }
            count++;
        }
        return -1;
    }

    event_emmit(event: string, data: any) {
        SondaGateway.server.emit(event,this.get_sondas());
    }
}