
export interface ButtonItems {

    text: string;
    type: string;
    clickHandler?: (...args: any[]) => void;    
    style?: any;
    ngClass?: string | string[] | Set<string> | { [klass: string]: any; };
    iconClass?: string;
    disabled?: boolean;
    hide?: boolean;

}
