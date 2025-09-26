
export async function handleMail()
{
    const res = await fetch(`/api/sendMail`);
    const data = await res.json();

    console.log(data)
} 