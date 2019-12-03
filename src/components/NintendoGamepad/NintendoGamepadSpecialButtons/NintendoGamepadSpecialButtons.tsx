import * as React from 'react';

type SpecialButtonProps = {
    children?: any;
    onClick?(): void;
};

function NintendoGamepadSpecialButton(props: SpecialButtonProps) {
    return (
        <div className="nintendo-gamepad__special-button">
            <button onClick={props.onClick} className="nintendo-gamepad__special-button__button" />
            <span className="nintendo-gamepad__special-button__text">{props.children}</span>
        </div>
    )
}

type Props = {
    onSelectButtonClick?(): void;
    onStartButtonClick?(): void;
    className?: string;
};

export default function NintendoGamepadSpecialButtons(props: Props) {
    return (
        <div
            className={props.className ? `nintendo-gamepad__special-buttons ${props.className}` : `nintendo-gamepad__special-buttons`}
        >
            <NintendoGamepadSpecialButton onClick={props.onSelectButtonClick}>
                Select
            </NintendoGamepadSpecialButton>
            <NintendoGamepadSpecialButton onClick={props.onStartButtonClick}>
                Start
            </NintendoGamepadSpecialButton>
        </div>
    );
}