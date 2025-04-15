export enum ButtonVariant {
    PRIMARY = "primary",
    Primary_OUTLINE = "outline-primary",
    Danger = "danger",
}

type HtmlButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonProps {
    type?: HtmlButtonProps["type"];
    onClick?: HtmlButtonProps["onClick"];
    children: React.ReactNode;
    variant?: ButtonVariant;
    disabled?: boolean;
    className?: string;

}
