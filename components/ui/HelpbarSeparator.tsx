interface HelpbarSeparatorProps {
    isAwarded: boolean;
}

export default function HelpbarSeparator({ isAwarded }: HelpbarSeparatorProps) {
    return(
        <div className={`h-8 w-[1px]  mx-2
            ${isAwarded ? "bg-stone-800" : "bg-slate-900"}`}/>
    );
}