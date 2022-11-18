import { randomUUID } from "crypto";
import { UnitController } from "./unit_controller";

const sleep = (milliseconds:number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export class Sonda {


    public id: string;
    public position: {
        x: number,
        y: number
    } = {x:0,y:0};

    public direction: 'N' | 'S' | 'E' | 'W' = 'S';

    
    public unit_controller: UnitController;

    private moviment_map = {
        'N': this.move_north,
        'S': this.move_south,
        'E': this.move_east,
        'W': this.move_west
    };

    public seriable() {
        return {
            id: this.id,
            position: this.position,
            direction: this.direction
        }
    }

    private constructor(id :string, unit_controller: UnitController){
        this.unit_controller = unit_controller;
        this.id = id;
        this.unit_controller.update_sonda(this.id, this);
    }

    static factory(id: string, base: UnitController) {
        return new Sonda(id, base);
      }

    public async interpret_command(data: string) {
        const commands = data.split('');
        commands.forEach(command => {
            switch(command) {
                case 'M':
                    this.move();
                    sleep(3000);
                    break;
                case 'L':
                    this.turn_left();
                    break;
                case 'R':
                    this.turn_right();
                    break;
            }
            this.unit_controller.update_sonda(this.id, this);
        });
    }

    public move() {
        this.moviment_map[this.direction].call(this);
        this.unit_controller.update_sonda(this.id, this);
    }

    public move_north() {
        this.position.y += 1;
    }

    public move_south() {
        this.position.y -= 1;
    }

    public move_east() {
        this.position.x += 1;
    }

    public move_west() {
        this.position.x -= 1;
    }

    public turn_left() {
        switch(this.direction) {
            case 'N':
                this.direction = 'W';
                break;
            case 'S':
                this.direction = 'E';
                break;
            case 'E':
                this.direction = 'N';
                break;
            case 'W':
                this.direction = 'S';
                break;
        }

        this.unit_controller.update_sonda(this.id, this);
    }

    public turn_right() {
        switch(this.direction) {
            case 'N':
                this.direction = 'E';
                break;
            case 'S':
                this.direction = 'W';
                break;
            case 'E':
                this.direction = 'S';
                break;
            case 'W':
                this.direction = 'N';
                break;
        }

        this.unit_controller.update_sonda(this.id, this);
    }

}
