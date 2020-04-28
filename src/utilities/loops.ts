// This file holds some loop functions used across the project.

export async function forEach(array: any[], callback): Promise<any> {
    for (let index = 0; index < array.length; index++) {
        return await callback(array[index], index, array)
    }
}
