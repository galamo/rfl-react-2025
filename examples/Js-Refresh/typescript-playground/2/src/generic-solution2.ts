function MergeFunction<T, U>(obj1: T, obj2: U): T & U & { id: string } {
    return { ...obj1, ...obj2, id: getId() };
}

function getId(): string {
    return "id_temp"
}