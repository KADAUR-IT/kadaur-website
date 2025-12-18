
export async function handleMail(stringContact: string)
{
    try {
        const res = await fetch(`/api/sendMail?${stringContact}`);
        const data = await res.json();

        //console.log(data)
        return data
    } catch (error) {
        return {staus: 500, message: "Impossible d'envoyer le message", error}
    }
    
} 