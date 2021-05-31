export interface EntityCardsModel {
    title: string;
    createEntityPath: string;
    entityCardModels: EntityCardModel[];
}
export interface EntityCardModel {
    id: string;
    entityView: Node;
    viewPath: string;
    editPath: string;
    removePath: string;
}
export declare const entityCards: (model: EntityCardsModel) => HTMLDivElement;
export declare const createActionLi: (path: string, icon: string, title: string) => "" | HTMLLIElement;
export declare const entityCard: (model: EntityCardModel) => HTMLLIElement;
