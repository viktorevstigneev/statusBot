module.exports = {
    //  gameOptions: {
    //     reply_markup: JSON.stringify({
    //         inline_keyboard: [
    //             [{text: '1', callback_data: '1'}],
    //         ]
    //     })
    // },

    startOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'начать трекать', callback_data: '/again'}],
            ]
        })
    }
}
