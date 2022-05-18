import { addDays } from "date-fns";
import { Platform } from "react-native";

/**
 * Its used because timezone UTC is +3. I do not recommend use this in a real project.
 */
export function getPlatformDate(date: Date){
    if(Platform.OS === 'ios'){
        return addDays(date, 1);
    }else{
        return date;
    }
}