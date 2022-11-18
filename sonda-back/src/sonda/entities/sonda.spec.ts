import { Test, TestingModule } from '@nestjs/testing';
import { Sonda } from './sonda.entity';
import { UnitController } from './unit_controller';




describe('Create Sonda Non-Http (e2e)', () => {

    const base_china  : UnitController =  UnitController.get_instance();
    const sonda_aplha : Sonda = new Sonda("sonda_aplha",base_china);
    const sonda_beta  : Sonda  = new Sonda("sonda_beta",base_china);

    it('should create a sonda A', () => {
        expect(sonda_aplha).toBeDefined();
    });

    it('should create a sonda B', () => {
        expect(sonda_beta).toBeDefined();
    });

    it('should move a sonda', () => {
        sonda_aplha.move();
        expect(sonda_aplha.position.x).toEqual(0);
        expect(sonda_aplha.position.y).toEqual(1);

        expect(base_china.get_sonda(sonda_aplha.id).position.x).toEqual(0);
        expect(base_china.get_sonda(sonda_aplha.id).position.y).toEqual(1);
    });

    it('should turn left a sonda', () => {
        sonda_aplha.turn_left();
        expect(sonda_aplha.direction).toEqual('E');
    });

    it('should turn left a sonda', () => {
        sonda_aplha.turn_left();
        expect(sonda_aplha.direction).toEqual('N');
    });

    it('should turn left a sonda', () => {
        sonda_aplha.turn_left();
        expect(sonda_aplha.direction).toEqual('W');
    });

    it('should turn left a sonda', () => {
        sonda_aplha.turn_left();
        expect(sonda_aplha.direction).toEqual('S');
    });

    it('should turn right a sonda', () => {
        sonda_aplha.turn_right();
        expect(sonda_aplha.direction).toEqual('W');
    });

    it('should turn right a sonda', () => {
        sonda_aplha.turn_right();
        expect(sonda_aplha.direction).toEqual('N');
    });

    it('should turn right a sonda', () => {
        sonda_aplha.turn_right();
        expect(sonda_aplha.direction).toEqual('E');
    });

    it('should turn right a sonda', () => {
        sonda_aplha.turn_right();
        expect(sonda_aplha.direction).toEqual('S');
    });

    it('should turn right a sonda', () => {
        sonda_aplha.turn_right();
        expect(sonda_aplha.direction).toEqual('W');
    });

    it('sondas order should be correct', () => {
        expect(base_china.get_sonda_order(sonda_aplha.id)).toEqual(0);
        expect(base_china.get_sonda_order(sonda_beta.id)).toEqual(1);
    });

});