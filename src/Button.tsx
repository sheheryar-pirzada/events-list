import React, { SyntheticEvent } from 'react';
import { Button } from 'antd';

type ButtonProps = {
    title: string;
    onClick?: (event: SyntheticEvent) => void;
    small?: boolean;
    rounded?: boolean;
    htmlType?: 'button' | 'submit' | 'reset' | undefined;
    loading?: boolean;
    disabled?: boolean;
    styles?: React.CSSProperties | undefined;
};

export function PrimaryButton({
    title,
    onClick,
    small,
    rounded,
    htmlType,
    styles,
    loading,
    disabled,
}: ButtonProps): JSX.Element {
    const baseStyles = {
        borderRadius: rounded ? '50px' : undefined,
    };
    const button: JSX.Element = (
        <Button
            type="primary"
            onClick={onClick}
            htmlType={htmlType}
            loading={loading}
            disabled={disabled}
            style={{ ...baseStyles, ...styles }}
        >
            {title}
        </Button>
    );

    return small ? <div className="small-btn">{button}</div> : button;
}

export function SecondaryButton({
    title,
    onClick,
    small,
    rounded,
    htmlType,
    styles,
    loading,
    disabled,
}: ButtonProps): JSX.Element {
    const baseStyles = {
        borderRadius: rounded ? '50px' : undefined,
    };
    const button: JSX.Element = (
        <Button
            type="primary"
            onClick={onClick}
            htmlType={htmlType}
            loading={loading}
            disabled={disabled}
            style={{ ...baseStyles, ...styles }}
        >
            {title}
        </Button>
    );

    return <div className={`green-btn ${small ? 'small-btn' : ''}`}>{button}</div>;
}
