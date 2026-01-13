export async function fromJson(name) {
    if (name?.length) {
        try {
            const res = await fetch(`/configs/${name}.json`);
            if (res?.ok) {
                return await res.json();
            }
        } catch (err) {
            console.error(`Fails to load .json config file: ${name}`, err);
        }
    }
    return [];
}