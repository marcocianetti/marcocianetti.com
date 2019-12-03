import * as React from 'react';
import NintendoGamepadButton from './NintendoGamepadButton';
import NintendoGamepadDirectionButtons from './NintendoGamepadDirectionButtons';
import NintendoGamepadSpecialButtons from './NintendoGamepadSpecialButtons';

type Props = {
    onStartButtonClick?(): void;
    className?: string;
};

export default function NintendoGamepad(props: Props) {
    return (
        <div className={props.className ? `nintendo-gamepad ${props.className}` : 'nintendo-gamepad'}>
            <NintendoGamepadDirectionButtons />
            
            <div className="nintendo-gamepad__section nintendo-gamepad__section--center">
                <NintendoGamepadSpecialButtons onStartButtonClick={props.onStartButtonClick} />
            </div>
            <div className="nintendo-gamepad__buttons">
                <NintendoGamepadButton color="rgb(10, 84, 164)" className="nintendo-gamepad__button--top" />
                <NintendoGamepadButton color="rgb(220, 67, 82)" className="nintendo-gamepad__button--right" />
                <NintendoGamepadButton color="rgb(251, 188, 93)" className="nintendo-gamepad__button--bottom" />
                <NintendoGamepadButton color="rgb(18, 127, 96)" className="nintendo-gamepad__button--left" />
            </div>
        </div>
    );
}