const login = (req, res) =>{
    res.status(200).send("fake auth route")
}

const dashboard = (req, res)=>{
    const luckyNum = Math.floor(Math.random()*100);
    res.status(200).json({mag:'hello adarsh', secret:`your secret key is ${luckyNum}`})
}

module.exports = {
    login,
    dashboard
}