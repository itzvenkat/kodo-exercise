import { Base } from "src/app/shared/models/sort.model";

export class AppHomeConstants {
    public static readonly sort_fields: Base[] = [{ label: 'Name', value: 'name' }, { label: 'Last Updated', value: 'dateLastEdited' }];
}