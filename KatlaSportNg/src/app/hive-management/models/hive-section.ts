export class HiveSection {
    constructor(
        public id: number,
        public code: string,
        public name: string,
        public storeHiveId: number,
        public isDeleted: boolean,
        public lastUpdated: string
    ) { }
}
