import { FormControl } from "@angular/forms";
export interface EditForm{
    title:FormControl<string>,
    description:FormControl<string>,
    home_image:FormControl<string>,
    detail_image:FormControl<string>,
    text:FormControl<string>

}