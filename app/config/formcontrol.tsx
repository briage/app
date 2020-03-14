import { InputForm } from "../components/core/input";
import { Radio, Props as RadioProps } from "../components/core/radio";
import { MultifySelect, Props as MultifySelectProps } from "../components/core/multifySelect";

const formControl_Map = [
    {
        type: ['text', 'number', 'phone', 'password'],
        component: (props) => <InputForm {...props} />
    },
    {
        type: 'radio',
        component: (props: RadioProps) => <Radio {...props} />
    },
    {
        type: 'checkbox',
        component: (props: MultifySelectProps) => <MultifySelect {...props} />
    }
]

export { formControl_Map };