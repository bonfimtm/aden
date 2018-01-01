interface Entity {
    id: string;
    createdAt: number;
    updatedAt: number;
}

export class Post implements Entity {
    id: string;
    createdAt: number;
    updatedAt: number;
    title: string;
    subtitle: string;
    headline: string;
    content: string;
    url: string;
}

export function setId<T extends Entity>(action) {
    console.log(action);
    const data = action.payload.data() as T;
    const id = action.payload.id;
    data.id = id;
    return data;
}

export function mapId<T extends Entity>(actions) {
    return actions.map(a => {
        const data = a.payload.doc.data() as T;
        const id = a.payload.doc.id;
        data.id = id;
        return data;
    });
}
