export class SondaEngine {
    public position: {
        x: number,
        y: number
    } = { x: 0, y: 0 };

    public direction: 'N' | 'S' | 'E' | 'W' = 'N';

    public send_notification: () => void = () => { };

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
        switch (this.direction) {
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

        this.send_notification();
    }

    public turn_right() {
        switch (this.direction) {
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

        this.send_notification();
    }
}