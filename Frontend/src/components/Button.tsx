import { ReactElement } from "react";

interface ButonProps{
    variant:"primary" | "secondary";
    size:"sm" | "md" | "lg";
    text: string;
    startIcon?:ReactElement;
    endIcon?:ReactElement;
    onClick?:()=> void;
}
const variantStyle={
        "primary":"bg-purple-600 text-white",
        "secondary":"bg-purple-300 text-purple-600"
}
const sizeStyle={
    "sm":"px-2 py-1",
    "md":"px-4 py-2",
    "lg":"px-8 py-4"
}
const defaultStyles="rounded-md p-4 flex items-center justify-center gap-2"

export const Button=(props: ButonProps) => {
     return <button className={`${variantStyle[props.variant]} ${defaultStyles} ${sizeStyle[props.size]}`} onClick={props.onClick}>
        {props.startIcon}
        {props.text}
        {props.endIcon}
        </button>
}
