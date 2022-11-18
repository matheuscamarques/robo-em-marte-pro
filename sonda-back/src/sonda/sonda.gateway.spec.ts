import { Test, TestingModule } from '@nestjs/testing';
import { Sonda } from './entities/sonda';
import { UnitController } from './entities/unit_controller';
import { SondaGateway } from './sonda.gateway';

describe('SondaGateway', () => {
  let gateway: SondaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SondaGateway],
    }).compile();

    gateway = module.get<SondaGateway>(SondaGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('move sonda LMLMLMLMM' ,() => {
    const base  = UnitController.get_instance();
    const sonda = Sonda.factory('test',base);
    sonda.direction = 'N';
    sonda.position = {x: 1, y: 2};
    base.interpret_command('test','LMLMLMLMM');
    expect(sonda.position).toEqual({x: 1, y: 3});
    expect(sonda.direction).toEqual('N');
  });

  it('move sonda MRRMMRMRRM' ,() => {
    const base = UnitController.get_instance();
    const sonda = Sonda.factory('test',base);
    sonda.direction = 'E';
    sonda.position = {x: 3, y: 3};
    base.interpret_command('test','MRRMMRMRRM'); 
    expect(sonda.position).toEqual({x: 2, y: 3});
    expect(sonda.direction).toEqual('S');
  });

  const base_china  : UnitController =  UnitController.get_instance();
    const sonda_aplha : Sonda  =  Sonda.factory("sonda_aplha",base_china);
    const sonda_beta  : Sonda  =  Sonda.factory("sonda_beta",base_china);

    it('should create a sonda A', () => {
        expect(sonda_aplha).toBeDefined();
    });

    it('should create a sonda B', () => {
        expect(sonda_beta).toBeDefined();
    });

    it('should move a sonda', () => {
        sonda_aplha.move();
        expect(sonda_aplha.position.x).toEqual(0);
        expect(sonda_aplha.position.y).toEqual(-1);

        expect(base_china.get_sonda(sonda_aplha.id).position.x).toEqual(0);
        expect(base_china.get_sonda(sonda_aplha.id).position.y).toEqual(-1);
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
