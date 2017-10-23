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


export function mapId<T extends Entity>(actions) {
    return actions.map(a => {
        let data = a.payload.doc.data() as T;
        const id = a.payload.doc.id;
        data.id = id;
        return data;
    });
}