import { textBox, select, checkBoxWithLabel, toggleButtonList } from './controls';
import { withAll, withCheck } from './hoc';

export const TextBox = withAll(textBox);
export const Select = withAll(select);
export const CheckBox = withCheck(checkBoxWithLabel);
export const ToggleButtonList = withAll(toggleButtonList);
export { DoubleSelect } from './doubleSelect';