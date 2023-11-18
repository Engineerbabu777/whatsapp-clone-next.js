

export const getRecipientEmail = (users, loggedIn) => {

    console.log({users, loggedIn})

    console.log({return:users.filter(userToFilter => userToFilter !== loggedIn?.email)[0]})

    return users.filter(userToFilter => userToFilter !== loggedIn?.email)[0]
}