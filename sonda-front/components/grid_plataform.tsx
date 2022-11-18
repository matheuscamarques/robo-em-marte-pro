import { Sonda } from "../entity/sonda";
import Image from 'next/image'

type GridPlataformProps = {
    sondas: Sonda[];
}

export const GridPlataform: React.FC<GridPlataformProps> = ({sondas}) => {
    const m = 10;
    const n = 10;
    const elements = [];

    function searchSonda(x: number, y: number) {
        return sondas.find(sonda => sonda.position.x === x && sonda.position.y === y);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const sonda = searchSonda(j, i);

            let rotation = 0;

            switch (sonda?.direction) {
                // ! Por conta de norte e sul estarem invertidos, é necessário inverter a rotação
                // ! para que a imagem fique correta
                // ! no backend quando andamos para o norte a posição y aumenta
                // ! no frontend quando andamos para o norte a posição y diminui 
                // ! por isso é necessário inverter a rotação
                case 'N':
                    rotation = 180;
                    break;
                case 'E':
                    rotation = 90;
                    break;
                case 'S':
                    rotation = 0;
                    break;
                case 'W':
                    rotation = 270;
                    break;
            }


            elements.push(<div key={`[${j}][${i}]`} className="grid-item" >
                {sonda ? <div className="sonda">
                    <Image src="/sonda.png" alt="me" width="50" height="50" 
                        style={{transform: `rotate(${rotation}deg)`}} />
                
                </div> : null}
            </div>)
        }
    }


    return (
        <div className="grid-container">
            {elements}
        </div>

    )
}