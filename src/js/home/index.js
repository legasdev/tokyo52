async function getUser() {
    const res = await fetch('https://randomuser.me/api/');
    console.log(res)
}

getUser();