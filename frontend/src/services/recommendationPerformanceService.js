export const getPerformance = async () => {

    const response = await fetch(
        "http://127.0.0.1:8000/recommendation-performance/"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch performance");
    }

    return await response.json();
};