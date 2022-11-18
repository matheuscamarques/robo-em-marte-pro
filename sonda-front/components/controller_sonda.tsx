import { useState } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { Socket } from "socket.io-client"

type ControllerSondaProps = {
    socket: Socket;
}
export const ControllerSonda: React.FC<ControllerSondaProps> = ({ socket }) => {

    const [terminalLineData, setTerminalLineData] = useState([
        <TerminalOutput key={Math.random()}>Envie Comandos Para sua Sonda! </TerminalOutput>
    ]);

    const onInput = (input: string) => {
        const input_parsed = input.toUpperCase();
        socket.emit('command', input_parsed);
        setTerminalLineData([...terminalLineData, <TerminalOutput key={Math.random()}>{input_parsed}</TerminalOutput>]);

    }
    // Terminal has 100% width by default so it should usually be wrapped in a container div
    return (
        <div className="container">
            <Terminal colorMode={ColorMode.Dark} 
                onInput={onInput}>
                {terminalLineData}
            </Terminal>
        </div>
    )
}