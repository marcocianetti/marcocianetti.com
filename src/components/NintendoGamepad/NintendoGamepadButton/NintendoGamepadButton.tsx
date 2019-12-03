import * as React from 'react';

type Props = {
    color: string;

    onClick?(): void;
    className?: string;
};

export default function NintendoGamepadButton(props: Props) {
    return (
        <button 
            onClick={props.onClick}
            style={{ backgroundColor: props.color }} 
            className={props.className ? `nintendo-gamepad__button ${props.className}` : `nintendo-gamepad__button`}
        />
    );
}