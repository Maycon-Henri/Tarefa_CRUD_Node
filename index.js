var bob = {
    _name: "Bob",
    _friends: ['Ze'],

    // printFriends: () => { console.log (this._name) }
    printFriends: function () { console.log (this._name) }
    // printFriends() {
    //     this._friends.forEach((f) => {
    //         console.log (this._name)
    //         this._name = 'Pedro'
    //         console.log(this._name + " knows " + f)
    //     });
    //     console.log (this._name)
    // }
}

bob.printFriends ()
