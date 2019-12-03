import * as React from 'react';

type DirectionButtonProps = {
    onClick?(): void;
    className?: string;
};

function NintendoGamepadDirectionButton(props: DirectionButtonProps) {
    return (
        <button 
            onClick={props.onClick} 
            className={props.className ? `nintendo-gamepad__direction-button ${props.className}` : `nintendo-gamepad__direction-button`}
        />
    )
}

type Props = {
    onUpClick?(): void;
    onRightClick?(): void;
    onDownClick?(): void;
    onLeftClick?(): void;
    className?: string;
};

export default function NintendoGamepadDirectionButtons(props: Props) {
    return (
        <div
            className={props.className ? `nintendo-gamepad__direction-buttons ${props.className}` : `nintendo-gamepad__direction-buttons`}
        >
            <div className="nintendo-gamepad__direction-buttons__side">
                <NintendoGamepadDirectionButton onClick={props.onUpClick} className="nintendo-gamepad__direction-button--up" />
            </div>
            <div className="nintendo-gamepad__direction-buttons__center">
                <NintendoGamepadDirectionButton onClick={props.onLeftClick} className="nintendo-gamepad__direction-button--left" />
                <span className="nintendo-gamepad__direction-button--center" />
                <NintendoGamepadDirectionButton onClick={props.onRightClick} className="nintendo-gamepad__direction-button--right" />
            </div>
            <div className="nintendo-gamepad__direction-buttons__side">
                <NintendoGamepadDirectionButton onClick={props.onDownClick} className="nintendo-gamepad__direction-button--down" />
            </div>
        </div>
    );
}